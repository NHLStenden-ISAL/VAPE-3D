import { Vector2 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { WorldInformation } from "../Helpers/WorldInformation";
import { DirectionObject } from "../Objects/DirectionObject";
import { ICommand } from "./ICommand";

export class CommandAddDirectionObject implements ICommand {
  private worldInfo: WorldInformation;
  private gridPosition: Vector2;
  private direction: Direction;

  private object: DirectionObject | undefined = undefined;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction) {
    this.worldInfo = worldInfo;
    this.gridPosition = gridPosition;
    this.direction = direction;
  }

  execute(): void {
    this.object = new DirectionObject(this.worldInfo, this.gridPosition, this.direction);
  }

  undo(): void {
    this.object?.delete();
  }

  redo(): void {
    this.execute();
  }
}