// Metis
// Copyright 2021-present NAVER Corp.
// Apache License v2.0

import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { AppState } from 'app/rootReducer';
import { updateParameter, updateProperty } from 'features/docSlice';
import { NormalBlock, getOrderedParamNames } from 'store/types/blocks';
import { preserveCaret, stopPropagationOnKeydown } from './utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      margin: theme.spacing(1, 1),
    },
    // necessary for content to be below app bar
    formControl: {
      margin: theme.spacing(1),
      width: 200,
    },
    formSelect: {
      marginTop: 16,
    },
  }),
);

export default function NetworkProperties(props: { block: NormalBlock }) {
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

  const handleParameterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
      preserveCaret(event);
      const parameterValue = event.target.value;
      dispatch(
        updateParameter({
          selectedNetworkID,
          selectedBlockID,
          key,
          value: parameterValue,
        }),
      );
    },
    [selectedBlockID, selectedNetworkID],
  );

  const paramNames = getOrderedParamNames(selectedBlock.type);

  return (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          label="Repeats"
          value={selectedBlock.repeats}
          onChange={(event) => handlePropertyChange(event, 'repeats')}
          onKeyDown={stopPropagationOnKeydown}
        />
      </FormControl>
      <div className={classes.section}>
        <Typography variant="h6">Parameters</Typography>
        <FormControl className={classes.formControl}>
          {paramNames.map((paramName) => (
            <TextField
              key={paramName}
              label={paramName}
              value={selectedBlock.parameters[paramName] || ''}
              onChange={(event) => handleParameterChange(event, paramName)}
              onKeyDown={stopPropagationOnKeydown}
            />
          ))}
        </FormControl>
      </div>
    </>
  );
}
