import { TestGUI } from "../GUI/TestGUI";
import { BaseObject } from "../Objects/BaseObject";

export class GUIHelper {
  private selectedObject: BaseObject | undefined;

  private guiStuff: TestGUI;

  constructor() {
    this.guiStuff = new TestGUI();
  }
}