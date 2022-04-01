import './App.css';
import AppManager from './Helpers/AppManager'
import BaseObject from './Objects/BaseObject';
import DecisionGUI from './GUI/DecisionGUI';
import DecisionObject from './Objects/DecisionObject';
import DirectionGUI from './GUI/DirectionGUI';
import DirectionObject from './Objects/DirectionObject';
import MenuBar from './GUI/Components/MenuBar';
import RobotGUI from './GUI/RobotGUI';
import RobotObject from './Objects/RobotObject';
import SceneComponent from './Objects/SceneComponent';
import VariableGUI from './GUI/VariableGUI';
import VariableObject from './Objects/VariableObject';
import { Box } from '@mui/material';
import { BuildState, EditorState } from './Helpers/StateManager';
import { Observable } from '@babylonjs/core';
import { SetSelectedObject } from './Helpers/AppManager';
import { useState } from "react";

export default function App() {
  const startObservable: Observable<undefined> = new Observable();
  const pauseObservable: Observable<undefined> = new Observable();
  const stopObservable: Observable<undefined> = new Observable();
  const buildTypeObservable: Observable<BuildState> = new Observable();
  const editorObservable: Observable<EditorState> = new Observable();

  const [selectedObject, setSelectedObject] = useState<BaseObject | undefined>(undefined);

  const onSceneReady = (scene: any, setSelectedObject: SetSelectedObject) => {
    const canvas = scene.getEngine().getRenderingCanvas();
    const appManager = new AppManager(scene, canvas, setSelectedObject);

    appManager.runApp();
    appManager.setupObservers(startObservable, pauseObservable, stopObservable, buildTypeObservable, editorObservable);
  };

  //TODO: Fix input, so when you press a button right after reload, the program does listen instead of needing to focus on the scene first
  return (
    <Box>
      <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" setSelectedObject={setSelectedObject} />
      <MenuBar start={startObservable} pause={pauseObservable} stop={stopObservable} buildType={buildTypeObservable} editor={editorObservable} />

      {selectedObject &&
        <Box id="selection">
          {selectedObject instanceof VariableObject && <VariableGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DecisionObject && <DecisionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DirectionObject && <DirectionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof RobotObject && <RobotGUI selectedObject={selectedObject} />}
        </Box>
      }
    </Box>
  );
}

