import { Engine, Scene } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import AppManager, { SetSelectedObject } from "../Helpers/AppManager";
import ObserverContainer from "../Helpers/ObserverContainer";
import ProgramState from "../Helpers/ProgramState";
import CommandBroker from "../Helpers/CommandBroker";
import WorldInformation from "../Helpers/WorldInformation";
import SceneHelper from "../Helpers/SceneHelper";
import MouseHandler from "../Helpers/MouseHandler";
import KeyboardHandler from "../Helpers/KeyboardHandler";
import VapeScene from "../VapeScene";

type CanvasProps = {
  antialias: boolean,
  onSceneReady: any,
  id: string,
  setSelectedObject: SetSelectedObject,
}

export class SceneManager {
  static engine: Engine;
  static setSelectedObject: SetSelectedObject;
  static scenes = new Map<string, VapeScene>();
  static activeScene = "";
  static sceneListenerCount = 0;
  static sceneListeners : any = {};
  static canvas: any;
  static appMan: AppManager;

  static runTime: VapeScene | undefined;

  constructor(engine: Engine) {
    SceneManager.engine = engine;

    engine.runRenderLoop(() => {
      let currentScene = SceneManager.CurrentScene();
      if(currentScene !== undefined) {
        currentScene.render();
      }
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });
  }

  public static addSceneListener(listener : any) {
    console.log(SceneManager.sceneListeners);
    let id = SceneManager.sceneListenerCount++;
    SceneManager.sceneListeners[id] = listener;
    return id;
  }

  public static removeConsoleListener(id : number) {
    delete SceneManager.sceneListeners[id];
  }

  public static CurrentVapeScene() {
    return SceneManager.scenes.get(this.activeScene);
  }

  public static CurrentScene() {
    if(SceneManager.runTime !== undefined) {
      return SceneManager.runTime.scene;
    }

    let vScene = SceneManager.scenes.get(this.activeScene);
    if (vScene !== undefined)
      return vScene.scene;
  }

  public static setApp(param: AppManager) {
    SceneManager.appMan = param;
  }

  public static SceneAddClean() {
    console.log('add?');
    // SceneManager.e
    let sceneCount = SceneManager.scenes.size;
    // let newScene = new Scene(SceneManager.engine);
    // SceneManager.appMan.canvas = newScene.getEngine().getRenderingCanvas();
    // SceneManager.appMan.commandBroker = new CommandBroker();
    // SceneManager.appMan.worldInformation = new WorldInformation(newScene, SceneManager.appMan.commandBroker, SceneManager.appMan.setSelectedObject);
    // SceneManager.appMan.sceneHelper = new SceneHelper(SceneManager.appMan.worldInformation, SceneManager.appMan.canvas);
    // SceneManager.appMan.sceneHelper.createScene(true);
    // const mouseHandler = new MouseHandler(SceneManager.appMan.worldInformation, SceneManager.appMan.sceneHelper, SceneManager.appMan.programState);
    // mouseHandler.onMouseInteraction();
    // const keyboardHandler = new KeyboardHandler(SceneManager.appMan.worldInformation, SceneManager.appMan, SceneManager.appMan.programState);
    // keyboardHandler.onKeyboardInteraction();
    SceneManager.scenes.set("Layer " + sceneCount, new VapeScene(SceneManager.engine, this.setSelectedObject));
    SceneManager.SceneSwitch("Layer " + sceneCount);
  }

  public static SceneAdd(name: string, scene: VapeScene) {
    SceneManager.scenes.set(name, scene);
  }

  public static SceneRemoveCurrent() {
    SceneManager.scenes.delete(this.activeScene);
    this.activeScene = SceneManager.scenes.entries().next().value[0];
    SceneManager.SceneSwitch(this.activeScene);
  }

  public static SceneSwitch(name: string) {
    Object.keys(SceneManager.sceneListeners).forEach( key => {
      SceneManager.sceneListeners[key]('' + name);
    });
    this.attachControl();
    this.activeScene = name;
    this.detachControl();
    console.log('-> ' + name);
  }

  public static ResetCamCurrentScene() {
    let vScene = SceneManager.CurrentVapeScene();
    if(vScene !== undefined)
      vScene.sceneHelper.resetCam();
  }

  private static attachControl() {
    let curScene = this.CurrentScene();
    if(curScene !== undefined) {
      curScene.detachControl();
    }
  }

  private static detachControl() {
    let curScene = this.CurrentScene();
    if(curScene !== undefined) {
      curScene.attachControl(true, true, true);
    }
  }
}

export default function CreateCanvas({ antialias, onSceneReady, id, setSelectedObject }: CanvasProps) {
  const rectCanvas = useRef(null);

  useEffect(() => {
    if (rectCanvas.current) {
      let engine = new Engine(rectCanvas.current, antialias);
      new SceneManager(engine);
      SceneManager.engine = engine;

      console.log('new VapeScene');
      let scene = new VapeScene(SceneManager.engine, setSelectedObject);
      console.log(scene);
      SceneManager.SceneAdd("Main", scene);
      SceneManager.SceneSwitch("Main");
      console.log(SceneManager.scenes);
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
  }, [rectCanvas]);
  return <canvas ref={rectCanvas} id={id} />;
};