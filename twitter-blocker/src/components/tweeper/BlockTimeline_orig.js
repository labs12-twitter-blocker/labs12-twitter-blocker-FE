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
                {timeline.map(item => {

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
  // timeline: state.listsReducer.blockTimelineList
});

export default withRouter(connect(
  mapStateToProps,
  { blockTimeline, blockUser, unblockUser }
)(styledComponent));


let timeline = [
  {
    "tweet": {
      "created_at": "Wed May 15 00:12:33 +0000 2019",
      "id": 1128453074475896832,
      "id_str": "1128453074475896832",
      "full_text": "@dev_nikema @Dstar3248 Public works best for now. Thank you for helping!",
      "truncated": false,
      "display_text_range": [
        23,
        72
      ],
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "dev_nikema",
            "name": "Nikema Prophet 🦓 (she/her)",
            "id": 744302714226544640,
            "id_str": "744302714226544640",
            "indices": [
              0,
              11
            ]
          },
          {
            "screen_name": "Dstar3248",
            "name": "Daniel",
            "id": 802197601592508416,
            "id_str": "802197601592508416",
            "indices": [
              12,
              22
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": 1128452902668759040,
      "in_reply_to_status_id_str": "1128452902668759040",
      "in_reply_to_user_id": 744302714226544640,
      "in_reply_to_user_id_str": "744302714226544640",
      "in_reply_to_screen_name": "dev_nikema",
      "user": {
        "id": 1123316691100786688,
        "id_str": "1123316691100786688",
        "name": "DstarDev",
        "screen_name": "DstarDev",
        "location": "",
        "description": "",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 5,
        "friends_count": 1,
        "listed_count": 0,
        "created_at": "Tue Apr 30 20:02:24 +0000 2019",
        "favourites_count": 8,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 5,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": true,
        "default_profile_image": true,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0001,
      "insult": 0.0001,
      "obscene": 0.0001,
      "severe_toxic": 0.0001,
      "threat": 0.0001,
      "toxic": 0.0002
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:47:46 +0000 2019",
      "id": 1128446838997041153,
      "id_str": "1128446838997041153",
      "full_text": "RT @Dstar3248: I am working on a project to help with toxic people on twitter. If you have time I would be grateful if you could go be mean…",
      "truncated": false,
      "display_text_range": [
        0,
        140
      ],
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "Dstar3248",
            "name": "Daniel",
            "id": 802197601592508416,
            "id_str": "802197601592508416",
            "indices": [
              3,
              13
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 1123316691100786688,
        "id_str": "1123316691100786688",
        "name": "DstarDev",
        "screen_name": "DstarDev",
        "location": "",
        "description": "",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 5,
        "friends_count": 1,
        "listed_count": 0,
        "created_at": "Tue Apr 30 20:02:24 +0000 2019",
        "favourites_count": 8,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 5,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": true,
        "default_profile_image": true,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "created_at": "Tue May 14 23:39:46 +0000 2019",
        "id": 1128444825387167744,
        "id_str": "1128444825387167744",
        "full_text": "I am working on a project to help with toxic people on twitter. If you have time I would be grateful if you could go be mean to @DstarDev on twitter. If you are not feeling toxic you can say something nice, that helps too.",
        "truncated": false,
        "display_text_range": [
          0,
          222
        ],
        "entities": {
          "hashtags": [],
          "symbols": [],
          "user_mentions": [
            {
              "screen_name": "DstarDev",
              "name": "DstarDev",
              "id": 1123316691100786688,
              "id_str": "1123316691100786688",
              "indices": [
                128,
                137
              ]
            }
          ],
          "urls": []
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 802197601592508416,
          "id_str": "802197601592508416",
          "name": "Daniel",
          "screen_name": "Dstar3248",
          "location": "Tucson, AZ",
          "description": "@LambdaSchool student.  Full Stack Web Dev",
          "url": null,
          "entities": {
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 280,
          "friends_count": 765,
          "listed_count": 9,
          "created_at": "Fri Nov 25 17:09:47 +0000 2016",
          "favourites_count": 203,
          "utc_offset": null,
          "time_zone": null,
          "geo_enabled": false,
          "verified": false,
          "statuses_count": 114,
          "lang": null,
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "F5F8FA",
          "profile_background_image_url": null,
          "profile_background_image_url_https": null,
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/1096580144767033344/LcmdVUMn_normal.png",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/1096580144767033344/LcmdVUMn_normal.png",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/802197601592508416/1558024583",
          "profile_link_color": "1DA1F2",
          "profile_sidebar_border_color": "C0DEED",
          "profile_sidebar_fill_color": "DDEEF6",
          "profile_text_color": "333333",
          "profile_use_background_image": true,
          "has_extended_profile": false,
          "default_profile": true,
          "default_profile_image": false,
          "following": false,
          "follow_request_sent": false,
          "notifications": false,
          "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 4,
        "favorite_count": 5,
        "favorited": true,
        "retweeted": true,
        "lang": "en"
      },
      "is_quote_status": false,
      "retweet_count": 4,
      "favorite_count": 0,
      "favorited": true,
      "retweeted": true,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0001,
      "insult": 0.0001,
      "obscene": 0.0001,
      "severe_toxic": 0.0001,
      "threat": 0.0,
      "toxic": 0.0002
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:40:24 +0000 2019",
      "id": 1128444984615587840,
      "id_str": "1128444984615587840",
      "full_text": "@Dstar3248 I am @dstardev and I approved this message.",
      "truncated": false,
      "display_text_range": [
        11,
        54
      ],
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "Dstar3248",
            "name": "Daniel",
            "id": 802197601592508416,
            "id_str": "802197601592508416",
            "indices": [
              0,
              10
            ]
          },
          {
            "screen_name": "DstarDev",
            "name": "DstarDev",
            "id": 1123316691100786688,
            "id_str": "1123316691100786688",
            "indices": [
              16,
              25
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": 1128444825387167744,
      "in_reply_to_status_id_str": "1128444825387167744",
      "in_reply_to_user_id": 802197601592508416,
      "in_reply_to_user_id_str": "802197601592508416",
      "in_reply_to_screen_name": "Dstar3248",
      "user": {
        "id": 1123316691100786688,
        "id_str": "1123316691100786688",
        "name": "DstarDev",
        "screen_name": "DstarDev",
        "location": "",
        "description": "",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 5,
        "friends_count": 1,
        "listed_count": 0,
        "created_at": "Tue Apr 30 20:02:24 +0000 2019",
        "favourites_count": 8,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 5,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": true,
        "default_profile_image": true,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0001,
      "insult": 0.0001,
      "obscene": 0.0001,
      "severe_toxic": 0.0001,
      "threat": 0.0001,
      "toxic": 0.0002
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:29:43 +0000 2019",
      "id": 1128442296519647232,
      "id_str": "1128442296519647232",
      "full_text": "RT @workingjubilee: Please send your sickest burns @DstarDev",
      "truncated": false,
      "display_text_range": [
        0,
        60
      ],
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "workingjubilee",
            "name": "Jubilee",
            "id": 1107835175411421184,
            "id_str": "1107835175411421184",
            "indices": [
              3,
              18
            ]
          },
          {
            "screen_name": "DstarDev",
            "name": "DstarDev",
            "id": 1123316691100786688,
            "id_str": "1123316691100786688",
            "indices": [
              51,
              60
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 1123316691100786688,
        "id_str": "1123316691100786688",
        "name": "DstarDev",
        "screen_name": "DstarDev",
        "location": "",
        "description": "",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 5,
        "friends_count": 1,
        "listed_count": 0,
        "created_at": "Tue Apr 30 20:02:24 +0000 2019",
        "favourites_count": 8,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 5,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": true,
        "default_profile_image": true,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "created_at": "Tue May 14 23:22:22 +0000 2019",
        "id": 1128440447083225088,
        "id_str": "1128440447083225088",
        "full_text": "Please send your sickest burns @DstarDev",
        "truncated": false,
        "display_text_range": [
          0,
          40
        ],
        "entities": {
          "hashtags": [],
          "symbols": [],
          "user_mentions": [
            {
              "screen_name": "DstarDev",
              "name": "DstarDev",
              "id": 1123316691100786688,
              "id_str": "1123316691100786688",
              "indices": [
                31,
                40
              ]
            }
          ],
          "urls": []
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 1107835175411421184,
          "id_str": "1107835175411421184",
          "name": "Jubilee",
          "screen_name": "workingjubilee",
          "location": "",
          "description": "Just another builder of electric minds in castles made of sand. @LambdaSchool",
          "url": null,
          "entities": {
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 124,
          "friends_count": 268,
          "listed_count": 1,
          "created_at": "Tue Mar 19 02:44:23 +0000 2019",
          "favourites_count": 1047,
          "utc_offset": null,
          "time_zone": null,
          "geo_enabled": false,
          "verified": false,
          "statuses_count": 384,
          "lang": null,
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "000000",
          "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
          "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/1107843862473498624/J2NJLqHm_normal.png",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/1107843862473498624/J2NJLqHm_normal.png",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/1107835175411421184/1552964679",
          "profile_link_color": "91D2FA",
          "profile_sidebar_border_color": "000000",
          "profile_sidebar_fill_color": "000000",
          "profile_text_color": "000000",
          "profile_use_background_image": false,
          "has_extended_profile": false,
          "default_profile": false,
          "default_profile_image": false,
          "following": false,
          "follow_request_sent": false,
          "notifications": false,
          "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 1,
        "favorite_count": 2,
        "favorited": true,
        "retweeted": true,
        "lang": "en"
      },
      "is_quote_status": false,
      "retweet_count": 1,
      "favorite_count": 0,
      "favorited": true,
      "retweeted": true,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0009,
      "insult": 0.0151,
      "obscene": 0.0096,
      "severe_toxic": 0.002,
      "threat": 0.0059,
      "toxic": 0.9925
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:29:42 +0000 2019",
      "id": 1128442291595677696,
      "id_str": "1128442291595677696",
      "full_text": "@DstarDev but sometimes i will be nice to you because you're beautiful.",
      "truncated": false,
      "display_text_range": [
        0,
        71
      ],
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "DstarDev",
            "name": "DstarDev",
            "id": 1123316691100786688,
            "id_str": "1123316691100786688",
            "indices": [
              0,
              9
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": 1123316691100786688,
      "in_reply_to_user_id_str": "1123316691100786688",
      "in_reply_to_screen_name": "DstarDev",
      "user": {
        "id": 1125968227513786369,
        "id_str": "1125968227513786369",
        "name": "BrittonsTestAccount",
        "screen_name": "BrittonsTest",
        "location": "",
        "description": "Just testing software and trying not to delete my real friends. All toxic comments are test data.",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 1,
        "friends_count": 3,
        "listed_count": 0,
        "created_at": "Wed May 08 03:38:39 +0000 2019",
        "favourites_count": 4,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 2,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1126982195774664705/bMc1xjby_normal.png",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1126982195774664705/bMc1xjby_normal.png",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": true,
        "default_profile": true,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0001,
      "insult": 0.0002,
      "obscene": 0.0001,
      "severe_toxic": 0.0001,
      "threat": 0.0001,
      "toxic": 0.0003
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:25:18 +0000 2019",
      "id": 1128441185880530945,
      "id_str": "1128441185880530945",
      "full_text": "If everyone could be really toxic to me it would really help our project. So get all those insults out...for science.",
      "truncated": false,
      "display_text_range": [
        0,
        117
      ],
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 1123316691100786688,
        "id_str": "1123316691100786688",
        "name": "DstarDev",
        "screen_name": "DstarDev",
        "location": "",
        "description": "",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 5,
        "friends_count": 1,
        "listed_count": 0,
        "created_at": "Tue Apr 30 20:02:24 +0000 2019",
        "favourites_count": 8,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 5,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": true,
        "default_profile_image": true,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0,
      "insult": 0.0002,
      "obscene": 0.0001,
      "severe_toxic": 0.0,
      "threat": 0.0,
      "toxic": 0.0006
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:14:28 +0000 2019",
      "id": 1128438457062150144,
      "id_str": "1128438457062150144",
      "full_text": "@DstarDev  *testing* You are a moron. I hope you die. #notreallyjusttesting",
      "truncated": false,
      "display_text_range": [
        0,
        75
      ],
      "entities": {
        "hashtags": [
          {
            "text": "notreallyjusttesting",
            "indices": [
              54,
              75
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "DstarDev",
            "name": "DstarDev",
            "id": 1123316691100786688,
            "id_str": "1123316691100786688",
            "indices": [
              0,
              9
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": 1123316691100786688,
      "in_reply_to_user_id_str": "1123316691100786688",
      "in_reply_to_screen_name": "DstarDev",
      "user": {
        "id": 1125968227513786369,
        "id_str": "1125968227513786369",
        "name": "BrittonsTestAccount",
        "screen_name": "BrittonsTest",
        "location": "",
        "description": "Just testing software and trying not to delete my real friends. All toxic comments are test data.",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 1,
        "friends_count": 3,
        "listed_count": 0,
        "created_at": "Wed May 08 03:38:39 +0000 2019",
        "favourites_count": 4,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 2,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1126982195774664705/bMc1xjby_normal.png",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1126982195774664705/bMc1xjby_normal.png",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": true,
        "default_profile": true,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0114,
      "insult": 0.933,
      "obscene": 0.3142,
      "severe_toxic": 0.0475,
      "threat": 0.7901,
      "toxic": 0.9879
    }
   }
  ]