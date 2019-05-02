import React from 'react';

require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL;

const OAuth = props => {
  return (
    <div>
      <a href={`${url}/auth/twitter/login`}>
        <button className="login-button">LOGIN</button>
      </a>
      <h2>Sign In Through Twitter</h2>
    </div>
  );
};

export default OAuth;