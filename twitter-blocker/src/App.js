import React from 'react';
import logo from './logo.svg';
import './App.css';
require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href={`${url}/auth/twitter/login`}>LOGIN</a>
        Sign In Through Twitter
      </header>
    </div>
  );
}

export default App;
