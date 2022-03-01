import { Scene, Vector3, Color3 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { VariableContainer } from "../VisualData/VariableContainer";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class VariableObject extends BaseObject {
  private variable: VariableContainer;

  constructor(scene: Scene, position: Vector3, objectList: BaseObject[]) {
    let customMesh = createCustomMesh(scene, Color3.Magenta(), "model route");
    let customHighlightColor = Color3.Magenta();

    super(scene, position, customMesh, customHighlightColor, objectList);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));

    let name: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let value: number = Math.random() * 10;
    this.variable = new VariableContainer(name, value);
  }

  onIntersectExecute(robotObject: RobotObject) {
    if (this.variable.getName() === "") { return; }

    robotObject.addVariableToMap(this.variable);
  }

  setVariable(variable: VariableContainer) {
    this.variable = variable;
  }
}