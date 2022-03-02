import { Nullable, Scene, Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { BaseObject } from "../Objects/BaseObject";
import { DirectionObject } from "../Objects/DirectionObject";
import { ICommand } from "./ICommand";

export class CommandAddDirectionObject implements ICommand {

  private scene: Scene;
  private position: Vector3;
  private objectList: BaseObject[];
  private direction: Direction;

  private object: Nullable<DirectionObject> = null;

  constructor(scene: Scene, position: Vector3, direction: Direction, objectList: BaseObject[]) {
    this.scene = scene;
    this.position = position;
    this.direction = direction;

    this.objectList = objectList;
  }

  execute(): void {
    this.object = new DirectionObject(this.scene, this.position, this.objectList, this.direction);
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }
  
  redo(): void {
    throw new Error("Method not implemented.");
  }
  
}