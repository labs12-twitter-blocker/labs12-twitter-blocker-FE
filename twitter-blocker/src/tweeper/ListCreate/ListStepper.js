import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import styled from '@material-ui/styles/styled';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import BackButton from '../../components/tweeper/BackButton'
import { dsList, createList, getUser } from '../../actions';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import {
  List,
  ListItem,
  Tabs, Tab,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import atoms from '../../components/atoms';

import jwt from 'jsonwebtoken';
const { Avatar, Icon, Typography, Button } = atoms;
require('dotenv').config();

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
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 350
  },
  dense: {
    marginTop: 10,
  },
  menu: {
    width: 200,
  },
  listForm: {
    padding: 15
  },
  membersList: {
    padding: 0
  },
  chip: {
    margin: theme.spacing.unit,
  }
});

const ButtonText = styled('div')({
  fontSize: 18
})

const TopLine = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const ProfileNameImg = styled('div')({
  display: 'flex',
  width: '50%',
  alignItems: 'center',
})

const ProfileName = styled(Typography)({
  fontWeight: 'bold',
  fontFamily: 'Helvetica Neue',
})


class MemberModal extends React.Component {
  state = {
    checked: [],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  selectAll = () => {
    if (this.state.checkedAll)
      this.setState({ checked: [] });
    else
      this.setState({ checked: this.props.dsLists });
    this.setState({ checkedAll: !this.state.checkedAll });
  }

  handleCreateList = () => {
    let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
    // console.log("this.state.checked", this.state.checked)
    let screen_name = []
    this.state.checked.map(e => {
      screen_name.push(e.screen_name)
    })

    // console.log("screen_name", screen_name)
    const listParams = {
      "user_id": decoded.id,
      "name": this.props.title,
      "mode": this.props.mode,
      "description": this.props.description,
      "screen_name": screen_name.toString()
    }
    console.log("listParams", listParams)

    this.props.createList(listParams)
  }

  render() {
    const { dsLists, classes, createList } = this.props;
    const { checkedAll, checked } = this.state;
    return (
      <>
        <DialogTitle id="form-dialog-title">Select Members to Add to List
        <Typography color="textPrimary" variant='body2'>
            {checkedAll ? "Select None" : "Select all"}
            <Checkbox
              checked={this.state.open}
              value="Select all"
              onClick={this.selectAll}
              color="primary"
            />
          </Typography>
        </DialogTitle>
        {console.log("checked", checked)}
        <DialogContent>
          {dsLists.map((e, index) => {
            return (
              <List key={e.id_str} dense>
                <ListItem
                  alignItems="flex-start"
                  dense={true}
                  button onClick={this.handleToggle(e)}
                  classes={{ root: classes.membersList }}
                >
                  <ListItemAvatar>
                    <Avatar src={e.profile_image_url_https} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography={true}
                    primary={
                      <Typography color="textPrimary" variant='body2'>
                        {e.name} @{e.screen_name}
                      </Typography>}
                    secondary={
                      // <React.Fragment>
                      <Typography component="span" className={classes.inline} color="textSecondary" variant='caption'>
                        {e.description}
                      </Typography>
                      // </React.Fragment>
                    }
                  />
                  <Checkbox
                    checked={this.state.checked.indexOf(e) !== -1}
                    tabIndex={-1}
                    color="primary"
                  // disableRipple
                  />
                </ListItem>
                <Divider />
              </List>
            )
          })}
        </DialogContent>

        <DialogActions>
          {console.log("can we get it", checked)}
          {/* this.props.createList(listParams) */}
          <Button onClick={this.handleCreateList} color="primary">
            Continue
          </Button>
        </DialogActions>
      </>
    )
  };
};

MemberModal.propTypes = {
  // classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
};

MemberModal = withStyles(styles)(MemberModal);



class ListStepper extends React.Component {
  constructor() {
    super();
    this.handleKeypress = this.handleKeypress.bind(this);

    this.state = {
      activeStep: 0,
      title: "",
      mode: 'public',
      description: "",
      username: "",
      twitterHandles: [],
      user1: "",
      user2: "",
      user3: "",
      user4: "",
      user5: "",
      titleHelperText: "",
      descrHelperText: "",
      user1HelperText: "",
      search_users: null,
      listParams: null,
      newListResponseUpdated: false,
      titleError: false,
      descrError: false,
      user1Error: false,
      buttonDisabled: false,
      open: false,
      skipped: new Set(),
    };
    this.lastId = -1;
  };

  isStepOptional = step => step === 0;

  isStepFailed = step => step === 0;

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let decoded = jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_SESSION_SECRET);
      this.setState({ twitter_user_id: decoded.id })
      this.props.getUser(decoded.id)
    }
  }

  handleTitleChange = event => {
    if (event.target.value.length === 0) {
      this.setState({ title: event.target.value, titleHelperText: 'Please enter a title for your list', titleError: true });
    } else {
      this.setState({ title: event.target.value, titleHelperText: "", titleError: false });
    }
  };

  handleDescriptionChange = event => {
    if (event.currentTarget.value.length > 0) {
      this.setState({ description: event.target.value, descrHelperText: "", descrError: false });
    } else {
      this.setState({ description: event.target.value, descrHelperText: 'Please enter a description of your list', descrError: true });
    }
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleSetTwitterHandle = event => {
    this.setState({ value: event.target.value });
  };

  handleKeypress(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      const newArray = this.state.twitterHandles;
      const currentcontent = this.state.username.trim();
      if (!currentcontent) {
        return;
      }
      newArray.push({
        username: currentcontent
      });
      this.setState({
        twitterHandles: newArray,
        username: "",
      });
    }
  }

  handlePrivateChange = event => {
    this.setState({ mode: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  canBeSubmitted() {
    const { title, description, user1, user2, user3, user4, user5 } = this.state;
    return title.length > 0 && description.length > 0 && user1.length > 0
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleDelete = data => () => {
    this.setState(state => {
      const twitterHandles = [...state.twitterHandles];
      const chipToDelete = twitterHandles.indexOf(data);
      twitterHandles.splice(chipToDelete, 1);
      return { twitterHandles };
    });
  };

  handleSubmit = e => {
    console.log("++++++++open+++++++++++this.state.open", this.state.open)
    e.preventDefault();


    console.log("++++++++open+++++++++++this.state.open", this.state.open)


    const token = localStorage.getItem("token");
    // const username = localStorage.getItem("username")
    // const id = localStorage.getItem("twitter_user_id")
    // console.log("ID____________________", id);
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
      "user_id": this.state.twitter_user_id,
      "original_user": this.state.twitter_user_id,
      "name": this.state.title,
      "mode": this.state.mode,
      "description": this.state.description,
      "search_users": this.state.twitterHandles
    }

    this.setState({ listParams: listParams });

    this.setState({ ...this.state });
    // this.props.createList(listParams); //POST to /list/create to make a new list
    this.props.dsList(listParams); //POST to /list to add users to the list
    // console.log("I'm firing");
    this.handleClickOpen()

  };

  handlePopoverClose = () => {
    this.setState({ open: null })
  }

  getSteps() {
    return ['Title', 'Description', 'Privacy', 'Users'];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant='h6' color='primary'>Please enter the title of your list</Typography>
            <TextField
              required
              name="title"
              id="outlined-required"
              label="Required"
              placeholder="Title"
              className={this.props.classes.textField}
              value={this.state.title}
              onChange={this.handleTitleChange}
              margin="normal"
              variant="outlined"
              inputProps={{ maxLength: 25 }}
              helperText={this.state.titleHelperText}
              error={this.state.titleError}
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography variant='h6' color='primary'>Please enter the list description</Typography>
            <TextField
              required
              name="description"
              id="outlined-multiline-static"
              label="Required"
              placeholder="What is this list for? What kind of people are in this list? Is there an overall theme?"
              multiline
              rows="4"
              className={this.props.classes.textField}
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              inputProps={{ maxLength: 100 }}
              margin="normal"
              variant="outlined"
              helperText={this.state.descrHelperText}
              error={this.state.descrError}
            />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant='h6' color='primary'>Is this a public or private list?</Typography>
            <FormControl
              className={this.props.classes.formControl}
              variant="outlined">
              <Select
                value={this.state.mode}
                onChange={this.handlePrivateChange}
                margin="dense"
                input={
                  <OutlinedInput
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    name="age"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value={"public"}>Public</MenuItem>
                <MenuItem value={"private"}>Private</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant='h6' color='primary'>Please enter atleast 1 Twitter user. The more usernames, the more accurate your list will be.</Typography>
            {/* <form className={this.props.classes.form} noValidate > */}
            <FormControl className={this.props.classes.formControl} >
              {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
              <form
                value={this.state.maxWidth}
                onChange={this.handleMaxWidthChange}
              >
                <TextField
                  required
                  name="user1"
                  id="outlined-name"
                  label="Required"
                  placeholder="Once you type in a username, hit enter"
                  className={this.props.classes.textField}
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  onKeyPress={this.handleKeypress}
                  margin="normal"
                  variant="outlined"
                  helperText={this.state.user1HelperText}
                  error={this.state.user1Error}
                />

                <div>
                  {this.state.twitterHandles.map(data => {
                    let icon = null;

                    return (
                      <Chip
                        className={this.props.classes.chip}
                        color="primary"
                        onDelete={this.handleDelete(data)}
                        label={data.username}
                        icon={<FaceIcon />}
                        variant="default"
                      />
                    );
                  })}
                </div>
              </form>
            </FormControl>
            {/* </form> */}
          </>);
      default:
        return 'Unknown step';
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("CDUpdate");
    console.log("this.props.listParams", this.props.listParams);
    console.log("this.props.newListResponseUpdated", this.props.newListResponseUpdated);
    console.log("this.state.newListResponseUpdated", this.state.newListResponseUpdated);
    console.log("this.props.newListResponse", this.props.newListResponse);

    // The list has been created successfully, push to that page
    if (this.props.newListResponseUpdated) {
      console.log("CDU IF 1");
      console.log("this.props.newListResponse", this.props.newListResponse);
      // this.setState({ newListResponseUpdated: this.props.newListResponseUpdated })
      this.props.history.push(`/details/${this.props.newListResponse.id_str}`)
    }
    // console.log("this.props.newListResponse.id_str", this.props.newListResponse.id_str);

    // if (this.state.newListResponseUpdated !== prevState.newListResponseUpdated) {
    //   console.log("CDU IF 2");
    //   console.log("this.props.newListResponse", this.props.newListResponse);
    //   // this.props.history.push("/details/:twitter_list_id");
    // }
    // console.log("++++++++open+++++++++++this.state.open", this.state.open)
  }

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };


  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleDisableNext = (activeStep) => {
    if (activeStep === 0 && this.state.title.length === 0) {
      return true
    } else if (activeStep === 1 && this.state.description.length === 0) {
      return true
    } else if (activeStep === 3 && this.state.user1.length === 0) {
      return true
    } else { return false }
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.resetContainer}>
          <BackButton />
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {/* <Typography> */}
                  {this.getStepContent(index)}
                  {/* </Typography> */}
                  <div className={classes.actionsContainer}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                      </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      disabled={this.handleDisableNext(activeStep)}

                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <>
              <Typography>All steps completed - Click below to generate the list!</Typography>
              {/* <div className={classes.listForm}> */}
              <div className={classes.actionsContainer}>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleSubmit}
                  disabled={!isEnabled}
                >
                  Generate List
                </Button>
              </div>

              <Modal
                open={this.state.open}
                onClose={this.handleClose}
              >
                <Dialog
                  open={this.state.open}
                  aria-labelledby="form-dialog-title"
                >
                  {this.props.addDSListResponseUpdated ?
                    <>
                      <MemberModal
                        dsLists={this.props.dsLists[0]}
                        createList={this.props.createList}
                        title={this.state.title}
                        mode={this.state.mode}
                        description={this.state.description}
                      />
                      {/* <DialogActions>
                    {console.log("can we get it", checked)}
                  {/* this.props.createList(listParams)
                      <Button onClick={this.handleClose} color="primary">
                        Continue
                      </Button>
                  </DialogActions> */}
                    </>
                    : <>
                      <DialogTitle id="form-dialog-title">List Submitted for Creation.</DialogTitle>
                      <DialogContent>
                        <DialogContentText >
                          Please be patient. It can take up to a minute for us to analyze and find members.
                      </DialogContentText>
                        <DialogContentText align='center'>
                          <CircularProgress color="primary" />
                        </DialogContentText>
                      </DialogContent>
                    </>
                  }
                </Dialog>
              </Modal>
            </>
          )}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listMembers: state.listsReducer.listMembers,
  newListResponse: state.listsReducer.newListResponse,
  newListResponseUpdated: state.listsReducer.newListResponseUpdated,
  dsLists: state.listsReducer.dsLists, // members back from DS
  addDSListResponseUpdated: state.listsReducer.addDSListResponseUpdated, // members back from DS

});


const styledComponent = withStyles(styles)(ListStepper);

const routedComponent = withRouter(styledComponent)

export default connect(
  mapStateToProps,
  { dsList, createList, getUser }
)(routedComponent);
