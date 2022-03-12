import { Observable } from "@babylonjs/core";
import { AdvancedDynamicTexture, Grid, InputText, StackPanel, TextBlock } from "@babylonjs/gui";

export class TestGUI {
  private advancedTexture: AdvancedDynamicTexture;

  public onFocus: Observable<any>;
  public onBlur: Observable<any>;

  private variableGrid: Grid;

  private objectType: TextBlock = new TextBlock();
  private objectName: InputText = new InputText();
  private objectValue: InputText = new InputText();

  constructor() {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    this.onFocus = new Observable();
    this.onBlur = new Observable();

    this.variableGrid = this.createVariableGrid();

    this.toggleVariable(false);
  }

  public toggleVariable(isVisible: boolean) {
    this.variableGrid.isVisible = isVisible;
  }

  public onSelect(objectType: string, objectName: string, objectValue: string, objectStatus: boolean) {
    this.objectType.text = objectType;
    this.objectName.text = objectName;
    this.objectValue.text = objectValue;
  }

  private createVariableGrid(): Grid {
    const grid = new Grid();

    grid.horizontalAlignment = Grid.HORIZONTAL_ALIGNMENT_RIGHT;
    grid.verticalAlignment = Grid.VERTICAL_ALIGNMENT_TOP;
    grid.background = 'black';

    this.advancedTexture.addControl(grid);

    grid.width = 0.2;
    grid.height = 0.5;

    grid.addColumnDefinition(0.1);  // padding
    grid.addColumnDefinition(0.8);  // body
    grid.addColumnDefinition(0.1);  // padding

    grid.addRowDefinition(0.1);     // padding
    grid.addRowDefinition(0.5);     // type
    grid.addRowDefinition(0.5);     // name 
    grid.addRowDefinition(0.5);     // value
    grid.addRowDefinition(0.1);     // padding

    this.objectType = this.addTextBlock('Object type');

    grid.addControl(this.objectType, 1, 1);
    grid.addControl(this.addNameStack(), 2, 1);
    grid.addControl(this.addValueStack(), 3, 1);

    // grid.addControl(this._addText('Object type'), 1, 1);
    // grid.addControl(this._addInputStack('Name'), 2, 1);
    // grid.addControl(this._addInputStack('Value'), 3, 1);

    return grid;
  }

  private addTextBlock(label: string): TextBlock {
    const block = new TextBlock('text' + label);
    block.width = 1;
    block.height = '40px';
    block.color = 'white';
    block.text = label;
    block.horizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;

    return block;
  }

  private addInputBlock(label: string): InputText {
    const input = new InputText('input' + label);
    input.width = 1;
    input.height = '40px';
    input.color = 'black';
    input.background = 'white';
    input.focusedBackground = 'cyan';

    input.onFocusObservable.add((inputText) => {
      this.onFocus.notifyObservers(inputText);
    });

    input.onBlurObservable.add((inputText) => {
      inputText.text = inputText.text.trim();
      input.text = inputText.text;

      this.onBlur.notifyObservers(inputText);
    });

    return input;
  }

  private addNameStack(): StackPanel {
    const label = 'Name';

    const stack = this.addInputStack(label);
    stack.addControl(this.addTextBlock(label));

    this.objectName = this.addInputBlock(label);
    stack.addControl(this.objectName);

    return stack;
  }

  private addValueStack(): StackPanel {
    const label = 'Value';

    const stack = this.addInputStack(label);
    stack.addControl(this.addTextBlock(label));

    this.objectValue = this.addInputBlock(label);
    stack.addControl(this.objectValue);

    return stack;

  }

  private addInputStack(label: string): StackPanel {
    const stack = new StackPanel(label);

    stack.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_LEFT;
    stack.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;

    return stack;
  }

  private changeTypeBlock(message: string) {
    this.objectType.text = message;
  }

  // private _addInputStack(label: string, message: string = ""): StackPanel {
  //   const stack = new StackPanel(label);

  //   stack.addControl(this._addText(label));
  //   stack.addControl(this._addInput(label, message));

  //   stack.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_LEFT;
  //   stack.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;

  //   return stack;
  // }

  // private _addText(message: string): TextBlock {
  //   const block = new TextBlock('text' + message);
  //   block.width = 1;
  //   block.height = '40px';
  //   block.color = 'white';
  //   block.text = message;
  //   block.horizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;

  //   return block;
  // }

  // private _addInput(label: string, message: string): InputText {
  //   const input = new InputText('input' + label);
  //   input.text = message;
  //   input.width = 1;
  //   input.height = '40px';
  //   input.color = 'black';
  //   input.background = 'white';
  //   input.focusedBackground = 'cyan';

  //   input.onFocusObservable.add((inputText) => {
  //     this.onFocus.notifyObservers(inputText);

  //     // console.log("on focus ", inputText.name, inputText.text);
  //   });

  //   input.onBlurObservable.add((inputText) => {
  //     inputText.text = inputText.text.trim();
  //     input.text = inputText.text;

  //     this.onBlur.notifyObservers(inputText);

  //     // console.log("on blur ", inputText.name, inputText.text);
  //   });

  //   return input;
  // }
}