import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createReturn } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import {ReturnDataContainer} from "./DataContainers";
import {SceneManager} from "./SceneComponent";

export default class ReturnObject extends BaseObject {

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Black();

    super(worldInfo, gridPos, dir, objectColor);

    this.mesh.rotation = this.transformable.rotateToward(dir);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
  }

  public copy(worldInfo: WorldInformation): ReturnObject {
    return new ReturnObject(worldInfo, this.gridPosition, this.direction);
  }

  protected createMesh(): Mesh {
    return createReturn(this.worldInfo.getScene(), this.getUUID(), Color3.Black(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    SceneManager.return();
  }

  public restore(): void {
    super.restore();
  }

  public getDataContainer(): ReturnDataContainer {
    return new ReturnDataContainer(
      this.getPositionForGUI(),
      this.getDirection()
    )
  }
}