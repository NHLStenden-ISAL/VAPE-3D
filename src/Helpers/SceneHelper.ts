import BaseObject from "../Objects/BaseObject";
import CommandAddObject from "../Commands/CommandAddObject";
import CommandDeleteObject from "../Commands/CommandDeleteObject";
import GridObject from "../Objects/GridObject";
import WorldInformation from "./WorldInformation";
import { ArcRotateCamera, HemisphericLight, Vector2, Vector3, SceneLoader } from "@babylonjs/core";
import { BuildTypes } from "./ProgramState";
import { createCamera } from "./ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import "@babylonjs/loaders";

export default class SceneHelper {
  private worldInfo: WorldInformation;

  private camera: ArcRotateCamera;
  private canvas: any;

  constructor(worldInfo: WorldInformation, canvas: any) {
    this.worldInfo = worldInfo;

    this.canvas = canvas;
    this.camera = createCamera(this.worldInfo.getScene(), canvas);
  }

  public createScene() {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.worldInfo.getScene());
    light.intensity = 0.7;

    new GridObject(this.worldInfo.getScene(), 60);

      SceneLoader.ImportMesh("", "3D-Objects/", "Robot-Object.obj", this.worldInfo.getScene(), (meshes) => {
          const mesh = meshes[0];
      //    // Further operations with the loaded mesh
      //    // Position, rotate, or scale the mesh as needed
          mesh.position = new Vector3(3, 0, 0);
          mesh.rotation = new Vector3(0, Math.PI / 2, 0);
          mesh.scaling = new Vector3(0.001, 0.001, 0.001);
      //    mesh.material = new StandardMaterial('color', this.worldInfo.getScene());
      //    mesh.overlayColor = Color3.White();

      //    this.worldInfo.getScene().addMesh(mesh);
      });

    this.addObject(new Vector2(2, 3), 'variable');
    this.addObject(new Vector2(10, 5), 'variable');

    this.addObject(new Vector2(-1, 0), 'direction', Direction.NORTH);
    this.addObject(new Vector2(-10, 0), 'direction', Direction.EAST);

    this.addObject(new Vector2(0, 0), 'robot');

    this.addObject(new Vector2(-10, 9), 'decision', Direction.SOUTH);
    this.addObject(new Vector2(-1, 9), 'decision', Direction.WEST);

    this.addObject(new Vector2(-1, 8), 'evaluate');
  }

  public updateRobots() {
    this.worldInfo.getRobotObjects().forEach(robot => {
      robot.updateRobot();
    });
  }

  public disableCameraControl() {
    this.camera.detachControl();
  }

  public enableCameraControl() {
    this.camera.attachControl(this.canvas, true);
  }

  public addObject(gridPosition: Vector2, object: BuildTypes, direction: Direction = Direction.NORTH) {
    const command = new CommandAddObject(this.worldInfo, gridPosition, direction, object);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  public deleteObject(object: BaseObject) {
    const command = new CommandDeleteObject(object);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }
}