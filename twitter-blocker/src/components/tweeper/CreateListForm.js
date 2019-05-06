import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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
});

class CreateListForm extends Component {
  state = {}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
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
                id="outlined-name"
                label="Required"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
            </form>
          </FormControl>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(CreateListForm);