import { Color3, Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";
import { VariableContainer, VariableData } from "../VisualData/VariableContainer";
import { BaseObject } from "./BaseObject";

export class RobotObject extends BaseObject {
  private variableMap: Map<string, VariableData>;

  constructor(worldInfo: WorldInformation, pos: Vector3, dir: Direction) {
    const objectMesh = createCustomMesh(worldInfo.getScene(), Color3.Green(), "model route");
    const objectColor = Color3.Green();

    super(worldInfo, objectMesh, pos, dir, objectColor);

    worldInfo.getRobotObjects().push(this);

    this.variableMap = new Map();
  }

  stepForward() {
    this.position = this.transformable.stepForward(this.position);
    this.mesh.position = this.position;
  }

  checkIntersection() {
    this.worldInfo.getSceneObjects().forEach(object => {
      object.getInteractable()?.checkIntersection(this);
    });
  }

  delete(): void {
    const indexOfObject = this.worldInfo.getRobotObjects().findIndex((element) => this === element);
    this.worldInfo.getRobotObjects().splice(indexOfObject, 1);

    super.delete();
  }

  restore(): void {
    this.mesh = createCustomMesh(this.worldInfo.getScene(), Color3.Green(), "model route");
    this.worldInfo.addRobotObject(this);

    super.restore();
  }

  addVariable(variable: VariableContainer) {
    if (variable.getName() === "") { return; }

    if (this.variableMap.has(variable.getName())) {
      console.log("Key already exist");
    } else {
      this.variableMap.set(variable.getName(), { value: variable.getValue(), isKnown: true });
      console.log("added new variable");
    }
  }

  removeVariable(variable: VariableContainer) {
    this.variableMap.delete(variable.getName());
  }
}