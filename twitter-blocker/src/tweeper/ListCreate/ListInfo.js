import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';


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

class ListInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'public',
      name: '',
      description: ''
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = e => {
    console.log(e.target.value);
    this.setState({
      mode: e.target.value
    }
    )
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2>Please enter the title of your list</h2>
        <TextField
          required
          id="outlined-required"
          label="Required"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Description"
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <Radio
          checked={this.state.mode === 'private'}
          value={this.state.mode}
          onChange={this.handleSelect}
          name="radio-button-demo"
          aria-label="Private List"
        />
      </div>
    );
  }
}

ListInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListInfo);