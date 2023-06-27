import { Vector2, Color3, Mesh } from "@babylonjs/core";
import Interactable from "../../Compositions/Interactable";
import Storable from "../../Compositions/Storable";
import { Direction } from "../../Compositions/Transformable";
import { EvaluateDataContainer } from "../DataContainers";
import { createBox } from "../../Helpers/ObjectCreator";
import WorldInformation from "../../Helpers/WorldInformation";
import BaseObject from "../BaseObject";
import RobotObject from "../RobotObject";
import { MemoryController } from "../../MemoryManagement/memoryController";

export default class EvaluateObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;
  private index: string;
  private statement: string;

  constructor(worldInfo: WorldInformation, gridpos: Vector2, dir: Direction, stored?:Storable, statement?:string, index?:string) {
    const objectColor = Color3.Red();
    super(worldInfo, gridpos, dir, objectColor);

    this.statement = statement ?? '';
    this.index = index ?? '';
    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.storable = stored ?? new Storable(this.worldInfo);

    this.interactedRobots = [];
  }

  public copy(worldInfo: WorldInformation): EvaluateObject {
    return new EvaluateObject(worldInfo, this.gridPosition, this.direction, this.storable, this.statement, this.index);
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Red(), 0.8);
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

    memoryController.assign(this.storable.getName(), this.statement, index);

    this.interactedRobots.push(robotObject);
  }
  
  public getDataContainer(): EvaluateDataContainer {
    return new EvaluateDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getName(),
      this.storable.getValue(),
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
