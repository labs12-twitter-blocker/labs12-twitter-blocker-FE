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
import { getPublicLists } from '../../actions/index'

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
function createData(list_name, description, member_count, subscriber_count, list_upvotes, list_downvotes) {
  id += 1;
  //console.log("createData", id)
  return { id, list_name, description, member_count, subscriber_count, list_upvotes, list_downvotes };
}



// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24),
//   createData('Ice cream sandwich', 237, 9.0, 37),
//   createData('Eclair', 262, 16.0, 24),
//   createData('Cupcake', 305, 3.7, 67),
//   createData('Gingerbread', 356, 16.0, 49),
// ];


class PublicListsTable extends Component {
    state={
        rows: [],
        listRan: false,
    }

    
    componentDidMount() {
        this.props.getPublicLists("1098020800320270336")
        
    };

    componentDidUpdate() {
        if (this.props.publicLists.length > 0 && this.state.listRan === false) {
            this.getListRowBuilder(this.props.publicLists);
        }
    }

    getListRowBuilder = (list) => {
        let newRow = [];
        //console.log('here')
        list.map(list => {
           // console.log("list", list);
            newRow.push(createData(list.list_name, list.description, 
                list.member_count, list.subscriber_count, 
                list.list_upvotes, list.list_downvotes))
        })
        // console.log(newRow);
        this.setState({listRan: true})
        this.setState({rows: newRow});
    };



    render() {
        
        if (this.props.publicLists === null || this.props.publicLists.length === 0) {
            return (<div>Loading</div>)
        } else {
        const { classes } = this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>List Name</TableCell>
            <TableCell align="center">List Description</TableCell>
            <TableCell align="center">List Members</TableCell>
            <TableCell align="center">List Subsribers</TableCell>
            <TableCell align="center">List Up Votes</TableCell>
            <TableCell align="center">List Down Votes</TableCell>
            {/* <TableCell align="center">Protein (g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
            {/* {console.log("this.state.rows", this.state.rows)} */}
          {this.state.rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.list_name}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.member_count}</TableCell>
              <TableCell align="center">{row.subscriber_count}</TableCell>
              <TableCell align="center">{row.list_upvotes}</TableCell>
              <TableCell align="center">{row.list_downvotes}</TableCell>
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
  publicLists: state.listsReducer.publicLists
  });
  

const styledComponent = withStyles(styles)(PublicListsTable);

export default connect(
  mapStateToProps,
  { getPublicLists }
)(styledComponent);