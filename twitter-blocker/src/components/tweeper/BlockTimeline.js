import React, { Component } from 'react';
// import BlockTimelineCard from './BlockTimelineCard'
import { blockTimeline, blockUser, unblockUser } from '../../actions/index'
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from '@material-ui/styles/styled';
import theme from '../../theme/tweeper/theme';
import withTheme from '../../tweeper/withTheme';
import Divider from '@material-ui/core/Divider';
import atoms from '../atoms';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
// import { LIST_ITEM } from '../../theme/core/classes';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  List,
  ListItem,
  CardContent,

} from '@material-ui/core';


const { AppBar, Avatar, Badge, Icon, Toolbar } = atoms;


const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

};
const Feed = styled('div')({
  backgroundColor: '#fff',
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing.unit * 4
});

const Content = styled('div')({
  maxWidth: 1000,
  padding: theme.spacing.unit * 4,
  margin: 'auto',
});
const BlockButton = styled(Button)({
  margin: "2rem",
})



class BlockTimeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isBlocked: false,
      twitter_user_id: null,
      orderBy: 'averageScore'
    }
  }

  block = (id) => {

    console.log(id)
    let params = {
      twitter_id: this.state.twitter_user_id,
      user_id: id
    }
    this.props.blockUser(params)
    this.setState({ isBlocked: true })

    console.log("block")
  }
  unblock = (id) => {
    let params = {
      twitter_id: this.state.twitter_user_id,
      user_id: id

    }
    this.props.unblockUser(params)
    this.setState({ isBlocked: false })

    console.log("unblock")

  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
      console.log("decoded", decoded)

      console.log("CDM")
      console.log(this.state)
      const params = {
        twitter_user_id: decoded.id
      }
      this.props.blockTimeline(params)
    }
    // console.log(this.state.blockTimelineList)

    // this.setState({ timeline: action.payload })
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [ ...checked ];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    // console.log(this.props)
    // const { classes } = this.props;
    // const bull = <span className={classes.bullet}>•</span>;
    const { orderBy, order } = this.state;
    if (this.props.timeline === null) {
      return (<div>Loading...</div>)
    } else {
      console.log("THIS STATE", this.state)

      return (
        <React.Fragment>
          <CssBaseline />
          <Content >
            <Feed sortDirection={orderBy === 'averageScore' ? order : false}>

              <Grid item xs={10} sm={8} md={6} style={{ width: "100%" }}>
                {this.props.timeline.map(item => {

                  console.log("LIST_ITEM", item)
                  return (
                    <List>
                      <Card>
                        <ListItem>
                          <CardContent>
                            <Grid container justify="space-between" spacing={24}>
                              <Avatar src={item.tweet.user.profile_image_url_https} />
                              <Grid item>
                                {this.state.isBlocked === false &&
                                  <BlockButton medium color="primary" variant="outlinedPrimary" style={{ color: "#1da1f2", border: "2px solid #1da1f2" }} onClick={() => this.block(item.tweet.user.id)}>Block</BlockButton>
                                }
                                {this.state.isBlocked === true &&
                                  <BlockButton medium color="primary" variant="contained" onClick={() => this.unblock(item.tweet.user.id)}>Unblock</BlockButton>
                                }
                              </Grid>
                            </Grid>

                            {/* <Typography></Typography> */}
                            <Typography><strong>User:</strong> {item.tweet.user.screen_name}</Typography>
                            <Typography><strong>Tweet:</strong> {item.tweet.full_text}</Typography>
                            <Divider dark style={{ margin: "1rem" }} />
                            <Typography><strong>Larkist Scores</strong></Typography>
                            <Typography>Identity Hate: {`${item.bert_result.identity_hate * 100}%`}</Typography>
                            <Typography>Insult: {`${item.bert_result.insult * 100}%`}</Typography>
                            <Typography>Obscene: {`${item.bert_result.obscene}%`}</Typography>
                            <Typography>Severe Toxic: {`${item.bert_result.severe_toxic}`}</Typography>
                            <Typography>Threat: {`${item.bert_result.threat * 100}%`}</Typography>
                            <Typography>Toxic: {`${item.bert_result.toxic}%`}</Typography>
                            <Typography>Average: {`${((item.bert_result.toxic + item.bert_result.identity_hate + item.bert_result.insult +
                              item.bert_result.obscene + item.bert_result.severe_toxic + item.bert_result.threat) / 6) * 100}%`}</Typography>

                          </CardContent>
                        </ListItem>
                      </Card>
                    </List>
                  )
                })}
              </Grid>
            </Feed>
          </Content>
        </React.Fragment>
        // return(
        //   <div>{item.tweet}</div>
        // )


      );
    }
  }
}
const styledComponent = withStyles(styles)(BlockTimeline);


const mapStateToProps = state => ({
  timeline: state.listsReducer.blockTimelineList
});

export default withRouter(connect(
  mapStateToProps,
  { blockTimeline, blockUser, unblockUser }
)(styledComponent));


