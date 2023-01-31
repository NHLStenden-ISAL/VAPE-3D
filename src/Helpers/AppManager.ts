import BaseObject from "../Objects/BaseObject";
import CommandBroker from "./CommandBroker";
import KeyboardHandler from "./KeyboardHandler";
import MouseHandler from "./MouseHandler";
import SceneHelper from "./SceneHelper";
import ProgramState, { BuildTypes, GameState } from "./ProgramState";
import WorldInformation, { VAPLProgram } from "./WorldInformation";
import { Dispatch, SetStateAction } from "react";
import { Scene } from "@babylonjs/core";
import ObserverContainer from "./ObserverContainer";
import downloadTextFile from "./DownloadHelper";
import VariableObject from "../Objects/VariableObject";
import { EvaluateDataContainer, DecisionDataContainer, DirectionDataContainer, PrintDataContainer, RobotDataContainer, VariableDataContainer } from "../Objects/DataContainers";
import RobotObject from "../Objects/RobotObject";
import DecisionObject from "../Objects/DecisionObject";
import DirectionObject from "../Objects/DirectionObject";
import EvaluateObject from "../Objects/Arithmetic/EvaluateObject";
import PrintObject from "../Objects/PrintObject";
import { SceneManager } from "../Objects/SceneComponent";
import {RunTimeManager} from "./RunTimeManager";
import VapeScene from "../VapeScene";

export type SetSelectedObject = Dispatch<SetStateAction<BaseObject | undefined>>;

export default class AppManager {
  public canvas: any;

  private sceneHelper: SceneHelper;
  // private sceneManager: SceneManager;
  private programState: ProgramState;
  private commandBroker: CommandBroker;
  private worldInformation: WorldInformation;
  private observerContainer: ObserverContainer;
  private setSelectedObject: SetSelectedObject;

  private updateTimeout: any;

  constructor(vapeScene: VapeScene, observerContainer: ObserverContainer, setSelectedObject: SetSelectedObject) {
    this.canvas = vapeScene.canvas;
    this.observerContainer = observerContainer;
    this.setSelectedObject = setSelectedObject;
    this.setSelectedObject = vapeScene.setSelectedObject;
    this.programState = new ProgramState();
    this.commandBroker = vapeScene.commandBroker;
    this.worldInformation = vapeScene.worldInformation;
    this.sceneHelper = vapeScene.sceneHelper;
    const worldInfo = this.worldInformation;
    SceneManager.setSelectedObject = setSelectedObject;
    this.observerContainer.setDownloadProgram(() => { downloadTextFile(JSON.stringify(this.worldInformation.programAsJSONObject()), "program.vapl"); });
    this.observerContainer.setUploadProgram((program: string) => {
      let pProgram = JSON.parse(program) as VAPLProgram;
      if (pProgram.units) {
        worldInfo.removeAllSceneObjects();
        pProgram.units.forEach(unit => {
          switch (unit.type) {
            case 'variable': {
              const vUnit = unit as VariableDataContainer;
              const vObject = new VariableObject(worldInfo, vUnit.location, vUnit.direction);
              vObject.getStorable().changeName(vUnit.name);
              vObject.getStorable().changeValue(vUnit.value);
              break;
            }
            case 'robot': {
              const rUnit = unit as RobotDataContainer;
              new RobotObject(worldInfo, rUnit.location, rUnit.direction);
              break;
            }
            case 'decision': {
              const dUnit = unit as DecisionDataContainer;
              const dObject = new DecisionObject(worldInfo, dUnit.location, dUnit.direction);
              dObject.getStorable().changeValue(dUnit.statement);
              break;
            }
            case 'direction': {
              const dUnit = unit as DirectionDataContainer;
              new DirectionObject(worldInfo, dUnit.location, dUnit.direction);
              break;
            }
            case 'evaluate': {
              const cUnit = unit as EvaluateDataContainer;
              const cObject = new EvaluateObject(worldInfo, cUnit.location, cUnit.direction);
              cObject.getStorable().changeName(cUnit.name);
              cObject.getStorable().changeValue(cUnit.value);
              cObject.changeStatement(cUnit.statement);
              break;
            }
            case 'print': {
              const pUnit = unit as PrintDataContainer;
              const pObject = new PrintObject(worldInfo, pUnit.location, pUnit.direction);
              pObject.getStorable().changeValue(pUnit.statement);
              break;
            }
          }
        });
      }
    });
  }

  public runApp() {
    console.log('runApp');
    // this.sceneHelper.createScene(false);
    //
    // const mouseHandler = new MouseHandler(this.worldInformation, this.sceneHelper, this.programState);
    // mouseHandler.onMouseInteraction();
    //
    // const keyboardHandler = new KeyboardHandler(this.worldInformation, this, this.programState);
    // keyboardHandler.onKeyboardInteraction();
  }

  public setupObservers() {
    this.observerContainer.subscribeStateGame((state) => this.changeGameState(state));
    this.observerContainer.subscribeStateBuild((type) => this.changeBuildType(type));
    this.observerContainer.subscribeStateEditor((state) => this.programState.setEditorState(state));
  }

  public changeGameState(state: GameState): void {
    switch (state) {
      case 'run':
        this.startProgram();
        break;
      case 'build':
        this.pauseProgram();
        break;
      case 'reset':
        this.stopProgram();
        break;
    }
  }

  public startProgram() {
    if (this.programState.getGameState() === 'run') { return; }
    this.programState.setGameState('run');
    console.log("Run the program");
    SceneManager.runTime = new VapeScene(SceneManager.engine, this.setSelectedObject);
    this.updateLoop(500);
  }

  public pauseProgram() {
    if (this.programState.getGameState() === 'build') { return; }
    this.programState.setGameState('build');
    console.log("Pause the program");
    this.cancelUpdateLoop();
  }

  public stopProgram() {
    if (this.programState.getGameState() === 'reset') { return; }
    this.programState.setGameState('reset');
    console.log("Stop the program");
    this.cancelUpdateLoop();

    SceneManager.runTime = undefined;
    SceneManager.activeScene = SceneManager.scenes.entries().next().value[0];
    SceneManager.SceneSwitch(SceneManager.activeScene);
    //TODO: place the robot at the start position, reset all the variables?
  }

  public getObserverContainer(): ObserverContainer {
    return this.observerContainer;
  }

  private changeBuildType(type: BuildTypes) {
    this.programState.setBuildState(type);
  }

  private updateLoop(delta: number) {
    this.updateTimeout = setTimeout(() => {
      if (this.programState.getGameState() === 'run') {
        if(SceneManager.runTime !== undefined) {
          SceneManager.runTime.sceneHelper.updateRobots();
          this.updateLoop(delta);
        } else {
          this.stopProgram();
        }
      }
    }, delta);
  }

  private cancelUpdateLoop() {
    clearTimeout(this.updateTimeout);
  }

  public undo() {
    this.commandBroker.undo();
  }

  public redo() {
    this.commandBroker.redo();
  }
}