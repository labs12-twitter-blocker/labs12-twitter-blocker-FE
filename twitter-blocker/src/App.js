import React from 'react';
import './App.css';
import Profile from '../src/tweeper/Home/Profile';
import HelloWorld from '../src/tweeper/HelloWorld';
import OAuth from '../src/tweeper/OAuth';
import ListCreate from '../src/tweeper/ListCreate/ListCreate';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={OAuth} />
        <Route path="/test" component={Profile} />
        <Route path="/hello" component={HelloWorld} />
        <Route path="/create" component={ListCreate} />
      </div>
    </Router>
  );
}

export default App;