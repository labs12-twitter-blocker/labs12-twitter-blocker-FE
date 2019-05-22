import React from 'react';
import { connect } from "react-redux";
import './App.css';
import Profile from '../src/tweeper/Home/Profile';
import PublicProfile from '../src/tweeper/PublicProfile/PublicProfile'
// import OAuth from '../src/tweeper/OAuth';
// import ListCreate from '../src/tweeper/ListCreate/ListCreate';
import CreateList from '../src/tweeper/CreateList';
import ListDetails from '../src/tweeper/ListDetails';
import Leaderboard from './tweeper/Leaderboard/Leaderboard';
// import AccordingWhom from './components/tweeper/AccordingWhom';
import Settings from './tweeper/Settings/Settings.js';
import ListExplorer from './tweeper/ListExplorer/ListExplorer';
import HeaderTest from './tests/HeaderTest';
import theme from './theme/tweeper/theme';
import withTheme from './tweeper/withTheme';
import ListStepper from './tweeper/ListCreate/ListStepper'

import { Route, Redirect } from 'react-router-dom';
import { getUser, getLogin } from './actions/index.js';
// import jwt from 'jsonwebtoken';
// require('dotenv').config();


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (localStorage.getItem("token"))
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

function App() {
  return (
    <div className="App">
      <HeaderTest />
      <Route exact path="/" component={Profile} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute path="/profile/:user_id" component={PublicProfile} />
      <PrivateRoute path="/create" component={ListStepper} />
      <PrivateRoute path="/details/:twitter_list_id" component={ListDetails} />
      <PrivateRoute path="/leaderboard" component={Leaderboard} />
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/explorer" component={ListExplorer} />
      {/* <Route path="/stepper" component={ListStepper} /> */}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loginReducer.loggedIn
});


const styledComponent = withTheme(theme)(App);

export default connect(
  mapStateToProps,
  { getLogin }
)(styledComponent);