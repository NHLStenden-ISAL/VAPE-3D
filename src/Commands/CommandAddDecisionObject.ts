import { Nullable, Scene, Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { BaseObject } from "../Objects/BaseObject";
import { DecisionObject } from "../Objects/DecisionObject";
import { ICommand } from "./ICommand";

export class CommandAddDecisionObject implements ICommand {

  private scene: Scene;
  private position: Vector3;
  private objectList: BaseObject[];
  private direction: Direction;

  private object: Nullable<DecisionObject> = null;

  constructor(scene: Scene, position: Vector3, direction: Direction, objectList: BaseObject[]) {
    this.scene = scene;
    this.position = position;
    this.direction = direction;

    this.objectList = objectList;
  }

  execute(): void {
    this.object = new DecisionObject(this.scene, this.position, this.objectList, this.direction);
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }
  
  redo(): void {
    throw new Error("Method not implemented.");
  }
  
}