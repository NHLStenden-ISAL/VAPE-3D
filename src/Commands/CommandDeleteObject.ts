import { ICommand } from "./ICommand";
import { BaseObject } from "../Objects/BaseObject";

export class CommandDeleteObject implements ICommand {
  private object: BaseObject;

  constructor(object: BaseObject) {
    this.object = object;
  }

  execute(): void {
    this.object.delete();
  }

  undo(): void {
    this.object.restore();
  }

  redo(): void {
    this.execute();
  }

}