import { Vector3, Scene, Color3 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Direction } from "../Compositions/Transformable";
import { createDirection } from "../Helpers/ObjectCreator";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class DecisionObject extends BaseObject {

  constructor(scene: Scene, position: Vector3, objectList: BaseObject[], direction: Direction = 0) {
    let customMesh = createDirection(scene, Color3.Blue(), 0.8);
    let customHighlightColor = Color3.Blue();

    super(scene, position, customMesh, customHighlightColor, objectList);

    customMesh.rotation = this.transformable.rotateToward(direction);
    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
  }

  onIntersectExecute(robotObject: RobotObject) {
    if (this.checkCondition() === true) {
      robotObject.rotateToward(this.transformable.getDirection());
    }
  }

  private checkCondition() : boolean {
    return false;
  }
}