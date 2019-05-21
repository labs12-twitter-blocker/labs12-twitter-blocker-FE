import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getUserBlockList } from '../../actions/index';
// import CreateList from './CreateList';
import atoms from '../../components/atoms';
import jwt from 'jsonwebtoken';
require('dotenv').config();


const { Typography } = atoms;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    [theme.breakpoints.down("sm")]: {
      // width: '100%',
      padding: '0px 4px',
    }
  },
  table: {
    [theme.breakpoints.down("sm")]: {
      padding: '0px 4px',
    }
  },
  tableBodyRow: {
		height: "auto",
		marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      height: 48,
    }
  },
  tableBodyData: {
		padding: 12,
		fontSize: 14,

		"&:before": {
			content: "attr(datatitle)",
			float: "left",
			fontWeight: 600,
		},

    [theme.breakpoints.down("sm")]: {
      display: 'table-cell',
      padding: '0px 4px',
      fontSize: 14,

      "&:before": {
        content: "",
        display: "none"
      }
    }
	},
  pointsColumn: {
    width: '125px',
    padding: '0px 4px',
    [theme.breakpoints.down("sm")]: {
      width: '40px',
      height: '45px',
      padding: '0px 0 0 0px',
    }
  }
});

let id = 0;
function createData(list_name, description, member_count, subscriber_count, list_points, twitter_list_id) {
  id += 1;
  // console.log("createData", id)
  return { id, list_name, description, member_count, subscriber_count, list_points, twitter_list_id };
}

class BlockListsTable extends Component {
  state = {
    rows: [],
    listRan: false,
    twitter_user_id: ""
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
      this.props.getUserBlockList(decoded.id)
    }

  };

  componentDidUpdate() {
    if (this.props.blockLists.length > 0 && this.state.listRan === false) {
      this.getListRowBuilder(this.props.blockLists);
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

    this.setState({ listRan: true })
    this.setState({ rows: newRow });
  };

  render() {

    if (this.props.blockLists === null || this.props.blockLists.length === 0) {
      return (
        <div>
          <h3>You don't have any Block Lists Yet!</h3>
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
              <TableRow classes={{ root: classes.tableBodyRow }} >
                <TableCell classes={{ root: classes.tableBodyData, root: classes.pointsColumn }} align="center" padding="checkbox">Points</TableCell>
                <TableCell classes={{ root: classes.tableBodyData }} align="left" padding="none">Name</TableCell>
                <TableCell classes={{ root: classes.tableBodyData }} align="right">Members</TableCell>
                <TableCell classes={{ root: classes.tableBodyData }} align="right">Subscribers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody classes={{ root: classes.tableBodyRow, root: classes.pointsColumn }} >
              {console.log("this.state.rows", this.state.rows)}
              {this.state.rows.map(row => (

                <TableRow classes={{ root: classes.tableBodyRow }} key={row.id} hover >
                  <TableCell classes={{ root: classes.tableBodyData }} align="center" padding="checkbox">
                    <Typography color="textPrimary" inline="true" variant="body1">{row.list_points}</Typography>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableBodyData }} align="left" padding="none">
                    <Typography color="primary"variant="body1">
                      <Link component={RouterLink} to={`/details/${row.twitter_list_id}`} >{row.list_name}</Link>
                    </Typography>
                    <Typography color="textSecondary" variant="body2">{row.description}</Typography>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableBodyData }} align="right" >{row.member_count}</TableCell>
                  <TableCell classes={{ root: classes.tableBodyData }} align="right" >{row.subscriber_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

BlockListsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(BlockListsTable);

const mapStateToProps = state => ({
  blockLists: state.listsReducer.userBlockLists
});


const styledComponent = withStyles(styles)(BlockListsTable);

export default connect(
  mapStateToProps,
  { getUserBlockList }
)(styledComponent);