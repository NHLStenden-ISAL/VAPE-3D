import { Observable } from "@babylonjs/core";
import { AdvancedDynamicTexture, Checkbox, Control, Grid, InputText, TextBlock } from "@babylonjs/gui";
import { GUIBoxInfo } from "../Helpers/GUIHelper";

export class TestGUI {
  private advancedTexture: AdvancedDynamicTexture;

  public onFocus: Observable<any>;
  public onBlur: Observable<any>;

  private variableGrid: Grid;
  private objectList: Control[];

  private objectType: TextBlock = new TextBlock();
  private objectName: InputText = new InputText();
  private objectValue: InputText = new InputText();

  constructor() {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    this.objectList = [];

    this.onFocus = new Observable();
    this.onBlur = new Observable();

    this.createVariableControls();

    this.variableGrid = this.createVariableGrid();
    this.toggleVariable(false);
  }

  public toggleVariable(isVisible: boolean) {
    this.variableGrid.isVisible = isVisible;
  }

  public onSelect(guiInfo: GUIBoxInfo) {
    if (guiInfo.objectType === 'variable') {
      this.objectType.text = `${guiInfo.objectType} object`;
      this.objectName.text = guiInfo.varName;
      this.objectValue.text = guiInfo.varValue;
    }

    console.log(this.variableGrid.widthInPixels, ' ', this.variableGrid.heightInPixels);

  }

  private createVariableControls() {
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

    this.objectType = this.createTextBlock('type', Control.HORIZONTAL_ALIGNMENT_CENTER);
    this.objectList.push(this.objectType);

    this.objectList.push(this.createTextBlock('Name', Control.HORIZONTAL_ALIGNMENT_LEFT));
    this.objectName = this.createInputBlock('Name');
    this.objectList.push(this.objectName);

    this.objectList.push(this.createTextBlock('Value', Control.HORIZONTAL_ALIGNMENT_LEFT));
    this.objectValue = this.createInputBlock('Value');
    this.objectList.push(this.objectValue);

    this.objectList.push(this.fillPositionGrid(['X', 'Y']));
    this.objectList.push(this.createDirection());
    this.objectList.push(this.createIsKnown());
  }

  private createVariableGrid(): Grid {
    const grid = new Grid();

    grid.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    grid.verticalAlignment = Grid.VERTICAL_ALIGNMENT_BOTTOM;
    grid.background = 'darkgray';
    this.advancedTexture.addControl(grid);

    grid.width = '400px';
    grid.height = '500px';

    // grid.width = 0.2;
    // grid.height = 0.5;

    grid.addColumnDefinition(0.1);  // padding
    grid.addColumnDefinition(1);    // body
    grid.addColumnDefinition(0.1);  // padding

    grid.addRowDefinition(0.1);     // padding
    grid.addRowDefinition(1);       // body
    grid.addRowDefinition(0.1);     // padding

    grid.addControl(this.createBodyGrid(), 1, 1);


    return grid;
  }

  private createBodyGrid(): Grid {
    const grid = new Grid();

    for (let index = 0; index < this.objectList.length; index++) {
      grid.addRowDefinition(1);
      grid.addControl(this.objectList[index], index, 0);
    }

    return grid;
  }

  private createTextBlock(label: string, horizontalAlignment: number): TextBlock {
    const block = new TextBlock('text' + label);
    block.width = 1;
    block.height = '30px';
    block.color = 'white';

    block.textHorizontalAlignment = horizontalAlignment;
    block.text = label;

    return block;
  }

  private createInputBlock(label: string): InputText {
    const block = new InputText('input' + label);
    block.width = 1;
    block.height = '35px';
    block.color = 'black';

    block.background = 'white';
    block.focusedBackground = 'cyan';

    block.onBlurObservable.add((inputText) => {
      inputText.text = inputText.text.trim();
      block.text = inputText.text;

      this.onBlur.notifyObservers(inputText);
    });

    return block;
  }

  private createPositionBlock(label: string): InputText {
    const block = this.createInputBlock(label);

    block.isEnabled = false;
    block.text = '0';
  
    //TODO: Only allow numbers
    block.onBeforeKeyAddObservable.add(()=> {

    });

    return block;
  }

  private fillPositionGrid(labels: string[]): Grid {
    const grid = new Grid();

    for (let index = 0; index < labels.length; index++) {
      grid.addColumnDefinition(0.05);
      grid.addColumnDefinition(0.1);
      grid.addColumnDefinition(0.05);
      grid.addColumnDefinition(0.9);

      const block = this.createPositionBlock(labels[index]);

      grid.addControl(this.createTextBlock(labels[index], Control.HORIZONTAL_ALIGNMENT_LEFT), 0, 1 + (index * 4));
      grid.addControl(block, 0, 3 + (index * 4));
    }

    return grid;
  }

  private createDirection(): Grid {
    const grid = new Grid();

    grid.addColumnDefinition(0.5);
    grid.addColumnDefinition(0.5);

    grid.addControl(this.createTextBlock('Direction', Control.HORIZONTAL_ALIGNMENT_LEFT), 0, 0);
    grid.addControl(this.createTextBlock('NORTH', Control.HORIZONTAL_ALIGNMENT_LEFT), 0, 1);

    return grid;
  }

  private createIsKnown(): Grid {
    const grid = new Grid();

    grid.addColumnDefinition(0.5);
    grid.addColumnDefinition(0.5);

    const check = new Checkbox();
    check.width = '20px';
    check.height = '20px';
    check.color = 'white';
    check.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

    grid.addControl(this.createTextBlock('IsKnown', Control.HORIZONTAL_ALIGNMENT_LEFT), 0, 0);
    grid.addControl(check, 0, 1);

    return grid;
  }
}