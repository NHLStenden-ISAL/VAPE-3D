import './App.css';

import SceneComponent from './Objects/SceneComponent';
import { AppManager } from './Helpers/AppManager';

//Start
const onSceneReady = (scene: any) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  let appManager = new AppManager(scene, canvas);

  appManager.runApp();
};

//Update
const onRender = (scene: any) => {
  //gridObject.getMouseGroundLocation();
};

export default function App() {
  return (
    <div>
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    </div>
  );
}

