import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { getUserPublicList } from '../../actions/index';
// import CreateList from './CreateList';
import atoms from '../../components/atoms';

const { Typography } = atoms;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(list_name, description, member_count, subscriber_count, list_points, twitter_list_id) {
  id += 1;
  // console.log("createData", id)
  return { id, list_name, description, member_count, subscriber_count, list_points, twitter_list_id };
}




class PublicListsTable extends Component {
  state = {
    rows: [],
    listRan: false,
  }


  componentDidMount() {
    this.props.getUserPublicList(localStorage.getItem("twitter_user_id"))

  };

  componentDidUpdate() {
    if (this.props.publicLists.length > 0 && this.state.listRan === false) {
      this.getListRowBuilder(this.props.publicLists);
    }
  }

  getListRowBuilder = (list) => {
    let newRow = [];
    list.map(list => {
      newRow.push(createData(list.list_name, list.description, 
        list.member_count, list.subscriber_count, 
        list.list_points, list.twitter_list_id))
        return newRow;
    })
    // console.log(newRow);
    this.setState({ listRan: true })
    this.setState({ rows: newRow });
  };



  render() {

    if (this.props.publicLists === null || this.props.publicLists.length === 0) {
      return (
        <div>
          <h3>Create Your First List!</h3>
          <Button medium color="primary" variant="contained" href="/create">
            Create New List
                  </Button>
        </div>)
    } else {
      const { classes } = this.props;
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
          <TableHead>
              <TableRow >
                <TableCell align="center" padding="checkbox">Points</TableCell>
                <TableCell align="left" padding="none">Name</TableCell>
                <TableCell align="right">Members</TableCell>
                <TableCell align="right">Subscribers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log("this.state.rows", this.state.rows)} */}
              {this.state.rows.map(row => (

                <TableRow key={row.id} hover >
                  <TableCell align="center" padding="checkbox">
                    {/* <IconButton rowid={row.id} id={row.twitter_list_id} onClick={this.up } >
                      <FontAwesomeIcon icon={faArrowUp} color='default' style={{fontSize: '12px'}}/>
                    </IconButton> */}

                    <Typography color="textPrimary" inline="true" variant="body1">{row.list_points}</Typography>

                    {/* <IconButton rowid={row.id} id={row.twitter_list_id} onClick={this.down } >
                      <FontAwesomeIcon icon={faArrowDown} color='primary' style={{fontSize: '12px'}}/>
                    </IconButton> */}
                  </TableCell>
                  <TableCell align="left" padding="none">
                    <Typography color="primary"variant="body1">
                      <Link component={RouterLink} to={`/details/${row.twitter_list_id}`} >{row.list_name}</Link>
                    </Typography>
                    <Typography color="textSecondary" variant="body2">{row.description}</Typography>
                  </TableCell>
                  <TableCell align="right" >{row.member_count}</TableCell>
                  <TableCell align="right" >{row.subscriber_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

PublicListsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(PublicListsTable);

const mapStateToProps = state => ({
  publicLists: state.listsReducer.userPublicLists
});


const styledComponent = withStyles(styles)(PublicListsTable);

export default connect(
  mapStateToProps,
  { getUserPublicList }
)(styledComponent);