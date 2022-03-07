import { Color3, Vector2 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Direction } from "../Compositions/Transformable";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";
import { VariableContainer } from "../VisualData/VariableContainer";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class VariableObject extends BaseObject {
  private variable: VariableContainer;
  private interactedRobots: RobotObject[];

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction) {
    const objectColor = Color3.Magenta();
    const objectMesh = createCustomMesh(worldInfo.getScene(), objectColor, "model route");

    super(worldInfo, objectMesh, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    //TEMP
    const name: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const value: number = Math.random() * 10;

    this.variable = new VariableContainer(name, value);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.variable.getName() === "") { return; }

    robotObject.addVariable(this.variable);
    this.interactedRobots.push(robotObject);
  }

  setVariable(variable: VariableContainer) {
    this.variable = variable;
  }

  public delete(): void {
    this.interactedRobots.forEach(robot => {
      robot.removeVariable(this.variable);
    });

    super.delete();
  }

  public restore(): void {
    this.mesh = createCustomMesh(this.worldInfo.getScene(), Color3.Magenta(), "model route"); 

    this.interactedRobots.forEach(robot => {
      robot.addVariable(this.variable);
    });

    super.restore();
  }
}