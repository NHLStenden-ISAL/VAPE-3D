import BaseObject from "../Objects/BaseObject";
import DirectionObject from "../Objects/DirectionObject";
import ICommand from "./ICommand";
import RobotObject from "../Objects/RobotObject";
import VariableObject from "../Objects/VariableObject";
import WorldInformation from "../Helpers/WorldInformation";
import { DecisionObject } from "../Objects/DecisionObject";
import { Direction } from "../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";

export type ObjectTypes = 'DecisionObject' | 'DirectionObject' | 'RobotObject' | 'VariableObject';

export default class CommandAddObject implements ICommand {
  private worldInfo: WorldInformation;
  private gridPosition: Vector2;
  private direction: Direction;

  private object: BaseObject | undefined = undefined;
  private objectType: ObjectTypes;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction, objectType: ObjectTypes) {
    this.worldInfo = worldInfo;
    this.gridPosition = gridPosition;
    this.direction = direction;
    this.objectType = objectType;
  }

  execute(): void {
    switch (this.objectType) {
      case 'VariableObject':
        this.object = new VariableObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'RobotObject':
        this.object = new RobotObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'DecisionObject':
        this.object = new DecisionObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'DirectionObject':
        this.object = new DirectionObject(this.worldInfo, this.gridPosition, this.direction);

        break;
    }
  }

  undo(): void {
    this.object?.delete();
  }

  redo(): void {
    this.object?.restore();
  }
}