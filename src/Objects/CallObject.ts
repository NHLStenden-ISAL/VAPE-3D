import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createBox } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import {CallDataContainer} from "./DataContainers";

export default class CallObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction) {
    const objectColor = Color3.Gray();

    super(worldInfo, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    this.storable = new Storable(this.worldInfo);
  }

  public copy(worldInfo: WorldInformation): CallObject {
    return new CallObject(worldInfo, this.gridPosition, this.direction);
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Gray(), 0.9);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    console.log(this.storable.getName());
    console.log(this.storable.getValue());
  }

  public delete(): void {
    super.delete();
  }

  public restore(): void {
    super.restore();
  }

  public getDataContainer(): CallDataContainer {
    return new CallDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getValue()
    );
  }

  public getStorable(): Storable {
    return this.storable;
  }
}