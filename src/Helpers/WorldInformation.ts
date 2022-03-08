import { AbstractMesh, Nullable, Scene } from "@babylonjs/core";
import { BaseObject } from "../Objects/BaseObject";
import { RobotObject } from "../Objects/RobotObject";
import { CommandBroker } from "./CommandBroker";

export class WorldInformation {
  private scene: Scene;
  private sceneObjects: Map<string, BaseObject> = new Map();
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
    this.sceneObjects.set(object.getUUID(), object);
  }

  public getSceneObjects(): Map<string, BaseObject> {
    return this.sceneObjects;
  }

  public removeSceneObject(object: BaseObject): void {
    if (!this.sceneObjects.has(object.getUUID())) { return; }

    this.sceneObjects.delete(object.getUUID());
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

    if (this.sceneObjects.has(targetMesh.name)) {
      return this.sceneObjects.get(targetMesh.name);
    }

    return undefined;
  }

  public getCommandBroker(): CommandBroker {
    return this.commandBroker;
  }
}