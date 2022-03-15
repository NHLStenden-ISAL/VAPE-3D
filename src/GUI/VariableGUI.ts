import { AdvancedDynamicTexture, Checkbox, Control, Grid, InputText } from "@babylonjs/gui";
import { GUIBoxInfo } from "./GUIInfo";
import { ParentGUI } from "./ParentGUI";

export class VariableGUI extends ParentGUI {
  private objName: InputText;
  private objValue: InputText;
  private objIsKnown: Checkbox;

  constructor(advancedTexture: AdvancedDynamicTexture) {
    super(advancedTexture);

    this.createParentGrid('400px', '500px', Control.HORIZONTAL_ALIGNMENT_RIGHT, Control.VERTICAL_ALIGNMENT_BOTTOM);

    this.objName = new InputText();
    this.objValue = new InputText();
    this.objIsKnown = new Checkbox();


    this.createBody();
  }

  public onSelect(guiInfo: GUIBoxInfo) {
    if (guiInfo.objectType !== 'variable') { return; }

    super.onSelect(guiInfo);

    this.objType.text = 'Variable object';
    this.objName.text = guiInfo.name;
    this.objValue.text = guiInfo.value;
    this.objIsKnown.isChecked = guiInfo.isKnown;
  }

  protected createBody(): void {
    /**
    * Type       ->    text      1
    * 
    * Name       ->    text      2
    * Name val   ->    input     2
    * 
    * Value      ->    text      3
    * Value val  ->    input     3
    * 
    * x          ->    text      4 
    * x pos      ->    text      4
    * y          ->    text      4
    * y pos      ->    text      4
    * 
    * direction  ->    text      5 
    * dir value  ->    text      5
    * 
    * is Known   ->    text      6 
    * known val  ->    checkbox  6
    */

    this.objType = this.createTextBlock('type', Control.HORIZONTAL_ALIGNMENT_CENTER);
    this.controlsArray.push(this.objType);

    this.controlsArray.push(this.createTextBlock('Name', Control.HORIZONTAL_ALIGNMENT_LEFT));
    this.objName = this.createInputBlock('Name');
    this.controlsArray.push(this.objName);

    this.controlsArray.push(this.createTextBlock('Value', Control.HORIZONTAL_ALIGNMENT_LEFT));
    this.objValue = this.createInputBlock('Value');
    this.controlsArray.push(this.objValue);

    this.controlsArray.push(this.createPosition(['X', 'Y']));
    this.controlsArray.push(this.createDirection());
    this.controlsArray.push(this.createIsKnown());

    super.createBody();
  }

  protected createIsKnown(): Grid {
    const grid = this.createHorizontalGrid(2);

    this.objIsKnown = this.createDisabledCheckBox();

    grid.addControl(this.createTextBlock('IsKnown', Control.HORIZONTAL_ALIGNMENT_LEFT), 0, 0);
    grid.addControl(this.objIsKnown, 0, 1);

    return grid;
  }
}