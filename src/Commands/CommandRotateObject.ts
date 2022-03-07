import { ICommand } from "./ICommand";
import { BaseObject } from "../Objects/BaseObject";
import { Direction } from "../Compositions/Transformable";


export class CommandRotateObject implements ICommand {
  private object: BaseObject;
  private startDirection: Direction;
  private endDirection: Direction;

  constructor(object: BaseObject) {
    this.object = object;
    this.startDirection = object.getStartDirection();
    this.endDirection = object.getDirection();

    console.log("Created rotate command: ", this.startDirection, this.endDirection);
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