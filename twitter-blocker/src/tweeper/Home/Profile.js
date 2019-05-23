import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
// import { withStyles } from '@material-ui/core/styles';
// import Header from '../../components/tweeper/Header';
// import TweetFloat from '../../components/tweeper/TweetFloat.js'
// import HeaderTest from '../../tests/HeaderTest.js'
import theme from '../../theme/tweeper/theme';
import withTheme from '../withTheme';
import ListTab from '../../components/tweeper/ListTab.js'
import atoms from '../../components/atoms';
// import molecules from '../../components/molecules';
import { getUser, getLogin } from '../../actions/index.js';
// import TwitterLogin from 'react-twitter-auth';
import Landing from './Landing';
import jwt from 'jsonwebtoken';
import BackButton from '../../components/tweeper/BackButton.js'
import CircularProgress from '@material-ui/core/CircularProgress';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import axios from "axios";
require('dotenv').config();

// const url = process.env.REACT_APP_BACKEND_BASE_URL


const { Avatar, Typography } = atoms;
// const { Tabs, Tab } = molecules;

const Content = styled('div')({
  maxWidth: 1000,
  padding: theme.spacing.unit * 4,
  margin: 'auto',
});

const Feed = styled('div')({
  backgroundColor: '#fff',
});

const Cover = styled('div')({
  height: 200,
  backgroundSize: "cover",
  backgroundColor: "#1da1f2",
});

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      // loggedIn: false,
      user: null,
      token: '',
      twitter_user_id: null,
      loggedInRan: false,
      profilePic: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.props.getUser(decoded.id)
      this.setState({ twitter_user_id: decoded.id })
      this.setState({ displayName: decoded.displayName })
      this.setState({ profilePic: decoded.profile_img })
      this.setState({ username: decoded.username })
      this.setState({ banner_img: decoded.banner_img })
      console.log(decoded)
    }
  }

  componentDidUpdate(prevProps) {
    console.log("CDUpdate");
    console.log("this.props.loggedIn", this.props.loggedIn);
    console.log("this.props.currentUser", this.props.currentUser);
    console.log("this.props.gotCurrentUser", this.props.gotCurrentUser);

    console.log("this.props.user", this.props.user);
    if (
      this.props.loggedIn === true &&
      this.state.loggedInRan === false &&
      localStorage.getItem("token")
    ) {
      this.setState({ loggedInRan: true })
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.props.getUser(this.props.user.id)
      this.setState({ twitter_user_id: decoded.id })
      this.setState({ displayName: decoded.displayName })
      this.setState({ profilePic: decoded.profile_img })
      this.setState({ username: decoded.username })
      this.setState({ banner_img: decoded.banner_img })
    }
    // console.log("twitter_user_id", this.state.twitter_user_id);
  }

  onFailed = (error) => {
    alert(error);
  };

  render() {
    const background = {
      backgroundImage: `url(${this.state.banner_img})`,
      backgroundSize: 'cover',
      overflow: 'hidden',
    };

    let content = ((this.props.loggedIn === true || this.state.twitter_user_id !== null) && this.props.gotCurrentUser === true) ?
      (
        <React.Fragment>
          <CssBaseline />
          <Content>
            <Feed>
              <Cover style={{ ...background }} />
              <Box p={2} mb={1}>
                <Box
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    textAlign: 'right',
                  }}
                >
                  <Avatar
                    style={{ marginTop: '-18%', marginBottom: 14 }}
                    ultraLarge
                    bordered
                    src={this.state.profilePic}
                  />
                  {/* <Button large color="primary" variant="outlined">
                      Edit Profile
                    </Button> */}
                </Box>
                {/* <Typography primary>{this.props.user.displayName}</Typography> */}
                <Typography primary>{this.state.displayName}</Typography>
                {/* <Typography primary>{this.props.user.displayName}</Typography> */}

                <Typography light gutterBottom>
                  {console.log("----------------------PROFILE PIC-----------", this.state.profilePic)}
                  {console.log("++++this.props.loggedIn", this.props.loggedIn)}
                  {console.log("++++this.state.twitter_user_id", this.state.twitter_user_id)}
                  {console.log("++++this.props.currentUser", this.props.currentUser)}
                  {console.log("++++this.props.user", this.props.user)}
                  {/* {this.props.currentUser.users.screen_name} */}
                  {this.state.username}
                  {/* {this.props.user.username} */}
                </Typography>
              </Box>
              <ListTab variant="fullWidth" />
              <Divider />
            </Feed>
            <BackButton />
          </Content>
        </React.Fragment >
      )
      : (localStorage.getItem("token")) ? // If there is a token then display CircularProgress until everythign catches up
        (<Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <CircularProgress color="primary" />
          </Grid>
        </Grid>)
        : (<Landing />); // No token, not logged in, display landing

    return (
      <React.Fragment>
        {content}
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


const styledComponent = withTheme(theme)(Profile);
const routedComponent = withRouter(styledComponent)

export default connect(
  mapStateToProps,
  { getUser, getLogin }
)(routedComponent);