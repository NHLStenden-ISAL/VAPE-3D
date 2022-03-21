import { Vector2 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { WorldInformation } from "../Helpers/WorldInformation";
import { BaseObject } from "../Objects/BaseObject";
import { DecisionObject } from "../Objects/DecisionObject";
import { DirectionObject } from "../Objects/DirectionObject";
import { RobotObject } from "../Objects/RobotObject";
import { VariableObject } from "../Objects/VariableObject";
import { ICommand } from "./ICommand";

export type ObjectTypes = 'DecisionObject' | 'DirectionObject' | 'RobotObject' | 'VariableObject';

export class CommandAddObject implements ICommand {
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
    this.execute();
  }
}