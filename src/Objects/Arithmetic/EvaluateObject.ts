import { Vector2, Color3, Mesh } from "@babylonjs/core";
import Interactable from "../../Compositions/Interactable";
import Storable from "../../Compositions/Storable";
import { Direction } from "../../Compositions/Transformable";
import { EvaluateDataContainer } from "../DataContainers";
import { createBox, loadModel } from "../../Helpers/ObjectCreator";
import WorldInformation from "../../Helpers/WorldInformation";
import BaseObject from "../BaseObject";
import RobotObject from "../RobotObject";
import { parse } from "mathjs";

export default class EvaluateObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;
  
  private statement: string;

  constructor(worldInfo: WorldInformation, gridpos: Vector2, dir: Direction) {
    const objectColor = Color3.Red();
    super(worldInfo, gridpos, dir, objectColor);

    this.statement = '';

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.storable = new Storable(this.worldInfo);
    this.interactedRobots = [];
  }

    protected createMesh(): Mesh {
        return loadModel(this.worldInfo.getScene(), this.getUUID(), "Eval-Object.obj");
    //return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Red(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.storable.getName() === "") { return; }

    this.executeStatement(robotObject, this.statement);

    this.storable.changeIsKnown(true);
    robotObject.addVariable(this.storable.getContainer());

    this.interactedRobots.push(robotObject);
  }
  
  public getDataContainer(): EvaluateDataContainer {
    return new EvaluateDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getName(),
      this.storable.getValue(),
      this.storable.getIsKnown(),
      this.statement,
    );
  }

  private executeStatement(robotObject: RobotObject, statement: string) {
    const parsedStatement = parse(statement);
    const compiledStatement = parsedStatement.compile();

    this.storable.changeValue(compiledStatement.evaluate(robotObject.getScope()));
  }

  public getStorable(): Storable {
    return this.storable;
  }

  public changeStatement(statement: string): void {
    this.statement = statement;
  }

  public delete(): void {
    this.interactedRobots.forEach(robot => {
      robot.removeVariable(this.storable.getContainer());
    });

    super.delete();
  }

  public restore(): void {
    this.interactedRobots.forEach(robot => {
      robot.addVariable(this.storable.getContainer());
    });

    super.restore();
  }
}
