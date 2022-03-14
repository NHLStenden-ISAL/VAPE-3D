import { GUIBoxInfo } from "../Helpers/GUIHelper";
import { VariableContainer, VariableData } from "../VisualData/VariableContainer";

export class Storable {
  //TODO: make it so this can be multliple
  private variable: VariableContainer;

  private objectType: GUIBoxInfo['objectType'];

  constructor(objType: GUIBoxInfo['objectType']) {
    this.objectType = objType;

    //TEMP
    const name: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const value: number = Math.random() * 10;

    this.variable = new VariableContainer(name, value);
    // this.variable = new VariableContainer();
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

  public getGUIBox(): GUIBoxInfo {
    switch (this.objectType) {
      case 'variable':
        return {
          objectType: this.objectType,
          varName: this.getName(),
          varValue: this.getValue().toString()
        }
      case 'decision':
        return {
          objectType: this.objectType,
          varAmount: 0,
          varNames: [],
          varValue: []
        }
      default:
        return {
          objectType: ''
        }
    }
  }
}