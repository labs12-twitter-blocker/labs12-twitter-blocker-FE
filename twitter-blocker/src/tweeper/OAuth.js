import React from 'react';
import { Link } from "react-router-dom";
require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL;

class OAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authenticated } = this.props;
    return (
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <li onClick={this._handleLogoutClick}>Logout</li>
        ) : (
            <li onClick={this._handleSignInClick}>Login</li>
          )}
      </ul>
    );
  }
  // <div>
  //   <h2>Welcome To Twit-scovery!(*W.I.P.*)</h2>
  //   <h4>To start using the app, login through Twitter down below</h4>
  //   {/* <a href={`${url}/auth/twitter/redirect`}> */}
  //   <button onClick="" className="login-button">LOGIN</button>
  //   {/* </a> */}
  // </div >


  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open(" http://localhost:5000/auth/twitter/callback");
  };

  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:5000/auth/logout");
    this.props.handleNotAuthenticated();
  };
}



export default OAuth;