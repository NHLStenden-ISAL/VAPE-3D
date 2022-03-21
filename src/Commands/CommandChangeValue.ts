import { ICommand } from "./ICommand";
import { VariableContainer } from "../VisualData/VariableContainer";
import { Storable } from "../Compositions/Storable";

export class CommandChangeValue implements ICommand {
  private object: Storable;

  private previousValue: VariableContainer;
  private newValue: VariableContainer;

  constructor(object: Storable) {
    this.object = object;

    this.previousValue = this.object.getContainer();
    this.newValue = this.object.getContainer();
  }

  execute(): void {
    this.newValue = this.object.getContainer();
  }

  undo(): void {
    this.object.changeContainer(this.previousValue);
  }

  redo(): void {
    this.object.changeContainer(this.newValue);
  }

}