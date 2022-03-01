import { AbstractMesh, ArcRotateCamera, HemisphericLight, Nullable, Scene, Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { BaseObject } from "../Objects/BaseObject";
import { DecisionObject } from "../Objects/DecisionObject";
import { DirectionObject } from "../Objects/DirectionObject";
import { GridObject } from "../Objects/GridObject";
import { RobotObject } from "../Objects/RobotObject";
import { VariableObject } from "../Objects/VariableObject";
import { KeyboardHandler } from "./KeyboardHandler";
import { MouseHandler } from "./MouseHandler";
import { createCamera } from "./ObjectCreator";
import { StateManager } from "./StateManager";

export class SceneHelper {
  private sceneObjects: BaseObject[] = [];
  private robotObjects: RobotObject[] = [];

  private stateManager: StateManager;

  private camera: ArcRotateCamera;
  private canvas: any;
  private scene: Scene;


  constructor(scene: Scene, canvas: any) {
    this.canvas = canvas;
    this.scene = scene;
    this.camera = createCamera(scene, canvas);

    this.stateManager = new StateManager();
  }

  public createScene() {
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;

    let mouseHandler = new MouseHandler(this.scene, this, this.stateManager);
    mouseHandler.onMouseInteraction();

    let keyboardHandler = new KeyboardHandler(this.scene, this, this.stateManager);
    keyboardHandler.onKeyboardInteraction();

    new GridObject(this.scene, 60);

    new VariableObject(this.scene, new Vector3(2, 0, 3), this.sceneObjects);
    new VariableObject(this.scene, new Vector3(10, 3, 5), this.sceneObjects);

    new DirectionObject(this.scene, new Vector3(-1, 0, 0), this.sceneObjects, Direction.NORTH);
    new DirectionObject(this.scene, new Vector3(-10, 0, 0), this.sceneObjects, Direction.EAST);
    new DecisionObject(this.scene, new Vector3(-10, 0, 9), this.sceneObjects, Direction.SOUTH);
    new DecisionObject(this.scene, new Vector3(-1, 0, 9), this.sceneObjects, Direction.WEST);

    new RobotObject(this.scene, Vector3.Zero(), this.sceneObjects, this.robotObjects);
  }

  private updateLoop(delta: number) {
    setTimeout(() => {
      if (this.stateManager.getGameState() === 'start') {
        this.activateRobots();
        this.updateLoop(delta);
      }
    }, delta);
  }

  public startProgram() {
    this.stateManager.setEditorState('wait');
    this.stateManager.setGameState('start');

    console.log("Start the program");
    this.updateLoop(1000);
  }

  public stopProgram() {
    this.stateManager.setEditorState('transform');
    this.stateManager.setGameState('build');

    console.log("Quit the program");
  }

  private activateRobots() {
    this.robotObjects.forEach(robot => {
      robot.stepForward();
      robot.checkIntersection(this.sceneObjects);
    });
  }

  public disableCameraControl() {
    this.camera.detachControl(this.canvas);
  }

  public enableCameraControl() {
    this.camera.attachControl(this.canvas, true);
  }

  public addObject(position: Vector3) {
    new VariableObject(this.scene, position, this.sceneObjects);
  }

  public getObject(targetMesh: Nullable<AbstractMesh>) {
    for (let object of this.sceneObjects) {
      if (object.getMesh() === targetMesh) {
        return object;
      }
    }

    return null;
  }
}