import React, { useEffect } from 'react';
import yorkie from 'yorkie-js-sdk';
import anonymous from 'anonymous-animals-gen';
import randomColor from 'randomcolor';

import { useAppState } from 'App';
import { useDispatch } from 'react-redux';
import { syncPeer } from 'features/peerInfoSlices';

function AppStateInitializer() {
  const dispatch = useDispatch();
  const [, updateAppState] = useAppState();

  useEffect(() => {
    (async () => {
      const { name, animal } = anonymous.generate();
      const client = yorkie.createClient(`${process.env.REACT_APP_YORKIE_RPC_ADDR}`, {
        metadata: {
          username: name,
          image: animal,
          color: randomColor(),
        },
      });

      const unsubscribe = client.subscribe((event) => {
        if (event.type === 'peers-changed') {
          updateAppState((appState) => {
            appState.peers = event.value;

            // Add Peer Redux ---
            const documentKey = appState.remote.getKey();
            const changedPeers = event.value[`projects$${documentKey.document}`];
            dispatch(
              syncPeer({
                myClientID: client.getID(),
                changedPeers,
              }),
            );
            // ---
            return appState;
          });
        }
      });

      await client.activate();

      updateAppState((appState) => {
        appState.client = client;
        return appState;
      });

      return async () => {
        unsubscribe();
        await client.deactivate();
      };
    })();
  }, [updateAppState]);

  return <></>;
}

export default AppStateInitializer;
