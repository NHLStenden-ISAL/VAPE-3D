import { Nullable, Scene, Vector3 } from "@babylonjs/core";
import { runInThisContext } from "vm";
import { BaseObject } from "../Objects/BaseObject";
import { RobotObject } from "../Objects/RobotObject";
import { ICommand } from "./ICommand";

export class CommandAddRobotObject implements ICommand {
  private scene: Scene;
  private position: Vector3;
  private objectList: BaseObject[];
  private robotList: RobotObject[];

  private object: Nullable<RobotObject> = null;

  constructor(scene: Scene, position: Vector3, objectList: BaseObject[], robotList: RobotObject[]) {
    this.scene = scene;
    this.position = position;
    this.objectList = objectList;
    this.robotList = robotList;
  }

  execute(): void {
    this.object = new RobotObject(this.scene, this.position, this.objectList, this.robotList);
  }

  undo(): void {
    if (this.object === null) {
      return;
    }

    
    //TODO: remove object from list?
    throw new Error("Method not implemented.");
  }

  redo(): void {
    //TODO: add object again to list?
    throw new Error("Method not implemented.");
  }

}