import { Color3, Vector2 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Direction } from "../Compositions/Transformable";
import { createDirection } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class DirectionObject extends BaseObject {

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Purple();
    const objectMesh = createDirection(worldInfo.getScene(), objectColor, 0.8);

    super(worldInfo, objectMesh, gridPos, dir, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    objectMesh.rotation = this.transformable.rotateToward(dir);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    robotObject.rotateToward(this.transformable.getDirection());
  }

  public restore(): void {
    this.mesh = createDirection(this.worldInfo.getScene(), Color3.Purple(), 0.8);

    super.restore();
  }
}