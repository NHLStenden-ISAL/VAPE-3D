import CommandChangeValue from "../Commands/CommandChangeValue";
import WorldInformation from "../Helpers/WorldInformation";
import { VariableContainer } from "../VisualData/VariableContainer";

export default class Storable {
  private variable: VariableContainer;
  private worldInfo: WorldInformation;

  private previousVariable: VariableContainer;

  constructor(worldInfo: WorldInformation) {
    this.worldInfo = worldInfo;

    //TEMP
    // const name: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    // const value: number = Math.round(Math.random() * 100);
    // this.variable = new VariableContainer(name, value.toString());

    this.variable = new VariableContainer();
    this.previousVariable = new VariableContainer();
  }

  public changeName(name: string) {
    this.previousVariable = this.variable.getContainer();
    this.variable.setName(name);

    if (this.previousVariable.getName() === this.variable.getName()) { return; }
    this.changeCommand();
  }

  public changeValue(value: string) {
    this.previousVariable = this.variable.getContainer();
    this.variable.setValue(value);

    if (this.previousVariable.getValue() === this.variable.getValue()) { return; }
    this.changeCommand();
  }

  public changeIsKnown(isKnown: boolean) {
    this.variable.setIsKnown(isKnown);
  }

  public changeContainer(container: VariableContainer): void {
    this.variable.setContainer(container.getName(), container.getData());
  }

  public getName(): string {
    return this.variable.getName();
  }

  public getValue(): string {
    return this.variable.getValue().toString();
  }

  public getIsKnown(): boolean {
    return this.variable.getIsKnown();
  }

  public getContainer(): VariableContainer {
    return this.variable;
  }

  public getContainerCopy(): VariableContainer {
    return this.variable.getContainer();
  }

  public getPreviousValue(): VariableContainer {
    return this.previousVariable;
  }

  private changeCommand() {
    const command = new CommandChangeValue(this);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }
}