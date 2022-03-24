import { AdvancedDynamicTexture, Checkbox, Control, Grid, InputText } from "@babylonjs/gui";
import { GUIBoxInfo, KeyGroup } from "./GUIInfo";
import { ParentGUI } from "./ParentGUI";

export class VariableGUI extends ParentGUI {
  private objName: InputText;
  private objValue: InputText;
  private objIsKnown: Checkbox;

  constructor(advancedTexture: AdvancedDynamicTexture) {
    super(advancedTexture);

    this.createParentGrid('400px', '500px', Control.HORIZONTAL_ALIGNMENT_RIGHT, Control.VERTICAL_ALIGNMENT_BOTTOM);

    this.objTypeName = 'Variable object';
    this.objName = new InputText();
    this.objValue = new InputText();
    this.objIsKnown = new Checkbox();

    this.createBody();
  }

  public onSelect(guiInfo: GUIBoxInfo) {
    if (guiInfo.objectType !== 'variable') { return; }

    super.onSelect(guiInfo);

    this.objType.text = this.objTypeName;
    this.objName.text = guiInfo.name;
    this.objValue.text = guiInfo.value;
    this.objIsKnown.isChecked = guiInfo.isKnown;

    this.objName.isEnabled = !guiInfo.isKnown;
    this.objValue.isEnabled = !guiInfo.isKnown;
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
    * is Known   ->    text      4 
    * known val  ->    checkbox  4
    *
    * x          ->    text       
    * x pos      ->    text      
    * y          ->    text      
    * y pos      ->    text      
    * 
    * direction  ->    text       
    * dir value  ->    text      
    * 
    */

    this.objType = this.createTextBlock('Type', Control.HORIZONTAL_ALIGNMENT_CENTER);
    this.controlsArray.push(this.objType);

    let nameGrid = this.createInputArea('Name', KeyGroup.ALPHANUMERIC);
    let valueGrid = this.createInputArea('Value', KeyGroup.ALPHANUMERIC);

    this.objName = nameGrid.children[1] as InputText;
    this.objValue = valueGrid.children[1] as InputText;

    this.controlsArray.push(nameGrid);
    this.controlsArray.push(valueGrid);

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