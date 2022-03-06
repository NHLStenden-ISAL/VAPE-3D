import { Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { WorldInformation } from "../Helpers/WorldInformation";
import { DecisionObject } from "../Objects/DecisionObject";
import { ICommand } from "./ICommand";

export class CommandAddDecisionObject implements ICommand {
  private worldInfo: WorldInformation;
  private position: Vector3;
  private direction: Direction;

  private object: DecisionObject | undefined = undefined;

  constructor(worldInfo: WorldInformation, position: Vector3, direction: Direction) {
    this.worldInfo = worldInfo;
    this.position = position;
    this.direction = direction;
  }

  execute(): void {
    this.object = new DecisionObject(this.worldInfo, this.position, this.direction);
  }

  undo(): void {
    this.object?.delete();
  }
  
  redo(): void {
    this.execute();
  }
}