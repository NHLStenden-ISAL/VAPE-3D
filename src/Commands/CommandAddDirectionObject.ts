import { Vector3 } from "@babylonjs/core";
import { Direction } from "../Compositions/Transformable";
import { WorldInformation } from "../Helpers/WorldInformation";
import { DirectionObject } from "../Objects/DirectionObject";
import { ICommand } from "./ICommand";

export class CommandAddDirectionObject implements ICommand {

  private worldInfo: WorldInformation;
  private position: Vector3;
  private direction: Direction;

  private object: DirectionObject | undefined = undefined;

  constructor(worldInfo: WorldInformation, position: Vector3, direction: Direction) {
    this.worldInfo = worldInfo;
    this.position = position;
    this.direction = direction;
  }

  execute(): void {
    this.object = new DirectionObject(this.worldInfo, this.position, this.direction);
  }

  undo(): void {
    this.object?.delete();
  }
  
  redo(): void {
    this.execute();
  }
}