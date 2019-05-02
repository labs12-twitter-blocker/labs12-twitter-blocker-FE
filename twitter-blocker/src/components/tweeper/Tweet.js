import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import { unstable_Box as Box } from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faCommentAlt, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import atoms from '../atoms';

const useStyles = makeStyles({
  root: {
    padding: '1rem 10px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const { Avatar, IconButton, Icon, Typography } = atoms;

function Tweet() {
  const classes = useStyles();

  return (
    <ListItem button className={classes.root}>
      <Box mb="5px">
        <Grid container spacing={8}>
          <Grid item>
            <Box
              display="flex"
              height="100%"
              justifyContent="flex-end"
              alignItems="center"
              minWidth={49}
            >
              <FontAwesomeIcon icon={faRetweet} color='#38A1F3'/>
            </Box>
          </Grid>
          <Grid item>
            <Typography light>You Retweeted</Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={8} wrap="nowrap">
        <Grid item>
          <Avatar
            medium
            src={
              './assets/dan.png'
            }
          />
        </Grid>
        <Grid item>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography bold inline>
                Daniel
              </Typography>{' '}
              <Typography light inline>
                @Dstar3248
              </Typography>{' '}
              <Typography light inline>
                ·
              </Typography>{' '}
              <Typography light inline>
                April 19
              </Typography>
              <Typography>
                This was my latest buildweeks project for @LambdaSchool. It is really fun to collaborate from different sections of Lambda School to build a project in 4 days.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box ml="-12px" display="inline-flex" alignItems="center">
                <IconButton>
                  <FontAwesomeIcon icon={faCommentAlt} color='#38A1F3'/>
                </IconButton>
                <Typography light inline>
                  24
                </Typography>
              </Box>
              <Box ml="32px" display="inline-flex" alignItems="center">
                <IconButton success>
                  <FontAwesomeIcon icon={faRetweet} color='#38A1F3'/>
                </IconButton>
                <Typography light inline success>
                  122
                </Typography>
              </Box>
              <Box ml="32px" display="inline-flex" alignItems="center">
                <IconButton danger>
                  <FontAwesomeIcon icon={faHeart} color='#ff0000'/>
                </IconButton>
                <Typography light inline danger>
                  661
                </Typography>
              </Box>
              <Box ml="32px" display="inline-flex" alignItems="center">
                <IconButton>
                  <FontAwesomeIcon icon={faEnvelope} color='#38A1F3'/>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Tweet;