import { InputText } from "@babylonjs/gui";
import { Storable } from "../Compositions/Storable";
import { TestGUI } from "../GUI/TestGUI";
import { BaseObject } from "../Objects/BaseObject";

export type GUIBoxInfo = { objectType: ''; } | {
  objectType: 'variable';
  varName: string;
  varValue: string;
} | {
  objectType: 'decision';
  varAmount: number;
  varNames: string[];
  varValue: string[];
}

export class GUIHelper {
  private selectedObject: Storable | undefined;

  private guiStuff: TestGUI;

  constructor() {
    this.guiStuff = new TestGUI();
    this.guiStuff.onBlur.add((inputElement) => { this.onValueChanged(inputElement) });
  }

  public onSelect(object: BaseObject) {
    this.selectedObject = object.getStorable();

    if (!this.selectedObject) { return; }

    this.guiStuff.onSelect(this.selectedObject.getGUIBox());

    this.guiStuff.toggleVariable(true);
  }

  public onDeselect() {
    this.selectedObject = undefined;
    this.guiStuff.toggleVariable(false);
  }

  public onValueChanged(information: InputText) {
    if (!this.selectedObject) { return; }

    switch (information.name) {
      case 'inputName':
        this.selectedObject.changeName(information.text);
        break;
      case 'inputValue':
        this.selectedObject.changeValue(information.text);
        break;
      default:
        console.log("ERROR: input object name isn't expected");
        break;
    }
  }
}