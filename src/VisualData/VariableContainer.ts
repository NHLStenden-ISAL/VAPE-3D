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

  getName(): string {
    return this.variableName;
  }

  setName(name: string) {
    this.variableName = name.trim();
  }

  getValue(): string | number {
    return this.variableData.value;
  }

  getIsKnown(): boolean {
    return this.variableData.isKnown;
  }

  setValue(value: VariableData) {
    this.variableData = value;
  }
}