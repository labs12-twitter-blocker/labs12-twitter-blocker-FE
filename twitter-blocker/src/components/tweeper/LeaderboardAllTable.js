import React from 'react';
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
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { getAllListPoints, addUserVote } from '../../actions/index'
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
  tableWrapper: {
    overflowX: 'auto',
  },
});

let id = 0;
function createData(list_name, description, member_count, subscriber_count, list_points, twitter_list_id) {
  id += 1;
  return { id, list_name, description, member_count, subscriber_count, list_points, twitter_list_id };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'list_points', numeric: true, disablePadding: false, label: 'Points' },
  { id: 'list_name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'member_count', numeric: true, disablePadding: false, label: 'Members' },
  { id: 'subscriber_count', numeric: true, disablePadding: false, label: 'Subscribers' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

class LeaderboardAllTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'list_points',
    data: [],
    page: 0,
    rowsPerPage: 25,
    allListRan: false,
    twitter_user_id: ""
  };

  componentDidMount() {
    if (this.props.allLists === null ) {
      this.props.getAllListPoints()
    } else {
      this.getListRowBuilder(this.props.allLists);
    }
    this.setState({"twitter_user_id": localStorage.getItem("twitter_user_id") })
  };
    
  componentDidUpdate() {
    if (this.props.allLists !== null  && this.state.allListRan === false && this.state.twitter_user_id !== "" ) {
      this.getListRowBuilder(this.props.allLists);
    }
  };

  getListRowBuilder = (list) => {
    let newRow = [];
    list.map(list => {
      newRow.push(createData(list.list_name, list.description, 
        list.member_count, list.subscriber_count, 
        list.list_points, list.twitter_list_id))
        return newRow;
      })

      this.setState({allListRan: true})
      this.setState({data: newRow});
  }; 

  up = (e) => {
    const rowPointer = e.currentTarget.getAttribute("rowid") - 1;
    let upvote = {
      "twitter_list_id": e.currentTarget.id, 
      "twitter_user_id": localStorage.getItem("twitter_user_id"),
      "vote": 1
    }
    let getRows = this.state.data;
    getRows[rowPointer].list_points = getRows[rowPointer].list_points + 1;

    this.setState({...this.state, data: getRows});
    this.props.addUserVote(upvote)
  };

  down = e => {
    const rowPointer = e.currentTarget.getAttribute("rowid") - 1;
    let downvote = {
      "twitter_list_id": e.currentTarget.id, 
      "twitter_user_id": localStorage.getItem("twitter_user_id"),
      "vote": -1
    }
    let getRows = this.state.data;
    getRows[rowPointer].list_points = getRows[rowPointer].list_points - 1;

    this.setState({...this.state, data: getRows});
    this.props.addUserVote(downvote)
  };

  handleRequestSort = (event, property) => {
    console.log("handleRequestSort")
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    console.log("handleChangePage")
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    console.log("handleChangeRowsPerPage")
    this.setState({ rowsPerPage: event.target.value });
  };


  render() {
    if (this.props.allLists === null || this.props.allLists.length === 0 || this.state.twitter_user_id === "" ) {
      return (<div>Loading</div>)
    } else {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell align="center" padding="checkbox">
                      
                        <IconButton rowid={n.id} id={n.twitter_list_id} 
                        onClick={(e)=>{e.currentTarget.style = " color:#33FF33 !important; "; this.up(e) }} >
                          <FontAwesomeIcon icon={faArrowUp} color='default' style={{fontSize: '12px'}}/>
                        </IconButton>

                        <Typography color="textPrimary" inline="true" variant="body1">{n.list_points}</Typography>
                      
                        <IconButton rowid={n.id} id={n.twitter_list_id}
                        onClick={(e)=>{e.currentTarget.style = " color:#FF3333 !important; "; this.down(e) }} >
                          <FontAwesomeIcon icon={faArrowDown} color='default' style={{fontSize: '12px'}}/>
                        </IconButton>
                      </TableCell>
                      <TableCell align="left" padding="none">
                        <Typography color="primary"variant="body1">
                          <Link component={RouterLink} to={`/details/${n.twitter_list_id}`} >{n.list_name}</Link>
                        </Typography>
                        <Typography color="textSecondary" variant="body2">{n.description}</Typography>
                      </TableCell>
                      <TableCell align="right" >{n.member_count}</TableCell>
                      <TableCell align="right" >{n.subscriber_count}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }}
}

LeaderboardAllTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  allLists: state.listsReducer.listPointsAll
});

const styledComponent = withStyles(styles)(LeaderboardAllTable);

export default connect(
  mapStateToProps,
  { getAllListPoints, addUserVote }
)(styledComponent);
