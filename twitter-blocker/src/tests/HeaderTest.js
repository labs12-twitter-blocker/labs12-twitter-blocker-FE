import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import CreateList from '../components/tweeper/CreateList';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faSearch, faBell, faEnvelope, faList, faCog } from '@fortawesome/free-solid-svg-icons';
import atoms from '../components/atoms';
import molecules from '../components/molecules';
import { searchLists } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const { AppBar, Avatar, Badge, Icon, Toolbar, Button } = atoms;
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

class HeaderTest extends React.Component {
  state = {
    open: false,
    searchTerm: ""
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }
  searchLists = (event) => {
    this.props.searchLists(event.target.value);
    // this.setState({searchTerm: ""})
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <Grid container alignItems="center" spacing={16}>
              <Grid item xs={12} sm={4}>
                <Tabs value={0} variant="fullWidth">
                  <Tab
                    onlyIcon
                    icon={
                      <Badge dotted badgeContent="">
                        <Link to="/profile">
                          <FontAwesomeIcon icon={faHome} size="2x" color='#38A1F3' />
                        </Link>
                      </Badge>
                    }
                  />
                  <Tab onClick={this.handleClickOpen}
                    onlyIcon
                    icon={
                      <FontAwesomeIcon icon={faPlus} size="2x" color='#38A1F3' />
                    }
                  />
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
                  <Tab
                    onlyIcon
                    icon={
                      <Badge >
                        <Link to="/explorer">
                          <FontAwesomeIcon icon={faList} size="2x" color='#38A1F3' />
                        </Link>
                      </Badge>
                    }
                  />
                  {/* <Tab onlyIcon icon={
                    <Link to="/settings">
                      <FontAwesomeIcon icon={faCog} size="2x" color='#38A1F3' />
                    </Link>} /> */}
                  {/* <Tab onlyIcon icon={<FontAwesomeIcon icon={faEnvelope} size="2x" color='#38A1F3'/>} /> */}
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
                        <FontAwesomeIcon icon={faSearch} color='#38A1F3' />
                      </InputAdornment>
                    ),
                  }}
                  onChange={this.searchLists}
                />
              </Grid>

              <Grid item xs={6} sm="auto" >
                <ListItem>
                  <Avatar src="" style={avatarStyle} />
                  {/* <ListItemText primary="austen" /> */}
                  <React.Fragment>
                    <Button medium color="primary" variant="contained" href="/create">
                      Create New List
                  </Button>
                  </React.Fragment>
                </ListItem>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
  }
}

const mapActionsToProps = {
  searchLists
}

export default connect(mapStateToProps, mapActionsToProps)(HeaderTest);