import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
// import { unstable_Box as Box } from '@material-ui/core/Box';
import { List, ListItem } from '@material-ui/core';
import styled from '@material-ui/styles/styled';
import Header from '../../components/tweeper/Header';
import TweetFloat from '../../components/tweeper/TweetFloat.js'
import HeaderTest from '../../tests/HeaderTest.js'
import theme from '../../theme/tweeper/theme';
import withTheme from '../withTheme';
import ListExplorerTable from '../../components/tweeper/ListExplorerTable.js'
import { getLists, subscribeToList } from '../../actions'
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';
import { connect } from 'react-redux';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const { Avatar, Icon, Typography, Button } = atoms;
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

class ListExplorer extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getLists();
    }
    render() {
  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderTest />
      <Content>
            <Feed>
              <ListExplorerTable variant="fullWidth"/>
              {/* Search Box */}
              <Divider />
            </Feed>
        <TweetFloat />
      </Content>
    </React.Fragment>
  );
  }
}


const mapStateToProps = state => {
  return {
    lists: state.listsReducer.lists,
    user: state.usersReducer.currentUser,
    list: state.listsReducer.list
  }
}

const mapActionsToProps = {
  getLists: getLists,
  subscribeToList: subscribeToList
}

export default connect( mapStateToProps, mapActionsToProps)(withTheme(theme)(ListExplorer));