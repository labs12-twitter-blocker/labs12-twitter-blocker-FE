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
import { getUser } from '../../actions/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
require('dotenv').config();
const url = process.env.REACT_APP_BACKEND_BASE_URL

const { Avatar, Icon, Typography, Button } = atoms;
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

  componentDidMount() {
    // this.props.getLogin()
    console.log("this.props.user", this.props.user)
    console.log("this.props.loggedIn", this.props.loggedIn)
    this.props.getUser(localStorage.getItem("twitter_user_id"))
    const token = localStorage.getItem("token")
    axios.get(`${url}/auth/me`, {
      headers: {
          "x-auth-token": token
      }
    })
    .then(res => {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~res", res.data);
    })

  }

  // componentDidUpdate(prevProps) {
  //   console.log("CDUpdate");
  //   console.log("this.state.loggedIn", this.state.loggedIn);
  //   console.log("this.state.user", this.state.user);
  //   console.log("this.props.user", this.props.user);
  //   if (this.props.user.id !== prevProps.user.id) {
  //     this.props.getUser(this.props.user.id)
  //   }
  // }


  render() {

    if (this.props.currentUser === null || this.props.currentUser.length === 0) {
      return (<h3>Loading</h3>)
    } else {
      return (
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
                      {/* <Avatar
                        style={{ marginTop: '-18%', marginBottom: 14 }}
                        ultraLarge
                        bordered
                        src={
                          './assets/austen.png'
                        }
                      /> */}
                      {/* <Button large color="primary" variant="outlined">
                        Edit Profile
                      </Button> */}
                    </Box>
                    {/* <Typography primary>Austen Allred</Typography> */}
                    <Typography light gutterBottom>
                      {this.props.currentUser.users.screen_name}
                      {console.log("++++this.props.currentUser", this.props.currentUser)}
                    </Typography>
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
            <TweetFloat />
          </Content>
        </React.Fragment>
      );
    }
    }

  
}


// export default withTheme(theme)(Profile);

const mapStateToProps = state => ({
  currentUser: state.usersReducer.currentUser,
  user: state.loginReducer.user,
  loggedIn: state.loginReducer.loggedIn

  });
  

const styledComponent = withTheme(theme)(Profile);

export default connect(
  mapStateToProps,
  { getUser }
)(styledComponent);