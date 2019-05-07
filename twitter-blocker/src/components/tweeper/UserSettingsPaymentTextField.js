import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
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


class UserSettingsPaymentTextField extends React.Component {
  state = {
    creditCard: '',
    expirationDate: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
 
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Credit Card Number"
          className={classes.textField}
          value={this.state.creditCard}
          onChange={this.handleChange('creditCard')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="CC Expiration"
          className={classes.textField}
          value={this.state.expirationDate}
          onChange={this.handleChange('expirationDate')}
          margin="normal"
          variant="outlined"
        />
          <TextField
          id="outlined-name"
          label="Street Address"
          className={classes.textField}
          value={this.state.streetAddress}
          onChange={this.handleChange('streetAddress')}
          margin="normal"
          variant="outlined"
        />
          <TextField
          id="outlined-name"
          label="City"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
          variant="outlined"
        />
          <TextField
          id="outlined-name"
          label="State"
          className={classes.textField}
          value={this.state.state}
          onChange={this.handleChange('state')}
          margin="normal"
          variant="outlined"
        />
           <TextField
          id="outlined-name"
          label="Zip"
          className={classes.textField}
          value={this.state.zip}
          onChange={this.handleChange('zip')}
          margin="normal"
          variant="outlined"
        />

       
      </form>
    );
  }
}

UserSettingsPaymentTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSettingsPaymentTextField);