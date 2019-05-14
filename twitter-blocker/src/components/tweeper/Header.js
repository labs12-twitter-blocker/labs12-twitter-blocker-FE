import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import CreateList from './CreateList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBell, faEnvelope, faList, faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import atoms from '../atoms';
import molecules from '../molecules';
import { searchLists } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const { AppBar, Avatar, Badge, Icon, Toolbar, Button } = atoms;
const { Tabs, Tab, ListItem, InputAdornment } = molecules;

const avatarStyle = {
  marginRight: '8px'
}

const searchIcon = {
  marginLeft: '8px'
}


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }
  searchLists = (event) => {
    this.props.searchLists(event.target.value);
    // this.setState({searchTerm: ""})
  }

  render() {
    return (
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Grid container alignItems="center" spacing={16}>
            <Grid item xs={6} sm={4}>
              <Tabs value={0} variant="fullWidth">
                <Tab
                  onlyIcon
                  icon={
                    <Badge dotted badgeContent="">
                      <Link to="/profile">
                        <FontAwesomeIcon icon={faHome} size="2x" color='#38A1F3' />
                      </Link>
                    </Badge>
                  }
                />
                <Tab onlyIcon icon={<FontAwesomeIcon icon={faPlus} size="2x" color='#38A1F3' />} />

                <Tab
                  onlyIcon
                  icon={
                    <Badge >
                      <Link to="/explorer">
                        <FontAwesomeIcon icon={faList} size="2x" color='#38A1F3' />
                      </Link>
                    </Badge>
                  }
                />


                <Tab onlyIcon icon={
                  <Link to="/settings">
                    <FontAwesomeIcon icon={faCog} size="2x" color='#38A1F3' />
                  </Link>} />


                {/* <Tab onlyIcon icon={<FontAwesomeIcon icon={faEnvelope} size="2x" color='#38A1F3'/>} /> */}
              </Tabs>
            </Grid>
            <Hidden smDown>
              <Grid item sm>
                <TextField
                  fullWidth
                  placeholder="Find Lists"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start" style={searchIcon}>
                        <FontAwesomeIcon icon={faSearch} color='#38A1F3' />
                      </InputAdornment>
                    ),
                  }}
                  onChange={this.searchLists}

                />
              </Grid>
            </Hidden>
            <Grid item xs={6} sm="auto">
              <ListItem>
                <Avatar src="./assets/austen.png" style={avatarStyle} />
                {/* <ListItemText primary="austen" /> */}
                <React.Fragment>
                  <Button medium color="primary" variant="contained" href="/create">
                    Create New List
                  </Button>
                  {/* <CreateList /> */}
                </React.Fragment>
              </ListItem>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }

}

const mapStateToProps = state => {
  return {
  }
}

const mapActionsToProps = {
  searchLists
}

export default connect(mapStateToProps, mapActionsToProps)(Header);