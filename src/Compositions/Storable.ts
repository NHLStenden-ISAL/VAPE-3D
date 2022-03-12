import { VariableContainer, VariableData } from "../VisualData/VariableContainer";

export class Storable {
  //TODO: make it so this can be multliple
  private variable: VariableContainer;

  private objectType: string;

  constructor(objectType: string) {
    this.objectType = objectType;
    
    //TEMP
    const name: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const value: number = Math.random() * 10;

    this.variable = new VariableContainer(name, value);
  }

  public changeName(name: string) {
    this.variable.setName(name);
  }

  public changeValue(value: string | number) {
    console.log("Tets here");
    this.variable.setValue(value);
  }

  public changeIsKnown(isKnown: boolean) {
    this.variable.setIsKnown(isKnown);
  }

  public changeData(data: VariableData) {
    this.variable.setData(data);
  }

  public getType(): string {
    return this.objectType;
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

  public getContainer() : VariableContainer {
    return this.variable;
  }

  public printInfo(): void {
    console.log("Name: ", this.getName(), " value: ", this.getValue());
  }
}