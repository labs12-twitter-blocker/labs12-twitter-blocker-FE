import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import styled from '@material-ui/styles/styled';
// import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { dsList, createList, getUser } from '../../actions';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import { List, 
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
  // listFormButton: {
  //   padding: 15,
  //   fontSize: 70
  // }
});

const ButtonText = styled('div')({
  fontSize: 18
})

const TopLine = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const ProfileNameImg = styled('div') ({
  display: 'flex',
  width: '50%',
  alignItems: 'center',
})

const ProfileName = styled(Typography)({
  fontWeight: 'bold',
  fontFamily: 'Helvetica Neue',
})






let MemberModal = props => {
  const { dsLists } = props;
  console.log("dsLists", dsLists)
  return (
    <> 
      <DialogTitle id="form-dialog-title">List Submitted for Creation.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please be patient. It can take up to a minute for created lists to populate on twitter.
        </DialogContentText>

        {/* <Grid container spacing={8} direction="column" alignItems="center" justify="center" > */}
        {dsLists.map((e, index) => {
          return (
            // <Grid item xs={10} sm={8} md={6} style={{width:"100%"}}>
            <List key={e.id_str}>
            {console.log("e card", e)}
            <Card >
              <ListItem>
                <CardContent style={{width:'100%'}}>
                  <TopLine>
                    <ProfileNameImg>
                    {console.log("i card", e)}
                      {console.log("card", e.id_str, e.profile_image_url_https, e.name, e.screen_name, e.description)}
                      <Avatar src={e.profile_image_url_https} style={{marginRight: '5px'}}/>
                      <Link to={`/profile/${e.id_str}`} style={{textDecoration:'none'}}><ProfileName >{e.name}</ProfileName></Link>
                      </ProfileNameImg>
                  <Typography>@{e.screen_name}</Typography>
                  </TopLine>
                  <Typography>{e.description}</Typography>
                </CardContent>
              </ListItem>
            </Card>
            </List>
          // </Grid>
          )
        })}
        {/* </Grid> */}

      </DialogContent>


      <DialogActions>
        <Button 
        // onClick={this.handleClose} color="primary"
        >
          Continue
        </Button>

      </DialogActions>
    </>
  );
};

MemberModal.propTypes = {
  // classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
};

MemberModal = withStyles(styles)(MemberModal);











class ListStepper extends React.Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
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
      buttonDisabled: false,
      open: false,
      skipped: new Set(),
    }
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

  handleUser1Change = event => {
    if (event.target.value.length > 0) {
      this.setState({ user1: event.target.value, user1HelperText: "", user1Error: false });
    } else {
      this.setState({ user1: event.target.value, user1HelperText: 'Please enter at least one Twitter user', user1Error: true });
    }
  };

  handleOtherUserChange = event => {

    this.setState({ [event.target.name]: event.target.value })
  };

  handlePrivateChange = event => {
    this.setState({ mode: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  canBeSubmitted() {
    const { title, description, user1, user2, user3, user4, user5 } = this.state;
    return title.length > 0 && description.length > 0 && user1.length > 0
  }
  handleClickOpen = () => {
    this.setState({ open: true });
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
      "name": this.state.title,
      "mode": this.state.mode,
      "description": this.state.description
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
          <Typography variant='h6' color='primary'>Please enter 5 Twitter users to influence your list</Typography>
          {/* <form className={this.props.classes.form} noValidate > */}
            <FormControl className={this.props.classes.formControl} >
              {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
              <form
                value={this.state.maxWidth}
                onChange={this.handleMaxWidthChange}
                // inputProps={{
                //   name: 'max-width',
                //   id: 'max-width',
                // }}
              >
                <TextField
                  required
                  name="user1"
                  id="outlined-name"
                  label="Required"
                  placeholder="Twitter Handle"
                  className={this.props.classes.textField}
                  value={this.state.user1}
                  onChange={this.handleUser1Change}
                  margin="normal"
                  variant="outlined"
                  helperText={this.state.user1HelperText}
                  error={this.state.user1Error}
                />
                <TextField
                  name="user2"
                  id="outlined-name"
                  label="Twitter Handle"
                  placeholder="Twitter Handle"
                  className={this.props.classes.textField}
                  value={this.state.user2}
                  onChange={this.handleOtherUserChange}
                  margin="normal"
                  variant="outlined"
                  helperText={this.state.user2HelperText}
                  error={this.state.user2Error}
                />
                <TextField
                  name="user3"
                  id="outlined-name"
                  label="Twitter Handle"
                  placeholder="Twitter Handle"
                  className={this.props.classes.textField}
                  value={this.state.user3}
                  onChange={this.handleOtherUserChange}
                  margin="normal"
                  variant="outlined"
                  helperText={this.state.user3HelperText}
                  error={this.state.user3Error}
                />
                <TextField
                  name="user4"
                  id="outlined-name"
                  label="Twitter Handle"
                  placeholder="Twitter Handle"
                  className={this.props.classes.textField}
                  value={this.state.user4}
                  onChange={this.handleOtherUserChange}
                  margin="normal"
                  variant="outlined"
                  helperText={this.state.user4HelperText}
                  error={this.state.user4Error}
                />
                <TextField
                  name="user5"
                  id="outlined-name"
                  label="Twitter Handle"
                  placeholder="Twitter Handle"
                  className={this.props.classes.textField}
                  value={this.state.user5}
                  onChange={this.handleOtherUserChange}
                  margin="normal"
                  variant="outlined"
                  helperText={this.state.user5HelperText}
                  error={this.state.user5Error}
                />
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

    if (this.props.newListResponseUpdated !== prevProps.newListResponseUpdated) {
      console.log("CDU IF 1");
      this.setState({ newListResponseUpdated: this.props.newListResponseUpdated })
    }
    // console.log("this.props.newListResponse.id_str", this.props.newListResponse.id_str);


    if (this.state.newListResponseUpdated !== prevState.newListResponseUpdated) {
      console.log("CDU IF 2");

      let completeList = {
        "user_id": this.state.twitter_user_id,
        "name": this.props.newListResponse.name,
        "original_user": this.props.newListResponse.user.screen_name,
        "mode": this.props.newListResponse.mode,
        "description": this.props.newListResponse.description,
        "id": this.props.newListResponse.id_str,
        "search_users": [this.state.user1, this.state.user2, this.state.user3, this.state.user4, this.state.user5]
      }
      console.log("~~~~~~~~~~~~~~~~~completeList", completeList);
      this.props.dsList(completeList);
    }
    console.log("++++++++open+++++++++++this.state.open", this.state.open)
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
    if (activeStep === 0 && this.state.title.length === 0){
      return true
    } else if ( activeStep === 1 && this.state.description.length === 0) {
      return true
    }else if ( activeStep === 3 && this.state.user1.length === 0) {
      return true
    } else {return false}
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.resetContainer}>
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
                        disabled={ this.handleDisableNext(activeStep)}
                        
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === steps.length &&  (
            <>
              <Typography>All steps completed - Click below to generate the list!</Typography>
              {/* <div className={classes.listForm}> */}
              <div className={classes.actionsContainer}>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
                <Button
                  // medium
                  color="primary"
                  variant="contained"
                  // size="medium"
                  // className={classes.listFormButton}
                  className={classes.button}
                  onClick={this.handleSubmit}
                  disabled={!isEnabled}
                >
                  {/* <ButtonText> */}
                    Generate List
                  {/* </ButtonText> */}
                </Button>
              </div>

              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                { this.props.addDSListResponseUpdated ? 
                <> 
                  <MemberModal dsLists={this.props.dsLists[0]}/> 
                  <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Continue
                      </Button>
                  </DialogActions>
                
                

                </>
                : <>
                    <DialogTitle id="form-dialog-title">List Submitted for Creation.</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please be patient. It can take up to a minute for created lists to populate on twitter.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Continue
                      </Button>
                    </DialogActions>
                    </>
                }
              </Dialog>
              
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

export default connect(
  mapStateToProps,
  { dsList, createList, getUser }
)(styledComponent);