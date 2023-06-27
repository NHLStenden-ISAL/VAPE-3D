import BaseObject from "../Objects/BaseObject";
import DirectionObject from "../Objects/DirectionObject";
import ICommand from "./ICommand";
import RobotObject from "../Objects/RobotObject";
import EvaluateObject from "../Objects/Arithmetic/EvaluateObject";
import VariableObject from "../Objects/VariableObject";
import WorldInformation from "../Helpers/WorldInformation";
import DecisionObject from "../Objects/DecisionObject";
import { Direction } from "../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";
import { BuildTypes } from "../Helpers/ProgramState";
import PrintObject from "../Objects/PrintObject";
import ReturnObject from "../Objects/ReturnObject";
import LayerObject from "../Objects/LayerObject";
import CallObject from "../Objects/CallObject";
import PointerWriteObject from "../Objects/Arithmetic/PointerWriteObject";
import FreeObject from "../Objects/FreeObject";

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
      case 'call':
        this.object = new CallObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'return':
        this.object = new ReturnObject(this.worldInfo, this.gridPosition, this.direction);
        break;
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
      case 'evaluate':
        this.object = new EvaluateObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'print':
        this.object = new PrintObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'grid':
        this.object = new LayerObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'writeToPointer':
        this.object = new PointerWriteObject(this.worldInfo, this.gridPosition, this.direction);
        break;
      case 'free':
        this.object = new FreeObject(this.worldInfo, this.gridPosition, this.direction);
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