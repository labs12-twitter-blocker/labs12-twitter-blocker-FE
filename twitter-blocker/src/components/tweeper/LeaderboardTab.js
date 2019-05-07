import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import ListView from './ListViews';
// import PublicListView from './PublicListView';
// import PrivateListView from './PrivateListView';
// import BlockListView from './BlockListView';
import LeaderboardAllTable from './LeaderboardAllTable'
import LeaderboardFollowTable from './LeaderboardFollowTable'
import LeaderboardBlockTable from './LeaderboardBlockTable'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} 
    // style={{ padding: 8 * 3 }}>
    style={{ padding: 1}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 850,
    // padding: theme.spacing.unit * 4,
    padding: theme.spacing.unit,
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
            <Tab label="Top Block Lists" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><LeaderboardAllTable  /></TabContainer>
          <TabContainer dir={theme.direction}><LeaderboardFollowTable  /></TabContainer>
          <TabContainer dir={theme.direction}><LeaderboardBlockTable /></TabContainer>
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