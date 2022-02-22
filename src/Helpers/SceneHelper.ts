import { AbstractMesh, ArcRotateCamera, HemisphericLight, Nullable, Scene, Vector3 } from "@babylonjs/core";
import { GridObject } from "../Objects/GridObject";
import { IObject } from "../Objects/IObject";
import { VariableObject } from "../Objects/VariableObject";
import { KeyboardHandler } from "./KeyboardHandler";
import { MouseHandler } from "./MouseHandler";
import { createCamera } from "./ObjectCreator";
import { StateManager } from "./StateManager";

export class SceneHelper {
  private sceneIObjects: IObject[] = [];
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

    new VariableObject(this.scene, new Vector3(2,0,3), this.sceneIObjects);
    new VariableObject(this.scene, new Vector3(10,3,5), this.sceneIObjects);
  }

  public disableCameraControl() {
    this.camera.detachControl(this.canvas);
  }

  public enableCameraControl() {
    this.camera.attachControl(this.canvas, true);
  }

  public addObject(position: Vector3) {
    new VariableObject(this.scene, position, this.sceneIObjects);
  }

  public getIObject(targetMesh: Nullable<AbstractMesh>) {
    for (let object of this.sceneIObjects) {
      if (object.getMesh() === targetMesh) {
        return object;
      }
    }

    return null;

  }
}