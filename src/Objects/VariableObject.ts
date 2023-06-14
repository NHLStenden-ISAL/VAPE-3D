import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import Interactable from "../Compositions/Interactable";
import Storable from "../Compositions/Storable";
import { Direction } from "../Compositions/Transformable";
import { loadModel } from "../Helpers/ObjectCreator";
import WorldInformation from "../Helpers/WorldInformation";
import BaseObject from "./BaseObject";
import { VariableDataContainer } from "./DataContainers";
import RobotObject from "./RobotObject";

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
        return loadModel(this.worldInfo.getScene(), this.getUUID(), "Variable-Object.obj");
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