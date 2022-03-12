export type VariableData = {
  value: string | number;
  isKnown: boolean;
}

export class VariableContainer {
  private variableName: string;
  private variableData: VariableData;

  constructor(name: string = "", value = 0) {
    this.variableName = name;
    this.variableData = { value: value, isKnown: false };
  }

  setName(name: string) {
    this.variableName = name.trim();
  }

  getName(): string {
    return this.variableName;
  }

  setValue(value: string | number) {
    this.variableData = { value: value, isKnown: this.variableData.isKnown };
  }

  getValue(): string | number {
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

  setContainer(name: string, value: VariableData) {
    this.setName(name);
    this.setData(value);
  }
}