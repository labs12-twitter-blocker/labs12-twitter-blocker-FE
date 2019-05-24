import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import LeaderboardAllTable from './LeaderboardAllTable'
import LeaderboardFollowTable from './LeaderboardFollowTable'
import LeaderboardBlockTable from './LeaderboardBlockTable'
import styled from '@material-ui/styles/styled';
import theme from '../../theme/tweeper/theme';

const TabContainer = styled('div')({
  // padding: theme.spacing.unit * 4,
  padding: theme.spacing.unit,

  margin: 'auto',
  [theme.breakpoints.down("sm")]: {
    // width: '100%',
    padding: theme.spacing.unit,
  }
})

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 850,
    // padding: theme.spacing.unit * 4,
    // padding: theme.spacing.unit,
    margin: 'auto',
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Top Lists" />
            <Tab label="Top Follow Lists" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><LeaderboardAllTable /></TabContainer>
          <TabContainer dir={theme.direction}><LeaderboardFollowTable /></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);