import { Observable } from "@babylonjs/core";
import { AdvancedDynamicTexture, Checkbox, Control, Grid, InputText, TextBlock } from "@babylonjs/gui";
import { Direction } from "../Compositions/Transformable";
import { GUIBoxInfo } from "./GUIInfo";

export class ParentGUI {
  protected advancedTexture: AdvancedDynamicTexture;
  protected parentGrid: Grid;

  protected controlsArray: Control[];

  protected objType: TextBlock;
  protected objLocation: InputText[];
  protected objDirection: TextBlock;

  public onBlur: Observable<any>;

  constructor(advancedTexture: AdvancedDynamicTexture) {
    this.advancedTexture = advancedTexture;
    this.parentGrid = new Grid();

    this.controlsArray = [];
    this.objType = new TextBlock();
    this.objLocation = [];
    this.objDirection = new TextBlock();

    this.onBlur = new Observable();
  }

  public toggleVariable(isVisible: boolean): void {
    this.parentGrid.isVisible = isVisible;
  }

  public onSelect(guiInfo: GUIBoxInfo): void {
    if (guiInfo.objectType === '') { return; }

    this.objLocation[0].text = guiInfo.location.x.toString();
    this.objLocation[1].text = guiInfo.location.y.toString();
    this.objDirection.text = Direction[guiInfo.direction];
  }

  protected createBody(): void {
    this.parentGrid.addControl(this.addBodyToScreen(), 1, 1);
  }

  protected addBodyToScreen(): Grid {
    const grid = new Grid();

    for (let index = 0; index < this.controlsArray.length; index++) {
      grid.addRowDefinition(1);
      grid.addControl(this.controlsArray[index], index, 0);
    }

    return grid;
  }

  protected createParentGrid(width: string | number, height: string | number, horizontalAlignment: number, verticalAlignment: number) {
    const grid = new Grid();

    grid.horizontalAlignment = horizontalAlignment;
    grid.verticalAlignment = verticalAlignment;

    grid.background = 'gray';
    this.advancedTexture.addControl(grid);

    grid.width = width;
    grid.height = height;

    grid.isVisible = false;

    // grid.width = 0.2;
    // grid.height = 0.5;

    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(1);
    grid.addColumnDefinition(0.1);

    grid.addRowDefinition(0.1);
    grid.addRowDefinition(1);
    grid.addRowDefinition(0.1);

    this.parentGrid = grid;
  }

  protected createTextBlock(label: string, horizontalAlignment: number): TextBlock {
    const block = new TextBlock('text' + label);
    block.width = 1;
    block.height = '30px';
    block.color = 'white';

    block.textHorizontalAlignment = horizontalAlignment;
    block.text = label;

    return block;
  }

  protected createInputBlock(label: string): InputText {
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

  protected createDisabledInputBlock(label: string): InputText {
    const block = this.createInputBlock(label);
    block.isEnabled = false;

    return block;
  }

  protected createPositionInputBlock(label: string): InputText {
    const block = this.createDisabledInputBlock(label);

    //TODO: Allow only numbers
    block.onBeforeKeyAddObservable.add(() => {

    });

    return block;
  }

  protected createCheckbox(): Checkbox {
    const check = new Checkbox();

    check.width = '20px';
    check.height = '20px';
    check.color = 'white';
    check.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

    return check;
  }

  protected createDisabledCheckBox(): Checkbox {
    const check = this.createCheckbox();

    check.isEnabled = false;
    check.disabledColorItem = 'white';

    return check;
  }

  protected createHorizontalGrid(columnCount: number): Grid {
    const grid = new Grid();

    for (let index = 0; index < columnCount; index++) {
      grid.addColumnDefinition(1);
    }

    return grid;
  }

  protected createPosition(labels: string[]): Grid {
    const grid = new Grid();

    for (let index = 0; index < labels.length; index++) {
      grid.addColumnDefinition(0.2);
      grid.addColumnDefinition(0.8);

      const block = this.createPositionInputBlock(labels[index]);
      this.objLocation[index] = block;

      grid.addControl(this.createTextBlock(labels[index], Control.HORIZONTAL_ALIGNMENT_CENTER), 0, 0 + (index * 2));
      grid.addControl(block, 0, 1 + (index * 2));
    }

    return grid;
  }

  protected createDirection(): Grid {
    const grid = this.createHorizontalGrid(2);

    this.objDirection = this.createTextBlock('Direction', Control.HORIZONTAL_ALIGNMENT_LEFT);

    grid.addControl(this.createTextBlock('Direction', Control.HORIZONTAL_ALIGNMENT_LEFT), 0, 0);
    grid.addControl(this.objDirection, 0, 1);

    return grid;
  }
}