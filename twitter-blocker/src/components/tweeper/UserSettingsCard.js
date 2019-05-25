import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import atoms from '../../components/atoms';
// import molecules from '../../components/molecules';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import jwt from 'jsonwebtoken';

import { getUser, deleteUser } from '../../actions'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

require('dotenv').config();

const { Avatar } = atoms;

const avatarStyle = {
  // marginLeft: '8px',
  margin: 'auto',
  marginTop: '24px'
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
    this.state = {
      open: false,
      profilePic: '',
      displayName: '',
      username: '',
      banner_img: '',
  }
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.props.getUser(decoded.id)
      this.setState({ twitter_user_id: decoded.id })
      this.setState({ displayName: decoded.displayName })
      this.setState({ profilePic: decoded.profile_img })
      this.setState({ username: decoded.username })
      this.setState({ banner_img: decoded.banner_img })
      // console.log("Profile DECODED", decoded)
    }
  }

  deleteAccount = () => {
    this.props.deleteUser(decoded.id)
    // e.preventDefault()
    // console.log("Decoded id", decoded.id)
    // console.log("Deleted")
    localStorage.removeItem("token");
    this.props.history.push('/')
  }
  render() {
    // console.log(this.props)

    const { classes } = this.props;

    return (
      <Card className={classes.card} style={{ margin: "auto", marginTop: "2rem" }}>
        <CardActionArea>
          <Avatar
            src={this.state.profilePic}
            style={avatarStyle} alt="Your Profile Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.displayName}
            </Typography>
            <Typography component="p">
              {this.state.username}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button size="small" color="primary">
          Share
        </Button> */}
          <Button size="small" color="secondary" style={{ margin: "auto" }} onClick={this.handleClickOpen }>
            Deactivate Your Larkist Account
        </Button>
        </CardActions>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
       <DialogTitle id="form-dialog-title">Are You Sure You Want to Deactivate?</DialogTitle>
       <DialogContent>
         <DialogContentText>
           We hate to see you go, but at least we will always have lists...
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={this.handleClose} color="secondary">
           Oops, No Way!
         </Button>
         <Button onClick={() => this.deleteAccount()} color="primary">
           Yes, Deactivate My Larkist Account
         </Button>
       </DialogActions>
     </Dialog>

      </Card>
      

    );
  }
}

// onClick={() => this.deleteAccount()}

// UserSettingsCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const styledComponent = withStyles(styles)(UserSettingsCard);

const mapStateToProps = state => ({
  // publicLists: state.listsReducer.publicLists
});

export default withRouter(connect(
  mapStateToProps,
  { getUser, deleteUser }
)(styledComponent));

