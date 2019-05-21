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
import {  Router, withRouter } from "react-router-dom";


const fabDesign = {
  // margin: theme.spacing.unit,
  position: 'fixed',
  top: '4rem',
  left: '1rem',
  zIndex: '5',
}



class BackButton extends React.Component {

  render() {
    return (
      <div>
        <Fab variant="outlined" color="primary" style={fabDesign} onClick={this.props.history.goBack}>
          <FontAwesomeIcon icon={faArrowCircleLeft} size="2x" color='white' />
        </Fab>
      </div>
    );
  }
}


// const mapActionsToProps = {
  
// }

// export default connect(mapStateToProps)(BackButton);

export default withRouter(BackButton);