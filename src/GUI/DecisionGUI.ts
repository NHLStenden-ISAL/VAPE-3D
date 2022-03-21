import { AdvancedDynamicTexture, Control, InputText } from "@babylonjs/gui";
import { GUIBoxInfo, KeyGroup } from "./GUIInfo";
import { ParentGUI } from "./ParentGUI";

export class DecisionGUI extends ParentGUI {
  private objInput: InputText;

  constructor(advancedTexture: AdvancedDynamicTexture) {
    super(advancedTexture);

    this.createParentGrid('400px', '300px', Control.HORIZONTAL_ALIGNMENT_RIGHT, Control.VERTICAL_ALIGNMENT_BOTTOM);

    this.objTypeName = 'Decision object';
    this.objInput = new InputText();

    this.createBody();
  }

  public onSelect(guiInfo: GUIBoxInfo): void {
    if (guiInfo.objectType !== 'decision') { return; }
    super.onSelect(guiInfo);

    this.objType.text = this.objTypeName;
    this.objInput.text = guiInfo.statement;
  }

  protected createBody(): void {
    /**
    * Type        ->    text    1
    * 
    * If          ->    text    2
    * input       ->    input   2
    * 
    * x           ->    text
    * x pos       ->    text
    * y           ->    text
    * y pos       ->    text
    * 
    * direction   ->    text
    * dir value   ->    text
    */

    this.objType = this.createTextBlock('Type', Control.HORIZONTAL_ALIGNMENT_CENTER);
    this.controlsArray.push(this.objType);

    const inputName = 'If';
    this.controlsArray.push(this.createTextBlock(inputName, Control.HORIZONTAL_ALIGNMENT_LEFT));
    this.objInput = this.createInputBlock(inputName, KeyGroup.SYMBALPHANUMERIC);
    this.controlsArray.push(this.objInput);

    super.createBody();
  }

}