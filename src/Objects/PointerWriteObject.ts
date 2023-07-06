import { Vector2, Color3, Mesh } from "@babylonjs/core";
import Interactable from "../Compositions/Interactable";
import Storable from "../Compositions/Storable";
import { Direction } from "../Compositions/Transformable";
import { PointerWriteDataContainer } from "./DataContainers";
import { createBox } from "../Helpers/ObjectCreator";
import WorldInformation from "../Helpers/WorldInformation";
import BaseObject from "./BaseObject";
import RobotObject from "./RobotObject";
import { MemoryController } from "../MemoryManagement/memoryController";

export default class PointerWriteObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;
  private index: string;
  private statement: string;

  constructor(worldInfo: WorldInformation, gridpos: Vector2, dir: Direction, stored?:Storable, statement?:string, index?:string) {
    const objectColor = Color3.Teal();
    super(worldInfo, gridpos, dir, objectColor);

    this.statement = statement ?? '';
    this.index = index ?? '';
    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.storable = stored ?? new Storable(this.worldInfo);

    this.interactedRobots = [];
  }

  public copy(worldInfo: WorldInformation): PointerWriteObject {
    return new PointerWriteObject(worldInfo, this.gridPosition, this.direction, this.storable, this.statement, this.index);
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Teal(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    const memoryController = MemoryController.getInstance();
    if (this.storable.getName() === "") { return; }
    
    let index
    if(this.index===''){
      index = undefined;
    }else{
      index = parseInt(this.index);
    }

    memoryController.writeToPointer(this.storable.getName(), this.statement, index);

    this.interactedRobots.push(robotObject);
  }
  
  public getDataContainer(): PointerWriteDataContainer {
    return new PointerWriteDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getName(),
      this.statement,
      this.index
    );
  }

  public getStorable(): Storable {
    return this.storable;
  }

  public changeStatement(statement: string): void {
    this.statement = statement;
  }

  public getIndex(){
    return this.index;
  }

  public setIndex(index: string){
    this.index = index;
  }

}
