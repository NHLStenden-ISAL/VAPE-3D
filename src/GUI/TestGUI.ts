import { AdvancedDynamicTexture, Grid, InputText, StackPanel, TextBlock } from "@babylonjs/gui";

export class TestGUI {
  private advancedTexture: AdvancedDynamicTexture;

  constructor() {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

    const grid = new Grid();
    grid.horizontalAlignment = Grid.HORIZONTAL_ALIGNMENT_RIGHT;
    grid.background = 'black';
    this.advancedTexture.addControl(grid);

    grid.width = 0.2;
    grid.addColumnDefinition(0.1);  // padding
    grid.addColumnDefinition(0.8);  // body
    grid.addColumnDefinition(0.1);  // padding
    grid.addRowDefinition(0.1);     // padding
    grid.addRowDefinition(0.5);     // type
    grid.addRowDefinition(0.5);     // name 
    grid.addRowDefinition(0.5);     // value
    grid.addRowDefinition(0.1);     // padding

    grid.addControl(this.addText('Object type'), 1, 1);
    grid.addControl(this.addInput('Name'), 2, 1);
    
    grid.addControl(this.addInput('Value'), 3, 1);
  }

  addInput(label: string): StackPanel {
    const stack = new StackPanel();

    const input = new InputText('input' + label);
    input.width = 1;
    input.height = '40px';
    input.color = 'black';
    input.background = 'white';
    input.focusedBackground = 'cyan';

    input.onFocusObservable.add((inputText) => {
      console.log("on focus ", inputText.name, inputText.text);
    });

    input.onBlurObservable.add((inputText) => {
      console.log("on blur ", inputText.name, inputText.text);
    });

    stack.addControl(this.addText(label));
    stack.addControl(input);

    stack.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_LEFT;
    stack.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;

    return stack;
  }

  addText(message: string): TextBlock {
    const block = new TextBlock('text' + message);
    block.width = 1;
    block.height = '40px';
    block.color = 'white';
    block.text = message;
    block.horizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;

    return block;
  }
}