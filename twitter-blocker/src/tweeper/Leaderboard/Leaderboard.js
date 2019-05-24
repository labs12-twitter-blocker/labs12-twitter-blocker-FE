import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {  withRouter } from "react-router-dom";
// import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
// import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
// import Header from '../../components/tweeper/Header';
// import TweetFloat from '../../components/tweeper/TweetFloat.js'
// import HeaderTest from '../../tests/HeaderTest.js'
import theme from '../../theme/tweeper/theme';
import withTheme from '../withTheme';
import LeaderboardTab from '../../components/tweeper/LeaderboardTab.js'
import BackButton from '../../components/tweeper/BackButton'
// import atoms from '../../components/atoms';
// import molecules from '../../components/molecules';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// const { Avatar, Icon, Typography, Button } = atoms;
// const { Tabs, Tab } = molecules;

const Content = styled('div')({
  maxWidth: 1000,
//   padding: theme.spacing.unit * 4,
  padding: theme.spacing.unit,
  margin: 'auto',
});

const Feed = styled('div')({
  backgroundColor: '#fff',
});

// const Cover = styled('div')({
//   height: 200,
//   backgroundColor: '#ccd6dd',
// });

function Profile() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <HeaderTest /> */}
      <BackButton />
      <Content>
            <Feed>
              <LeaderboardTab variant="fullWidth"/>
              <Divider />
            </Feed>
        {/* <TweetFloat /> */}
      </Content>
    </React.Fragment>
  );
}

const styledComponent = withTheme(theme)(Profile);
export default withRouter(styledComponent);

// export default withTheme(theme)(Profile);