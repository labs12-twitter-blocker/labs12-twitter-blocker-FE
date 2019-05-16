import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addList, createList, getUser } from '../../actions';
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
    marginTop: 10,
  },
  menu: {
    width: 200,
  },
});

class CreateListForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      mode: 'public',
      description: "",
      user1: "",
      user2: "",
      user3: "",
      user4: "",
      user5: "",
      titleHelperText: "",
      descrHelperText: "",
      user1HelperText: "",
      user2HelperText: "",
      user3HelperText: "",
      user4HelperText: "",
      user5HelperText: "",
      search_users: null,
      listParams: null,
      newListResponseUpdated: false,
      titleError: false,
      descrError: false,
      user1Error: false,
      user2Error: false,
      user3Error: false,
      user4Error: false,
      user5Error: false,
      buttonDisabled: false
    }
  };
  componentDidMount() {
    this.props.getUser(localStorage.getItem("twitter_user_id"))
    if (localStorage.getItem("twitter_user_id")) {
      this.setState({ twitter_user_id: localStorage.getItem("twitter_user_id") })
    }
    localStorage.getItem("twitter_user_id")
    console.log("++++++++++++++this.props.currentUser", this.props.currentUser)
  }

  handleTitleChange = event => {
    if (event.target.value.length > 0) {
      this.setState({ title: event.target.value, titleHelperText: "", titleError: false });
    } else {
      this.setState({ titleHelperText: 'Please enter a title for your list', titleError: true });
    }
  };

  handleDescriptionChange = event => {
    if (event.currentTarget.value.length > 0) {
      this.setState({ description: event.target.value, descrHelperText: "", descrError: false });
    } else {
      this.setState({ descrHelperText: 'Please enter a description of your list', descrError: true });
    }
  };

  handleUser1Change = event => {
    if (event.target.value.length > 0) {
      this.setState({ user1: event.target.value, user1HelperText: "", user1Error: false });
    } else {
      this.setState({ user1HelperText: 'Please enter a Twitter user', user1Error: true });
    }
  };

  handleUser2Change = event => {
    if (event.currentTarget.value.length > 0) {
      this.setState({ user2: event.target.value, user2HelperText: "", user2Error: false });
    } else {
      this.setState({ user2HelperText: 'Please enter a Twitter user', user2Error: true });
    }
  };

  handleUser3Change = event => {
    if (event.currentTarget.value.length > 0) {
      this.setState({ user3: event.target.value, user3HelperText: "", user3Error: false });
    } else {
      this.setState({ user3HelperText: 'Please enter a Twitter user', user3Error: true });
    }
  };

  handleUser4Change = event => {
    if (event.currentTarget.value.length > 0) {
      this.setState({ user4: event.target.value, user4HelperText: "", user4Error: false });
    } else {
      this.setState({ user4HelperText: 'Please enter a Twitter user', user4Error: true });
    }
  };

  handleUser5Change = event => {
    if (event.currentTarget.value.length > 0) {
      this.setState({ user5: event.target.value, user5HelperText: "", user5Error: false });
    } else {
      this.setState({ user5HelperText: 'Please enter a Twitter user', user5Error: true });
    }
  };

  handlePrivateChange = event => {
    this.setState({ mode: event.target.value });
  };

  canBeSubmitted() {
    const { title, description, user1, user2, user3, user4, user5 } = this.state;
    return title.length > 0 && description.length > 0 && user1.length > 0 && user2.length > 0 && user3.length > 0 && user4.length > 0 && user5.length > 0
  }

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    const id = localStorage.getItem("twitter_user_id")
    console.log("ID____________________", id);
    console.log("TOKEN", token);
    // let search_users = [ this.state.user1, this.state.user2, this.state.user3, this.state.user4, this.state.user5 ]
    console.log("THIS.STATE", this.state);
    // console.log("search_users", search_users);
    // this.setState({ search_users: search_users });

    // const params = {
    //   "name": this.state.title,
    //   "user_id": id,
    //   "original_user": username,
    //   "TWITTER_ACCESS_TOKEN": token,
    //   "search_users": search_users
    // }

    const listParams = {
      "user_id": id,
      "name": this.state.title,
      "mode": this.state.mode,
      "description": this.state.description
    }

    this.setState({ listParams: listParams });

    this.setState({ ...this.state });
    this.props.createList(listParams); //POST to /list/create to make a new list
    // this.props.addList(params); //POST to /list to add users to the list
    // console.log("I'm firing");
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("CDUpdate");
    console.log("this.props.listParams", this.props.listParams);
    console.log("this.props.newListResponseUpdated", this.props.newListResponseUpdated);
    console.log("this.state.newListResponseUpdated", this.state.newListResponseUpdated);
    console.log("this.props.newListResponse", this.props.newListResponse);

    if (this.props.newListResponseUpdated !== prevProps.newListResponseUpdated) {
      console.log("CDU IF 1");
      this.setState({ newListResponseUpdated: this.props.newListResponseUpdated })
    }
    // console.log("this.props.newListResponse.id_str", this.props.newListResponse.id_str);


    if (this.state.newListResponseUpdated !== prevState.newListResponseUpdated) {
      console.log("CDU IF 2");

      let completeList = {
        "user_id": localStorage.getItem("twitter_user_id"),
        "name": this.props.newListResponse.name,
        "original_user": this.props.newListResponse.user.screen_name,
        "mode": this.props.newListResponse.mode,
        "description": this.props.newListResponse.description,
        "id": this.props.newListResponse.id_str,
        "search_users": [this.state.user1, this.state.user2, this.state.user3, this.state.user4, this.state.user5]
      }
      console.log("~~~~~~~~~~~~~~~~~completeList", completeList);
      this.props.addList(completeList);
    }
  }

  // if (this.props.userID !== prevProps.userID) {
  //   this.fetchData(this.props.userID);
  // }


  render() {
    const { classes } = this.props;
    const isEnabled = this.canBeSubmitted();


    return (
      <>
        {/* //////-----Enter Title Name-------///////// */}

        <h2>Please enter the title of your list</h2>
        <TextField
          required
          name="title"
          id="outlined-required"
          label="Required"
          placeholder="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleTitleChange}
          margin="normal"
          variant="outlined"
          inputProps={{ maxLength: 16 }}
          helperText={this.state.titleHelperText}
          error={this.state.titleError}
        />

        {/* /////-----Enter description-------/////////    */}

        <h2>Enter a description of your list (optional)</h2>
        <TextField
          required
          name="description"
          id="outlined-name"
          label="Required"
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          margin="normal"
          variant="outlined"
          helperText={this.state.descrHelperText}
          error={this.state.descrError}
        />

        {/* /////-----Is The List Private-------/////////  */}

        <h2>Do you want your list to be private?</h2>
        <h4>Public</h4>
        <Radio
          checked={this.state.mode === 'public'}
          onChange={this.handlePrivateChange}
          value="public"
          name="radio-button-demo"
          aria-label="A"
        />
        <h4>Private</h4>
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
                required
                name="user1"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user1}
                onChange={this.handleUser1Change}
                margin="normal"
                variant="outlined"
                helperText={this.state.user1HelperText}
                error={this.state.user1Error}
              />
              <TextField
                required
                name="user2"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user2}
                onChange={this.handleUser2Change}
                margin="normal"
                variant="outlined"
                helperText={this.state.user2HelperText}
                error={this.state.user2Error}
              />
              <TextField
                required
                name="user3"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user3}
                onChange={this.handleUser3Change}
                margin="normal"
                variant="outlined"
                helperText={this.state.user3HelperText}
                error={this.state.user3Error}
              />
              <TextField
                required
                name="user4"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user4}
                onChange={this.handleUser4Change}
                margin="normal"
                variant="outlined"
                helperText={this.state.user4HelperText}
                error={this.state.user4Error}
              />
              <TextField
                required
                name="user5"
                id="outlined-name"
                label="Username"
                className={classes.textField}
                value={this.state.user5}
                onChange={this.handleUser5Change}
                margin="normal"
                variant="outlined"
                helperText={this.state.user5HelperText}
                error={this.state.user5Error}
              />
            </form>
          </FormControl>
        </form>
        <Button
          medium
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
          disabled={!isEnabled}
        >
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
  listMembers: state.listsReducer.listMembers,
  newListResponse: state.listsReducer.newListResponse,
  newListResponseUpdated: state.listsReducer.newListResponseUpdated
});


const styledComponent = withStyles(styles)(CreateListForm);

export default connect(
  mapStateToProps,
  { addList, createList, getUser }
)(styledComponent);