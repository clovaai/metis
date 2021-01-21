import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AddBoxIcon from '@material-ui/icons/AddBox';

const drawerWidth = 60;

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'hidden',
    },
  }),
);

export default function SideBar(props: {addBlock: Function}) {
  const classes = useStyles();

  const handleClick = () => {
    props.addBlock();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button >
            <ListItemIcon><ArrowDownwardIcon /></ListItemIcon>
          </ListItem>
          <ListItem button >
            <ListItemIcon><ArrowUpwardIcon /></ListItemIcon>
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
