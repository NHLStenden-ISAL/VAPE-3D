import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createBox } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import {CallDataContainer} from "./DataContainers";
import {SceneManager} from "./SceneComponent";

export default class CallObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction, stored?: Storable) {
    const objectColor = Color3.Gray();

    super(worldInfo, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    if(typeof stored == 'undefined')
      this.storable = new Storable(worldInfo);
    else
      this.storable = stored;
  }

  public copy(worldInfo: WorldInformation): CallObject {
    return new CallObject(worldInfo, this.gridPosition, this.direction, this.storable);
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Gray(), 0.9);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    SceneManager.callByName(this.storable.getValue());
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