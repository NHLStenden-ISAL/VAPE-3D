import { Nullable, Scene, Vector3 } from "@babylonjs/core";
import { BaseObject } from "../Objects/BaseObject";
import { VariableObject } from "../Objects/VariableObject";
import { ICommand } from "./ICommand";

export class CommandAddVariableObject implements ICommand {
  private scene: Scene;
  private position: Vector3;
  private objectList: BaseObject[];

  private object: Nullable<VariableObject> = null;

  constructor(scene: Scene, position: Vector3, objectList: BaseObject[]) {
    this.scene = scene;
    this.position = position;
    this.objectList = objectList;
  }

  execute(): void {
    this.object = new VariableObject(this.scene, this.position, this.objectList);
  }

  undo(): void {
    //TODO: remove object from list?
    throw new Error("Method not implemented.");
  }

  redo(): void {
    //TODO: add object again to list?
    throw new Error("Method not implemented.");
  }

}