import BaseObject from "../Objects/BaseObject";
import CommandAddObject from "../Commands/CommandAddObject";
import CommandDeleteObject from "../Commands/CommandDeleteObject";
import GridObject from "../Objects/GridObject";
import WorldInformation from "./WorldInformation";
import { ArcRotateCamera, HemisphericLight, Vector2, Vector3 } from "@babylonjs/core";
import { BuildTypes } from "./ProgramState";
import { createCamera } from "./ObjectCreator";
import { Direction } from "../Compositions/Transformable";
// import CommandAddLayer from "../Commands/CommandAddLayer";

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
    this.addObject(new Vector2(0, 0), 'grid');

    // this.addLayer(1);

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
    this.camera.detachControl(this.canvas);
  }

  public enableCameraControl() {
    this.camera.attachControl(this.canvas, true);
  }

  public addObject(gridPosition: Vector2, object: BuildTypes, direction: Direction = Direction.NORTH) {
    const command = new CommandAddObject(this.worldInfo, gridPosition, direction, object);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  // public addLayer(layer: number) {
  //   // new GridObject(this.worldInfo.getScene(), 60, layer);
  //   const command = new CommandAddLayer(this.worldInfo.getScene(), layer);
  //   this.worldInfo.getCommandBroker().executeCommand(command);
  // }

  public deleteObject(object: BaseObject) {
    const command = new CommandDeleteObject(object);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }
}