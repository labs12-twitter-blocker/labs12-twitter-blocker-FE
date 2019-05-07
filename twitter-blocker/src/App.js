import React from 'react';
import './App.css';
import Profile from '../src/tweeper/Home/Profile';
import PublicProfile from '../src/tweeper/PublicProfile/PublicProfile'
import HelloWorld from '../src/tweeper/HelloWorld';
import OAuth from '../src/tweeper/OAuth';
import Leaderboard from './tweeper/Leaderboard/Leaderboard';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={OAuth} />
        <Route path="/test" component={Profile} />
        <Route path="/hello" component={HelloWorld} />
        <Route path="/profile/:user_id" component={PublicProfile} />
        <Route path="/leaderboard" component={Leaderboard} />
      </div>
    </Router>
  );
}

export default App;