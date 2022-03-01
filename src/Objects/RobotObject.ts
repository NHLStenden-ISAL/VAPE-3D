import { Color3, Scene, Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { VariableContainer, VariableData } from "../VisualData/VariableContainer";
import { BaseObject } from "./BaseObject";

export class RobotObject extends BaseObject {

  private robotList: RobotObject[];
  private variableMap: Map<string, VariableData>;

  constructor(scene: Scene, position: Vector3, objectList: BaseObject[], robotList: RobotObject[]) {
    let customMesh = createCustomMesh(scene, Color3.Green(), "model route");
    let customHighlightColor = Color3.Green();

    super(scene, position, customMesh, customHighlightColor, objectList);

    this.robotList = robotList;
    this.robotList.push(this);

    this.variableMap = new Map();
  }

  stepForward() {
    this.mesh.position = this.transformable.stepForward(this.mesh.position);
  }

  rotateToward(direction: Direction) {
    this.mesh.rotation = this.transformable.rotateToward(direction);
  }

  checkIntersection(objectList: BaseObject[]) {
    objectList.forEach(object => {
      object.getInteractable()?.checkIntersection(this);
    });
  }

  delete(): void {
    let indexOfObject = this.robotList.findIndex((element) => this === element);
    this.robotList.splice(indexOfObject, 1);

    super.delete();
  }

  addVariableToMap(variable: VariableContainer) {
    if (variable.getName() === "") { return; }


    if (this.variableMap.has(variable.getName())) {
      console.log("Key already exist");
    } else {
      this.variableMap.set(variable.getName(), { value: variable.getValue(), isKnown: true });
      console.log("added new variable");
    }
  }
}