import { ICommand } from "./ICommand";

export class CommandChangeValue implements ICommand {
  
  execute(): void {
    throw new Error("Method not implemented.");
  }
  undo(): void {
    throw new Error("Method not implemented.");
  }
  redo(): void {
    throw new Error("Method not implemented.");
  }
  
}