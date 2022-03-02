import { ICommand } from "../Commands/ICommand";

export class CommandBroker {
  private undoArray: ICommand[];
  private redoArray: ICommand[];

  constructor() {
    this.undoArray = [];
    this.redoArray = [];
  }

  public executeCommand(command: ICommand): void {
    command.execute();
  }

  public undo(): void {
    let command = this.undoArray.pop();
    if (command !== undefined) {
      command.undo();

      this.redoArray.push(command);
    }
  }

  public redo(): void {
    let command = this.redoArray.pop();
    if (command !== undefined) {
      command.redo();

      this.undoArray.push(command);
    }

  }
}