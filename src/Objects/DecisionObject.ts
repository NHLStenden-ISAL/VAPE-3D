import Interactable from "../Compositions/Interactable";
import BaseObject from "./BaseObject";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createDirection } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { DecisionDataContainer } from "./DataContainers";
import { parse } from "mathjs";
import { MemoryController } from "../MemoryManagement/memoryController";

//TODO: Strings are not quite working yet. When a variable has the same name or the string has spaces. Quotes are needed.

export default class DecisionObject extends BaseObject {
  private storable: Storable;

  private condition: boolean;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction, stored?: Storable) {
    const objectColor = Color3.Blue();

    super(worldInfo, gridPos, dir, objectColor);

    this.mesh.rotation = this.transformable.rotateToward(dir);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));


    if(typeof stored == 'undefined')
      this.storable = new Storable(this.worldInfo);
    else
      this.storable = stored;

    this.condition = false;
  }

  public copy(worldInfo: WorldInformation): DecisionObject {
    return new DecisionObject(worldInfo, this.gridPosition, this.direction, this.storable);
  }


  protected createMesh(): Mesh {
    return createDirection(this.worldInfo.getScene(), this.getUUID(), Color3.Blue(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.storable.getValue() === '') { return; }
    this.executeStatement(robotObject, this.storable.getValue());

    if (this.checkCondition()) {
      robotObject.rotateToward(this.transformable.getDirection());
    }
  }

  private executeStatement(robot: RobotObject, statement: string) {
    const memoryController = MemoryController.getInstance();

    try{
      this.condition = memoryController.evaluate(statement);
    } catch (e) {
      this.condition = false;
    }
  }

  public restore(): void {
    super.restore();
  }

  private checkCondition(): boolean {
    return this.condition;
  }

  public override getDataContainer(): DecisionDataContainer {
    return new DecisionDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getValue()
    );
  }

  public getStorable(): Storable {
    return this.storable;
  }
}