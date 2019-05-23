import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
// import { unstable_Box as Box } from '@material-ui/core/Box';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRetweet, faCommentAlt, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import atoms from '../atoms';

const useStyles = makeStyles({
  root: {
    padding: '1rem 10px',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center'
  },
});

const { Avatar, Typography } = atoms;

function Tweet(props) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>

      <Grid container spacing={16} wrap="nowrap">
        <Grid item>
          <Avatar
            medium
            src={
              props.profileImg
            }
          />
        </Grid>
        <Grid item>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography bold inline>
                {props.name}
              </Typography>{' '}
              <Typography light inline>
                {props.screen_name}
              </Typography>{' '}
              {/* <Typography light inline>
                ·
              </Typography>{' '} */}
              <Typography light inline>
                {props.created_at}
              </Typography>
              <Typography>
                {props.text}
                </Typography>
            </Grid>
            {/* <Grid item xs={12}>
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
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Tweet;