import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createBox } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import {CallDataContainer} from "./DataContainers";
import { SceneManager } from "../Helpers/SceneManager";
import { MemoryController } from "../MemoryManagement/memoryController";

export default class CallObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;
  private arguments: string;
  private returnVariable;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction, stored?: Storable, args?: string, returnVariable?: string) {
    const objectColor = Color3.Gray();

    super(worldInfo, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    this.arguments = args ?? '';
    this.storable = stored ?? new Storable(this.worldInfo);
    this.returnVariable = returnVariable ?? '';
  }

  public copy(worldInfo: WorldInformation): CallObject {
    return new CallObject(worldInfo, this.gridPosition, this.direction, this.storable, this.arguments, this.returnVariable);
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Gray(), 0.9);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    const memoryController = MemoryController.getInstance();
    if(this.arguments.length!==0){
      let args:{[key:string]:string} = {};
      const pattern = /([^\s,=]+\s?=\s?[^\s,=]+)/g;
      const entries = this.arguments.match(pattern);
      entries?.forEach((entry)=>{
        let kv = entry.replaceAll(' ','').split('=');
        args[kv[0]] = kv[1];
      });
      memoryController.call(this.storable.getValue(),this.returnVariable,args);
    }else{
      memoryController.call(this.storable.getValue(),this.returnVariable);
    }
    
    SceneManager.callByName(this.storable.getValue());
  }

  public delete(): void {
    super.delete();
  }

  public restore(): void {
    super.restore();
  }

  public getArguments(){
    return this.arguments;
  }

  public setArguments(args:string){
    this.arguments = args;
  }

  public getReturnVariable(){
    return this.returnVariable;
  }

  public setReturnVariable(variable: string){
    this.returnVariable = variable;
  }

  public getDataContainer(): CallDataContainer {
    return new CallDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getValue(),
      this.arguments,
      this.returnVariable
    );
  }

  public getStorable(): Storable {
    return this.storable;
  }
}