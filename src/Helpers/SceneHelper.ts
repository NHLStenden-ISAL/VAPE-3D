import { ArcRotateCamera, HemisphericLight, Vector3 } from "@babylonjs/core";
import { CommandAddDecisionObject } from "../Commands/CommandAddDecisionObject";
import { CommandAddDirectionObject } from "../Commands/CommandAddDirectionObject";
import { CommandAddRobotObject } from "../Commands/CommandAddRobotObject";
import { CommandAddVariableObject } from "../Commands/CommandAddVariableObject";
import { CommandDeleteObject } from "../Commands/CommandDeleteObject";
import { Direction } from "../Compositions/Transformable";
import { BaseObject } from "../Objects/BaseObject";
import { GridObject } from "../Objects/GridObject";
import { createCamera } from "./ObjectCreator";
import { WorldInformation } from "./WorldInformation";

export class SceneHelper {
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

    this.addVariableObject(new Vector3(2, 0, 3));
    this.addVariableObject(new Vector3(10, 3, 5));

    this.addDirectionObject(new Vector3(-1, 0, 0), Direction.NORTH);
    this.addDirectionObject(new Vector3(-10, 0, 0), Direction.EAST);

    this.addRobotObject(new Vector3(0, 0, 0));

    this.addDecisionObject(new Vector3(-10, 0, 9), Direction.SOUTH);
    this.addDecisionObject(new Vector3(-1, 0, 9), Direction.WEST);
  }

  public updateRobots() {
    this.worldInfo.getRobotObjects().forEach(robot => {
      robot.stepForward();
      robot.checkIntersection();
    });
  }

  public disableCameraControl() {
    this.camera.detachControl(this.canvas);
  }

  public enableCameraControl() {
    this.camera.attachControl(this.canvas, true);
  }

  public addObject(position: Vector3) {
    //TODO: add different object types
    this.addVariableObject(position);
  }

  public deleteObject(object: BaseObject) {
    const command = new CommandDeleteObject(object);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addVariableObject(position: Vector3, direction: Direction = Direction.NORTH) {
    const command = new CommandAddVariableObject(this.worldInfo, position, direction);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addDirectionObject(position: Vector3, direction: Direction = Direction.NORTH) {
    const command = new CommandAddDirectionObject(this.worldInfo, position, direction);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addDecisionObject(position: Vector3, direction: Direction = Direction.NORTH) {
    const command = new CommandAddDecisionObject(this.worldInfo, position, direction);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addRobotObject(position: Vector3, direction: Direction = Direction.NORTH) {
    const command = new CommandAddRobotObject(this.worldInfo, position, direction);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }
}