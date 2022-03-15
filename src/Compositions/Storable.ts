import { VariableContainer, VariableData } from "../VisualData/VariableContainer";

export class Storable {
  //TODO: make it so this can be multliple
  private variable: VariableContainer;

  constructor() {

    //TEMP
    const name: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const value: number = Math.random() * 10;

    this.variable = new VariableContainer(name, value);
    // this.variable = new VariableContainer();
  }

  public changeName(name: string) {
    if (this.getIsKnown()) return;

    this.variable.setName(name);
  }

  public changeValue(value: string | number) {
    if (this.getIsKnown()) return;

    this.variable.setValue(value);
  }

  public changeIsKnown(isKnown: boolean) {
    this.variable.setIsKnown(isKnown);
  }

  public changeData(data: VariableData) {
    if (this.getIsKnown()) return;

    this.variable.setData(data);
  }

  public getName(): string {
    return this.variable.getName();
  }

  public getValue(): string | number {
    return this.variable.getValue();
  }

  public getIsKnown(): boolean {
    return this.variable.getIsKnown();
  }

  public getContainer(): VariableContainer {
    return this.variable;
  }
}