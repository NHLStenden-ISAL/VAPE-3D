import { Direction } from "../../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";

export type GuiBoxVariable = {
  location: Vector2;
  direction: Direction;

  name: string;
  value: string;
  isKnown: boolean;
}

export type GuiBoxDecision = {
  location: Vector2;
  direction: Direction;

  statement: string;
}

export type GuiBoxDirection = {
  location: Vector2;
  direction: Direction;
}

export type GuiBoxRobot = {
  location: Vector2;
  direction: Direction;
}