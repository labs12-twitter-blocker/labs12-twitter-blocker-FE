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


const fabDesign = {
    // margin: theme.spacing.unit,
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
}

const tweetBox = {
    height: '100px',
}

export default class TweetFloat extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Fab variant="outlined" color="primary" style={fabDesign} onClick={this.handleClickOpen}>
            <FontAwesomeIcon  icon={faPlus} size="2x" color='white' />
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
            //   value={this.state.name}
              inputProps={{ maxLength: 280 }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Post Tweet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}