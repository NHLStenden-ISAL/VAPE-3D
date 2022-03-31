import './App.css';
import { useState } from "react";
import SceneComponent from './Objects/SceneComponent';
import AppManager from './Helpers/AppManager'
import { SetSelectedObject } from './Helpers/AppManager';
import BaseObject from './Objects/BaseObject';
import VariableGUI from './GUI/VariableGUI';
import VariableObject from './Objects/VariableObject';
import { DecisionObject } from './Objects/DecisionObject';
import DecisionGUI from './GUI/DecisionGUI';
import { Box } from '@mui/material';
import MenuBar from './GUI/Components/MenuBar';
import { Observable } from '@babylonjs/core';

export default function App() {
  const startObservable: Observable<any> = new Observable();
  const pauseObservable: Observable<any> = new Observable();
  const stopObservable: Observable<any> = new Observable();

  const [selectedObject, setSelectedObject] = useState<BaseObject | undefined>(undefined);

  const onSceneReady = (scene: any, setSelectedObject: SetSelectedObject) => {
    const canvas = scene.getEngine().getRenderingCanvas();
    const appManager = new AppManager(scene, canvas, setSelectedObject);

    appManager.runApp();
    appManager.setupObservers(startObservable, pauseObservable, stopObservable);
  };

  return (
    <Box>
      <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" setSelectedObject={setSelectedObject} />
      <MenuBar start={startObservable} pause={pauseObservable} stop={stopObservable} />

      {selectedObject &&
        <Box id="selection">
          {selectedObject instanceof VariableObject && <VariableGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DecisionObject && <DecisionGUI selectedObject={selectedObject} />}
        </Box>
      }
    </Box>
  );
}

