import BaseObject from "../Objects/BaseObject";
import RobotObject from "../Objects/RobotObject";

type CallbackVoid = (robotObject: RobotObject) => void;

export default class Interactable {
  private onIntersect: CallbackVoid;
  private object: BaseObject;

  constructor(object: BaseObject, onIntersect: CallbackVoid) {
    this.object = object;
    this.onIntersect = onIntersect;
  }

  onIntersectExecute(robotObject: RobotObject) {
    this.onIntersect(robotObject);
  }

  checkIntersection(robotObject: RobotObject) {
    if (this.object.getGridPosition().equals(robotObject.getGridPosition())) {
      this.onIntersectExecute(robotObject);
    }
  }
}