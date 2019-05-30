import React, { Component } from 'react';
import { connect } from "react-redux";
import TwitterLogin from 'react-twitter-auth';
import { getUser, getLogin } from '../actions/index.js';

require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL;

class OAuth extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: null,
      token: ''
    };
  }

  componentDidMount() {
    // console.log("CDM");
    // console.log("this.state.loggedIn", this.state.loggedIn);
    // console.log("this.state.user", this.state.user);
  }

  componentDidUpdate(prevProps) {
    // console.log("CDUpdate");
    // console.log("this.state.loggedIn", this.state.loggedIn);
    // console.log("this.state.user", this.state.user);
    // console.log("this.props.user", this.props.user);
    if (this.props.user.id !== prevProps.user.id) {
      this.props.getUser(this.props.user.id)
    }
  }


  onFailed = (error) => {
    alert(error);
  };

  render() {
    let content = !!this.props.loggedIn ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            "id"{this.props.user.id} <br />
            username: {this.props.user.username}<br />
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl={`${url}/auth/twitter/`}
          onFailure={this.onFailed} onSuccess={this.props.getLogin}
          requestTokenUrl={`${url}/auth/twitter/reverse`} />
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
};


const mapStateToProps = state => ({
  // currentUser: state.usersReducer.currentUser,
  user: state.loginReducer.user,
  loggedIn: state.loginReducer.loggedIn

});

export default connect(
  mapStateToProps,
  { getUser, getLogin }
)(OAuth);