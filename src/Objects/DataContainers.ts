import { Direction } from "../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";
import { BuildTypes } from "../Helpers/ProgramState";

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

export class CallDataContainer extends BaseDataContainer {
  public call: string;

  constructor(location: Vector2, direction: Direction, statement: string) {
    super('call', location, direction);
    this.call = statement;
  }
}

export class VariableDataContainer extends BaseDataContainer {
  public name: string;
  public value: string;
  public isKnown: boolean;

  constructor(location: Vector2, direction: Direction, name: string, value: string, isKnown: boolean) {
    super('variable', location, direction);
    this.name = name;
    this.value = value;
    this.isKnown = isKnown;
  }
}

export class DecisionDataContainer extends BaseDataContainer {
  public statement: string;

  constructor(location: Vector2, direction: Direction, statement: string) {
    super('decision', location, direction);
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
  public isKnown: boolean;
  public statement: string;

  constructor(location: Vector2, direction: Direction, name: string, value: string, isKnown: boolean, statement: string) {
    super('evaluate', location, direction);
    this.name = name;
    this.value = value;
    this.isKnown = isKnown;
    this.statement = statement;
  }
}

export class PrintDataContainer extends BaseDataContainer {
    public statement: string;

    constructor(location: Vector2, direction: Direction, statement: string) {
      super('print', location, direction);
      this.statement = statement;
    }
}