import { AdvancedDynamicTexture, Button, Control, Rectangle, StackPanel } from "@babylonjs/gui";

export class GUITest {
  private advancedTexture: AdvancedDynamicTexture;

  constructor() {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

    let buttonContainer = new StackPanel();
    buttonContainer.height = "100%";
    buttonContainer.width = "15%";
    buttonContainer.background = 'white';
    buttonContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    
    this.advancedTexture.addControl(buttonContainer);

    for (let index = 0; index < 20; index++) {
      buttonContainer.addControl(this.createButton(index));
    }


    //this.createButton();
  }

  private createButton(index: number) : any{
    var button = Button.CreateSimpleButton("button " + index, "Click here");
    button.width = '80%';
    button.height= '40px';
    button.color = 'green';
    button.cornerRadius = 50;
    button.background = 'black';
    button.onPointerClickObservable.add(function() {
      alert("You've pressed a button " + index);
    });

    return button;
    //this.advancedTexture.addControl(button);
  }
}