import React from 'react';
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
// import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
// import Header from '../components/tweeper/Header';
// import TweetFloat from '../components/tweeper/TweetFloat.js'
// import HeaderTest from '../tests/HeaderTest.js'
import SwipeableViews from 'react-swipeable-views';
import theme from '../theme/tweeper/theme';
import withTheme from './withTheme';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListTab from '../components/tweeper/ListTab.js'
import BackButton from '../components/tweeper/BackButton'
import atoms from '../components/atoms';
// import molecules from '../components/molecules';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tweet from '../components/tweeper/Tweet.js';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { List,
      ListItem,
      Tabs, Tab,
      // Card,
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
        getListSubscribers,
        deleteList } from '../actions';
// import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
require('dotenv').config();

library.add(faTimes)

const { Avatar, Typography, Button } = atoms;
// const { Tabs, Tab } = molecules;

const TabContainer = styled('div')({
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

// const TopLine = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
// });

// const ProfileNameImg = styled('div') ({
//   display: 'flex',
//   width: '50%',
//   alignItems: 'center',
// })

// const ProfileName = styled(Typography)({
//   fontWeight: 'bold',
//   fontFamily: 'Helvetica Neue',
// })

const SubscribeButton = styled(Button)({
  margin: "2rem",
})

const DetailsHeader = styled('div')({
  padding: "5%",
})


class ListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isSubscribed: false,
      isCreator: false,
      listId: "",
      listCreatorId: "",
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  subscribe = () => {
    let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
    this.props.subscribeToList(this.state.listId, decoded.id);
    this.setState({ isSubscribed: true })
    console.log("this.props.list.twitter_list_id", this.props.list.twitter_list_id)
    console.log("this.state.twitter_user_id", this.state.twitter_user_id)
  }

  unsubscribe = () => {
    let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET)
    this.props.unSubscribeToList(this.state.listId, decoded.id);
    this.setState({ isSubscribed: false })
    // console.log(this.state.isSubscribed)
  }

  deleteList = () => {
    let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET)
    this.props.deleteList(this.state.listId, decoded.id)
  }



  componentDidMount() {
    let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
    this.setState({ twitter_user_id: decoded.id })
    this.props.getListMembers(this.props.match.params.twitter_list_id);
    this.props.getList(this.props.match.params.twitter_list_id);
    this.props.getListTimeline(this.props.match.params.twitter_list_id, decoded.id);
    this.props.getListSubscribers(this.props.match.params.twitter_list_id);


    setTimeout(() => {
      this.setState({listId: this.props.list.twitter_list_id})
      this.setState({listCreatorId: this.props.list.twitter_id})
      if (decoded. id == this.state.listCreatorId) {
        this.setState({isCreator: true})
      }
    this.props.listSubscribers.map(user => {
      if (user.twitter_user_id == decoded.id) {
        this.setState({ isSubscribed: true })
      }
    })
  }, 1000)

  }

  render() {
    const { value } = this.state;
    const { isSubscribed } = this.state;
    const { isCreator } = this.state;

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
                  {isCreator === false && isSubscribed === false ?
                    <SubscribeButton variant="containedPrimary" style={{ color: "#304ffe", border: "2px solid #304ffe" }} onClick={this.subscribe}>Subscribe</SubscribeButton>
                  : null
                  }
                  {isSubscribed === true && isCreator === false ?
                    <SubscribeButton color="primary" variant="contained" onClick={this.unsubscribe}>Unsubscribe</SubscribeButton>
                  : null
                  }
                  {isCreator === true &&
                  <SubscribeButton variant="contained" style={{ color: "#ffffff", background: "#ff5252" }}onClick={this.deleteList}>Delete List</SubscribeButton>}
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
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer>
                {this.props.fetchingListMembersDone ?
                <Grid container spacing={8} direction="column" alignItems="center" justify="center" >
                <Grid item xs={12} sm={10} md={8} style={{width:"100%"}}>
                  {this.props.listMembers.map((e, index) => {
                    return (
                      <List key={e.twitter_user_id} >
                        <ListItem alignItems="flex-start" >
                          <ListItemAvatar>
                            <Avatar src={e.profile_img} />
                          </ListItemAvatar>
                          <ListItemText
                            disableTypography={true}
                            primary={<>
                              <Typography color="textPrimary" variant='subtitle1'style={{display: 'inline-block'}}>
                                {e.name}
                              </Typography>
                              <Typography color="textSecondary" variant='caption'style={{display: 'inline-block'}}>
                              &nbsp;@{e.screen_name}
                              </Typography></>}
                            secondary={
                              <Typography component="span" color="textSecondary" variant='body2'>
                                {e.description}
                              </Typography>
                            }
                          />
                      </ListItem>
                      <Divider />
                    </List>
                  )})}
                </Grid>
                </Grid>
                    : (<Grid //If not done loading, display CircularProgress
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item xs={3}>
                        <CircularProgress color="primary" />
                      </Grid>
                    </Grid>) }

              </TabContainer>
              <TabContainer>
                {this.props.fetchingListTimelineDone ?
                  <Grid container spacing={0} direction="column" alignItems="center" justify="center" >
                    <Grid item xs={12} sm={10} md={8} style={{width:"100%"}}>
                      {this.props.timeline.map(i => {
                        return (
                        <List key={i.id_str}>
                          <CardContent style={{width:'100%'}}>
                            <Tweet name={i.user.name} profileImg={i.user.profile_image_url} text={i.text} screen_name={i.user.screen_name}/>
                          </CardContent>
                        <Divider />
                        </List>
                      )})}
                    </Grid>
                  </Grid>
                : (<Grid //If not done loading, display CircularProgress
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item xs={3}>
                      <CircularProgress color="primary" />
                    </Grid>
                  </Grid>)
                }
              </TabContainer>
            </SwipeableViews>
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
    fetchingListMembersDone: state.listsReducer.fetchingListMembersDone,
    timeline: state.listsReducer.listTimeline,
    fetchingListTimelineDone: state.listsReducer.fetchingListTimelineDone,
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
  getListSubscribers,
  deleteList
}

const styledComponent = withTheme(theme)(ListDetails);
const routedComponent = withRouter(styledComponent)

export default connect(
  mapStateToProps, mapActionsToProps)(routedComponent);