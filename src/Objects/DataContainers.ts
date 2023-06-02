import { Direction } from "../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";
import { BuildTypes } from "../Helpers/ProgramState";
import { variableType } from "../MemoryManagement/memoryController";

//TODO: These should be moved to their respective accompanying object classes
export class BaseDataContainer {
  public readonly type;

  public location: Vector2;
  public direction: Direction;

  constructor(type: BuildTypes, location: Vector2, direction: Direction) {
    this.type = type;
    this.location = location;
    this.direction = direction;
  }
}

export class PointerWriteDataContainer extends BaseDataContainer {
  public pointer: string;
  public statement: string;
  public index: string;

  constructor(location: Vector2, direction: Direction, pointer: string, statement: string, index: string){
    super("writeToPointer", location, direction);
    this.pointer = pointer;
    this.statement = statement;
    this.index = index;
  }
}

export class FreeDataContainer extends BaseDataContainer {
  public pointer: string;

  constructor(location: Vector2, direction: Direction, pointer: string){
    super("free", location, direction);
    this.pointer = pointer;
  }
}

export class CallDataContainer extends BaseDataContainer {
  public call: string;
  public args: string;
  public returnVar: string;

  constructor(location: Vector2, direction: Direction, statement: string, args: string, returnVar: string) {
    super('call', location, direction);
    this.call = statement;
    this.args = args;
    this.returnVar = returnVar;
  }
}

export class VariableDataContainer extends BaseDataContainer {
  public name: string;
  public value: string;
  public variableType: variableType;
  public variableSize: number;

  constructor(location: Vector2, direction: Direction, name: string, value: string, variableType: variableType, variableSize: number) {
    super('variable', location, direction);
    this.name = name;
    this.value = value;
    this.variableType = variableType;
    this.variableSize = variableSize;
  }
}

export class DecisionDataContainer extends BaseDataContainer {
  public statement: string;

  constructor(location: Vector2, direction: Direction, statement: string) {
    super('decision', location, direction);
    this.statement = statement;
  }
}

export class ReturnDataContainer extends BaseDataContainer {
  public statement: string;

  constructor(location: Vector2, direction: Direction, statement: string) {
    super('return', location, direction);
    this.statement = statement;
  }
}

export class DirectionDataContainer extends BaseDataContainer {

  constructor(location: Vector2, direction: Direction) {
    super('direction', location, direction);
  }
}

export class RobotDataContainer extends BaseDataContainer {

  constructor(location: Vector2, direction: Direction) {
    super('robot', location, direction);
  }
}

export class EvaluateDataContainer extends BaseDataContainer {
  public name: string;
  public value: string;
  public statement: string;
  public index: string;

  constructor(location: Vector2, direction: Direction, name: string, value: string, statement: string, index: string) {
    super('evaluate', location, direction);
    this.name = name;
    this.value = value;
    this.statement = statement;
    this.index = index;
  }
}

export class PrintDataContainer extends BaseDataContainer {
    public statement: string;

    constructor(location: Vector2, direction: Direction, statement: string) {
      super('print', location, direction);
      this.statement = statement;
    }
}