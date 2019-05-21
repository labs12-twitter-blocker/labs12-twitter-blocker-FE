import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { getUser, getLogin } from '../../actions/index.js';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class UserSettingsTextField extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    loggedIn: false,
    user: null,
    token: '',
    twitter_user_id: null,
    currentUser: null,
  };
 
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
      this.props.getUser(decoded.id)
    }
    this.setState({currentUser: this.props.currentUser})
  }

    componentDidUpdate(prevProps) {
      console.log("CDUpdate");
      console.log("this.state.loggedIn", this.state.loggedIn);
      console.log("this.props.currentUser", this.props.currentUser);
      console.log("this.props.user", this.props.user);
      if (this.props.user.id !== prevProps.user.id) {
        this.props.getUser(this.props.user.id)
      }
      console.log("twitter_user_id", this.state.twitter_user_id);
    }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    let content = ( ( this.props.loggedIn === true || this.state.twitter_user_id !== null ) && this.props.gotCurrentUser == true )?
    (
    <form className={classes.container} noValidate autoComplete="off">
    <h4>User Info</h4>
    <TextField
      id="outlined-name"
      label="Twitter Username"
      className={classes.textField}
      value={this.props.currentUser.users.screen_name}
      // onChange={this.handleChange('firstName')}
      margin="normal"
      variant="outlined"
    />
  </form>

) :
(
  <h3>This User Info Cannot Be Found</h3>
)

return (
  <React.Fragment>
    {content}
  </React.Fragment>
);
  
}    
}

UserSettingsTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(UserSettingsTextField);

const mapStateToProps = state => ({
  currentUser: state.usersReducer.currentUser,
  gotCurrentUser: state.usersReducer.gotCurrentUser,
  user: state.loginReducer.user,
  loggedIn: state.loginReducer.loggedIn

  });


const styledComponent = withStyles(styles)(UserSettingsTextField);

export default connect(
  mapStateToProps,
  { getUser, getLogin }
)(styledComponent);