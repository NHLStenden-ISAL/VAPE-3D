export type VariableData = {
  value: string;
  isKnown: boolean;
}

export class VariableContainer {
  private variableName: string;
  private variableData: VariableData;

  constructor(name: string = "", value:string = '') {
    this.variableName = name;
    this.variableData = { value: value, isKnown: false };
  }

  setName(name: string) {
    this.variableName = name.trim();
  }

  getName(): string {
    return this.variableName;
  }

  setValue(value: string ) {
    this.variableData = { value: value, isKnown: this.variableData.isKnown };
  }

  getValue(): string {
    return this.variableData.value;
  }

  setIsKnown(isKnown: boolean) {
    this.variableData = { value: this.variableData.value, isKnown: isKnown };
  }

  getIsKnown(): boolean {
    return this.variableData.isKnown;
  }

  setData(value: VariableData) {
    this.variableData = value;
  }

  getData(): VariableData {
    return this.variableData;
  }

  setContainer(name: string, value: VariableData) {
    this.setName(name);
    this.setData(value);
  }

  getContainer(): VariableContainer {
    return new VariableContainer(this.getName(), this.getValue());
  }
}