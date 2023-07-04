import BaseObject from "../Objects/BaseObject";
import CommandBroker from "./CommandBroker";
import SceneHelper from "./SceneHelper";
import ProgramState, { BuildTypes, GameState } from "./ProgramState";
import WorldInformation, { VAPLProgram } from "./WorldInformation";
import { Dispatch, SetStateAction } from "react";
import ObserverContainer from "./ObserverContainer";
import downloadTextFile from "./DownloadHelper";
import VariableObject from "../Objects/VariableObject";
import {
  EvaluateDataContainer,
  DecisionDataContainer,
  DirectionDataContainer,
  PrintDataContainer,
  RobotDataContainer,
  VariableDataContainer,
  CallDataContainer, ReturnDataContainer
} from "../Objects/DataContainers";
import RobotObject from "../Objects/RobotObject";
import DecisionObject from "../Objects/DecisionObject";
import DirectionObject from "../Objects/DirectionObject";
import EvaluateObject from "../Objects/Arithmetic/EvaluateObject";
import PrintObject from "../Objects/PrintObject";
import { SceneManager } from "../Objects/SceneComponent";
import VapeScene from "../VapeScene";
import RunTimeVapeScene from "../RunTimeVapeScene";
import CallObject from "../Objects/CallObject";
import ReturnObject from "../Objects/ReturnObject";
import { MemoryController, functionVariable, variableType } from "../MemoryManagement/memoryController";
import { MemoryVisualizer } from "./MemoryVisualizer";
import { VapeSave } from "./VapeSave";

export type SetSelectedObject = Dispatch<SetStateAction<BaseObject | undefined>>;

export default class AppManager {
  public canvas: any;

  private sceneHelper: SceneHelper;
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
    this.programState = SceneManager.programState;
    // this.programState = new ProgramState();
    this.commandBroker = vapeScene.commandBroker;
    this.worldInformation = vapeScene.worldInformation;
    this.sceneHelper = vapeScene.sceneHelper;
    const worldInfo = this.worldInformation;
    SceneManager.setSelectedObject = setSelectedObject;
    this.observerContainer.setDownloadProgram(() => { downloadTextFile(SceneManager.saveProgram("testProgram").toString(),"program.vapl"); });
    this.observerContainer.setUploadProgram((program: string) => {
      SceneManager.loadProgram(VapeSave.fromString(program));
    });
  }

  public setupObservers() {
    this.observerContainer.subscribeStateGame((state) => this.changeGameState(state));
    this.observerContainer.subscribeStateBuild((type) => this.changeBuildType(type));
    this.observerContainer.subscribeStateEditor((state) => SceneManager.programState.setEditorState(state));
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
    if (SceneManager.programState.getGameState() === 'run') { return; }
    SceneManager.programState.setGameState('run');
    console.log("Running program...");
    SceneManager.runTime = new RunTimeVapeScene(SceneManager.engine, this.setSelectedObject);

    //parse all layers to a map for all variables with sizes
    let functionMap: Map<string, functionVariable[]> = new Map();
    SceneManager.scenes.forEach((scene,name)=>{
      let vars:functionVariable[]=[];
      scene.worldInformation.getSceneObjects().forEach((object,_)=>{
        if(object instanceof VariableObject){
          let storable = (object as VariableObject).getStorable()
          vars.push({name:storable.getName(),type:object.getVariableType(),size:object.getVariableSize()});
        }
      });
      functionMap.set(name,vars);
    });
    
    const memoryController = MemoryController.getInstance();
    memoryController.addFunctions(functionMap);
    
    const memoryVisualizer = MemoryVisualizer.getInstance();
    memoryController.addObserver('onCall', (functionName: string, size:number, params:{address:number, value: any}[])=>{memoryVisualizer.renderCall(functionName,size, params)});
    memoryController.addObserver('onReturn', ()=>{memoryVisualizer.renderReturn()});
    memoryController.addObserver('onActivate', (type: variableType, name: string, size: number, address: number, index: number, layer: number)=> {memoryVisualizer.renderVariable(type, name, size, address, index, layer)});
    memoryController.addObserver('onAssignment',(type: variableType, name: string, address: number, value: any)=> {memoryVisualizer.renderAssignment(type, name, address, value)});
    memoryController.addObserver('onHeapChange', (heap: string[])=>{memoryVisualizer.renderHeap(heap)});

    SceneManager.callByName("Main");
    memoryController.call("Main","");
    // try {
    //   SceneManager.callByName("Layer 1");
    // } catch (e){}
    // try {
    //   SceneManager.callByName("Layer 2");
    // } catch (e){}
    this.updateLoop(500);
  }

  public pauseProgram() {
    if (SceneManager.programState.getGameState() === 'build') { return; }
    SceneManager.programState.setGameState('build');
    console.log("Pausing program...");
    this.cancelUpdateLoop();
  }

  public stopProgram() {
    if (SceneManager.programState.getGameState() === 'reset') { return; }
    SceneManager.programState.setGameState('reset');
    console.log("Stopping program...");
    this.cancelUpdateLoop();

    SceneManager.runTime = undefined;
    SceneManager.activeScene = SceneManager.scenes.entries().next().value[0];
    SceneManager.SceneSwitch(SceneManager.activeScene);
    //TODO: place the robot at the start position?

    MemoryController.reset();
    MemoryVisualizer.reset();
    SceneManager.programState.setGameState('build');
  }

  public getObserverContainer(): ObserverContainer {
    return this.observerContainer;
  }

  private changeBuildType(type: BuildTypes) {
    SceneManager.programState.setBuildState(type);
  }

  private updateLoop(delta: number) {
    this.updateTimeout = setTimeout(() => {
      if (SceneManager.programState.getGameState() === 'run') {
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