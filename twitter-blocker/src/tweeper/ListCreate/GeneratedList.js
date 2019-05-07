import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import atoms from '../../components/atoms';

const { Avatar, Typography } = atoms;

const twitterList = [
  {
    profile_img: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Never stop thinking',
    screen_name: '@never_stop',
  },
  {
    profile_img: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'React Geek',
    screen_name: '@react',
  },
  {
    profile_img: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Thailand',
    screen_name: '@wonderful_th',
  },
];

function GeneratedList() {
  return (
    <List subheader={<ListSubheader>Your Generated List</ListSubheader>}>
      {twitterList.map(({ profile_img, name, screen_name }) => (
        <React.Fragment key={name}>
          <ListItem button>
            <Avatar link src={profile_img} />
            <ListItemText primary={name} secondary={screen_name} />
            <Button variant="outlined" color="primary">
              Follow
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <ListItem button>
        <ListItemText>
          <Typography link>Show More</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default GeneratedList;