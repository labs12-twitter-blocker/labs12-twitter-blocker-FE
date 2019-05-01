import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import CreateList from './CreateList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBell, faEnvelope, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import atoms from '../atoms';
import molecules from '../molecules';

const { AppBar, Avatar, Badge, Icon, Toolbar, Button } = atoms;
const { Tabs, Tab, ListItem, InputAdornment } = molecules;

const avatarStyle = {
  marginRight: '8px'
}

const searchIcon = {
  marginLeft: '8px'
}


const Header = () => (
  <AppBar position="sticky" elevation={1}>
    <Toolbar>
      <Grid container alignItems="center" spacing={16}>
        <Grid item xs={6} sm={4}>
          <Tabs value={0} variant="fullWidth">
            <Tab
              onlyIcon
              icon={
                <Badge dotted badgeContent="">
                  <FontAwesomeIcon icon={faHome} size="2x" color='#38A1F3'/>
                </Badge>
              }
            />
            <Tab onlyIcon icon={<FontAwesomeIcon icon={faPlus} size="2x" color='#38A1F3'/>} />
            <Tab
              onlyIcon
              icon={
                <Badge >
                  <FontAwesomeIcon icon={faList} size="2x" color='#38A1F3'/>
                </Badge>
              }
            />
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
                    <FontAwesomeIcon icon={faSearch} color='#38A1F3'/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Hidden>
        <Grid item xs={6} sm="auto">
          <ListItem>
            <Avatar src="./assets/austen.png" style={avatarStyle} />
            {/* <ListItemText primary="austen" /> */}
            <React.Fragment>
              {/* <Button medium color="primary" variant="contained">
                    Create New List
                  </Button> */}
              <CreateList />
            </React.Fragment>
          </ListItem>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;