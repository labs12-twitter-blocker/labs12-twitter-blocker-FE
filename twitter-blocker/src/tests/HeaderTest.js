import React from 'react';
import { withRouter } from "react-router-dom";
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
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faSearch, faList, faCog } from '@fortawesome/free-solid-svg-icons';
import atoms from '../components/atoms';
import molecules from '../components/molecules';
import { searchLists, addPost } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@material-ui/styles/styled';
import theme from '../theme/tweeper/theme';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const { AppBar, Avatar, Button } = atoms;
const { Tabs, Tab, ListItem, InputAdornment } = molecules;



const tweetBox = {
  height: '100px',
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
  [ theme.breakpoints.down('xs') ]: {
    minHeight: 170,
  },
})

// function LinkTab(props) {
//   return <Tab component="a" 
//   // onClick={event => event.preventDefault()} 
//   {...props} 
//   />;
// }

class HeaderTest extends React.Component {
  state = {
    open: false,
    searchTerm: "",
    anchorEl: null,
    value: 0,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ profile_img: decoded.profile_img })
    }
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
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
    // localStorage.removeItem("twitter_user_id");
    localStorage.removeItem("token");
    // localStorage.removeItem("username");
    // localStorage.removeItem("profile_img");
    // localStorage.removeItem("displayName");
    // localStorage.removeItem("banner_img");
    // this.props.checkSignIn();
    this.props.history.push("/");
  };

  render() {
    // const { value } = this.state;
    const { anchorEl } = this.state;
    // console.log("**********************" + this.props.loggedIn);
    let content = (localStorage.getItem("token")) ?
      <Spacer>
        <AppBar position="fixed" elevation={1}>
          {/* <Toolbar> */}
          <Grid container alignItems="center" spacing={16}>
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
                          <FontAwesomeIcon icon={faCog} size="2x" color='#38A1F3' />
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
                    <Tooltip title="New Tweet">
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

            <Grid item sm xs={12}>
              <TextField
                fullWidth
                placeholder="Find Lists"
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
          {/* </Toolbar> */}
        </AppBar>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tweet in Peace <span role="img" aria-label="peace">✌️</span></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Compose Your Tweet Below
            </DialogContentText>
            <TextField style={tweetBox}
              autoFocus
              margin="normal"
              id="tweet"
              label="Tweet"
              variant="outlined"
              multiline
              rows="3"
              //   value={this.state.name}
              inputProps={{ maxLength: 280 }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Post Tweet
            </Button>
          </DialogActions>
        </Dialog>
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
  addPost
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(HeaderTest));