import BaseObject from "../Objects/BaseObject";
import CommandBroker from "./CommandBroker";
import RobotObject from "../Objects/RobotObject";
import { AbstractMesh, Color3, HighlightLayer, Mesh, Nullable, Scene } from "@babylonjs/core";
import { SetSelectedObject } from "./AppManager";

export default class WorldInformation {
  private scene: Scene;
  private highLightLayer: HighlightLayer;
  private sceneObjects: Map<string, BaseObject> = new Map();
  private robotObjects: RobotObject[] = [];

  private commandBroker: CommandBroker;
  private setSelectedObject: SetSelectedObject;

  constructor(scene: Scene, commandBroker: CommandBroker, setSelectedObject: SetSelectedObject) {
    this.scene = scene;
    this.commandBroker = commandBroker;
    this.setSelectedObject = setSelectedObject;

    this.highLightLayer = new HighlightLayer('highlight', this.scene);
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

  public onSelect(object: BaseObject): void {
    this.setSelectedObject(object);
  }

  public onDeselect(): void {
    this.setSelectedObject(undefined);
  }

  public turnOnHighLight(mesh: Mesh, color: Color3): void {
    this.highLightLayer.addMesh(mesh, color);
  }

  public turnOffHighLight(mesh: Mesh): void {
    this.highLightLayer.removeMesh(mesh);
  }
}