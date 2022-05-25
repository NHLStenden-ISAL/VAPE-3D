import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createBox, createCustomMesh } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { VariableDataContainer } from "./DataContainers";

export default class VariableObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction) {
    const objectColor = Color3.Magenta();

    super(worldInfo, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    this.storable = new Storable(this.worldInfo);
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Magenta(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.storable.getName() === "") { return; }

    this.storable.changeIsKnown(true);
    robotObject.addVariable(this.storable.getContainer());

    this.interactedRobots.push(robotObject);
  }

  public delete(): void {
    this.interactedRobots.forEach(robot => {
      robot.removeVariable(this.storable.getContainer());
    });

    super.delete();
  }

  public restore(): void {
    this.interactedRobots.forEach(robot => {
      robot.addVariable(this.storable.getContainer());
    });

    super.restore();
  }

  public getDataContainer(): VariableDataContainer {
    return new VariableDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getName(),
      this.storable.getValue(),
      this.storable.getIsKnown()
    );
  }

  public getStorable(): Storable {
    return this.storable;
  }
}