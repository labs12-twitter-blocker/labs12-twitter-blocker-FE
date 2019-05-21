import React, { Component } from 'react';
import { connect } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/tweeper/Header';
import TweetFloat from '../../components/tweeper/TweetFloat.js'
import HeaderTest from '../../tests/HeaderTest.js'
import theme from '../../theme/tweeper/theme';
import withTheme from '../withTheme';
import ListTab from '../../components/tweeper/ListTab.js'
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';
import { getUser, getLogin } from '../../actions/index.js';
import TwitterLogin from 'react-twitter-auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import jwt from 'jsonwebtoken';
require('dotenv').config();

const url = process.env.REACT_APP_BACKEND_BASE_URL


const { Avatar, Icon, Typography, Button } = atoms;
// const { Tabs, Tab } = molecules;


const Content = styled('div')({
  maxWidth: 1000,
  padding: theme.spacing.unit * 4,
  margin: 'auto',
  height: '100%',
});


const Cover = styled('div')({
  height: 200,
  backgroundColor: '#ccd6dd',
});

const Wall = styled('div')({
  backgroundImage: `url('/images/mobile_on_wood.jpg')`,
  backgroundSize: 'cover',
  height: '100vh',
  width: '100vw',
  position: "fixed",
  zIndex:"-5",
  [theme.breakpoints.down('xs')]: {
    backgroundImage: `url('/images/mobile_on_wood_mobile.jpg')`,
    height: "100vh",
    width: "100vw",
  },
});

const Slogan = styled('div')({
  margin: "40px",
  [theme.breakpoints.down('sm')]: {
    padding: "40px",
  },
})


const Logo = styled('div')({
  margin: '20px'
})

const LoginContainer = styled('div')({
  marginTop:"10rem",
  [theme.breakpoints.down('sm')]: {
    marginTop: "0",
  },
})





class Landing extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: null,
      token: '',
      twitter_user_id: null
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
      this.props.getUser(decoded.id)
    }
  }

    componentDidUpdate(prevProps) {
      console.log("CDUpdate");
      console.log("this.state.loggedIn", this.state.loggedIn);
      console.log("this.props.currentUser", this.props.currentUser);
      console.log("this.props.user", this.props.user);
      if (this.props.user.id !== prevProps.user.id) {
        this.props.getUser(this.props.user.id)
      }
      console.log("twitter_user_id", this.state.twitter_user_id);
    }

  onFailed = (error) => {
    alert(error);
  };

  render() {
    return (
        <React.Fragment>
        <Wall/>
          <Grid container direction="column" justify="center" spacing={40}>
          <Grid item >
            <Grid container justify="space-between" >
              <Logo>
                <Grid item sm > 
                  <Grid container  alignItems="center">
                    <Grid item>
                      <img src="/images/feather-logo.png" style={{width:"80px"}} />
                    </Grid>
                    <Grid item  >
                      <Typography variant="headline" color="primary">AppName</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Logo>
             
             <Grid item xl={3} >
              <Slogan>
                <Typography style={{fontSize: "4.1rem", color: "#FFFFFF"}}>Your <span style={{color:'#1da1f2'}}>Twitter</span>.</Typography>
                <Typography style={{fontSize: "8rem", color: "#FFFFFF", lineHeight: "0.5",}}>Better.</Typography>
              </Slogan>
            </Grid>
          </Grid>
          </Grid>
          <Grid item style={{marginTop:"8rem"}}>
          <Grid container justify="space-between" alignItems="center" xs={{direction:"column-reverse"}}>
              <Grid item xs={12} md={6} >
                <Grid container direction="column" justify="space-between" alignItems="center" >
                  <Grid item style={{margin:"120px"}}>
                  <TwitterLogin loginUrl={`${url}/auth/twitter/`}
                      onFailure={this.onFailed} onSuccess={this.props.getLogin}
                      requestTokenUrl={`${url}/auth/twitter/reverse`}
                      />
                  </Grid>
                  
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                  <Grid container direction="column" justify="space-between"  alignItems="flex-end" spacing={40}>
                    <Grid item style={{marginRight:"5%"}}><Typography  variant="title" style={{color:"#FFFFFF"}}>Generate lists that are meaningful for you</Typography></Grid>
                    <Grid item style={{marginRight:"5%"}}><Typography variant="title" style={{color:"#FFFFFF"}}>Block toxic members and keep your timeline clean</Typography></Grid>
                    <Grid item style={{marginRight:"5%"}}><Typography variant="title" style={{color:"#FFFFFF"}}>Add your newly created list to Twitter</Typography></Grid>
                    <Grid item style={{marginRight:"5%"}}><Typography variant="title" style={{color:"#FFFFFF"}}>Create and Send Tweets with a cancellation option</Typography></Grid>
                  </Grid>
              </Grid>
              
            </Grid>
            <Grid item style={{marginTop:"7rem"}}>
                    <Typography variant="caption" style={{color:'#FFFFFF', marginTop:"30px"}}>TWITTER, TWEET, RETWEET and the Twitter logo are trademarks of Twitter, Inc. or its affiliates.</Typography>
                  
              </Grid>
            </Grid>
          </Grid>
 
      </React.Fragment>
    );
}
}


// export default withTheme(theme)(Profile);

const mapStateToProps = state => ({
  currentUser: state.usersReducer.currentUser,
  gotCurrentUser: state.usersReducer.gotCurrentUser,
  user: state.loginReducer.user,
  loggedIn: state.loginReducer.loggedIn

  });


const styledComponent = withTheme(theme)(Landing);

export default connect(
  mapStateToProps,
  { getUser, getLogin }
)(styledComponent);