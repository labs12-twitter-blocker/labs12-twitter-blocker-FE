import React from 'react';
import {  withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
// import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
// import Header from '../components/tweeper/Header';
// import TweetFloat from '../components/tweeper/TweetFloat.js'
// import HeaderTest from '../tests/HeaderTest.js'
import theme from '../theme/tweeper/theme';
import withTheme from './withTheme';
// import ListTab from '../components/tweeper/ListTab.js'
import BackButton from '../components/tweeper/BackButton'
import atoms from '../components/atoms';
// import molecules from '../components/molecules';
import Tweet from '../components/tweeper/Tweet.js';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { List, 
      ListItem, 
      Tabs, Tab,
      Card, 
      // CardActions,
      CardContent,
      } from '@material-ui/core';
import { connect } from 'react-redux';
import { getList, 
        getListMembers, 
        getUser, 
        getListTimeline, 
        updateListMembers,
        subscribeToList,
        unSubscribeToList,
        getListSubscribers } from '../actions';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
require('dotenv').config();

library.add(faTimes)

const { Avatar, Typography, Button } = atoms;
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

// const Cover = styled('div')({
//   height: 200,
//   backgroundColor: '#ccd6dd',
// });

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
  margin:"2rem", 
})

const DetailsHeader = styled('div')({
  padding:"5%",
})


class ListDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      isSubscribed: false,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  subscribe = () => {
      this.props.subscribeToList(this.props.list.twitter_list_id, this.state.twitter_user_id);
      this.setState({isSubscribed: true})
      console.log("this.props.list.twitter_list_id", this.props.list.twitter_list_id)
      console.log("this.state.twitter_user_id", this.state.twitter_user_id)
  }

  unsubscribe = () => {
    this.props.unSubscribeToList(this.props.list.twitter_list_id, this.state.twitter_user_id);
    this.setState({isSubscribed: false})
  }



  componentDidMount(){
    let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
    this.setState({ twitter_user_id: decoded.id })
    this.props.getListMembers(this.props.match.params.twitter_list_id);
    this.props.getList(this.props.match.params.twitter_list_id);
    this.props.getListTimeline(this.props.match.params.twitter_list_id, decoded.id);
    this.props.getListSubscribers(this.props.match.params.twitter_list_id);
    this.props.listSubscribers.map(user => {
      if(user.twitter_user_id === decoded.id) {
        this.setState({isSubscribed: true})
      }
    })

}
  
render() {
  const { value } = this.state;
  const { isSubscribed } = this.state;

  return (
    <React.Fragment>
      <CssBaseline />
      <BackButton />
        <Content>
          <Feed> 
              <DetailsHeader>
              <Grid container justify="space-between" spacing={24}>
                <Grid item>
                  <Typography variant='h6'>{this.props.list.list_name}</Typography>
                  <Typography>{this.props.list.member_count} Members</Typography>
                  <Typography>{this.props.list.subscriber_count} Subscribers</Typography>
                </Grid>
                <Grid item>
                  {isSubscribed === false && 
                    <SubscribeButton color="primary" variant="outlined" style={{color:"#1da1f2", border:"2px solid #1da1f2"}} onClick={this.subscribe}>Subscribe</SubscribeButton>
                  }
                  {isSubscribed === true &&
                    <SubscribeButton color="primary" variant="contained" onClick={this.unsubscribe}>Unsubscribe</SubscribeButton>
                  }
                  </Grid>
                </Grid>
              </DetailsHeader>
              
              <Tabs 
                value={value}
                onChange={this.handleChange} 
                variant='fullWidth' >
                <Tab label='Members' />
                <Tab label='Timeline'/>
                </Tabs>
               
                
                {value === 0 &&
              <TabContainer>
                
              <Grid container spacing={8} direction="column" alignItems="center" justify="center" >
                <Grid item xs={10} sm={8} md={6} style={{width:"100%"}}>
                {this.props.listMembers.map(i => {
                  return (
                    <List key={i.screen_name}>
                    <Card >
                      <ListItem>
                      <CardContent style={{width:'100%'}}>
                        <TopLine>
                          <ProfileNameImg>
                            <Avatar src={i.profile_img} style={{marginRight: '5px'}}/>
                            <ProfileName >{i.name}</ProfileName>
                              </ProfileNameImg>
                              <Typography>@{i.screen_name}</Typography>
                              </TopLine>
                                <Typography>{i.description}</Typography>
                              </CardContent>
                        </ListItem>
                    </Card>
                    </List>
                )})}
                </Grid>
              </Grid>
             </TabContainer>
              }
              {value === 1 &&
              <TabContainer>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center" >
              
                  {this.props.timeline.map(i => {
                    return (
                      <Grid item xs={10} sm={8} md={6} style={{width:"100%"}}>
                    <List>
                      <Card>
                      <CardContent style={{width:'100%'}}>
                      <Tweet name={i.user.name} profileImg={i.user.profile_image_url} text={i.text} date={i.created_at}/>
                    
                    </CardContent>
                    </Card>
                    </List>
                  </Grid>
                    )
                  })}
                  </Grid>
                  
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
    listMembers: state.listsReducer.listMembers,
    timeline: state.listsReducer.listTimeline,
    user: state.usersReducer.currentUser,
    list: state.listsReducer.list,
    listSubscribers: state.listsReducer.listSubscribers
  }
}

const mapActionsToProps = {
  getList,
  getListMembers,
  getListTimeline,
  getUser,
  updateListMembers,
  subscribeToList,
  unSubscribeToList,
  getListSubscribers
}

const styledComponent = withTheme(theme)(ListDetails);
const routedComponent = withRouter(styledComponent)

export default connect( 
  mapStateToProps, mapActionsToProps)(routedComponent);

