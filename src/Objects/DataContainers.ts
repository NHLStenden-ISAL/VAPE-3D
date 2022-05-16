import { Direction } from "../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";

export class BaseDataContainer {
  public readonly type;

  public location: Vector2;
  public direction: Direction;

  constructor(type: string, location: Vector2, direction: Direction) {
    this.type = type;
    this.location = location;
    this.direction = direction;
  }
}

export class VariableDataContainer extends BaseDataContainer {
  public name: string;
  public value: string;
  public isKnown: boolean;

  constructor(location: Vector2, direction: Direction, name: string, value: string, isKnown: boolean) {
    super("Variable", location, direction);
    this.name = name;
    this.value = value;
    this.isKnown = isKnown;
  }
}

export class DecisionDataContainer extends BaseDataContainer {
  public statement: string;

  constructor(location: Vector2, direction: Direction, statement: string) {
    super("Decision", location, direction);
    this.statement = statement;
  }
}

export class DirectionDataContainer extends BaseDataContainer {

  constructor(location: Vector2, direction: Direction) {
    super("Direction", location, direction);
  }
}

export class RobotDataContainer extends BaseDataContainer {

  constructor(location: Vector2, direction: Direction) {
    super("Robot", location, direction);
  }
}

export class CalculateDataContainer extends BaseDataContainer {
  public name: string;
  public value: string;
  public isKnown: boolean;
  public statement: string;

  constructor(location: Vector2, direction: Direction, name: string, value: string, isKnown: boolean, statement: string) {
    super("Calculate", location, direction);
    this.name = name;
    this.value = value;
    this.isKnown = isKnown;
    this.statement = statement;
  }
}