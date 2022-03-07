import { Color3, Vector2, Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";
import { VariableContainer, VariableData } from "../VisualData/VariableContainer";
import { BaseObject } from "./BaseObject";

export class RobotObject extends BaseObject {
  private variableMap: Map<string, VariableData>;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Green();
    const objectMesh = createCustomMesh(worldInfo.getScene(), objectColor, "model route");

    super(worldInfo, objectMesh, gridPos, dir, objectColor);

    worldInfo.getRobotObjects().push(this);

    this.variableMap = new Map();
  }

  public updateRobot() {
    this.stepForward();
    this.checkIntersection();
  }

  private stepForward() {
    this.gridPosition = this.transformable.stepForward(this.gridPosition);
    this.mesh.position = new Vector3(this.gridPosition.x, this.height, this.gridPosition.y);
  }

  private checkIntersection() {
    this.worldInfo.getSceneObjects().forEach(object => {
      object.getInteractable()?.checkIntersection(this);
    });
  }

  public delete(): void {
    const indexOfObject = this.worldInfo.getRobotObjects().findIndex((element) => this === element);
    this.worldInfo.getRobotObjects().splice(indexOfObject, 1);

    super.delete();
  }

  public restore(): void {
    this.mesh = createCustomMesh(this.worldInfo.getScene(), Color3.Green(), "model route");
    this.worldInfo.addRobotObject(this);

    super.restore();
  }

  public addVariable(variable: VariableContainer) {
    if (variable.getName() === "") { return; }

    if (this.variableMap.has(variable.getName())) {
      console.log("Key already exist");
    } else {
      this.variableMap.set(variable.getName(), { value: variable.getValue(), isKnown: true });
      console.log("added new variable");
    }
  }

  public removeVariable(variable: VariableContainer) {
    this.variableMap.delete(variable.getName());
  }
}