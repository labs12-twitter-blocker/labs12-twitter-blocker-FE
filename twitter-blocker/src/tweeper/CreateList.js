import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
import Header from '../components/tweeper/Header';
import TweetFloat from '../components/tweeper/TweetFloat.js'
import HeaderTest from '../tests/HeaderTest.js'
import theme from '../theme/tweeper/theme';
import withTheme from './withTheme';
import ListTab from '../components/tweeper/ListTab.js'
import atoms from '../components/atoms';
import molecules from '../components/molecules';
import BackButton from '../components/tweeper/BackButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

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


function CreateList() {
  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderTest />
      <Content>
            <Feed>
              
              <Divider />
            </Feed>
        <TweetFloat />
      </Content>
    </React.Fragment>
  );
}

export default withTheme(theme)(CreateList);