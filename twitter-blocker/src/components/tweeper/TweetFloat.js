import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import atoms from '../atoms';
import { addPost, getUser } from '../../actions';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
require('dotenv').config();


const fabDesign = {
  // margin: theme.spacing.unit,
  position: 'fixed',
  top: '4rem',
  right: '1rem',
  zIndex: '5',
}

const tweetBox = {
  height: '100px',
}

class TweetFloat extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      tweet: "",
      tweetParams: null,
    }
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
      this.props.getUser(decoded.id)
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ tweet: event.target.value })
  }

  sendTweet = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("twitter_user_id")
    console.log("ID____________________", id);
    console.log("TOKEN", token);
    console.log("THIS.STATE", this.state);

    const tweetParams = {
      "status": this.state.tweet,
      "twitter_user_id": id
    }

    this.setState({ tweet: "" });
    this.props.addPost(tweetParams);
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Fab variant="outlined" color="primary" style={fabDesign} onClick={this.handleClickOpen}>
          <FontAwesomeIcon icon={faPlus} size="2x" color='white' />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tweet in Peace ✌️</DialogTitle>
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
              value={this.state.tweet}
              inputProps={{ maxLength: 280 }}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.sendTweet} color="primary">
              Post Tweet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listMembers: state.listsReducer.listMembers,
  posts: state.tweetsReducer.posts
});

const mapActionsToProps = {
  addPost, getUser
}

export default connect(mapStateToProps, mapActionsToProps)(TweetFloat);
