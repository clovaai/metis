// Metis
// Copyright 2021-present NAVER Corp.
// Apache License v2.0

import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl/FormControl';
import TextField from '@material-ui/core/TextField';

import { AppState } from 'app/rootReducer';
import { updateProperty } from 'features/docSlice';
import { BlockType, IOBlock } from 'store/types/blocks';
import { preserveCaret, stopPropagationOnKeydown } from './utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    formControl: {
      margin: theme.spacing(1),
      width: 200,
    },
  }),
);

export default function NetworkProperties(props: { block: IOBlock }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const client = useSelector((state: AppState) => state.docState.client);
  const peers = useSelector((state: AppState) => state.peerState.peers);
  const diagramInfos = useSelector((state: AppState) => state.localInfoState.diagramInfos);
  const { selectedNetworkID } = peers[client.getID()];
  const { selectedBlockID } = diagramInfos[selectedNetworkID];
  const { block: selectedBlock } = props;

  const handlePropertyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
      preserveCaret(event);
      const propertyValue = event.target.value;
      dispatch(
        updateProperty({
          selectedNetworkID,
          selectedBlockID,
          key,
          value: propertyValue,
        }),
      );
    },
    [selectedBlockID, selectedNetworkID],
  );

  return (
    <>
      {selectedBlock.type === BlockType.In && (
        <FormControl className={classes.formControl}>
          <TextField
            label="Init Variables"
            value={selectedBlock.initVariables || ''}
            onChange={(event) => handlePropertyChange(event, 'initVariables')}
            onKeyDown={stopPropagationOnKeydown}
          />
        </FormControl>
      )}
    </>
  );
}
