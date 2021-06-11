import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AppState } from 'app/rootReducer';
import {
  DocStatus,
  createDocument,
  attachDocument,
  attachDocLoading,
  detachDocument,
  selectFirstNetwork,
  decodeEventDesc,
} from 'features/docSlice';
import { deleteNetwork, initDiagramInfos } from 'features/localSlice';
import { updatePeers } from 'features/peersSlice';
import { updateProject } from 'features/projectSlice';
import NavBar from 'components/NavBar';
import FileTreeBar from 'components/FileTreeBar';
import DiagramView from 'components/DiagramView';
import CodeView from 'components/CodeView';
import StatusBar from 'components/StatusBar';
import PropertyBar from 'components/PropertyBar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      position: 'relative',
      flexGrow: 1,
      height: '100vh',
      backgroundColor: '#eaeaeb',
    },
  }),
);

export default function ProjectPage(props: RouteComponentProps<{ projectID: string }>) {
  const classes = useStyles();
  const {
    match: {
      params: { projectID },
    },
  } = props;
  const [viewMode, setViewMode] = useState('diagram');
  const dispatch = useDispatch();
  const doc = useSelector((state: AppState) => state.docState.doc);
  const client = useSelector((state: AppState) => state.docState.client);
  const status = useSelector((state: AppState) => state.docState.status);
  const peers = useSelector((state: AppState) => state.peerState.peers);
  const project = useSelector((state: AppState) => state.projectState.project);

  useEffect(() => {
    dispatch(createDocument(projectID));
  }, [projectID]);

  useEffect(() => {
    async function attachDocAsync() {
      if (!client) {
        return;
      }
      dispatch(attachDocLoading(true));
      dispatch(attachDocument({ client, doc }));
      dispatch(attachDocLoading(false));
    }

    attachDocAsync();

    return () => {
      dispatch(detachDocument({ client, doc }));
    };
  }, [doc, client]);

  useEffect(() => {
    if (status !== DocStatus.Detached) {
      return () => {};
    }

    const initProject = JSON.parse(doc.toJSON()).project;
    const initNetworkIDs = Object.keys(doc.getRoot().project.networks);

    dispatch(updateProject(initProject));
    dispatch(initDiagramInfos(initNetworkIDs));

    const unsubscribe = doc.subscribe((event) => {
      if (event.type === 'local-change' || event.type === 'remote-change') {
        for (const changeInfo of event.value) {
          if (changeInfo.paths[0].startsWith('$.project')) {
            const modifiedProject = JSON.parse(doc.toJSON()).project;
            dispatch(updateProject(modifiedProject));
          } else if (changeInfo.paths[0].startsWith('$.peers')) {
            const modifiedPeers = JSON.parse(doc.toJSON()).peers;
            dispatch(updatePeers(modifiedPeers));
          }
          if (changeInfo.change.getMessage()) {
            const desc = decodeEventDesc(changeInfo.change.getMessage());
            if (desc.actionType === 'create' && desc.entityType === 'network') {
              dispatch(initDiagramInfos([desc.id]));
            } else if (desc.actionType === 'delete' && desc.entityType === 'network') {
              dispatch(deleteNetwork(desc.id));
            }
          }
        }
      }
    });

    dispatch(selectFirstNetwork());

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }

      if (doc) {
        dispatch(detachDocument({ client, doc }));
      }
    };
  }, [status]);

  if (!project || !project.id || !project.networks[peers[client.getID()].selectedNetworkID]) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  const selectedNetworkID = peers[client.getID()].selectedNetworkID;

  return (
    <div className={classes.root}>
      <NavBar />
      <FileTreeBar />
      {selectedNetworkID ? (
        <>
          <main className={classes.content}>
            {viewMode === 'diagram' ? <DiagramView /> : <CodeView />}
            <DiagramView />
            <StatusBar viewMode={viewMode} setViewMode={setViewMode} />
          </main>
          <PropertyBar />
        </>
      ) : (
        <main className={classes.content} />
      )}
    </div>
  );
}
