import BaseObject from "../Objects/BaseObject";
import CommandBroker from "./CommandBroker";
import RobotObject from "../Objects/RobotObject";
import { AbstractMesh, Color3, HighlightLayer, Mesh, Nullable, Scene } from "@babylonjs/core";
import { SetSelectedObject } from "./AppManager";
import { BaseDataContainer } from "../Objects/DataContainers";

export type VAPLProgram = {
  name: string;
  units: BaseDataContainer[];
}

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

  public copy(worldInfo: WorldInformation) {
    this.sceneObjects.forEach((val: BaseObject, key: string) => {
      if(val !== undefined){
        val.getStartDirection()
        worldInfo.addSceneObject(val.copy(worldInfo));
      }
    });
    // for (const sceneObjectsKey in this.sceneObjects.keys()) {
    //   const val = this.sceneObjects.get(sceneObjectsKey);
    //   if(val != undefined)
    //     worldInfo.addSceneObject(val.copy(worldInfo));
    // }

    // for (let sceneObjectsKey in worldInfo.sceneObjects) {
    //   let val = worldInfo.sceneObjects.get(sceneObjectsKey);
    //   if(val !== undefined)
    //     this.addSceneObject(val.copy(worldInfo));
    // }
  }

  public getScene(): Scene {
    return this.scene;
  }

  public setScene(newScene: Scene) {
    this.scene = newScene;
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

  public removeAllSceneObjects(): void {
    this.sceneObjects.forEach((value: BaseObject) => {
      value.delete();
    });
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

  public getDataContainerArray(): Array<BaseDataContainer> {
    let ar: Array<BaseDataContainer> = [];
    this.sceneObjects.forEach(object => {
      ar.push(object.getDataContainer());
    });
    return ar;
  }

  /**
   * @deprecated
   */
  public programAsJSONObject() : VAPLProgram {
    let jsonArray : any[] = [];
    this.sceneObjects.forEach(object => {
      jsonArray.push(object.getDataContainer());
    });
    return { name:"NOT IMPLEMENTED", units: jsonArray };
  }
}