import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';

const { Avatar } = atoms;

const avatarStyle = {
    // marginLeft: '8px',
    margin: 'auto',
    marginTop: '8px'
  }

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function UserSettingsCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} style={{ margin:"auto", marginTop: "2rem"}}>
      <CardActionArea>
        <Avatar 
            src={localStorage.getItem("profile_img")} 
            style={avatarStyle} alt="Your Profile Image" 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {localStorage.getItem("displayName")} 
          </Typography>
          <Typography component="p">
          {localStorage.getItem("username")} 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Button size="small" color="primary" style={{ margin:"auto"}}>
          Deactivate Your PEREGRINE Account
        </Button>
      </CardActions>
    </Card>
  );
}

UserSettingsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSettingsCard);