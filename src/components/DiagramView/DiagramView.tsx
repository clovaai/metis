import React, {useState, useCallback, useEffect} from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {DefaultLinkModel} from "@projectstorm/react-diagrams";
import { CanvasWidget } from '@projectstorm/react-canvas-core';

import { Position } from "store/store";
import {DiagramEngine} from "components/DiagramView/DiagramEngine";
import {useFragment} from "../../index";
import {MetisNodeModel} from "./MetisNodeModel";

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      marginTop: "64px",
      height: "calc(100vh - 64px)",
      backgroundColor: "#eaeaeb",
    },
  }),
);

export default function DiagramView() {
  const classes = useStyles();

  const [fragment, updateFragment] = useFragment();
  const [engine,] = useState(new DiagramEngine());
  const [lastFunction, setLastFunction] = useState<string>();
  const [lastBlockID, setLastBlockID] = useState<string>();
  const [lastPosition, setLastPosition] = useState<Position>();

  const handleMouseUp = useCallback((event: any) => {
    if (lastFunction === 'selectionChanged' && lastBlockID) {
      updateFragment((fragment) => {
        fragment.selectedBlockID = lastBlockID;
      });
    } else if (lastFunction === 'positionChanged' && lastBlockID) {
      updateFragment((fragment) => {
        fragment.blocks[lastBlockID].position = lastPosition;
        fragment.selectedBlockID = lastBlockID;
      });
    }
  }, [lastFunction, lastBlockID, lastPosition, updateFragment]);

  useEffect(() => {
    engine.update(fragment);
    const deregister = engine.registerListener((event: any, entity: any) => {
      setLastFunction(event.function);
      if (entity instanceof MetisNodeModel) {
        setLastBlockID(entity.getBlockID());
        if (event.function === 'positionChanged') {
          setLastPosition(event.entity.position);
        }
      } else if (entity instanceof DefaultLinkModel) {
        if (event.function === 'targetPortChanged') {
          updateFragment((fragment) => {
            fragment.links.push({
              from: event.entity.sourcePort.parent.getBlockID(),
              to: event.entity.targetPort.parent.getBlockID()
            });
          });
        }
      }
    });
    return () => deregister();
  }, [engine, fragment, setLastFunction, setLastBlockID, setLastPosition]);

  return (
    <div onMouseUp={handleMouseUp}>
      <CanvasWidget
        className={classes.canvas}
        engine={engine.getDiagramEngine()}
      />
    </div>
  );
}
