import React from 'react';
import './App.css';
import Profile from '../src/tweeper/Home/Profile';
import HelloWorld from '../src/tweeper/HelloWorld';
import { Route } from 'react-router-dom';
require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL;

function App() {
  return (
    <div className="App">
      <a href={`${url}/auth/twitter/login`}>
        <button className="login-button">LOGIN</button>
      </a>
      Sign In Through Twitter
      <Route path="/test" exact component={Profile} />
      <Route path="/hello" component={HelloWorld} />
    </div>
  );
}

export default App;
