import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function DeleteButton(props) {
  const { classes } = props;
  return (
    <div>
      <h4>Deactivate Your Flock Profile</h4>
      <Button color="primary" variant="contained" className={classes.button}>
        Delete Your Flock Account
      </Button>
    </div>
  );
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteButton);

// const mapStateToProps = state => ({
//     publicLists: state.listsReducer.publicLists
//     });
    
  
//   const styledComponent = withStyles(styles)(PublicListsTable);
  
//   export default connect(
//     mapStateToProps,
//     { getPublicLists }
//   )(styledComponent);