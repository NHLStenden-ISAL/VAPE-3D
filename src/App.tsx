import './App.css';

import { useState } from "react";
import SceneComponent from './Objects/SceneComponent';
import { AppManager, SetSelectedObject } from './Helpers/AppManager';
import { BaseObject } from './Objects/BaseObject';
import VariableGUI from './GUI/VariableGUI';
import { VariableObject } from './Objects/VariableObject';
import { DecisionObject } from './Objects/DecisionObject';
import DecisionGUI from './GUI/DecisionGUI';

//Start
const onSceneReady = (scene: any, setSelectedObject: SetSelectedObject) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  let appManager = new AppManager(scene, canvas, setSelectedObject);

  appManager.runApp();
};

export default function App() {
  const [selectedObject, setSelectedObject] = useState<BaseObject | undefined>(undefined);

  return (
    <div>
      <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" setSelectedObject={setSelectedObject}/>
      
      {selectedObject instanceof VariableObject  && <VariableGUI selectedObject={selectedObject} />}
      {selectedObject instanceof DecisionObject  && <DecisionGUI selectedObject={selectedObject} />}
    </div>
  );
}

