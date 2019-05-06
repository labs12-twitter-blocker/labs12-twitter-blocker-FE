import React from 'react';

require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL;

const OAuth = props => {
  return (
    <div>
      <h2>Welcome To Twit-scovery!(*W.I.P.*)</h2>
      <h4>To start using the app, login through Twitter down below</h4>
      <a href={`${url}/auth/twitter/login`}>
        <button className="login-button">LOGIN</button>
      </a>
    </div>
  );
};

export default OAuth;