import { Engine } from "@babylonjs/core";
import AppManager, { SetSelectedObject } from "./AppManager";
import ProgramState from "./ProgramState";
import WorldInformation from "./WorldInformation";
import VapeScene from "../VapeScene";
import RunTimeVapeScene from "../RunTimeVapeScene";
import { VapeSave, VapeSaveLayer } from "./VapeSave";
import { CallDataContainer, DecisionDataContainer, DirectionDataContainer, EvaluateDataContainer, PrintDataContainer, ReturnDataContainer, RobotDataContainer, VariableDataContainer } from "../Objects/DataContainers";
import CallObject from "../Objects/CallObject";
import ReturnObject from "../Objects/ReturnObject";
import VariableObject from "../Objects/VariableObject";
import RobotObject from "../Objects/RobotObject";
import DecisionObject from "../Objects/DecisionObject";
import DirectionObject from "../Objects/DirectionObject";
import EvaluateObject from "../Objects/EvaluateObject";
import PrintObject from "../Objects/PrintObject";

export class SceneManager {
  static engine: Engine;
  static setSelectedObject: SetSelectedObject;
  static scenes = new Map<string, VapeScene>();
  static activeScene = "";
  static sceneListenerCount = 0;
  static sceneListeners: any = {};
  static canvas: any;
  static appMan: AppManager;
  static programState = new ProgramState();
  // static overlayUI: AdvancedDynamicTexture;
  static runTime: RunTimeVapeScene | undefined;

  constructor(engine: Engine) {
    SceneManager.engine = engine;

    engine.runRenderLoop(() => {
      let currentScene = SceneManager.CurrentScene();
      if (currentScene !== undefined) {
        currentScene.render();
      }
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });
  }

  public static callByName(name: string) {
    const foundScene = SceneManager.scenes.get(name);
    if (SceneManager.runTime?.scene === undefined)
      return;
    const newWorldInfo = new WorldInformation(SceneManager.runTime?.scene, SceneManager.runTime?.commandBroker, SceneManager.runTime?.setSelectedObject);
    foundScene?.worldInformation.copy(newWorldInfo);
    SceneManager.runTime?.pushGrid(newWorldInfo);
  }

  public static return() {
    //TODO: check if this was the last layer. If so stop runtime
    try {
      this.runTime?.popGrid();
    } catch (e) { }
  }

  public static addSceneListener(listener: any) {
    let id = SceneManager.sceneListenerCount++;
    SceneManager.sceneListeners[id] = listener;
    return id;
  }

  public static removeConsoleListener(id: number) {
    delete SceneManager.sceneListeners[id];
  }

  public static CurrentVapeScene() {
    return SceneManager.scenes.get(this.activeScene);
  }

  public static CurrentScene() {
    if (SceneManager.runTime !== undefined) {
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
    let sceneCount = SceneManager.scenes.size;
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

  private static updateListeners(message: string) {
    Object.keys(SceneManager.sceneListeners).forEach(key => {
      SceneManager.sceneListeners[key](message);
    });
  }

  public static SceneSwitch(name: string) {
    this.updateListeners(name);
    this.attachControl();
    this.activeScene = name;
    this.detachControl();
  }

  public static ResetCamCurrentScene() {
    let vScene = SceneManager.CurrentVapeScene();
    if (vScene !== undefined)
      vScene.sceneHelper.resetCam();
  }

  private static attachControl() {
    let curScene = this.CurrentScene();
    if (curScene !== undefined) {
      curScene.detachControl();
    }
  }

  private static detachControl() {
    let curScene = this.CurrentScene();
    if (curScene !== undefined) {
      curScene.attachControl(true, true, true);
    }
  }

  public static saveProgram(name: string): VapeSave {
    const scenesArray = Array.from(this.scenes, ([name, value]) => ({ name, value }));
    return new VapeSave(name, scenesArray.map(value => new VapeSaveLayer(value.name, value.value.worldInformation.getDataContainerArray())) as unknown as Array<VapeSaveLayer>);
  }

  public static loadProgram(save: VapeSave) {
    this.scenes.clear();
    save.layers.forEach((layer) => {
      const newScene = new VapeScene(SceneManager.engine, this.setSelectedObject, false);
      const worldInfo = newScene.worldInformation;
      SceneManager.SceneAdd(layer.name, newScene);
      this.activeScene = layer.name;
      layer.contents.forEach(container => {
        switch (container.type) {
          case 'call': {
            const cUnit = container as CallDataContainer;
            const cObject = new CallObject(worldInfo, cUnit.location, cUnit.direction);
            cObject.getStorable().changeValue(cUnit.call);
            cObject.setReturnVariable(cUnit.returnVar);
            cObject.setArguments(cUnit.args);
            break;
          }
          case 'return': {
            const dUnit = container as ReturnDataContainer;
            const dObject = new ReturnObject(worldInfo, dUnit.location, dUnit.direction);
            dObject.setStatement(dUnit.statement);
            break;
          }
          case 'variable': {
            const vUnit = container as VariableDataContainer;
            const vObject = new VariableObject(worldInfo, vUnit.location, vUnit.direction);
            vObject.getStorable().changeName(vUnit.name);
            vObject.getStorable().changeValue(vUnit.value);
            vObject.setVariableType(vUnit.variableType);
            vObject.setVariableSize(vUnit.variableSize);
            break;
          }
          case 'robot': {
            const rUnit = container as RobotDataContainer;
            new RobotObject(worldInfo, rUnit.location, rUnit.direction);
            break;
          }
          case 'decision': {
            const dUnit = container as DecisionDataContainer;
            const dObject = new DecisionObject(worldInfo, dUnit.location, dUnit.direction);
            dObject.getStorable().changeValue(dUnit.statement);
            break;
          }
          case 'direction': {
            const dUnit = container as DirectionDataContainer;
            new DirectionObject(worldInfo, dUnit.location, dUnit.direction);
            break;
          }
          case 'evaluate': {
            const cUnit = container as EvaluateDataContainer;
            const cObject = new EvaluateObject(worldInfo, cUnit.location, cUnit.direction);
            cObject.getStorable().changeName(cUnit.name);
            cObject.getStorable().changeValue(cUnit.value);
            cObject.changeStatement(cUnit.statement);
            cObject.setIndex(cUnit.index);
            break;
          }
          case 'print': {
            const pUnit = container as PrintDataContainer;
            const pObject = new PrintObject(worldInfo, pUnit.location, pUnit.direction);
            pObject.getStorable().changeValue(pUnit.statement);
            break;
          }
        }
      });
    });
    this.activeScene = save.layers[0].name;
    this.updateListeners("");
  }
}
