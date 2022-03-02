import { Vector3, Scene, Color3 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Direction } from "../Compositions/Transformable";
import { createDirection } from "../Helpers/ObjectCreator";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class DirectionObject extends BaseObject {

  constructor(scene: Scene, position: Vector3, objectList: BaseObject[], direction: Direction = 0) {
    let customMesh = createDirection(scene, Color3.Purple(), 0.8);
    let customHighlightColor = Color3.Purple();

    super(scene, position, customMesh, customHighlightColor, objectList);

    customMesh.rotation = this.transformable.rotateToward(direction);
    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
  }

  onIntersectExecute(robotObject: RobotObject) {
    robotObject.rotateToward(this.transformable.getDirection());
  }
}