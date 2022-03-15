import { AdvancedDynamicTexture, Control } from "@babylonjs/gui";
import { GUIBoxInfo } from "./GUIInfo";
import { ParentGUI } from "./ParentGUI";

export class DecisionGUI extends ParentGUI {
  constructor(advancedTexture: AdvancedDynamicTexture) {
    super(advancedTexture);

    this.createParentGrid('400px', '300px', Control.HORIZONTAL_ALIGNMENT_RIGHT, Control.VERTICAL_ALIGNMENT_BOTTOM);
    this.createBody();
  }

  public onSelect(guiInfo: GUIBoxInfo): void {
    if (guiInfo.objectType !== 'decision') { return; }
    super.onSelect(guiInfo);

    this.objType.text = 'Decision object';
  }

  protected createBody(): void {
    /**
    * Type        ->   text     1
    * 
    * x          ->    text     2 
    * x pos      ->    text     2
    * y          ->    text     2
    * y pos      ->    text     2
    * 
    * direction  ->    text     3 
    * dir value  ->    text     3
    */

    this.objType = this.createTextBlock('type', Control.HORIZONTAL_ALIGNMENT_CENTER);
    this.controlsArray.push(this.objType);

    this.controlsArray.push(this.createPosition(['X', 'Y']));
    this.controlsArray.push(this.createDirection());

    super.createBody();
  }

}