import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createBox } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { FreeDataContainer } from "./DataContainers";
import { MemoryController } from "../MemoryManagement/memoryController";

export default class FreeObject extends BaseObject {
  private pointer: string
  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction, pointer?: string) {
    const objectColor = Color3.Yellow();

    super(worldInfo, gridPos, dir, objectColor);

    this.pointer = pointer ?? '';

    this.mesh.rotation = this.transformable.rotateToward(dir);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
  }

  public copy(worldInfo: WorldInformation): FreeObject {
    return new FreeObject(worldInfo, this.gridPosition, this.direction, this.pointer);
  }

  public getPointer(){
    return this.pointer;
  }

  public setPointer(pointer: string){
    this.pointer = pointer;
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Yellow(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    const memoryController = MemoryController.getInstance();
    memoryController.free(this.pointer);
  }

  public restore(): void {
    super.restore();
  }

  public getDataContainer(): FreeDataContainer {
    return new FreeDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.pointer
    )
  }
}