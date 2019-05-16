import React, { Component } from 'react';
import { connect } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
// import { withStyles } from '@material-ui/core/styles';
// import Header from '../../components/tweeper/Header';
// import TweetFloat from '../../components/tweeper/TweetFloat.js'
import HeaderTest from '../../tests/HeaderTest.js'
import theme from '../../theme/tweeper/theme';
import withTheme from '../withTheme';
import ListTab from '../../components/tweeper/ListTab.js'
import atoms from '../../components/atoms';
// import molecules from '../../components/molecules';
import { getUser, getLogin } from '../../actions/index.js';
import TwitterLogin from 'react-twitter-auth';
import Landing from './Landing';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import axios from "axios";
require('dotenv').config();

const url = process.env.REACT_APP_BACKEND_BASE_URL


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
  backgroundColor: '#ccd6dd',
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
    if (localStorage.getItem("twitter_user_id")) {
      this.props.getUser(localStorage.getItem("twitter_user_id"))
      this.setState({ twitter_user_id: localStorage.getItem("twitter_user_id") })
    }
    localStorage.getItem("twitter_user_id")
    // console.log("++++++++++++++this.props.currentUser", this.props.currentUser)
    
  }

  componentDidUpdate(prevProps) {
    console.log("CDUpdate");
    console.log("this.props.loggedIn", this.props.loggedIn);
    console.log("this.props.currentUser", this.props.currentUser);
    console.log("this.props.gotCurrentUser", this.props.gotCurrentUser);

    console.log("this.props.user", this.props.user);
    if (
      this.props.loggedIn === true &&
      this.state.loggedInRan === false
    ) {
      this.setState({ loggedInRan: true })
      this.setState({ twitter_user_id: localStorage.getItem("twitter_user_id") })
      this.props.getUser(this.props.user.id)
      this.setState({profilePic: localStorage.getItem("profile_img")})
    }
    // console.log("twitter_user_id", this.state.twitter_user_id);
  }

  onFailed = (error) => {
    alert(error);
  };

  render() {
    let content = ((this.props.loggedIn === true || this.state.twitter_user_id !== null) && this.props.gotCurrentUser === true) ?
      (
        <React.Fragment>
        <CssBaseline />
        <HeaderTest />
        <Content>
              <Feed>
                <Cover />
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
                      src={localStorage.getItem("profile_img")}
                    />
                    {/* <Button large color="primary" variant="outlined">
                      Edit Profile
                    </Button> */}
                </Box>
                {/* <Typography primary>Austen Allred</Typography> */}
                <Typography light gutterBottom>
                  {console.log("----------------------PROFILE PIC-----------", this.state.profilePic)}
                  {console.log("++++this.props.loggedIn", this.props.loggedIn)}
                  {console.log("++++this.state.twitter_user_id", this.state.twitter_user_id)}
                  {console.log("++++this.props.currentUser", this.props.currentUser)}
                  {console.log("++++this.props.user", this.props.user)}
                  {this.props.currentUser.users.screen_name}
                </Typography>
                {/* <Typography light gutterBottom>
                  {this.props.user.displayName}
                </Typography> */}
                {/* <Typography bold inline>
                      10.8K
                  </Typography>
                  <Typography light inline indented>
                    Following
                  </Typography>
                  <Typography bold inline indentedLarge>
                    100K
                  </Typography>
                  <Typography light inline indented>
                    Followers
                  </Typography> */}
                </Box>
                <ListTab variant="fullWidth"/>
                <Divider />
              </Feed>
          {/* <TweetFloat /> */}
        </Content>
      </React.Fragment>
      ) :
      (
        <Landing />
      );

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

export default connect(
  mapStateToProps,
  { getUser, getLogin }
)(styledComponent);