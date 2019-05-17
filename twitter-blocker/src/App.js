import React from 'react';
import './App.css';
import Profile from '../src/tweeper/Home/Profile';
import PublicProfile from '../src/tweeper/PublicProfile/PublicProfile'
// import OAuth from '../src/tweeper/OAuth';
import ListCreate from '../src/tweeper/ListCreate/ListCreate';
import CreateList from '../src/tweeper/CreateList';
import ListDetails from '../src/tweeper/ListDetails';
import Leaderboard from './tweeper/Leaderboard/Leaderboard';
// import AccordingWhom from './components/tweeper/AccordingWhom';
import Settings from './tweeper/Settings/Settings.js';
import ListExplorer from './tweeper/ListExplorer/ListExplorer';

import { Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Route exact path="/" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile/:user_id" component={PublicProfile} />
        <Route path="/create" component={ListCreate} />
        <Route path="/details/:twitter_list_id" component={ListDetails} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/settings" component={Settings} />
        <Route path="/explorer" component={ListExplorer} />
      </div>
  );
}

export default App;