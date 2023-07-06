import BaseObject from "../Objects/BaseObject";
import DirectionObject from "../Objects/DirectionObject";
import ICommand from "./ICommand";
import RobotObject from "../Objects/RobotObject";
import EvaluateObject from "../Objects/EvaluateObject";
import VariableObject from "../Objects/VariableObject";
import WorldInformation from "../Helpers/WorldInformation";
import DecisionObject from "../Objects/DecisionObject";
import { Direction } from "../Compositions/Transformable";
import { Vector2 } from "@babylonjs/core";
import { BuildTypes } from "../Helpers/ProgramState";
import PrintObject from "../Objects/PrintObject";
import GridObject from "../Objects/GridObject";
import LayerObject from "../Objects/LayerObject";
//
export default class CommandAddLayer {
//   private worldInfo: WorldInformation;
//   private layer: number;
//
//   private object: BaseObject | undefined = undefined;
//
//   constructor(worldInfo: WorldInformation, layer: number) {
//     this.worldInfo = worldInfo;
//     this.layer = layer;
//   }
//
//   execute(): void {
//     this.object = new LayerObject(this.worldInfo, 60, 1);
//   }
//
//   undo(): void {
//     this.object?.delete();
//   }
//
//   redo(): void {
//     this.object?.restore();
//   }
}