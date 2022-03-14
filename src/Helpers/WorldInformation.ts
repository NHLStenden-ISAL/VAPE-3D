import { AbstractMesh, Color3, HighlightLayer, Mesh, Nullable, Scene } from "@babylonjs/core";
import { BaseObject } from "../Objects/BaseObject";
import { RobotObject } from "../Objects/RobotObject";
import { CommandBroker } from "./CommandBroker";
import { GUIHelper } from "./GUIHelper";

export class WorldInformation {
  private scene: Scene;
  private highLightLayer: HighlightLayer;
  private sceneObjects: Map<string, BaseObject> = new Map();
  private robotObjects: RobotObject[] = [];

  private commandBroker: CommandBroker;
  private guiHelper: GUIHelper;

  constructor(scene: Scene, commandBroker: CommandBroker, guiHelper: GUIHelper) {
    this.scene = scene;
    this.commandBroker = commandBroker;
    this.guiHelper = guiHelper;

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

  public getGUIHelper(): GUIHelper {
    return this.guiHelper;
  }

  public turnOnHighLight(mesh: Mesh, color: Color3) {
    this.highLightLayer.addMesh(mesh, color);
  }

  public turnOffHighLight(mesh: Mesh) {
    this.highLightLayer.removeMesh(mesh);
  }
}