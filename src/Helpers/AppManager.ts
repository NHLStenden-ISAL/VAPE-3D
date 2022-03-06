import { Scene } from "@babylonjs/core";
import { CommandBroker } from "./CommandBroker";
import { KeyboardHandler } from "./KeyboardHandler";
import { MouseHandler } from "./MouseHandler";
import { SceneHelper } from "./SceneHelper";
import { StateManager } from "./StateManager";
import { WorldInformation } from "./WorldInformation";

export class AppManager {
  private canvas: any;

  private sceneHelper: SceneHelper;
  private stateManager: StateManager;
  private commandBroker: CommandBroker;
  private worldInformation: WorldInformation;

  constructor(scene: Scene, canvas: any) {
    this.canvas = canvas;

    this.stateManager = new StateManager();
    this.commandBroker = new CommandBroker();
    this.worldInformation = new WorldInformation(scene, this.commandBroker);
    this.sceneHelper = new SceneHelper(this.worldInformation, this.canvas);
  }

  public runApp() {
    this.sceneHelper.createScene();

    const mouseHandler = new MouseHandler(this.worldInformation, this.sceneHelper, this.stateManager);
    mouseHandler.onMouseInteraction();

    const keyboardHandler = new KeyboardHandler(this.worldInformation, this, this.stateManager);
    keyboardHandler.onKeyboardInteraction();
  }

  public startProgram() {
    this.stateManager.setEditorState('wait');
    this.stateManager.setGameState('run');

    console.log("Start the program");
    this.updateLoop(1000);
  }

  public pauseProgram() {
    this.stateManager.setEditorState('transform');
    this.stateManager.setGameState('build');

    console.log("Pause the program");

  }

  private stopProgram() {
    //TODO: place the robot at the start position, reset all the variables?

  }

  public undo() {
    this.commandBroker.undo();
  }

  public redo() {
    this.commandBroker.redo();
  }

  private updateLoop(delta: number) {
    setTimeout(() => {
      if(this.stateManager.getGameState() === 'run') {
        this.sceneHelper.updateRobots();
        
        this.updateLoop(delta);
      }
    }, delta);
  }


}