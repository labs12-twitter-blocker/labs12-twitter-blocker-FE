import React from 'react';
import { withRouter } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// import Hidden from '@material-ui/core/Hidden';
// import CreateList from '../components/tweeper/CreateList';
// import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
// import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
// import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faSearch, faList, faBroom } from '@fortawesome/free-solid-svg-icons';
import atoms from '../components/atoms';
import molecules from '../components/molecules';
import { searchLists, addPost, cancelPost } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@material-ui/styles/styled';
import theme from '../theme/tweeper/theme';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const { AppBar, Avatar, Button } = atoms;
const { Tabs, Tab, ListItem, InputAdornment } = molecules;


const close = {
  padding: '10 px'
}

const tweetBox = {
  height: '130px',
}

const avatarStyle = {
  marginRight: '8px'
}

const searchIcon = {
  marginLeft: '8px'
}

const Spacer = styled('div')({
  width: "100%",
  minHeight: 53,
  display: "hidden",
  [theme.breakpoints.down('xs')]: {
    minHeight: 170,
  },
})


// render() {
//   let start = (this.state.time == 0) ?
//     <button onClick={this.startTimer}>start</button> :
//     null
//   let stop = (this.state.time == 0 || !this.state.isOn) ?
//     null :
//     <button onClick={this.stopTimer}>stop</button>
//   let resume = (this.state.time == 0 || this.state.isOn) ?
//     null :
//     <button onClick={this.startTimer}>resume</button>
//   let reset = (this.state.time == 0 || this.state.isOn) ?
//     null :
//     <button onClick={this.resetTimer}>reset</button>
//   return(
//     <div>
//       <h3>timer: {ms(this.state.time)}</h3>
//       {start}
//       {resume}
//       {stop}
//       {reset}
//     </div>
//   )
// }


class HeaderTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      snackBarOpen: false,
      searchTerm: "",
      anchorEl: null,
      value: 0,
      tweet: null,
      profileId: null,
      time: 0,
      isOn: false,
      start: 0,
      profileBanner: null,
      profile_img: ''
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: 120 + this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: this.state.start-- //Date.now() + this.state.start
    }), 1000);
  }

  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({ time: 0, isOn: false })
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ profile_img: decoded.profile_img })
      this.setState({ profileId: decoded.id })
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.time !== prevProps.time) {
      this.getListRowBuilder(this.props.allLists);
    }
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleTweetChange = (event) => {
    this.setState({ tweet: event.target.value })
  }
  searchLists = (event) => {
    this.props.searchLists(event.target.value);
    // this.setState({searchTerm: ""})
    // return <Redirect to="/explorer" />
    this.props.history.push("/explorer")
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSBClose = () => {
    this.setState({ snackBarOpen: false });
  };

  sendTweet = (e) => {
    // e.preventDefault();
    // console.log("in send tweet")
    const tweetParams = {
      "status": this.state.tweet,
      "twitter_user_id": this.state.profileId
    }
    this.props.addPost(tweetParams);
    this.startTimer()
    // this.setState({ tweet: "" });
    this.handleClose()
    this.setState({ snackBarOpen: true })
    this.setState({ tweet: "" });
    this.handleClose();

  }
  cancelTweet = (e) => {
    this.props.cancelPost();
    this.stopTimer()
    this.resetTimer()
    this.setState({ snackBarOpen: false });
    this.handleClose()
  }
  handleAvatarClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAvatarClose = () => {
    this.setState({ anchorEl: null });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  logOut = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  render() {
    const { anchorEl } = this.state;

    let content = (localStorage.getItem("token")) ?
      <Spacer>
        <AppBar position="fixed" elevation={1}>
          <Grid container alignItems="center" spacing={8} justify='space-evenly'>
            <Grid item xs={12} sm={4}>
              <Tabs
                value={this.state.value}
                onChange={this.handleTabChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="secondary"
              >
                <Tab
                  value={0}
                  onlyIcon
                  icon={
                    <Link to="/profile">
                      <Tooltip title="Profile">
                        <FontAwesomeIcon icon={faHome} size="2x" color='#304ffe' />
                      </Tooltip>
                    </Link>
                  }
                />
                <Tab
                  value={1}
                  onlyIcon
                  icon={
                    // <Badge dotted badgeContent="">
                    <Link to="/cleantimeline">
                      <Tooltip title="Clean Timeline">
                        <FontAwesomeIcon icon={faBroom} size="2x" color='#304ffe' />
                      </Tooltip>
                    </Link>
                    // </Badge>
                  }
                />
                <Tab
                  value={2}
                  onClick={this.handleClickOpen}
                  onlyIcon
                  icon={
                    <Tooltip title={(this.state.time === 0) ? "New Tweet" : `${this.state.time} seconds until Tweet posts`}>
                      <FontAwesomeIcon icon={faPlus} size="2x" color='#304ffe' />
                    </Tooltip>
                  }
                />
                <Tab
                  value={3}
                  onlyIcon
                  icon={
                    <Link to="/explorer">
                      <Tooltip title="List Explorer">
                        <FontAwesomeIcon icon={faList} size="2x" color='#304ffe' />
                      </Tooltip>
                    </Link>
                  }
                />
              </Tabs>
            </Grid>
            <Grid item xs={5} sm >
              <TextField
                fullWidth
                placeholder="Search List Explorer"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" style={searchIcon}>
                      <FontAwesomeIcon icon={faSearch} color='primary' />
                    </InputAdornment>
                  ),
                }}
                onChange={this.searchLists}
              />
            </Grid>
            <Grid item xs={6} sm="auto" >
              <ListItem>
                <Avatar
                  src={this.state.profile_img}
                  style={avatarStyle} alt="Your Profile Image"
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleAvatarClick}
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleAvatarClose}
                >
                  <Link to="/settings" style={{ textDecoration: 'none' }} ><MenuItem>Settings</MenuItem></Link>
                  <a href="/" style={{ textDecoration: 'none' }} ><MenuItem onClick={this.logOut}>Logout</MenuItem></a>
                </Menu>
                <React.Fragment>
                  <Button color="primary" variant="contained" href="/create">
                    List Creator
                  </Button>
                </React.Fragment>
              </ListItem>
            </Grid>
          </Grid>
        </AppBar>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tweet in Peace <span role="img" aria-label="peace">✌️</span></DialogTitle>
          <DialogContent>
            <DialogContentText>
              All tweets go through a 2 min. timer before posting so you can make changes if needed.
            </DialogContentText>
            <TextField style={tweetBox}
              autoFocus
              margin="normal"
              id="tweet"
              value={this.state.tweet}
              label="Tweet"
              variant="outlined"
              multiline
              rows="6"
              onChange={this.handleTweetChange}
              inputProps={{ maxLength: 280 }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
            {/* <Button onClick={e => this.cancelTweet()} color="secondary">
              Cancel Tweet
            </Button> */}
            <Button onClick={e => this.sendTweet()} color="primary">
              Post Tweet
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={1000 * 120}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={`${this.state.time} seconds until Tweet posts`}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.cancelTweet}>
              Cancel Tweet
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              style={close}
              onClick={this.handleSBClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Spacer>

      :
      null;
    return (
      <div>
        {content}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn
  }
}

const mapActionsToProps = {
  searchLists,
  addPost,
  cancelPost
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(HeaderTest));