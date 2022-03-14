import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Storable } from "../Compositions/Storable";
import { Direction } from "../Compositions/Transformable";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class VariableObject extends BaseObject {
  private interactedRobots: RobotObject[];

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction) {
    const objectColor = Color3.Magenta();

    super(worldInfo, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    this.storable = new Storable('variable');
  }

  protected createMesh(): Mesh {
    return createCustomMesh(this.worldInfo.getScene(), this.getUUID(), Color3.Magenta(), "");
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (!this.storable) { return; }

    if (this.storable.getName() === "") { return; }

    robotObject.addVariable(this.storable.getContainer());
    this.interactedRobots.push(robotObject);
  }

  public delete(): void {
    this.interactedRobots.forEach(robot => {
      if (this.storable) {
        robot.removeVariable(this.storable.getContainer());
      }
    });

    super.delete();
  }

  public restore(): void {
    this.interactedRobots.forEach(robot => {
      if (this.storable) {
        robot.addVariable(this.storable.getContainer());
      }
    });

    super.restore();
  }
}