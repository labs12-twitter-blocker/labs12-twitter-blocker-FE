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
import { getFollowListPoints } from '../../actions/index'

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
function createData(list_name, description, member_count, subscriber_count, list_points) {
  id += 1;
  // console.log("createData", id)
  return { id, list_name, description, member_count, subscriber_count, list_points };
}

class LeaderboardFollowTable extends Component {
    state={
        rows: [],
        followListRan: false,
    }

    
    componentDidMount() {
        this.props.getFollowListPoints()
        
    };

    componentDidUpdate() {
        if (this.props.followLists.length > 0 && this.state.followListRan === false) {
            this.getListRowBuilder(this.props.followLists);
        }
    }

    getListRowBuilder = (list) => {
        let newRow = [];
        list.map(list => {
            let points = (list.list_upvotes - list.list_downvotes)
            newRow.push(createData(list.list_name, list.description, 
                list.member_count, list.subscriber_count, 
                points))
                return newRow;
        })
        // console.log(newRow);
        this.setState({followListRan: true})
        this.setState({rows: newRow});
    };



    render() {
        
        if (this.props.followLists === null || this.props.followLists.length === 0) {
            return (<div>Loading</div>)
        } else {
        const { classes } = this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Members</TableCell>
            <TableCell align="center">Subscribers</TableCell>
            <TableCell align="center">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.list_name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="center">{row.member_count}</TableCell>
              <TableCell align="center">{row.subscriber_count}</TableCell>
              <TableCell align="center">{row.list_points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
 }
}
}

LeaderboardFollowTable.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    followLists: state.listsReducer.listPointsFollow
  });
  

const styledComponent = withStyles(styles)(LeaderboardFollowTable);

export default connect(
  mapStateToProps,
  { getFollowListPoints }
)(styledComponent);