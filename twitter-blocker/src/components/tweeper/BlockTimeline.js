
import React, { Component } from 'react';
// import Fade from '@material-ui/core/Fade';
// import Popper from '@material-ui/core/Popper';
// import BlockTimelineCard from './BlockTimelineCard'
import BackButton from './BackButton';


import { blockTimeline, blockUser, unblockUser } from '../../actions/index'
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from '@material-ui/styles/styled';
import theme from '../../theme/tweeper/theme';
// import withTheme from '../../tweeper/withTheme';
import Divider from '@material-ui/core/Divider';
// import atoms from '../atoms';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Paper from '@material-ui/core/Paper';
// import red from '@material-ui/core/colors/red';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
// import { getAllListPoints, addUserVote } from '../../actions/index'
// import Checkbox from '@material-ui/core/Checkbox';
import Tweet from './Tweet.js';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { LIST_ITEM } from '../../theme/core/classes';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import {
//   List,
//   ListItem,
//   CardContent,

// } from '@material-ui/core';

// const { AppBar, Avatar, Badge, Icon, Toolbar } = atoms;

let id = 0;
function createData(screen_name, tweet_text, name, profile_img, twitter_user_id, hate, insult, obscene, toxic, severe_toxic, threat) {
  id += 1;
  return { id, screen_name, tweet_text, name, profile_img, twitter_user_id, hate, insult, obscene, toxic, severe_toxic, threat };
}

function desc(a, b, orderBy) {
  if (b[ orderBy ] < a[ orderBy ]) {
    return -1;
  }
  if (b[ orderBy ] > a[ orderBy ]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [ el, index ]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[ 0 ], b[ 0 ]);
    if (order !== 0) return order;
    return a[ 1 ] - b[ 1 ];
  });
  return stabilizedThis.map(el => el[ 0 ]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tableBodyRow: {
    height: "auto",
    marginTop: 10,
  },
  table: {
    // margin: "2rem 0",
  margin: "auto",

    // padding: "1rem"
    // [ theme.breakpoints.down("sm") ]: {
    // padding: '0px 4px',
  },
  tweet: {
    margin: "2rem"
  },
  blockButton: {
    [ theme.breakpoints.down("sm") ]: {
      width: '40px',
      height: '45px',
      padding: '0px 0 0 0px',
    }
  },
};

const Feed = styled('div')({
  backgroundColor: '#fff',
  width: "fit-content",
});

const Content = styled('div')({
  maxWidth: 1000,
  padding: theme.spacing.unit * 4,
  margin: 'auto',
});

class BlockTimeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isBlocked: false,
      twitter_user_id: null,
      data: [],
      orderBy: 'averageScore',
      order: 'desc',
      page: 0,
      rowsPerPage: 25,
      timelineRan: false,
      checked: []
    }
  }

  block = (id) => {

    console.log(id)
    let params = {
      twitter_id: this.state.twitter_user_id,
      user_id: id
    }
    this.props.blockUser(params)
    this.setState({ isBlocked: true })

    console.log("block")
  }
  unblock = (id) => {
    let params = {
      twitter_id: this.state.twitter_user_id,
      user_id: id

    }
    this.props.unblockUser(params)
    this.setState({ isBlocked: false })

    console.log("unblock")

  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
      console.log("decoded", decoded)
      console.log("CDM")
      console.log(this.state)
      const params = {
        twitter_user_id: decoded.id
      }
      this.props.blockTimeline(params)

    }
    // console.log(this.state.blockTimelineList)
    if (this.props.timeline && this.props.blockTimelineListDone && this.state.timelineRan === false) {
      this.getListRowBuilder(this.props.timeline);
    }
    // this.setState({ timeline: action.payload })
  }

  componentDidUpdate() {
    if (this.props.timeline && this.props.blockTimelineListDone && this.state.timelineRan === false) {
      this.getListRowBuilder(this.props.timeline)
    }
  };
  // checked = (id) => {
  //   // add to checked state here
  //   // if (this.state.checked.includes(id)) {
  //   //   let location = this.state.checked.indexOf(id)
  //   //   console.log("location if", location)
  //   //   let slicedCheck = this.state.checked.slice(location)
  //   //   console.log("slicedCheck if", slicedCheck)
  //   // } else {
  //   //   console.log("checked id else", id)
  //   //   console.log("this.state.checked else", this.state.checked)
  //   //   if (this.state.checked.includes(id)) {
  //   //     let checkedId = this.state.checked.indexOf(id)
  //   //     console.log("checkedId else", checkedId)
  //   //     let slicedCheck = this.state.checked.slice(checkedId)
  //   //     console.log("slicedCheck else", slicedCheck)
  //   //   }
  //     this.state.checked.push(id)
  //   }
  // }
  getListRowBuilder = (timeline) => {
    console.log("getListRowBuilder")
    let newRow = [];
    timeline.map(e => {
      newRow.push(createData(
        e.tweet.user.screen_name, e.tweet.full_text, e.tweet.user.name,
        e.tweet.user.profile_image_url_https, e.tweet.user.id_str,
        e.bert_result.identity_hate, e.bert_result.insult, e.bert_result.obscene,
        e.bert_result.toxic, e.bert_result.severe_toxic, e.bert_result.threat))
      return newRow;
    })
    console.log("getListRowBuilder timeline", timeline)
    this.setState({ timelineRan: true })
    this.setState({ data: newRow });
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

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  render() {
    // const { orderBy, order, anchorEl, setAnchorEl } = this.state;


    // const open = Boolean(anchorEl);
    // const popId = open ? 'simple-popper' : null;

    // console.log("open", this.state.open)
    if (this.props.timeline === null) {
      return (<CircularProgress color="primary" />)
    } else {
      const { classes } = this.props;

      const { data, order, orderBy, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      return (
        <React.Fragment>
          <CssBaseline />
          <BackButton />
          <Content>
            <Feed>
              {/* <Paper > */}
                {/* <Button>Submit Blocks</Button> */}
                <Table aria-labelledby="tableTitle" classes={{ root: classes.table }} >
                  <TableHead>
                    <TableRow classes={{ root: classes.tableBodyRow }}>
                      <TableCell key={'block'} align="center" padding="checkbox" classes={{ root: classes.blockButton }}>
                        <Tooltip title="Block" placement={true ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel >Block</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell key={'tweet'} align="left"  >
                        <Tooltip title="Tweets" placement={false ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel >Tweets</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell key={'hate'} align="right" padding="none" sortDirection={orderBy === 'hate' ? order : false} >
                        <Tooltip title="Sort by hate" placement={true ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel active={orderBy === 'hate'} direction={order} onClick={this.createSortHandler('hate')} >Hate</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell key={'insult'} align="right" padding="none" sortDirection={orderBy === 'insult' ? order : false} >
                        <Tooltip title="Sort by insult" placement={true ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel active={orderBy === 'insult'} direction={order} onClick={this.createSortHandler('insult')} >Insult</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell key={'obscene'} align="right" padding="none" sortDirection={orderBy === 'obscene' ? order : false} >
                        <Tooltip title="Sort by obscene" placement={true ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel active={orderBy === 'obscene'} direction={order} onClick={this.createSortHandler('obscene')} >Obscene</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell key={'toxic'} align="right" padding="none" sortDirection={orderBy === 'toxic' ? order : false} >
                        <Tooltip title="Sort by toxic" placement={true ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel active={orderBy === 'toxic'} direction={order} onClick={this.createSortHandler('toxic')} >Toxic</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell key={'severe_toxic'} align="right" padding="none" sortDirection={orderBy === 'severe_toxic' ? order : false} >
                        <Tooltip title="Sort by severe_toxic" placement={true ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel active={orderBy === 'severe_toxic'} direction={order} onClick={this.createSortHandler('severe_toxic')} >Severe Toxic</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell key={'threat'} align="right" sortDirection={orderBy === 'threat' ? order : false} >
                        <Tooltip title="Sort by threat" placement={true ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                          <TableSortLabel active={orderBy === 'threat'} direction={order} onClick={this.createSortHandler('threat')} >Threat</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {stableSort(data, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(n => {
                        // { console.log("n", n) }
                        return (

                          < TableRow
                            hover
                            tabIndex={- 1
                            }
                            key={n.id}
                          >
                            <TableCell align="center" padding="none">
                              <Grid item>

                                <Button side="medium" color="secondary" variant="outlined" aria-describedby={this.id}
                                  onClick={(e) => this.block(n.twitter_user_id)}
                                  >Block</Button>

                              </Grid>
                            </TableCell>
                            {/* <TableCell align="left" padding="none" classes={{ root: classes.tweet }}> */}
                            <Tweet name={n.name} profileImg={n.profile_img} text={n.tweet_text} screen_name={n.screen_name} />
                            {/* <Avatar src={n.profile_img} style={{ display: 'inline-block' }} /> */}
                            {/* <Typography color="textPrimary" variant='subtitle1' style={{ display: 'inline-block' }}> */}
                            {/* {n.name} */}
                            {/* </Typography> */}
                            {/* <Typography color="textSecondary" variant='caption' style={{ display: 'inline-block' }}> */}
                            {/* &nbsp;@{n.screen_name} */}
                            {/* </Typography> */}

                            {/* <Typography component="span" color="textSecondary" variant='body2'> */}
                            {/* {n.tweet_text} */}
                            {/* </Typography> */}
                            {/* <Typography color="primary"variant="body1">
                          {console.log("n: ",n)}
                        </Typography> */}
                            {/* </TableCell> */}
                            <TableCell align="right" padding="none" >
                              {`${(n.hate * 100).toFixed(2)}%`}
                            </TableCell>
                            <TableCell align="right" padding="none" >
                              {`${(n.insult * 100).toFixed(2)}%`}
                            </TableCell>
                            <TableCell align="right" padding="none" >
                              {`${(n.obscene * 100).toFixed(2)}%`}
                            </TableCell>
                            <TableCell align="right" padding="none" >
                              {`${(n.toxic * 100).toFixed(2)}%`}
                            </TableCell>
                            <TableCell align="right" padding="none" >
                              {`${(n.severe_toxic * 100).toFixed(2)}%`}
                            </TableCell>
                            <TableCell align="right" >
                              {`${(n.threat * 100).toFixed(2)}%`}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }} classes={{ root: classes.tableBodyRow }} >
                        <TableCell colSpan={6} classes={{ root: classes.tableBodyData }} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {/* </div> */}
                <TablePagination
                  rowsPerPageOptions={[ 10, 25, 50, 100 ]}
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
              {/* </Paper> */}

              <Divider />
            </Feed>
            <BackButton />
          </Content>
        </React.Fragment>
      );
    }
  }
}
const styledComponent = withStyles(styles)(BlockTimeline);
const routedComponent = withRouter(styledComponent)


const mapStateToProps = state => ({
  timeline: state.listsReducer.blockTimelineList,
  blockTimelineListDone: state.listsReducer.blockTimelineListDone
});

export default withRouter(connect(
  mapStateToProps,
  { blockTimeline, blockUser, unblockUser }
)(routedComponent));
