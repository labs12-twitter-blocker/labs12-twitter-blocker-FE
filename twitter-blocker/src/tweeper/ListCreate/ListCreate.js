import React from 'react';
import CreateListForm from './CreateListForm';
import GeneratedList from './GeneratedList';
import HeaderTest from '../../tests/HeaderTest';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withTheme from '../withTheme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from '@material-ui/styles/styled';
import theme from '../../theme/tweeper/theme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider/Divider';
import TweetFloat from '../../components/tweeper/TweetFloat.js'
import BackButton from '../../components/tweeper/BackButton.js'


const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  createPageHeader: {
    paddingTop: 1
  }
});

const Content = styled('div')({
  maxWidth: 1000,
  paddingTop: theme.spacing.unit,
  padding: theme.spacing.unit * 4,
  margin: 'auto',
});

const Feed = styled('div')({
  backgroundColor: '#fff',
});


class ListCreate extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'lg',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };


  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Content>
          <Feed>
            <div className={classes.createPageHeader}>
              <h1>Create Your List</h1>
            </div>
            <CreateListForm />
          </Feed>
          {/* <TweetFloat /> */}
        </Content>
      </React.Fragment>
    );
  }
}

ListCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent = withTheme(theme)(ListCreate);

export default withStyles(styles)(styledComponent);