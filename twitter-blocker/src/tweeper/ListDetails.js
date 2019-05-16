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
import { List, 
      ListItem, 
      Tabs, Tab,
      Card, 
      CardActions,
      CardContent,
      } from '@material-ui/core';
import { connect } from 'react-redux';
import { getList, 
        getListMembers, 
        getUser, 
        getListTimeline, 
        updateListMembers,
        subscribeToList } from '../actions';
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

const TopLine = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const ProfileNameImg = styled('div') ({
  display: 'flex',
  width: '50%',
  alignItems: 'center',
})

const ProfileName = styled(Typography)({
  fontWeight: 'bold',
  fontFamily: 'Helvetica Neue',
})

const SubscribeButton = styled(Button) ({
  margin:"5%", 
  color:"#1DA1F2", 
  border:"1px solid #1DA1F2"
})

const DetailsHeader = styled('div')({
  // position: "fixed",
  // left: 0,
  // width:"100%",
  padding:"5%",
  backgroundColor: '#fff',
})

    


class ListDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      isSubscribed: false
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  subscribe = () => {
    if(!this.state.isSubscribed) {
      this.props.subscribeToList(this.props.list.twitter_list_id, this.props.getUser(localStorage.getItem("twitter_user_id")));
      this.setState({isSubscribed: true})
    }
  }
  // removeFromList = (member) => {
  //   let listMembers = this.props.listmembers;
  //   for(let i = 0; i < listMembers.length; i++) {
  //     if(listMembers[i].twitter_user_id === member.twitter_user_id){
  //       listMembers.splice(i, 1);
  //     }
  //   }
  //   this.props.updateListMembers(listMembers)
  // }



  componentDidMount(){
    const userId = this.props.getUser(localStorage.getItem("twitter_user_id"))
    this.props.getListMembers(this.props.match.params.twitter_list_id);
    this.props.getList(this.props.match.params.twitter_list_id);
    this.props.getListTimeline(this.props.match.params.twitter_list_id, userId);

}
  
render() {
  const { value } = this.state;
  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderTest/>
        <Content>
          <Feed> 
              <DetailsHeader>
              <Grid container justify="space-between" spacing={24}>
                <Grid item>
                  <Typography variant="title">{this.props.list.list_name}</Typography>
                  <Typography>{this.props.list.member_count} Members</Typography>
                  <Typography>{this.props.list.subscriber_count} Subscribers</Typography>
                </Grid>
                <Grid item>
                  <SubscribeButton medium color="inherit" variant="outlined" onClick={this.subscribe}>Subscribe</SubscribeButton>
                </Grid>
                </Grid>
              </DetailsHeader>

              <Tabs onChange={this.handleChange} variant='fullWidth'>
                <Tab label='Members' />
                <Tab label='Timeline'/>
                </Tabs>
               
                
                {value === 0 &&
              <TabContainer>
                
              <Grid container spacing={8} direction="column" alignItems="center" justify="center" >
                {this.props.listMembers.map(i => {
                  return (
                    <Grid item xs={10} sm={8} md={6} style={{width:"100%"}}>
                    <List>
                    <Card >
                      <ListItem>
                      <CardContent style={{width:'100%'}}>
                        <TopLine>
                          <ProfileNameImg>
                            <Avatar src={i.profile_img} style={{marginRight: '5px'}}/>
                            <Link to={`/profile/${this.props.listMembers.twitter_user_id}`} style={{textDecoration:'none'}}><ProfileName >{i.name}</ProfileName></Link>
                            </ProfileNameImg>
                        <Typography>@{i.screen_name}</Typography>
                        </TopLine>
                        <Typography>{i.description}</Typography>
                        {localStorage.getItem("twitter_user_id") === this.props.list.twitter_id ? <FontAwesomeIcon icon="times" onClick={this.removeFromList(i)}/> : null}
                        </CardContent>
                        </ListItem>
                    </Card>
                    </List>
                  </Grid>)
                })}
                </Grid>

              
              </TabContainer>
              }
              {value === 1 &&
              <TabContainer>
                <Grid container spacing={1} direction="column" alignItems="center" justify="center" >
                <List>
                  {this.props.timeline.map(i => {
                    return (
                      <Grid item xs={10} sm={8} md={6} style={{width:"100%"}}>
                      <Card>
                        <CardContent>
                          <Avatar src={i.user.profile_image_url} />
                          <Typography >{i.user.name}</Typography>
                          <Typography>{i.text}</Typography>
                          <Typography>{i.entities.hashtags.text}</Typography>
                        </CardContent>
                      </Card>
                      </Grid>
                    )
                  })}
                  </List>
                  </Grid>
                  
                </TabContainer>
              }
              <Divider />
            </Feed>
        {/* <TweetFloat /> */}
      </Content>
    </React.Fragment>
  );
}
}

const mapStateToProps = state => {
  return {
    listMembers: state.listsReducer.listMembers,
    timeline: state.listsReducer.listTimeline,
    user: state.usersReducer.currentUser,
    list: state.listsReducer.list
  }
}

const mapActionsToProps = {
  getList: getList,
  getListMembers: getListMembers,
  getListTimeline, getListTimeline,
  getUser: getUser,
  updateListMembers: updateListMembers,
  subscribeToList: subscribeToList
}

export default connect( mapStateToProps, mapActionsToProps)(withTheme(theme)(ListDetails));

