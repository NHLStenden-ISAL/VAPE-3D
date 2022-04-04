import BaseObject from "../Objects/BaseObject";
import CommandAddObject from "../Commands/CommandAddObject";
import CommandDeleteObject from "../Commands/CommandDeleteObject";
import GridObject from "../Objects/GridObject";
import WorldInformation from "./WorldInformation";
import { ArcRotateCamera, HemisphericLight, Vector2, Vector3 } from "@babylonjs/core";
import { BuildTypes } from "./ProgramState";
import { createCamera } from "./ObjectCreator";
import { Direction } from "../Compositions/Transformable";

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

    this.addVariableObject(new Vector2(2, 3));
    this.addVariableObject(new Vector2(10, 5));

    this.addDirectionObject(new Vector2(-1, 0), Direction.NORTH);
    this.addDirectionObject(new Vector2(-10, 0), Direction.EAST);

    this.addRobotObject(new Vector2(0, 0));

    this.addDecisionObject(new Vector2(-10, 9), Direction.SOUTH);
    this.addDecisionObject(new Vector2(-1, 9), Direction.WEST);
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

  public addObject(gridPosition: Vector2, object: BuildTypes) {
    switch (object) {
      case 'variable':
        this.addVariableObject(gridPosition);
        break;
      case 'robot':
        this.addRobotObject(gridPosition);
        break;
      case 'direction':
        this.addDirectionObject(gridPosition);
        break;
      case 'decision':
        this.addDecisionObject(gridPosition);
        break;
    }
  }

  public deleteObject(object: BaseObject) {
    const command = new CommandDeleteObject(object);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addVariableObject(gridPosition: Vector2, direction: Direction = Direction.NORTH) {
    const command = new CommandAddObject(this.worldInfo, gridPosition, direction, 'variable');
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addDirectionObject(gridPosition: Vector2, direction: Direction = Direction.NORTH) {
    const command = new CommandAddObject(this.worldInfo, gridPosition, direction, 'direction');
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addDecisionObject(gridPosition: Vector2, direction: Direction = Direction.NORTH) {
    const command = new CommandAddObject(this.worldInfo, gridPosition, direction, 'decision');
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  private addRobotObject(gridPosition: Vector2, direction: Direction = Direction.NORTH) {
    const command = new CommandAddObject(this.worldInfo, gridPosition, direction, 'robot');
    this.worldInfo.getCommandBroker().executeCommand(command);
  }
}