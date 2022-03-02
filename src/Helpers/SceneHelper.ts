import { AbstractMesh, ArcRotateCamera, HemisphericLight, Nullable, Scene, Vector3 } from "@babylonjs/core";
import { CommandAddDecisionObject } from "../Commands/CommandAddDecisionObject";
import { CommandAddDirectionObject } from "../Commands/CommandAddDirectionObject";
import { CommandAddRobotObject } from "../Commands/CommandAddRobotObject";
import { CommandAddVariableObject } from "../Commands/CommandAddVariableObject";
import { Direction } from "../Compositions/Transformable";
import { BaseObject } from "../Objects/BaseObject";
import { GridObject } from "../Objects/GridObject";
import { RobotObject } from "../Objects/RobotObject";
import { CommandBroker } from "./CommandBroker";
import { createCamera } from "./ObjectCreator";

export class SceneHelper {
  private sceneObjects: BaseObject[] = [];
  private robotObjects: RobotObject[] = [];

  private commandBroker: CommandBroker;

  private camera: ArcRotateCamera;
  private canvas: any;
  private scene: Scene;

  constructor(scene: Scene, canvas: any) {
    this.canvas = canvas;
    this.scene = scene;
    this.camera = createCamera(scene, canvas);

    this.commandBroker = new CommandBroker();
  }

  public createScene() {
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;

    new GridObject(this.scene, 60);

    this.addVariableObject(new Vector3(2,0,3));
    this.addVariableObject(new Vector3(10, 3, 5));

    this.addDirectionObject(new Vector3(-1, 0, 0), Direction.NORTH);
    this.addDirectionObject(new Vector3(-10, 0, 0),  Direction.EAST);

    this.addDecisionObject(new Vector3(-10, 0, 9),  Direction.SOUTH);
    this.addDecisionObject(new Vector3(-1, 0, 9),  Direction.WEST);

    this.addRobotObject(new Vector3(0,0,0));
  }

  public updateRobots() {
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
    //TODO: add different object types
    this.addVariableObject(position);
  }

  private addVariableObject(position: Vector3) {
    let command = new CommandAddVariableObject(this.scene, position, this.sceneObjects);
    this.commandBroker.executeCommand(command);
  }

  private addDirectionObject(position: Vector3, direction: Direction = Direction.NORTH) {
    let command = new CommandAddDirectionObject(this.scene, position, direction, this.sceneObjects);
    this.commandBroker.executeCommand(command);
  }

  private addDecisionObject(position: Vector3, direction: Direction = Direction.NORTH) {
    let command = new CommandAddDecisionObject(this.scene, position, direction, this.sceneObjects);
    this.commandBroker.executeCommand(command);
  }
  
  private addRobotObject(position: Vector3) {
    let command = new CommandAddRobotObject(this.scene, position, this.sceneObjects, this.robotObjects);
    this.commandBroker.executeCommand(command);
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