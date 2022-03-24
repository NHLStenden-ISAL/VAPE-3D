import { AdvancedDynamicTexture, Control} from "@babylonjs/gui";
import { DropDown } from "./Elements/DropDown";
import { GUIBoxInfo } from "./GUIInfo";
import { ParentGUI } from "./ParentGUI";

export class DirectionGUI extends ParentGUI {

  private testDropDown: DropDown;

  constructor(advancedTexture: AdvancedDynamicTexture) {
    super(advancedTexture);

    this.objTypeName = 'Direction object';

    this.testDropDown = new DropDown('', 0,0);
    this.testDropDown.container.zIndex = 100;

    this.createParentGrid('400px', 0.8, Control.HORIZONTAL_ALIGNMENT_RIGHT, Control.VERTICAL_ALIGNMENT_BOTTOM);
    
    this.parentGrid.clipChildren = false;
    this.parentGrid.clipContent = false;

    this.createBody();
  }

  public onSelect(guiInfo: GUIBoxInfo) {
    if (guiInfo.objectType !== 'direction') { return; }
    super.onSelect(guiInfo);

    console.log(this.parentGrid.children[0]);
    this.objType.text = this.objTypeName;
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

    this.testDropDown = new DropDown('test', 1, '40px');
    this.testDropDown.addOption('First', 1);
    this.testDropDown.addOption('Second', 2);
    this.testDropDown.addOption('Third', 3);
    this.testDropDown.addOption('Fourth', 4);
    this.testDropDown.container.zIndex = 1;

    // this.advancedTexture.addControl(this.testDropDown.optionContainer);
    this.controlsArray.push(this.testDropDown.container);
    
    
    
    this.objType = this.createTextBlock('Type', Control.HORIZONTAL_ALIGNMENT_CENTER);
    this.controlsArray.push(this.objType);
    
    super.createBody(true);

  }
}