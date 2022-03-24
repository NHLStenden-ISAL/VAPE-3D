import { Button, Container, Control, StackPanel } from "@babylonjs/gui";

export class DropDown  {
  public name: string;

  private width: number| string;
  private height: number| string;

  private color = 'black';
  private background = 'white';

  private options: StackPanel;
  private button: Button;
  public container: Container;
  public optionContainer: Container;

  private selected: any;
  private selectedValue: any;

  constructor(name: string, width: number | string, height: number | string) {
    this.name = name;
    this.width = width;
    this.height = height;

    this.optionContainer = new Container("options container");
    this.optionContainer.background = 'green';
    this.optionContainer.width = '400px';
    this.optionContainer.height = 0.4;
    this.optionContainer.isVisible = true;
    this.optionContainer.isHitTestVisible = false;
    this.optionContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.optionContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;

    
    this.container = new Container("container");
    this.container.width = this.width;
    this.container.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.container.isHitTestVisible = false;

    this.container.background = this.background;

    // Primary button
    this.button = Button.CreateSimpleButton('', "Please select");
    this.button.height = this.height;
    this.button.background = this.container.background;
    this.button.color = this.color;
    this.button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

    // Options panel
    this.options = new StackPanel;
    this.options.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.options.top = this.height;
    this.options.isVisible = false;
    this.options.isVertical = true;

    this.button.onPointerUpObservable.add(() => {
      this.options.isVisible = !this.options.isVisible;
    });

    this.container.addControl(this.button);
    this.container.addControl(this.options);

    this.selected = undefined;
    this.selectedValue = undefined;
  }

  private toggleOptions(newState: boolean) {

    if (newState === true) {
      //Show
    }else {
      //hide
    }

  }

  addOption(text: string, value: number) {
    const button = Button.CreateSimpleButton('', text);
    button.height = this.height;
    button.paddingTop = "-1px";
    button.background = this.container.background;
    button.color = this.color;

    button.onPointerUpObservable.add(() => {
      this.options.isVisible = false;
      if (this.button.textBlock) {
        this.button.textBlock.text = text;
      }
      this.selected = button;
      this.selectedValue = value;
    });

    this.options.addControl(button);
  }
}