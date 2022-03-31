import BaseObject from "../Objects/BaseObject";
import ICommand from "./ICommand";
import { Vector2 } from "@babylonjs/core";

export default class CommandMoveObject implements ICommand {
  private object: BaseObject;

  private startPosition: Vector2;
  private endPosition: Vector2;

  constructor(object: BaseObject) {
    this.object = object;
    this.startPosition = object.getStartPosition();
    this.endPosition = object.getGridPosition();
  }

  execute(): void {
    this.endPosition = this.object.getGridPosition();
  }

  undo(): void {
    this.object.move(this.startPosition);
  }

  redo(): void {
    this.object.move(this.endPosition);
  }

}