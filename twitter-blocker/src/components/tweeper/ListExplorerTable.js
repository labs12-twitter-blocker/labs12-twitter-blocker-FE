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
import { getPublicLists, addUserVote } from '../../actions/index';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Link from '@material-ui/core/Link';
import atoms from '../../components/atoms';
import jwt from 'jsonwebtoken';
require('dotenv').config();
const { IconButton, Typography } = atoms;

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
      // border: 0,
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
  pointsBody: {
    width: '125px',
    padding: '0px 4px',
    // padding: 12,
    fontSize: 14,
    
    "&:before": {
			content: "attr(datatitle)",
			float: "left",
			fontWeight: 600,
    },
    
    [theme.breakpoints.down("sm")]: {
      width: '40px',
      padding: '0px 0 0 0px',
      display: 'table-cell',
      fontSize: 14,

      "&:before": {
        content: "",
        display: "none"
      }
    }
  },
  pointsRow: {
    height: "auto",
		marginTop: 10,
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
  return { id, list_name, description, member_count, subscriber_count, list_points, twitter_list_id };
}

class ListExplorerTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      rows: [],
      allListRan: false,
      twitter_user_id: "",
      lists: []
  }
  }

    
  componentDidMount() {
    if (this.props.allLists === null ) {
      this.props.getPublicLists()
    } else {
      id = 0;
      this.getListRowBuilder(this.props.allLists);
    }
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
    }
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
      this.setState({allListRan: true})
      this.setState({rows: newRow});
  }; 

  up = (e) => {
    const rowPointer = e.currentTarget.getAttribute("rowid") - 1;
    let upvote = {
      "twitter_list_id": e.currentTarget.id, 
      "twitter_user_id": this.state.twitter_user_id,
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
      "twitter_user_id": this.state.twitter_user_id,
      "vote": -1
    }
    let getRows = this.state.rows;
    getRows[rowPointer].list_points = getRows[rowPointer].list_points - 1;

    this.setState({...this.state, rows: getRows});
    this.props.addUserVote(downvote)
  };

  render() {
      
      if (this.props.allLists === null || this.props.allLists.length === 0) {
          return (<div>No Results Found. Please Search Again.</div>)
      } else {
        const { classes } = this.props;
        return (
          <Paper className={classes.root }>
            <Table className={classes.table}>
              <TableHead>
                <TableRow classes={{ root: classes.tableBodyRow }} >
                  <TableCell classes={{ root: classes.pointsBody }} align="center" padding="none" >Points</TableCell>
                  <TableCell classes={{ root: classes.tableBodyData }} align="left" padding="none">Name</TableCell>
                  <TableCell classes={{ root: classes.tableBodyData }} align="right">Members</TableCell>
                  <TableCell classes={{ root: classes.tableBodyData }} align="right">Subscribers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody classes={{ root: classes.pointsRow }} >
                {this.state.rows.map(row => (

                  <TableRow classes={{ root: classes.tableBodyRow }} key={row.id} hover >
                    <TableCell classes={{ root: classes.tableBodyData }} align="center" padding="none" >
                      
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

ListExplorerTable.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    allLists: state.listsReducer.publicLists
  });
  

const styledComponent = withStyles(styles)(ListExplorerTable);

export default connect(
  mapStateToProps,
  { getPublicLists, addUserVote }
)(styledComponent);