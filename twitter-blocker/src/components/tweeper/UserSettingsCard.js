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
import jwt from 'jsonwebtoken';

import { deleteUser } from '../../actions'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

require('dotenv').config();

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
let decoded = null
if (localStorage.getItem("token")) {
  decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
}

class UserSettingsCard extends React.Component {
  constructor(props) {
    super(props)
  }
  deleteAccount = () => {
    this.props.deleteUser(decoded.id)
    // e.preventDefault()
    console.log("Decoded id", decoded.id)
    console.log("Deleted")
    localStorage.removeItem("token");
    this.props.history.push('/')
  }
  render() {
    console.log(this.props)

    const { classes } = this.props;

    return (
      <Card className={classes.card} style={{ margin: "auto", marginTop: "2rem" }}>
        <CardActionArea>
          <Avatar
            src={decoded.profile_img}
            style={avatarStyle} alt="Your Profile Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {decoded.displayName}
            </Typography>
            <Typography component="p">
              {decoded.username}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button size="small" color="primary">
          Share
        </Button> */}
          <Button size="small" color="primary" style={{ margin: "auto" }} onClick={() => this.deleteAccount()}>
            Deactivate Your Larkist Account
        </Button>
        </CardActions>
      </Card>
    );
  }
}

// UserSettingsCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const styledComponent = withStyles(styles)(UserSettingsCard);

const mapStateToProps = state => ({
  // publicLists: state.listsReducer.publicLists
});

export default withRouter(connect(
  mapStateToProps,
  { deleteUser }
)(styledComponent));

