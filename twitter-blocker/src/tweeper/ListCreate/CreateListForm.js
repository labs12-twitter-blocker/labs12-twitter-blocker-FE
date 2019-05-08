import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addList, createList } from '../../actions';
import { connect } from "react-redux";


const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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
});

class CreateListForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      mode: 'public',
      description: '',
      user1: '',
      user2: '',
      user3: '',
      user4: '',
      user5: ''
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlePrivateChange = event => {
    this.setState({ mode: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addList(this.state);
    this.props.createList(this.state);
    this.setState({ list: { ...this.state } });
    console.log("I'm firing")
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        {/* //////-----Enter Title Name-------///////// */}

        <h2>Please enter the title of your list</h2>
        <TextField
          required
          name="title"
          id="outlined-required"
          label="Required"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />

        {/* /////-----Enter description-------/////////    */}

        <h2>Enter a description of your list (optional)</h2>
        <TextField
          name="description"
          id="outlined-name"
          label="Description"
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />

        {/* /////-----Is The List Private-------/////////  */}

        <h2>Do you want your list to be private?</h2>
        <p>Public</p>
        <Radio
          checked={this.state.mode === 'public'}
          onChange={this.handlePrivateChange}
          value="public"
          name="radio-button-demo"
          aria-label="A"
        />
        <p>Private</p>
        <Radio
          checked={this.state.mode === 'private'}
          onChange={this.handlePrivateChange}
          value="private"
          name="radio-button-demo"
          aria-label="A"
        />

        {/* /////-----Enter 5 Usernames-------///////// */}
        <h3>Please enter 5 Twitter users to influence your list</h3>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
            <form
              value={this.state.maxWidth}
              // onChange={this.handleMaxWidthChange}
              inputProps={{
                name: 'max-width',
                id: 'max-width',
              }}
            >
              <TextField
                name="user1"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user1}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="user2"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user2}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="user3"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user3}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="user4"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user4}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="user5"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user5}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            </form>
          </FormControl>
        </form>
        <Button medium color="primary" variant="contained" onClick={this.handleSubmit}>
          Generate New List
               </Button>
      </>
    );
  }
}

CreateListForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(CreateListForm);

const mapStateToProps = state => ({
  listMembers: state.listsReducer.listMembers
});


const styledComponent = withStyles(styles)(CreateListForm);

export default connect(
  mapStateToProps,
  { addList, createList }
)(styledComponent);