import BaseObject from "../Objects/BaseObject";
import DirectionObject from "../Objects/DirectionObject";
import ICommand from "./ICommand";
import RobotObject from "../Objects/RobotObject";
import CalculateObject from "../Objects/Arithmetic/CalculateObject";
import VariableObject from "../Objects/VariableObject";
import WorldInformation from "../Helpers/WorldInformation";
import DecisionObject from "../Objects/DecisionObject";
import { Direction } from "../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";
import { BuildTypes } from "../Helpers/ProgramState";

export default class CommandAddObject implements ICommand {
  private worldInfo: WorldInformation;
  private gridPosition: Vector2;
  private direction: Direction;

  private object: BaseObject | undefined = undefined;
  private objectType: BuildTypes;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction, objectType: BuildTypes) {
    this.worldInfo = worldInfo;
    this.gridPosition = gridPosition;
    this.direction = direction;
    this.objectType = objectType;
  }

  execute(): void {
    switch (this.objectType) {
      case 'variable':
        this.object = new VariableObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'robot':
        this.object = new RobotObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'decision':
        this.object = new DecisionObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'direction':
        this.object = new DirectionObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'calculate':
        this.object = new CalculateObject(this.worldInfo, this.gridPosition, this.direction);
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