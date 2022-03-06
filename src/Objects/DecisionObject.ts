import { Vector3, Color3 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Direction } from "../Compositions/Transformable";
import { createDirection } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class DecisionObject extends BaseObject {

  constructor(worldInfo: WorldInformation, pos: Vector3, dir: Direction) {
    const objectMesh = createDirection(worldInfo.getScene(), Color3.Blue(), 0.8);
    const objectColor = Color3.Blue();

    super(worldInfo, objectMesh, pos, dir, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    
    objectMesh.rotation = this.transformable.rotateToward(dir);
  }

  onIntersectExecute(robotObject: RobotObject) {
    if (this.checkCondition() === true) {
      robotObject.rotateToward(this.transformable.getDirection());
    }
  }

  restore(): void {
    this.mesh = createDirection(this.worldInfo.getScene(), Color3.Blue(), 0.8);

    super.restore();
  }

  private checkCondition() : boolean {
    return true;
  }
}