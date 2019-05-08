import React from 'react';
import './App.css';
import Profile from '../src/tweeper/Home/Profile';
import PublicProfile from '../src/tweeper/PublicProfile/PublicProfile'
import HelloWorld from '../src/tweeper/HelloWorld';
import OAuth from '../src/tweeper/OAuth';
import ListCreate from '../src/tweeper/ListCreate/ListCreate';
import CreateList from '../src/tweeper/CreateList';
import ListDetails from '../src/tweeper/ListDetails';
import Leaderboard from './tweeper/Leaderboard/Leaderboard';
import AccordingWhom from './components/tweeper/AccordingWhom';
import Settings from './tweeper/Settings/Settings.js'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={OAuth} />
        <Route path="/test" component={Profile} />
        <Route path="/hello" component={HelloWorld} />
        <Route path="/profile/:user_id" component={PublicProfile} />
        <Route path="/create" component={ListCreate} />
        {/* <Route path="/details" component={ListDetails} /> */}
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>
  );
}

export default App;