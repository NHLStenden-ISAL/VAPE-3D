import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Storable } from "../Compositions/Storable";
import { Direction } from "../Compositions/Transformable";
import { GUIBoxInfo } from "../GUI/GUIInfo";
import { createDirection } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";
import { VariableData } from "../VisualData/VariableContainer";
import { BaseObject } from "./BaseObject";
import { RobotObject } from "./RobotObject";

export class DecisionObject extends BaseObject {
  private variableMap: Map<string, VariableData>;

  private condition: boolean;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Blue();

    super(worldInfo, gridPos, dir, objectColor);

    this.mesh.rotation = this.transformable.rotateToward(dir);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.storable = new Storable(this.worldInfo);

    this.variableMap = new Map();
    this.condition = false;
  }

  protected createMesh(): Mesh {
    return createDirection(this.worldInfo.getScene(), this.getUUID(), Color3.Blue(), 0.8);
  }

  private checkForVariables(robotObject: RobotObject) {
    if (!this.storable) { return; }

    let statement = '';

    let words = this.storable.getValue().split(' ');

    words.forEach((word) => {
      const variable = robotObject.checkVariable(word);
      if (variable.isKnown) {
        statement += `${variable.value} `;
        this.variableMap.set(word, variable);
      }
      else {
        statement += `${word} `;
      }
    });

    this.executeIf(statement);
  }

  private executeIf(statement: string) {
    console.log(statement);
    
    eval(`if (${statement}) { this.condition = true } else { this.condition = false }`);
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (!this.storable) { return; }

    this.checkForVariables(robotObject);

    if (this.checkCondition() === true) {
      robotObject.rotateToward(this.transformable.getDirection());
    }
  }

  public restore(): void {
    super.restore();
  }

  private checkCondition(): boolean {
    return this.condition;
  }

  public getGUIBox(): GUIBoxInfo {
    if (!this.storable) { return { objectType: '' } };

    return {
      objectType: 'decision',
      location: this.getPositionForGUI(),
      direction: this.getDirection(),
      statement: this.storable.getValue()
    }
  }
}