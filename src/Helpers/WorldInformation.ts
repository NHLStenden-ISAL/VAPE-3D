import { AbstractMesh, Nullable, Scene } from "@babylonjs/core";
import { BaseObject } from "../Objects/BaseObject";
import { RobotObject } from "../Objects/RobotObject";
import { CommandBroker } from "./CommandBroker";

export class WorldInformation {
  private scene: Scene;
  private sceneObjects: BaseObject[] = [];
  private robotObjects: RobotObject[] = [];

  private commandBroker: CommandBroker;

  constructor(scene: Scene, commandBroker: CommandBroker) {
    this.scene = scene;
    this.commandBroker = commandBroker;
  }

  public getScene(): Scene {
    return this.scene;
  }

  public addSceneObject(object: BaseObject): void {
    this.sceneObjects.push(object);
  }

  public getSceneObjects(): BaseObject[] {
    return this.sceneObjects;
  }

  public addRobotObject(object: RobotObject): void {
    this.robotObjects.push(object);
  }

  public getRobotObjects(): RobotObject[] {
    return this.robotObjects;
  }

  public getObjectByMesh(targetMesh: Nullable<AbstractMesh>): BaseObject | undefined {
    if (targetMesh == null)
      return undefined;

    for (let object of this.sceneObjects) {
      if (object.getMesh() === targetMesh) {
        return object;
      }
    }

    return undefined;
  }

  public getCommandBroker(): CommandBroker {
    return this.commandBroker;
  }
}