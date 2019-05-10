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
    console.log("CDM");
    console.log("this.state.loggedIn", this.state.loggedIn);
    console.log("this.state.user", this.state.user);
  }
  // componentDidUpdate() {

  //   console.log("this.state.loggedIn", this.state.loggedIn);
  //   console.log("this.state.user", this.state.user);
  //     this.props.getUser(this.state.user.id)
  // }
  componentDidUpdate(prevProps) {
    console.log("CDUpdate");
    console.log("this.state.loggedIn", this.state.loggedIn);
    console.log("this.state.user", this.state.user);
    console.log("this.props.user", this.props.user);
    if (this.props.user.id !== prevProps.user.id) {
      this.props.getUser(this.props.user.id)
    }
  }

  // onSuccess = (response) => {
  //   const token = response.headers.get('x-auth-token');
  //   console.log(token)
  //   response.json().then(user => {
  //     if (token) {
  //       this.setState({isAuthenticated: true, user: user, token: token});
  //     }
  //   });
  // };

  onFailed = (error) => {
    alert(error);
  };

  // render(){
  // return (
  //   <div>
  //     <h2>Welcome To Twit-scovery!(*W.I.P.*)</h2>
  //     <h4>To start using the app, login through Twitter down below</h4>
  //     <a href={`${url}/auth/twitter/login`}>
  //       <button className="login-button" >LOGIN</button>
  //     </a>
  //     <TwitterLogin loginUrl="http://localhost:5000/auth/twitter/"
  //                   onSuccess={this.onSuccess}
  //                   onFailure={this.onFailed} 
  //                   requestTokenUrl="http://localhost:5000/auth/twitter/reverse"
  //                   />
  //   </div>
  // )}
  render() {
    let content = !!this.props.loggedIn ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            "id"{this.props.user.id} <br />
            {/* twitter_id{this.state.user.twitter_id}<br/> */}
            username{this.props.user.username}<br />
            {/* created_at{this.state.user.created_at}<br/>
            updated_at{this.state.user.updated_at}<br/>
            is_paying{this.state.user.is_paying}<br/>
            token{this.state.user.token}<br/>
            token_secret{this.state.user.token_secret}<br/>
            upvotes{this.state.user.upvotes}<br/>
            downvotes{this.state.user.downvotes}<br/>
            email{this.state.user.email}<br/>
            admin{this.state.user.admin}<br/>
            deactivated{this.state.user.deactivated}<br/> */}
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