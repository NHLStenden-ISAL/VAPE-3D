import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createReturn } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import {ReturnDataContainer} from "./DataContainers";
import {SceneManager} from "./SceneComponent";
import { MemoryController } from "../MemoryManagement/memoryController";

export default class ReturnObject extends BaseObject {
  private statement: string;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction, statement?: string) {
    const objectColor = Color3.Black();

    super(worldInfo, gridPos, dir, objectColor);

    this.mesh.rotation = this.transformable.rotateToward(dir);
    this.statement = statement ?? '';

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
  }

  public copy(worldInfo: WorldInformation): ReturnObject {
    return new ReturnObject(worldInfo, this.gridPosition, this.direction, this.statement);
  }

  protected createMesh(): Mesh {
    return createReturn(this.worldInfo.getScene(), this.getUUID(), Color3.Black(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    const memoryController = MemoryController.getInstance();
    memoryController.returnFunction(this.statement);
    SceneManager.return();
  }

  public restore(): void {
    super.restore();
  }

  public getStatement(){
    return this.statement;
  }

  public setStatement(statement: string){
    this.statement = statement;
  }

  public getDataContainer(): ReturnDataContainer {
    return new ReturnDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.statement
    )
  }
}