import React, { KeyboardEvent, MouseEvent, useRef, useState, useEffect, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import { createStyles, fade, Theme, withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { TransitionProps } from '@material-ui/core/transitions';
import Collapse from '@material-ui/core/Collapse';

import { Model, PeerInfo, encodeEventDesc } from 'store/types';
import { useAppState } from 'App';
import RenameDialog from './RenameDialog';

function TransitionComponent(props: TransitionProps) {
  const { in: inProps } = props;
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: inProps ? 1 : 0, transform: `translate3d(${inProps ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

export const StyledTreeItem = withStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      '& .close': {
        opacity: 0.3,
      },
    },
    label: {
      overflow: 'hidden',
      width: 135,
      textOverflow: 'ellipsis',
    },
    group: {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
  }),
)((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles(() =>
  createStyles({
    treeItemContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    treeItem: {
      display: 'flex',
    },
    peerRep: {
      marginLeft: '1px',
      width: '8px',
      height: '8px',
      backgroundColor: 'red',
      borderRadius: '4px',
    },
    moreIconButton: {
      display: 'none',
    },
    moreIconButtonShow: {
      height: '24px',
      width: '24px',
      display: 'flex',
    },
    moreIcon: {
      fontSize: 'medium',
    },
    menuItem: {
      fontSize: 'small',
      height: '24px',
    },
  }),
);

export default function FileTreeItem(props: { model: Model; peers: Array<PeerInfo> }) {
  const classes = useStyles();
  const { model, peers } = props;
  const [appState] = useAppState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreButtonOpen, setMoreButtonOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(menuOpen);

  useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);

  const handleToggle = useCallback(() => {
    setMenuOpen((prevOpen) => !prevOpen);
  }, [setMenuOpen]);

  const handleClose = useCallback(
    (event: MouseEvent<EventTarget>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return;
      }

      setMenuOpen(false);
    },
    [anchorRef, setMenuOpen],
  );

  const handleListKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        setMenuOpen(false);
      }
    },
    [setMenuOpen],
  );

  const handleMouseEnter = useCallback(() => {
    setMoreButtonOpen(true);
  }, [setMoreButtonOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!renameDialogOpen) {
      setMoreButtonOpen(false);
      setMenuOpen(false);
    }
  }, [setMoreButtonOpen, setMenuOpen, renameDialogOpen]);

  const handleRenameButtonClick = useCallback(() => {
    setRenameDialogOpen(true);
  }, [setRenameDialogOpen]);

  const handleDeleteButtonClick = useCallback(() => {
    appState.remote.update(
      (root) => {
        delete root.project.models[model.id];
      },
      encodeEventDesc({
        id: model.id,
        entityType: 'model',
        actionType: 'delete',
      }),
    );
  }, [appState.remote, model.id]);

  const handleRenameDialogClose = useCallback(
    (modelName: string | undefined) => {
      if (modelName) {
        appState.remote.update((root) => {
          root.project.models[model.id].name = modelName;
        });
      }
      setRenameDialogOpen(false);
      setMoreButtonOpen(false);
      setMenuOpen(false);
    },
    [setRenameDialogOpen, setMoreButtonOpen, setMenuOpen, appState.remote, model.id],
  );

  return (
    <div className={classes.treeItemContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={classes.treeItem}>
        <StyledTreeItem key={model.id} nodeId={model.id} label={model.name} />
        {peers &&
          peers.map((peer) => (
            <div key={peer.username} style={{ backgroundColor: peer.color }} className={classes.peerRep} />
          ))}
      </div>
      <IconButton
        ref={anchorRef}
        aria-controls={menuOpen ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={moreButtonOpen ? classes.moreIconButtonShow : classes.moreIconButton}
      >
        <MoreVertIcon className={classes.moreIcon} />
      </IconButton>
      <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={menuOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem className={classes.menuItem} onClick={handleRenameButtonClick}>
                    Rename
                  </MenuItem>
                  <RenameDialog name={model.name} open={renameDialogOpen} onClose={handleRenameDialogClose} />
                  <MenuItem className={classes.menuItem} onClick={handleDeleteButtonClick}>
                    Delete
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
