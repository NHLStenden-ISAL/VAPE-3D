import BaseObject from "../Objects/BaseObject";
import ICommand from "./ICommand";
import { Direction } from "../Compositions/Transformable";

export default class CommandRotateObject implements ICommand {
  private object: BaseObject;
  private startDirection: Direction;
  private endDirection: Direction;

  constructor(object: BaseObject) {
    this.object = object;
    this.startDirection = object.getStartDirection();
    this.endDirection = object.getDirection();
  }

  execute(): void {
    this.endDirection = this.object.getDirection();
  }

  undo(): void {
    this.object.rotateToward(this.startDirection);
  }

  redo(): void {
    this.object.rotateToward(this.endDirection);
  }
}