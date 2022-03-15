import { AdvancedDynamicTexture, InputText } from "@babylonjs/gui";
import { Storable } from "../Compositions/Storable";
import { DirectionGUI } from "../GUI/DirectionGUI";
import { ParentGUI } from "../GUI/ParentGUI";
import { VariableGUI } from "../GUI/VariableGUI";
import { BaseObject } from "../Objects/BaseObject";

export class GUIHelper {
  private selectedObject: Storable | undefined;

  private advancedTexture: AdvancedDynamicTexture;
  private variableGUI: VariableGUI;
  private directionGUI: DirectionGUI;

  private selectedGUI: ParentGUI;

  constructor() {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    this.selectedGUI = new ParentGUI(this.advancedTexture);

    this.directionGUI = new DirectionGUI(this.advancedTexture);

    this.variableGUI = new VariableGUI(this.advancedTexture);
    this.variableGUI.onBlur.add((inputElement) => { this.onVariableChanged(inputElement) });
  }

  public onSelect(object: BaseObject) {
    this.selectedObject = object.getStorable();

    switch (object.getGUIBox()['objectType']) {
      case 'variable':
        this.selectedGUI = this.variableGUI;
        break;
      case 'direction':
        this.selectedGUI = this.directionGUI;
        break;
      default:
        alert("ERROR: Unexpected object type");
        return;
    }

    this.selectedGUI.onSelect(object.getGUIBox());
    this.selectedGUI.toggleVariable(true);
  }

  public onDeselect() {
    this.selectedObject = undefined;
    this.selectedGUI.toggleVariable(false);
  }

  private onVariableChanged(information: InputText) {
    if (!this.selectedObject) { return; }

    switch (information.name) {
      case 'inputName':
        this.selectedObject.changeName(information.text);
        break;
      case 'inputValue':
        this.selectedObject.changeValue(information.text);
        break;
      default:
        alert("ERROR: unexpected input name");
        break;
    }
  }
}