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
import SceneComponent from './SceneComponent';
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
import ReturnObject from './Objects/ReturnObject';
import ReturnGUI from './GUI/ReturnGUI';
import PointerWriteGUI from './GUI/PointerWriteGUI';
import PointerWriteObject from './Objects/Arithmetic/PointerWriteObject';
import FreeObject from './Objects/FreeObject';
import FreeGUI from './GUI/FreeGUI';

const observerContainer: ObserverContainer = new ObserverContainer();

const onSceneReady = (scene: VapeScene, setSelectedObject: SetSelectedObject) => {
  const appManager = new AppManager(scene, observerContainer, setSelectedObject);

  appManager.setupObservers();

  observerContainer.uploadProgram(String.raw`{"name":"base_program","layers":[{"name":"Main","contents":[{"type":"robot","location":{"x":7,"y":0},"direction":0},{"type":"variable","location":{"x":7,"y":3},"direction":0,"name":"i","value":"","variableType":"int","variableSize":0},{"type":"evaluate","location":{"x":7,"y":4},"direction":0,"name":"i","value":"","statement":"0","index":""},{"type":"evaluate","location":{"x":4,"y":4},"direction":0,"name":"i","value":"","statement":"i + 1","index":""},{"type":"print","location":{"x":1,"y":4},"direction":0,"statement":"concat(\"Loop round, i = \", string(i))"},{"type":"print","location":{"x":-2,"y":6},"direction":0,"statement":"concat(\"Loop finished, i = \", string(i))"},{"type":"decision","location":{"x":1,"y":6},"direction":2,"statement":"i < 3"},{"type":"direction","location":{"x":7,"y":6},"direction":3},{"type":"direction","location":{"x":1,"y":2},"direction":1},{"type":"direction","location":{"x":4,"y":2},"direction":0},{"type":"direction","location":{"x":4,"y":6},"direction":3}]}]}`);
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
          {selectedObject instanceof PointerWriteObject && <PointerWriteGUI selectedObject={selectedObject} />}
          {selectedObject instanceof CallObject && <CallGUI selectedObject={selectedObject} />}
          {selectedObject instanceof ReturnObject&& <ReturnGUI selectedObject={selectedObject}/>}
          {selectedObject instanceof VariableObject && <VariableGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DecisionObject && <DecisionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof DirectionObject && <DirectionGUI selectedObject={selectedObject} />}
          {selectedObject instanceof RobotObject && <RobotGUI selectedObject={selectedObject} />}
          {selectedObject instanceof EvaluateObject && <EvaluateGUI selectedObject={selectedObject} />}
          {selectedObject instanceof PrintObject && <PrintGUI selectedObject={selectedObject} />}
          {selectedObject instanceof FreeObject && <FreeGUI selectedObject={selectedObject} />}
        </Box>
      }
    </Box>
  );
}
