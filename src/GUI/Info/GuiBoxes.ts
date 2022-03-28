import { Vector2 } from "@babylonjs/core";
import { Direction } from "../../Compositions/Transformable";

export type GuiBoxVariable = {
  objectType: 'variable';
  location: Vector2;
  direction: Direction;

  name: string;
  value: string;
  isKnown: boolean;
}

export type GuiBoxDecision = {
  objectType: 'decision';
  location: Vector2;
  direction: Direction;

  statement: string;
}

export type GuiBoxDirection = {
  objectType: 'direction';
  location: Vector2;
  direction: Direction;
}