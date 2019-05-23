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
import BlockTimeline from './components/tweeper/BlockTimeline'
import { Route, Redirect } from 'react-router-dom';
import { getUser, getLogin } from './actions/index.js';

const AuthService = {
  isLoggedIn: false,
  authenticate(cb) {
    this.isLoggedIn = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isLoggedIn = false
    setTimeout(cb, 100)
  }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isLoggedIn === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);


function App() {
  return (
    <div className="App">
      <HeaderTest />
      <Route exact path="/" component={Profile} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute path="/profile/:user_id" component={PublicProfile} />
      <ProtectedRoute path="/create" component={ListStepper} />
      <ProtectedRoute path="/details/:twitter_list_id" component={ListDetails} />
      <ProtectedRoute path="/leaderboard" component={Leaderboard} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/explorer" component={ListExplorer} />
      <Route path="/cleantimeline" component={BlockTimeline} />

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