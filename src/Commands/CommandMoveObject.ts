import { ICommand } from "./ICommand";
import { BaseObject } from "../Objects/BaseObject";
import { Vector3 } from "@babylonjs/core";

export class CommandMoveObject implements ICommand {
  private object: BaseObject;
  private startPosition: Vector3;
  private endPosition: Vector3;

  constructor(object: BaseObject) {
    this.object = object;
    this.startPosition = object.getStartPosition();
    this.endPosition = object.getEndPosition();
  }

  execute(): void {
    this.endPosition = this.object.getEndPosition();
  }

  undo(): void {
    this.object.move(this.startPosition);
  }

  redo(): void {
    this.object.move(this.endPosition);
  }

}