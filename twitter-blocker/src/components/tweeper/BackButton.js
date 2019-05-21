import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import atoms from '../atoms';
import { addPost, getUser } from '../../actions';
import { connect } from 'react-redux';
import {  Router } from "react-router-dom";


const fabDesign = {
  // margin: theme.spacing.unit,
  position: 'fixed',
  top: '4rem',
  left: '1rem',
  zIndex: '5',
}



class BackButton extends React.Component {
 
    // static contextTypes = {
    //     router: () => true, // replace with PropTypes.object if you use them
    //   }

//   componentDidMount() {
//     // this.props.getUser(localStorage.getItem("twitter_user_id"))
//     // if (localStorage.getItem("twitter_user_id")) {
//     //   this.setState({ twitter_user_id: localStorage.getItem("twitter_user_id") })
//     // }
//     // localStorage.getItem("twitter_user_id")
//     // console.log("++++++++++++++this.props.currentUser", this.props.currentUser)
//   }

//   handleBack = () => {
//     this.setState({ open: true });
//   };


  render() {
    return (
      <div>
        <Fab variant="outlined" color="primary" style={fabDesign} onClick={this.props.history.push.goBack}>
          <FontAwesomeIcon icon={faArrowCircleLeft} size="2x" color='white' />
        </Fab>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   listMembers: state.listsReducer.listMembers,
//   posts: state.tweetsReducer.posts
// });

// const mapActionsToProps = {
  
// }

// export default connect(mapStateToProps)(BackButton);

export default BackButton;