import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getLists, addUserVote } from '../../actions/index';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Link from '@material-ui/core/Link';
import atoms from '../../components/atoms';
const { IconButton, Typography } = atoms;

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
  return { id, list_name, description, member_count, subscriber_count, list_points, twitter_list_id };
}

class LeaderboardAllTable extends Component {
  state={
      rows: [],
      allListRan: false,
      twitter_user_id: "",
      lists: []
  }
    
  componentDidMount() {
    if (this.props.allLists === null ) {
      this.props.getLists()
    } else {
      this.getListRowBuilder(this.props.allLists);
    }
    this.setState({"twitter_user_id": localStorage.getItem("twitter_user_id") })
  };
      
  componentDidUpdate(prevProps) {
    if (this.props.allLists.length !== prevProps.allLists.length) {
      this.getListRowBuilder(this.props.allLists);
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
      this.setState({allListRan: true})
      this.setState({rows: newRow});
  }; 

  up = (e) => {
    console.log("e.currentTarget.getAttribute(rowid)", e.currentTarget.getAttribute("rowid"))
    console.log("e.currentTarget.id", e.currentTarget.id)

    const rowPointer = e.currentTarget.getAttribute("rowid") - 1;
    let upvote = {
      "twitter_list_id": e.currentTarget.id, 
      "twitter_user_id": localStorage.getItem("twitter_user_id"),
      "vote": 1
    }
    let getRows = this.state.rows;
    getRows[rowPointer].list_points = getRows[rowPointer].list_points + 1;

    this.setState({...this.state, rows: getRows});
    this.props.addUserVote(upvote)
  };

  down = e => {
    const rowPointer = e.currentTarget.getAttribute("rowid") - 1;
    let downvote = {
      "twitter_list_id": e.currentTarget.id, 
      "twitter_user_id": localStorage.getItem("twitter_user_id"),
      "vote": -1
    }
    let getRows = this.state.rows;
    getRows[rowPointer].list_points = getRows[rowPointer].list_points - 1;

    this.setState({...this.state, rows: getRows});
    this.props.addUserVote(downvote)
  };

  render() {
      
      if (this.props.allLists === null || this.props.allLists.length === 0) {
          return (<div>Loading</div>)
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
                {this.state.rows.map(row => (

                  <TableRow key={row.id} hover >
                    <TableCell align="center" padding="checkbox">
                      
                      <IconButton rowid={row.id} id={row.twitter_list_id} 
                      onClick={(e)=>{e.currentTarget.style = " color:#33FF33 !important; "; this.up(e) }} >
                        <FontAwesomeIcon icon={faArrowUp} color='default' style={{fontSize: '12px'}}/>
                      </IconButton>

                      <Typography color="textPrimary" inline="true" variant="body1">{row.list_points}</Typography>
                    
                      <IconButton rowid={row.id} id={row.twitter_list_id}
                      onClick={(e)=>{e.currentTarget.style = " color:#FF3333 !important; "; this.down(e) }} >
                        <FontAwesomeIcon icon={faArrowDown} color='default' style={{fontSize: '12px'}}/>
                      </IconButton>
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

LeaderboardAllTable.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    allLists: state.listsReducer.lists
  });
  

const styledComponent = withStyles(styles)(LeaderboardAllTable);

export default connect(
  mapStateToProps,
  { getLists, addUserVote }
)(styledComponent);