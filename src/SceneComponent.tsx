import { Engine } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { SetSelectedObject } from "./Helpers/AppManager";
// import ObserverContainer from "../Helpers/ObserverContainer";
// import CommandBroker from "../Helpers/CommandBroker";
// import SceneHelper from "../Helpers/SceneHelper";
// import MouseHandler from "../Helpers/MouseHandler";
// import KeyboardHandler from "../Helpers/KeyboardHandler";
import VapeScene from "./VapeScene";
import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { SceneManager } from "./Helpers/SceneManager";

type CanvasProps = {
  antialias: boolean,
  onSceneReady: any,
  id: string,
  setSelectedObject: SetSelectedObject,
}

export default function CreateCanvas({ antialias, onSceneReady, id, setSelectedObject }: CanvasProps) {
  const rectCanvas = useRef(null);

  useEffect(() => {
    if (rectCanvas.current) {
      let engine = new Engine(rectCanvas.current, antialias);
      new SceneManager(engine);
      SceneManager.engine = engine;

      let scene = new VapeScene(SceneManager.engine, setSelectedObject, false);

      // SceneManager.overlayUI = AdvancedDynamicTexture.CreateFullscreenUI("UI-Overlay");
      // SceneManager.overlayUI.idealWidth = 2000;

      // console.log("overlayUI is " + (SceneManager.overlayUI != undefined));

      SceneManager.SceneAdd("Main", scene);
      SceneManager.SceneSwitch("Main");
      if (scene.isReady()) {
        onSceneReady(scene, setSelectedObject);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }

      return () => {
        // scene.getEngine().dispose();

        // if (window) {
        //   window.removeEventListener("resize", resize);
        // }
      };
    }
  }, [antialias, onSceneReady, rectCanvas, setSelectedObject]);
  return <canvas ref={rectCanvas} id={id} />;
};