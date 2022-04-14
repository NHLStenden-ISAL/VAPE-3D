import './App.css';
import AppManager, { SetSelectedObject } from './Helpers/AppManager'
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
import { useState } from "react";
import ObserverContainer from './Helpers/ObserverContainer';
import CalculateObject from './Objects/Arithmetic/CalculateObject';
import CalculateGUI from './GUI/CalculateGUI';

const observerContainer: ObserverContainer = new ObserverContainer();

const onSceneReady = (scene: any, setSelectedObject: SetSelectedObject) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  const appManager = new AppManager(scene, canvas, observerContainer, setSelectedObject);

  appManager.setupObservers();
  appManager.runApp();
};

export default function App() {

  const [selectedObject, setSelectedObject] = useState<BaseObject | undefined>(undefined);
  
  //TODO: Fix input, so when you press a button right after reload, the program does listen instead of needing to focus on the scene first
  return (
    <Box>
      <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" setSelectedObject={setSelectedObject} />
      <MenuBar observerContainer={observerContainer} />

      {selectedObject &&
        <Box id="selection">
          {selectedObject instanceof VariableObject && <VariableGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DecisionObject && <DecisionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DirectionObject && <DirectionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof RobotObject && <RobotGUI selectedObject={selectedObject} />}
          {selectedObject instanceof CalculateObject && <CalculateGUI selectedObject={selectedObject} />}
        </Box>
      }
    </Box>
  );
}

