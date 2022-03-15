import { Vector2 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";

export type GUIBoxInfo = { objectType: ''; } | {
  objectType: 'variable';
  location: Vector2;
  direction: Direction;
  
  name: string;
  value: string;
  isKnown: boolean;
} | {
  objectType: 'decision';
  location: Vector2;
  direction: Direction;
  
  varAmount: number;
  varNames: string[];
  varValue: string[];
  isKnown: boolean;
} | {
  objectType: 'direction';
  location: Vector2;
  direction: Direction;
}