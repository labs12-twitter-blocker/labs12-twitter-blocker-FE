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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { List, ListItem, Tabs, Tab } from '@material-ui/core';
import { connect } from 'react-redux';
import { getList, getUser, getListTimeline } from '../actions';
import { Link } from 'react-router-dom';

library.add(faTimes)

const { Avatar, Icon, Typography, Button } = atoms;
// const { Tabs, Tab } = molecules;

const TabContainer = styled('div') ({
  padding: theme.spacing.unit * 4,
  margin: 'auto'
})

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


class ListDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      timeline: [],
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount(){
    this.props.getList(this.props.match.params.id);
    this.setState({note: this.props.list});
    this.props.getListTimeline(this.props.match.params.id);
    this.setState({timeline: this.props.timeline})
  
}
  
render() {
  const { value } = this.state;
  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderTest />
      <Content>
            <Feed>
              <Tabs onChange={this.handleChange}>
                <Tab label='Members'/>
                <Tab label="Timeline"/>
                </Tabs>
                {value === 0 &&
              <TabContainer>
              <List>
                {this.props.list.map(i => {
                  return (
                  <ListItem>
                    <Avatar src={i.profile_img}/>
                    <Link to={`/test/${this.props.twitter_id}`}><Typography>{i.name}</Typography></Link>
                    <Typography>{i.screen_name}</Typography>
                    <Typography>{i.description}</Typography>
                    <FontAwesomeIcon icon="times" />
                  </ListItem>)
                })}
              </List>
              </TabContainer>
              }
              {value === 1 &&
              <TabContainer>
                <List>
                  {this.props.timeline.map(i => {
                    return (
                      <div>
                        <Typography>{i.user.name}</Typography>
                      <Typography>{i.entities.text}</Typography>
                      <Typography>{i.entities.hashtags.text}</Typography>
                      </div>
                    )
                  })}
                  </List>
                </TabContainer>
              }
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
    list: state.listsReducer.list,
    timeline: state.listsReducer.listTimeline
  }
}

const mapActionsToProps = {
  getList: getList,
  getListTimeline, getListTimeline,
  getUser: getUser,
  // deleteListItem: deleteListItem
}

export default connect( mapStateToProps, mapActionsToProps)(withTheme(theme)(ListDetails));