import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
// import { unstable_Box as Box } from '@material-ui/core/Box';
import { Tabs, Tab } from '@material-ui/core';
import styled from '@material-ui/styles/styled';
// import Header from '../../components/tweeper/Header';
// import TweetFloat from '../../components/tweeper/TweetFloat.js'
// import HeaderTest from '../../tests/HeaderTest.js'
import theme from '../../theme/tweeper/theme';
import withTheme from '../withTheme';
import ListExplorerTable from '../../components/tweeper/ListExplorerTable.js'
import LeaderboardTab from '../../components/tweeper/LeaderboardTab.js'
import { getPublicLists, subscribeToList } from '../../actions'
// import atoms from '../../components/atoms';
// import molecules from '../../components/molecules';
import { connect } from 'react-redux';
import {  withRouter } from "react-router-dom";
import BackButton from '../../components/tweeper/BackButton'

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

const TabContainer = styled('div') ({
  padding: theme.spacing.unit * 4,
  margin: 'auto',
  [theme.breakpoints.down("sm")]: {
    // width: '100%',
    padding: theme.spacing.unit,
  }
})

// const Cover = styled('div')({
//   height: 200,
//   backgroundColor: '#ccd6dd',
// });

class ListExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0
        }
    }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    updateState = () => {
      this.setState({value: 0})
    }

    componentDidMount() {
        this.props.getPublicLists();
    }

    componentDidUpdate(prevProps) {
      if (this.props.allLists.length !== prevProps.allLists.length) {
        this.updateState();
      }
    }

    render() {
      const { value } = this.state;
      console.log(this.state)
  return (
    <React.Fragment>
      <CssBaseline />
      <BackButton />
      <Content>
            <Feed>
            <Tabs 
              value={this.state.value}
              onChange={this.handleChange} 
              variant='fullWidth'>
                <Tab label='List Explorer' value={0}/>
                <Tab label='Leaderboard' value={1} />
              </Tabs>
              {value === 0 &&
              <TabContainer>
                <ListExplorerTable variant="fullWidth" />
              </TabContainer>
              }
              {value === 1 &&
              <TabContainer>
                <LeaderboardTab variant="fullWidth"/>
              </TabContainer>
              }
              <Divider />
            </Feed>
      </Content>
    </React.Fragment>
  );
  }
}


const mapStateToProps = state => {
  return {
    lists: state.listsReducer.lists,
    user: state.usersReducer.currentUser,
    list: state.listsReducer.list,
    allLists: state.listsReducer.publicLists
  }
}

const mapActionsToProps = {
  getPublicLists, subscribeToList
}

const styledComponent = withTheme(theme)(ListExplorer);
const routedComponent = withRouter(styledComponent);

export default connect( 
  mapStateToProps, mapActionsToProps)(routedComponent);
