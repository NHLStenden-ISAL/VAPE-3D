import BaseObject from "./BaseObject";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { VariableContainer } from "../VisualData/VariableContainer";
import { RobotDataContainer } from "./DataContainers";


export default class RobotObject extends BaseObject {
  private scope: Map<string, string>;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Green();

    super(worldInfo, gridPos, dir, objectColor);
    worldInfo.getRobotObjects().push(this);

    this.scope = new Map<string, string>();
  }

  public copy(worldInfo: WorldInformation): RobotObject {
    return new RobotObject(worldInfo, this.gridPosition, this.direction);
  }

  protected createMesh(): Mesh {
    return createCustomMesh(this.worldInfo.getScene(), this.getUUID(), Color3.Green(), "");
  }

  public updateRobot() {
    this.stepForward();
    this.checkIntersection();
  }

  private stepForward() {
    this.gridPosition = this.transformable.stepForward(this.gridPosition);
    this.mesh.position = this.updateMeshPosition();
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
    this.worldInfo.addRobotObject(this);

    super.restore();
  }

  public getScope(): Map<string, string> {
    return this.scope;
  }

  public addVariable(variable: VariableContainer) {
    if (variable.getName() === "") { return; }

    // console.log("Variable name: " + variable.getName() + " variable value: " + variable.getValue());
    // console.log("added new variable");
    this.scope.set(variable.getName(), variable.getValue());

  }

  public removeVariable(variable: VariableContainer) {
    this.scope.delete(variable.getName());
  }

  public getVariables(): Map<string, string> {
    return this.scope;
  }

  public getDataContainer(): RobotDataContainer {
    return new RobotDataContainer(
      this.getPositionForGUI(),
      this.getDirection()
    );
  }
}