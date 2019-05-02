import React from 'react';
import './App.css';
import Profile from '../src/tweeper/Profile';
import HelloWorld from '../src/tweeper/HelloWorld';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL;

function App() {
  return (
    <Router>
      <div className="App">
        <a href={`${url}/auth/twitter/login`}>
          <button className="login-button">LOGIN</button>
        </a>
        Sign In Through Twitter
      <Route path="/test" exact component={Profile} />
        <Route path="/hello" component={HelloWorld} />
      </div>
    </Router>
  );
}

export default App;