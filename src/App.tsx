import './App.css';

import SceneComponent from './Objects/SceneComponent';
import { SceneHelper } from './Helpers/SceneHelper';

//Start
const onSceneReady = (scene: any) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  let sceneHelper = new SceneHelper(scene, canvas);

  sceneHelper.createScene();
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

