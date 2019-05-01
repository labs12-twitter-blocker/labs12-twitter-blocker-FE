import React from 'react';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import atoms from '../atoms';

const { Typography, Icon } = atoms;

const twitterList2 = [
  {
    primary: 'LAMBDA Community',
    secondary: 'All things LAMBDA',
    tertiary: 'explore this list'
  },
  {
    primary: 'TESLA LOVE',
    secondary: 'TESLA Updates and Insight',
    tertiary: 'explore this list'
  },
  {
    primary: 'Twitter Thought Leaders',
    secondary: 'Naval, Paul G, Tim Ferris +',
    tertiary: 'explore this list'
  },
  {
    primary: 'CRYPTO BEARS',
    secondary: 'Down with Crypto',
    tertiary: 'explore this list'
  },
];

function PopularNow() {
  return (
    <List subheader={<ListSubheader>Trending Lists</ListSubheader>}>
      {twitterList2.map(({ primary, secondary, tertiary }) => (
        <React.Fragment key={primary}>
          <ListItem button>
            <ListItemText>
              <Typography primary>{primary}</Typography>
              <Typography secondary light={!tertiary}>
                {secondary}
              </Typography>
              {tertiary && (
                <Typography tertiary light>
                  <FontAwesomeIcon icon={faList} color='#38A1F3'/> {tertiary}
                </Typography>
              )}
            </ListItemText>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <ListItem button>
        <ListItemText>
          <Typography link>Discover More Lists</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default PopularNow;