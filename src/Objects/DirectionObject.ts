import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { loadModel } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { DirectionDataContainer } from "./DataContainers";

export default class DirectionObject extends BaseObject {

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Purple();

    super(worldInfo, gridPos, dir, objectColor);

    this.mesh.rotation = this.transformable.rotateToward(dir);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
  }

    protected createMesh(): Mesh {
        const model = loadModel(this.worldInfo.getScene(), this.getUUID(), "Direction-Object.obj");
        return model;
  }

  private onIntersectExecute(robotObject: RobotObject) {
    robotObject.rotateToward(this.transformable.getDirection());
  }

  public restore(): void {
    super.restore();
  }

  public getDataContainer(): DirectionDataContainer {
    return new DirectionDataContainer(
      this.getPositionForGUI(),
      this.getDirection()
    )
  }
}