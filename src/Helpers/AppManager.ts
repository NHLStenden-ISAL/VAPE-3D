import { Scene } from "@babylonjs/core";
import { KeyboardHandler } from "./KeyboardHandler";
import { MouseHandler } from "./MouseHandler";
import { SceneHelper } from "./SceneHelper";
import { StateManager } from "./StateManager";

export class AppManager {
  private scene: Scene;
  private canvas: any;

  private sceneHelper: SceneHelper;
  private stateManager: StateManager;

  constructor(scene: Scene, canvas: any) {
    this.scene = scene;
    this.canvas = canvas;

    this.stateManager = new StateManager();
    this.sceneHelper = new SceneHelper(this.scene, this.canvas);
  }

  public runApp() {
    this.sceneHelper.createScene();

    let mouseHandler = new MouseHandler(this.scene, this.sceneHelper, this.stateManager);
    mouseHandler.onMouseInteraction();

    let keyboardHandler = new KeyboardHandler(this.scene, this, this.stateManager);
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

  private updateLoop(delta: number) {
    setTimeout(() => {
      if(this.stateManager.getGameState() === 'run') {
        this.sceneHelper.updateRobots();
        
        this.updateLoop(delta);
      }
    }, delta);
  }


}