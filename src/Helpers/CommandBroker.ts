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

    this.undoArray.push(command);
    this.redoArray.length = 0;

    console.log(`Commands executed: ${this.undoArray.length}`);
  }

  public undo(): boolean {
    const command = this.undoArray.pop();
    if (!command)
      return false;
    
    command.undo();
    this.redoArray.push(command);

    return true;
  }

  public redo(): void {
    const command = this.redoArray.pop();
    if (!command)
      return;

    command.redo();
    this.undoArray.push(command);
  }
}