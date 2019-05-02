import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
import Header from '../components/tweeper/Header';
import Tweet from '../components/tweeper/Tweet';
import TrackWho from '../components/tweeper/TrackWho';
import PopularNow from '../components/tweeper/PopularNow';
import AccordingWhom from '../components/tweeper/AccordingWhom.js';
import TweetFloat from '../components/tweeper/TweetFloat.js'
import HeaderTest from '../tests/HeaderTest.js'
import theme from '../theme/tweeper/theme';
import withTheme from './withTheme';
import atoms from '../components/atoms';
import molecules from '../components/molecules';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const { Avatar, Icon, Typography, Button } = atoms;
const { Tabs, Tab } = molecules;

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

function Profile() {
  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderTest />
      <Content>
        <Grid container spacing={16}>
          <Grid item xs={12} md={8}>
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
                    src={
                      './assets/austen.png'
                    }
                  />
                  <Button large color="primary" variant="outlined">
                    Edit Profile
                  </Button>
                </Box>
                <Typography primary>Austen Allred</Typography>
                <Typography light gutterBottom>
                  @austen
                </Typography>
                <div>
                  <Icon text light>
                    <FontAwesomeIcon icon={faCalendarAlt} color='#38A1F3'/>
                  </Icon>
                  <Typography light inline indented gutterBottom>
                    Joined December 2010
                  </Typography>
                </div>
                <Typography bold inline>
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
                </Typography>
              </Box>
              <Tabs value={0} variant="fullWidth">
                <Tab label="Lists" />
                <Tab label="Public Lists" />
                <Tab label="Private Lists" />
                <Tab label="Block" />
              </Tabs>
              <Divider />
              <Tweet />
            </Feed>
            {/* <Box mt="10px">
              <AccordingWhom />
            </Box> */}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <Box mb="10px">
              <TrackWho />
            </Box> */}
            <PopularNow />
          </Grid>
        </Grid>
        <TweetFloat />
      </Content>
    </React.Fragment>
  );
}

export default withTheme(theme)(Profile);