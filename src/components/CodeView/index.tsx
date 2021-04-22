import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Converter from 'module/converter';
import { useAppState } from 'App';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: '64px',
      paddingTop: '30px',
      height: 'calc(100vh - 64px)',
      backgroundColor: '#f8f8ff',
    },
  }),
);

export default function CodeView() {
  const classes = useStyles();
  const [appState] = useAppState();
  const [converter] = useState(new Converter());
  const [codeString, setCodeString] = useState('');
  const project = appState.remote.getRoot().project!;
  const {selectedNetworkID} = appState.local;

  useEffect(() => {
    converter.update(project.networks[selectedNetworkID]);
    setCodeString(converter.getResult());
  }, [converter, project, selectedNetworkID]);

  return (
    <div className={classes.root}>
      <SyntaxHighlighter language="python" style={docco} showLineNumbers>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
