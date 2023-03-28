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
import EvaluateObject from './Objects/Arithmetic/EvaluateObject';
import EvaluateGUI from './GUI/EvaluateGUI';
import PrintObject from './Objects/PrintObject';
import PrintGUI from './GUI/PrintGUI';
import CallGUI from './GUI/CallGUI';
import VapeScene from "./VapeScene";
import CallObject from "./Objects/CallObject";

const observerContainer: ObserverContainer = new ObserverContainer();

const onSceneReady = (scene: VapeScene, setSelectedObject: SetSelectedObject) => {
  const appManager = new AppManager(scene, observerContainer, setSelectedObject);

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
          {selectedObject instanceof CallObject && <CallGUI selectedObject={selectedObject} />}
          {selectedObject instanceof VariableObject && <VariableGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DecisionObject && <DecisionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DirectionObject && <DirectionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof RobotObject && <RobotGUI selectedObject={selectedObject} />}
          {selectedObject instanceof EvaluateObject && <EvaluateGUI selectedObject={selectedObject} />}
          {selectedObject instanceof PrintObject && <PrintGUI selectedObject={selectedObject} />}
        </Box>
      }
    </Box>
  );
}
