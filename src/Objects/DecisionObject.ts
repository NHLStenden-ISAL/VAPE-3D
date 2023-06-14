import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { parse } from "mathjs";
import Interactable from "../Compositions/Interactable";
import Storable from "../Compositions/Storable";
import { Direction } from "../Compositions/Transformable";
import { loadModel } from "../Helpers/ObjectCreator";
import WorldInformation from "../Helpers/WorldInformation";
import BaseObject from "./BaseObject";
import { DecisionDataContainer } from "./DataContainers";
import RobotObject from "./RobotObject";

//TODO: Strings are not quite working yet. When a variable has the same name or the string has spaces. Quotes are needed.

export default class DecisionObject extends BaseObject {
  private storable: Storable;

  private condition: boolean;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Blue();

    super(worldInfo, gridPos, dir, objectColor);

    this.mesh.rotation = this.transformable.rotateToward(dir);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.storable = new Storable(this.worldInfo);

    this.condition = false;
  }

  protected createMesh(): Mesh {
    return loadModel(this.worldInfo.getScene(), this.getUUID(), "Decision-Object.obj");
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.storable.getValue() === '') { return; }
    this.executeStatement(robotObject, this.storable.getValue());

    if (this.checkCondition() === true) {
      console.log(this.storable.getValue());
      robotObject.rotateToward(this.transformable.getDirection());
    }
  }

  private executeStatement(robot: RobotObject, statement: string) {
    const parsedStatement = parse(statement);
    const compiledStatement = parsedStatement.compile();

    try{
      this.condition = compiledStatement.evaluate(robot.getScope());
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