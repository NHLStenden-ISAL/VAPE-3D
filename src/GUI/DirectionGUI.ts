import { AdvancedDynamicTexture, Control} from "@babylonjs/gui";
import { GUIBoxInfo } from "./GUIInfo";
import { ParentGUI } from "./ParentGUI";

export class DirectionGUI extends ParentGUI {
  constructor(advancedTexture: AdvancedDynamicTexture) {
    super(advancedTexture);

    this.createParentGrid('400px', '200px', Control.HORIZONTAL_ALIGNMENT_RIGHT, Control.VERTICAL_ALIGNMENT_BOTTOM);
    this.createBody();
  }

  public onSelect(guiInfo: GUIBoxInfo) {
    if (guiInfo.objectType !== 'direction') { return; }
    super.onSelect(guiInfo);

    this.objType.text = 'Direction object';
  }

  protected createBody(): void {
    /**
    * Type        ->   text     1
    * 
    * x          ->    text      
    * x pos      ->    text     
    * y          ->    text     
    * y pos      ->    text     
    * 
    * direction  ->    text      
    * dir value  ->    text     
    */

    this.objType = this.createTextBlock('Type', Control.HORIZONTAL_ALIGNMENT_CENTER);
    this.controlsArray.push(this.objType);

    super.createBody();

  }
}