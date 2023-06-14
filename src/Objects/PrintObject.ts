import Interactable from "../Compositions/Interactable";
import BaseObject from "./BaseObject";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { loadModel } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { PrintDataContainer } from "./DataContainers";

//TODO: Strings are not quite working yet. When a variable has the same name or the string has spaces. Quotes are needed.

export default class PrintObject extends BaseObject {
  private storable: Storable;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.White();

    super(worldInfo, gridPos, dir, objectColor);

    this.mesh.rotation = this.transformable.rotateToward(dir);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.storable = new Storable(this.worldInfo);

  }

    protected createMesh(): Mesh {
        return loadModel(this.worldInfo.getScene(), this.getUUID(), "Print-Object.obj");
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.storable.getValue() === '') { return; }

    if (robotObject.getVariables().has(this.storable.getValue())) {
      console.log(robotObject.getVariables().get(this.storable.getValue()));
    }
    else {
      console.log(this.storable.getValue());
    }

  }

  public restore(): void {
    super.restore();
  }

  public override getDataContainer(): PrintDataContainer {
    return new PrintDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getValue()
    );
  }

  public getStorable(): Storable {
    return this.storable;
  }
}