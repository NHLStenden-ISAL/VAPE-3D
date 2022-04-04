import BaseObject from "../Objects/BaseObject";
import CommandBroker from "./CommandBroker";
import KeyboardHandler from "./KeyboardHandler";
import MouseHandler from "./MouseHandler";
import SceneHelper from "./SceneHelper";
import ProgramState, { BuildTypes } from "./ProgramState";
import WorldInformation from "./WorldInformation";
import { Dispatch, SetStateAction } from "react";
import { Scene } from "@babylonjs/core";
import ObserverContainer from "./ObserverContainer";

export type SetSelectedObject = Dispatch<SetStateAction<BaseObject | undefined>>;

export default class AppManager {
  private canvas: any;

  private sceneHelper: SceneHelper;
  private programState: ProgramState;
  private commandBroker: CommandBroker;
  private worldInformation: WorldInformation;
  private observerContainer: ObserverContainer;

  constructor(scene: Scene, canvas: any, observerContainer: ObserverContainer, setSelectedObject: SetSelectedObject) {
    this.canvas = canvas;
    this.observerContainer = observerContainer;

    this.programState = new ProgramState();
    this.commandBroker = new CommandBroker();
    this.worldInformation = new WorldInformation(scene, this.commandBroker, setSelectedObject);
    this.sceneHelper = new SceneHelper(this.worldInformation, this.canvas);
  }

  public runApp() {
    this.sceneHelper.createScene();

    const mouseHandler = new MouseHandler(this.worldInformation, this.sceneHelper, this.programState);
    mouseHandler.onMouseInteraction();

    const keyboardHandler = new KeyboardHandler(this.worldInformation, this, this.programState);
    keyboardHandler.onKeyboardInteraction();
  }

  public setupObservers() {
    this.observerContainer.subscribeGameStart(() => this.startProgram());
    this.observerContainer.subscribeGamePause(() => this.pauseProgram());
    this.observerContainer.subscribeGameStop(() => this.stopProgram());

    this.observerContainer.subscribeStateBuild((type) => this.changeBuildType(type));
    this.observerContainer.subscribeStateEditor((state) => this.programState.setEditorState(state));
  }

  public startProgram() {
    if (this.programState.getGameState() === 'run') { return; }
    this.programState.setGameState('run');

    console.log("Start the program");
    this.updateLoop(1000);
  }

  public pauseProgram() {
    if (this.programState.getGameState() !== 'run') { return; }
    this.programState.setGameState('build');

    console.log("Pause the program");

  }

  public stopProgram() {
    //TODO: place the robot at the start position, reset all the variables?
  }

  public getObserverContainer(): ObserverContainer {
    return this.observerContainer;
  }

  private changeBuildType(type: BuildTypes) {
    this.programState.setBuildState(type);
  }

  private updateLoop(delta: number) {
    setTimeout(() => {
      if (this.programState.getGameState() === 'run') {
        this.sceneHelper.updateRobots();

        this.updateLoop(delta);
      }
    }, delta);
  }

  public undo() {
    this.commandBroker.undo();
  }

  public redo() {
    this.commandBroker.redo();
  }
}