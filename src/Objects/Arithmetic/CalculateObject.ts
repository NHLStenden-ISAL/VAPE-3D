import { Vector2, Color3, Mesh } from "@babylonjs/core";
import Interactable from "../../Compositions/Interactable";
import Storable from "../../Compositions/Storable";
import { Direction } from "../../Compositions/Transformable";
import { CalculateDataContainer } from "../DataContainers";
import { CheckForExpression, KeyGroup } from "../../GUI/InputFilter";
import { createBox } from "../../Helpers/ObjectCreator";
import WorldInformation from "../../Helpers/WorldInformation";
import BaseObject from "../BaseObject";
import RobotObject from "../RobotObject";

export default class CalculateObject extends BaseObject {
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
    return createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Red(), 0.8);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.storable.getName() === "") { return; }

    this.checkForVariables(robotObject);

    this.storable.changeIsKnown(true);
    robotObject.addVariable(this.storable.getContainer());

    console.log(`Name: ${this.storable.getName()}, Value ${this.storable.getValue()}`);

    this.interactedRobots.push(robotObject);
  }
  
  public getDataContainer(): CalculateDataContainer {
    return new CalculateDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getName(),
      this.storable.getValue(),
      this.storable.getIsKnown(),
      this.statement,
    );
  }

  private checkForVariables(robotObject: RobotObject) {
    let statement = '';

    let words = this.statement.split(/\s|(\+|-|\*|\/|%|!=|\(|\)|==|<=|>=|<|>|!)/g);

    words.forEach((word) => {
      if (word === undefined || word === '') { return; }

      const variable = robotObject.checkVariable(word);
      if (variable.isKnown) {
        if (CheckForExpression(variable.value, KeyGroup.NUMERIC)) {
          statement += `${variable.value} `;
        }
        else {
          statement += `"${variable.value}" `;
        }
      }
      else {
        if (CheckForExpression(word, KeyGroup.NUMBOLIC)) {
          statement += `${word} `;
        }
        else {
          statement += `"${word}" `;
        }
      }
    });

    this.executeStatement(statement);
  }

  private executeStatement(statement: string): void {
    const result = eval(statement);
    this.storable.changeValue(result.toString());
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
