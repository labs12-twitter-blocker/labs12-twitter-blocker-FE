import React, { Component } from 'react';
// import BlockTimelineCard from './BlockTimelineCard'
import { blockTimeline, blockUser, unblockUser } from '../../actions/index'
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from '@material-ui/styles/styled';

import theme from '../../theme/tweeper/theme';
import withTheme from '../../tweeper/withTheme';

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
      twitter_user_id: null
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
  render() {
    // console.log(this.props)
    // const { classes } = this.props;
    // const bull = <span className={classes.bullet}>•</span>;

    // if (this.props.timeline === null) {
    //   return (<div>Loading...</div>)
    // } else {
    console.log("THIS STATE", this.state)

    return (
      <React.Fragment>
        <CssBaseline />
        <Content>
          <Feed>



            {console.log("BLOCK TIMELINE LIST", this.props.timeline)}
            <Grid item xs={10} sm={8} md={6} style={{ width: "100%" }}>
              {/* {this.props.timeline.map(item => { */}
              {placeholder.map(item => {

                { console.log("LIST_ITEM", item) }
                return (
                  <List>
                    <Card>
                      <ListItem>
                        <CardContent>
                          <Grid item>
                            {this.state.isBlocked === false &&
                              <BlockButton medium color="primary" variant="outlinedPrimary" style={{ color: "#1da1f2", border: "2px solid #1da1f2" }} onClick={() => this.block(item.tweet.user.id)}>Block</BlockButton>
                            }
                            {this.state.isBlocked === true &&
                              <BlockButton medium color="primary" variant="contained" onClick={() => this.unblock(item.tweet.user.id)}>Unblock</BlockButton>
                            }
                          </Grid>
                          <Avatar src={item.tweet.user.profile_image_url_https} />

                          {/* <Typography></Typography> */}
                          <Typography><strong>User:</strong> {item.tweet.user.screen_name}</Typography>
                          <Typography><strong>Tweet:</strong> {item.tweet.full_text}</Typography>
                          {/* <Typogra<strong>phy>Link to the offending tweet: {item.tweet.}</Typography> */}
                          <Typography><strong>Larkist Scores</strong></Typography>
                          <Typography>Identity Hate: {item.bert_result.identity_hate}</Typography>
                          <Typography>Insult: {item.bert_result.insult}</Typography>
                          <Typography>Obscene: {item.bert_result.obscene}</Typography>
                          <Typography>Severe Toxic: {item.bert_result.severe_toxic}</Typography>
                          <Typography>Threat: {item.bert_result.threat}</Typography>
                          <Typography>Toxic: {item.bert_result.toxic}</Typography>
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
// }
const styledComponent = withStyles(styles)(BlockTimeline);


const mapStateToProps = state => ({
  timeline: state.listsReducer.blockTimelineList
});

export default withRouter(connect(
  mapStateToProps,
  { blockTimeline, blockUser, unblockUser }
)(styledComponent));




const placeholder = [
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
  },
  {
    "tweet": {
      "created_at": "Wed May 15 19:54:11 +0000 2019",
      "id": 1128750442660401153,
      "id_str": "1128750442660401153",
      "full_text": "@DstarDev you suck",
      "truncated": false,
      "display_text_range": [
        0,
        18
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
        "id": 1085033459549114368,
        "id_str": "1085033459549114368",
        "name": "Megan Jones",
        "screen_name": "meg_inks",
        "location": "",
        "description": "Full Stack Web Developer.  Writer.  Human. MA in English Literature.  Web Development Student at @LambdaSchool. Parlo italiano. #DigitalHumanities #Javascript",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 337,
        "friends_count": 656,
        "listed_count": 5,
        "created_at": "Tue Jan 15 04:38:30 +0000 2019",
        "favourites_count": 688,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 182,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1096629139031973888/Zfhaun3L_normal.png",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1096629139031973888/Zfhaun3L_normal.png",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/1085033459549114368/1547529780",
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
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": true,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0041,
      "insult": 0.9941,
      "obscene": 0.9974,
      "severe_toxic": 0.2105,
      "threat": 0.0017,
      "toxic": 0.9977
    }
  },
  {
    "tweet": {
      "created_at": "Wed May 15 13:51:27 +0000 2019",
      "id": 1128659158775951360,
      "id_str": "1128659158775951360",
      "full_text": "@DstarDev girl, you nasty!",
      "truncated": false,
      "display_text_range": [
        0,
        26
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
      "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": 1123316691100786688,
      "in_reply_to_user_id_str": "1123316691100786688",
      "in_reply_to_screen_name": "DstarDev",
      "user": {
        "id": 3437549026,
        "id_str": "3437549026",
        "name": "Farrahbusrex",
        "screen_name": "_farrahbusrex",
        "location": "",
        "description": "why am I like this?",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 10,
        "friends_count": 20,
        "listed_count": 0,
        "created_at": "Mon Aug 24 02:09:08 +0000 2015",
        "favourites_count": 12,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 7,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "C0DEED",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/676077719638179840/qxZppWkS_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/676077719638179840/qxZppWkS_normal.jpg",
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
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": true,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0058,
      "insult": 0.9361,
      "obscene": 0.0056,
      "severe_toxic": 0.0034,
      "threat": 0.0032,
      "toxic": 0.96
    }
  },
  {
    "tweet": {
      "created_at": "Wed May 15 00:38:06 +0000 2019",
      "id": 1128459504105009154,
      "id_str": "1128459504105009154",
      "full_text": "@crawfteevee @DstarDev Well, Crawford closed it down with the Monty Python reference. Sorry.",
      "truncated": false,
      "display_text_range": [
        23,
        92
      ],
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "crawfteevee",
            "name": "crawford",
            "id": 954460588977086465,
            "id_str": "954460588977086465",
            "indices": [
              0,
              12
            ]
          },
          {
            "screen_name": "DstarDev",
            "name": "DstarDev",
            "id": 1123316691100786688,
            "id_str": "1123316691100786688",
            "indices": [
              13,
              22
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "in_reply_to_status_id": 1128448302880632832,
      "in_reply_to_status_id_str": "1128448302880632832",
      "in_reply_to_user_id": 954460588977086465,
      "in_reply_to_user_id_str": "954460588977086465",
      "in_reply_to_screen_name": "crawfteevee",
      "user": {
        "id": 32161686,
        "id_str": "32161686",
        "name": "Nick Durbin",
        "screen_name": "durbdawg",
        "location": "OH",
        "description": "WEBpt8 @Lambdaschool | Cleveland Sports Fan | I love life & people. We all have the capacity to make a change for the betterment of our world.",
        "url": "https://t.co/snpE3B0UDM",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/snpE3B0UDM",
                "expanded_url": "http://youtube.com/HobbifiedLife",
                "display_url": "youtube.com/HobbifiedLife",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 813,
        "friends_count": 384,
        "listed_count": 15,
        "created_at": "Thu Apr 16 21:32:17 +0000 2009",
        "favourites_count": 6564,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 4077,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "000000",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme4/bg.gif",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme4/bg.gif",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1026469582322561025/nINtWJxY_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1026469582322561025/nINtWJxY_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/32161686/1547848138",
        "profile_link_color": "19CF86",
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
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": true,
      "retweeted": false,
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
      "created_at": "Wed May 15 00:31:39 +0000 2019",
      "id": 1128457882238717953,
      "id_str": "1128457882238717953",
      "full_text": "@DstarDev you suck tatas",
      "truncated": false,
      "display_text_range": [
        0,
        24
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
      "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": 1123316691100786688,
      "in_reply_to_user_id_str": "1123316691100786688",
      "in_reply_to_screen_name": "DstarDev",
      "user": {
        "id": 3437549026,
        "id_str": "3437549026",
        "name": "Farrahbusrex",
        "screen_name": "_farrahbusrex",
        "location": "",
        "description": "why am I like this?",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 10,
        "friends_count": 20,
        "listed_count": 0,
        "created_at": "Mon Aug 24 02:09:08 +0000 2015",
        "favourites_count": 12,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 7,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "C0DEED",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/676077719638179840/qxZppWkS_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/676077719638179840/qxZppWkS_normal.jpg",
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
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": true,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0022,
      "insult": 0.9723,
      "obscene": 0.9895,
      "severe_toxic": 0.0044,
      "threat": 0.0006,
      "toxic": 0.9915
    }
  },
  {
    "tweet": {
      "created_at": "Wed May 15 00:25:39 +0000 2019",
      "id": 1128456371706388480,
      "id_str": "1128456371706388480",
      "full_text": "Help my friend @Dstar3248 and his @LambdaSchool Labs team develop their project by sending insults and other toxicity to this account: @DstarDev https://t.co/iObnjMt61V",
      "truncated": false,
      "display_text_range": [
        0,
        144
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
              15,
              25
            ]
          },
          {
            "screen_name": "LambdaSchool",
            "name": "Lambda School",
            "id": 733318062754004992,
            "id_str": "733318062754004992",
            "indices": [
              34,
              47
            ]
          },
          {
            "screen_name": "DstarDev",
            "name": "DstarDev",
            "id": 1123316691100786688,
            "id_str": "1123316691100786688",
            "indices": [
              135,
              144
            ]
          }
        ],
        "urls": [
          {
            "url": "https://t.co/iObnjMt61V",
            "expanded_url": "https://twitter.com/DstarDev/status/1128441185880530945",
            "display_url": "twitter.com/DstarDev/statu…",
            "indices": [
              145,
              168
            ]
          }
        ]
      },
      "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 1089311459576705025,
        "id_str": "1089311459576705025",
        "name": "Dan Sherman",
        "screen_name": "shrmnshrmn",
        "location": "",
        "description": "I code a lot | Teaching Assistant @lambdaschool",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 240,
        "friends_count": 309,
        "listed_count": 6,
        "created_at": "Sat Jan 26 23:57:45 +0000 2019",
        "favourites_count": 1261,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 434,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1090487881947205632/7F1dtosr_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1090487881947205632/7F1dtosr_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/1089311459576705025/1552230981",
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
      "is_quote_status": true,
      "quoted_status_id": 1128441185880530945,
      "quoted_status_id_str": "1128441185880530945",
      "quoted_status_permalink": {
        "url": "https://t.co/iObnjMt61V",
        "expanded": "https://twitter.com/DstarDev/status/1128441185880530945",
        "display": "twitter.com/DstarDev/statu…"
      },
      "quoted_status": {
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
      "retweet_count": 1,
      "favorite_count": 4,
      "favorited": true,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0,
      "insult": 0.0001,
      "obscene": 0.0001,
      "severe_toxic": 0.0,
      "threat": 0.0,
      "toxic": 0.0004
    }
  },
  {
    "tweet": {
      "created_at": "Wed May 15 00:21:43 +0000 2019",
      "id": 1128455382706163713,
      "id_str": "1128455382706163713",
      "full_text": "@DstarDev I don't want to talk to you no more, you empty-headed animal food trough wiper! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries!",
      "truncated": false,
      "display_text_range": [
        0,
        188
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
      "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": 1123316691100786688,
      "in_reply_to_user_id_str": "1123316691100786688",
      "in_reply_to_screen_name": "DstarDev",
      "user": {
        "id": 1089311459576705025,
        "id_str": "1089311459576705025",
        "name": "Dan Sherman",
        "screen_name": "shrmnshrmn",
        "location": "",
        "description": "I code a lot | Teaching Assistant @lambdaschool",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 240,
        "friends_count": 309,
        "listed_count": 6,
        "created_at": "Sat Jan 26 23:57:45 +0000 2019",
        "favourites_count": 1261,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 434,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1090487881947205632/7F1dtosr_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1090487881947205632/7F1dtosr_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/1089311459576705025/1552230981",
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
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": true,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0019,
      "insult": 0.6126,
      "obscene": 0.0104,
      "severe_toxic": 0.0031,
      "threat": 0.0033,
      "toxic": 0.9928
    }
  },
  {
    "tweet": {
      "created_at": "Wed May 15 00:11:52 +0000 2019",
      "id": 1128452902668759040,
      "id_str": "1128452902668759040",
      "full_text": "@Dstar3248 @DstarDev Um in public or over dm?",
      "truncated": false,
      "display_text_range": [
        21,
        45
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
              11,
              20
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": 1128444825387167744,
      "in_reply_to_status_id_str": "1128444825387167744",
      "in_reply_to_user_id": 802197601592508416,
      "in_reply_to_user_id_str": "802197601592508416",
      "in_reply_to_screen_name": "Dstar3248",
      "user": {
        "id": 744302714226544640,
        "id_str": "744302714226544640",
        "name": "Nikema Prophet 🦓 (she/her)",
        "screen_name": "dev_nikema",
        "location": "California, USA",
        "description": "Founding @PopSchoolsApp | @LambdaSchool Summer Hacker #web21 | #BlackUnschooling | #MomInTech #FutureOfWork #FutureOfSchools https://t.co/UONX6SctxG",
        "url": "https://t.co/e04xhbdFRM",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/e04xhbdFRM",
                "expanded_url": "http://wefunder.com/popschools",
                "display_url": "wefunder.com/popschools",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": [
              {
                "url": "https://t.co/UONX6SctxG",
                "expanded_url": "https://PopSchools.co",
                "display_url": "PopSchools.co",
                "indices": [
                  125,
                  148
                ]
              }
            ]
          }
        },
        "protected": false,
        "followers_count": 1956,
        "friends_count": 4965,
        "listed_count": 71,
        "created_at": "Sat Jun 18 22:56:10 +0000 2016",
        "favourites_count": 29028,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 11343,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "000000",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1085636347929362432/CthZGxkE_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1085636347929362432/CthZGxkE_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/744302714226544640/1547638975",
        "profile_link_color": "FF691F",
        "profile_sidebar_border_color": "000000",
        "profile_sidebar_fill_color": "000000",
        "profile_text_color": "000000",
        "profile_use_background_image": false,
        "has_extended_profile": true,
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
      "retweet_count": 0,
      "favorite_count": 0,
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
      "created_at": "Tue May 14 23:53:35 +0000 2019",
      "id": 1128448302880632832,
      "id_str": "1128448302880632832",
      "full_text": "@DstarDev Go and boil your bottoms, sons of a silly person. I blow my nose at you, so-called Arthur-king, you and all your silly English...you empty headed animal food trough wiper!...... I fart in your general direction! . Your mother was a hamster and your father smelt of elderberries! https://t.co/Txb3QaXys3",
      "truncated": false,
      "display_text_range": [
        10,
        288
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
        "urls": [],
        "media": [
          {
            "id": 1128448299655155712,
            "id_str": "1128448299655155712",
            "indices": [
              289,
              312
            ],
            "media_url": "http://pbs.twimg.com/media/D6kNv_BW0AAqkK3.jpg",
            "media_url_https": "https://pbs.twimg.com/media/D6kNv_BW0AAqkK3.jpg",
            "url": "https://t.co/Txb3QaXys3",
            "display_url": "pic.twitter.com/Txb3QaXys3",
            "expanded_url": "https://twitter.com/crawfteevee/status/1128448302880632832/photo/1",
            "type": "photo",
            "sizes": {
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "large": {
                "w": 602,
                "h": 330,
                "resize": "fit"
              },
              "small": {
                "w": 602,
                "h": 330,
                "resize": "fit"
              },
              "medium": {
                "w": 602,
                "h": 330,
                "resize": "fit"
              }
            }
          }
        ]
      },
      "extended_entities": {
        "media": [
          {
            "id": 1128448299655155712,
            "id_str": "1128448299655155712",
            "indices": [
              289,
              312
            ],
            "media_url": "http://pbs.twimg.com/media/D6kNv_BW0AAqkK3.jpg",
            "media_url_https": "https://pbs.twimg.com/media/D6kNv_BW0AAqkK3.jpg",
            "url": "https://t.co/Txb3QaXys3",
            "display_url": "pic.twitter.com/Txb3QaXys3",
            "expanded_url": "https://twitter.com/crawfteevee/status/1128448302880632832/photo/1",
            "type": "photo",
            "sizes": {
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "large": {
                "w": 602,
                "h": 330,
                "resize": "fit"
              },
              "small": {
                "w": 602,
                "h": 330,
                "resize": "fit"
              },
              "medium": {
                "w": 602,
                "h": 330,
                "resize": "fit"
              }
            }
          }
        ]
      },
      "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
      "in_reply_to_status_id": 1128441185880530945,
      "in_reply_to_status_id_str": "1128441185880530945",
      "in_reply_to_user_id": 1123316691100786688,
      "in_reply_to_user_id_str": "1123316691100786688",
      "in_reply_to_screen_name": "DstarDev",
      "user": {
        "id": 954460588977086465,
        "id_str": "954460588977086465",
        "name": "crawford",
        "screen_name": "crawfteevee",
        "location": "",
        "description": "My timeline is aglow with whirling, transient nodes of thought careening through a cosmic vapor of invention.",
        "url": "https://t.co/GdebRWSrBj",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/GdebRWSrBj",
                "expanded_url": "http://CrawfordC.com",
                "display_url": "CrawfordC.com",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 32,
        "friends_count": 141,
        "listed_count": 0,
        "created_at": "Fri Jan 19 21:08:32 +0000 2018",
        "favourites_count": 1053,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 117,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1123656509064470528/2xej1cT6_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1123656509064470528/2xej1cT6_normal.jpg",
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
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0099,
      "insult": 0.9874,
      "obscene": 0.0244,
      "severe_toxic": 0.0045,
      "threat": 0.0027,
      "toxic": 0.9352
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:50:09 +0000 2019",
      "id": 1128447439130759168,
      "id_str": "1128447439130759168",
      "full_text": "@DstarDev Mother-fuck the Republicans",
      "truncated": false,
      "display_text_range": [
        0,
        37
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
        "id": 1102738438170783745,
        "id_str": "1102738438170783745",
        "name": "Mark Oliver",
        "screen_name": "lambdamark",
        "location": "",
        "description": "student at https://t.co/1odsLkqU6b",
        "url": null,
        "entities": {
          "description": {
            "urls": [
              {
                "url": "https://t.co/1odsLkqU6b",
                "expanded_url": "https://lambdaschool.com/courses/data-science/",
                "display_url": "lambdaschool.com/courses/data-s…",
                "indices": [
                  11,
                  34
                ]
              }
            ]
          }
        },
        "protected": false,
        "followers_count": 0,
        "friends_count": 4,
        "listed_count": 0,
        "created_at": "Tue Mar 05 01:11:46 +0000 2019",
        "favourites_count": 5,
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
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.1482,
      "insult": 0.6485,
      "obscene": 0.9888,
      "severe_toxic": 0.1584,
      "threat": 0.0029,
      "toxic": 0.9986
    }
  },
  {
    "tweet": {
      "created_at": "Tue May 14 23:49:35 +0000 2019",
      "id": 1128447295564001285,
      "id_str": "1128447295564001285",
      "full_text": "@DstarDev The troll is strong with this one.",
      "truncated": false,
      "display_text_range": [
        0,
        44
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
        "id": 284588188,
        "id_str": "284588188",
        "name": "Donald Whitely",
        "screen_name": "TheDonRockz",
        "location": "Corydon, IN",
        "description": "",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 65,
        "friends_count": 506,
        "listed_count": 0,
        "created_at": "Tue Apr 19 15:28:34 +0000 2011",
        "favourites_count": 6,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": true,
        "verified": false,
        "statuses_count": 547,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "000000",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme15/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme15/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/378800000668140559/cbe951338b7ba511ca59c9ffb937b9f6_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000668140559/cbe951338b7ba511ca59c9ffb937b9f6_normal.jpeg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/284588188/1557521076",
        "profile_link_color": "1B95E0",
        "profile_sidebar_border_color": "000000",
        "profile_sidebar_fill_color": "000000",
        "profile_text_color": "000000",
        "profile_use_background_image": false,
        "has_extended_profile": true,
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
      "retweet_count": 0,
      "favorite_count": 0,
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
      "created_at": "Tue May 14 23:30:19 +0000 2019",
      "id": 1128442447690969088,
      "id_str": "1128442447690969088",
      "full_text": "@DstarDev I got the wrong guy before but YOU smell like poop, YOU lame chicken neck butthead. I hate how I can smell YOU through a computer screen. YOU are a trash queen and a lint licker!",
      "truncated": false,
      "display_text_range": [
        0,
        188
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
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": 1123316691100786688,
      "in_reply_to_user_id_str": "1123316691100786688",
      "in_reply_to_screen_name": "DstarDev",
      "user": {
        "id": 370492065,
        "id_str": "370492065",
        "name": "Erick Todd II",
        "screen_name": "RickiTickiToddi",
        "location": "",
        "description": "@LambdaSchool",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 272,
        "friends_count": 268,
        "listed_count": 2,
        "created_at": "Fri Sep 09 03:33:18 +0000 2011",
        "favourites_count": 279,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 47,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "000000",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme3/bg.gif",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme3/bg.gif",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1104457595300003840/8c6tRTx5_normal.png",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1104457595300003840/8c6tRTx5_normal.png",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/370492065/1552158390",
        "profile_link_color": "6F2E96",
        "profile_sidebar_border_color": "000000",
        "profile_sidebar_fill_color": "000000",
        "profile_text_color": "000000",
        "profile_use_background_image": false,
        "has_extended_profile": true,
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
      "retweet_count": 0,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "lang": "en"
    },
    "bert_result": {
      "identity_hate": 0.0059,
      "insult": 0.9895,
      "obscene": 0.141,
      "severe_toxic": 0.0022,
      "threat": 0.0012,
      "toxic": 0.904
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