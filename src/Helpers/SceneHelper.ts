import { AbstractMesh, ArcRotateCamera, HemisphericLight, Nullable, Scene, Vector3 } from "@babylonjs/core";
import { Clickable } from "../Compositions/Clickable";
import { BoxObject } from "../Objects/BoxObject";
import { GridObject } from "../Objects/GridObject";
import { MouseHandler } from "./MouseHandler";
import { createCamera } from "./ObjectCreator";

export class SceneHelper {
  private sceneObjects: Clickable[] = [];

  private camera: ArcRotateCamera;
  private canvas: any;
  private scene: Scene;

  constructor(scene: Scene, canvas: any) {
    this.canvas = canvas;
    this.scene = scene;
    this.camera = createCamera(scene, canvas);
  }

  public createScene() {
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;

    let mouseHandler = new MouseHandler(this.scene, this);
    mouseHandler.onMouseInteraction();

    new GridObject(this.scene, 60);

    new BoxObject(this.scene, new Vector3(1, 0, 1), this.sceneObjects);
    new BoxObject(this.scene, new Vector3(5, 0, 1), this.sceneObjects);
  }

  public disableCameraControl() {
    this.camera.detachControl(this.canvas);
  }

  public enableCameraControl() {
    this.camera.attachControl(this.canvas, true);
  }

  public getObjectByMesh(targetMesh: Nullable<AbstractMesh>) {
    for (let object of this.sceneObjects) {
      if (object.getMesh() === targetMesh) {
        return object;
      }
    }

    return null;
  }
}