import { Mesh, Vector2, Vector3 } from "@babylonjs/core";

export enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST
}

export class Transformable {
  private height: number;
  private currentDirection: Direction;

  constructor(mesh: Mesh) {
    this.height = mesh.getBoundingInfo().boundingBox.extendSize.y;

    this.currentDirection = Direction.NORTH;
  }

  move(position: Vector3): Vector3 {
    return new Vector3(this.floor(position.x), this.height, this.floor(position.z));
  }

  stepForward(position: Vector3): Vector3 {
    return position.addInPlace(this.getForward(this.currentDirection));
  }

  rotate(): Vector3 {
    this.currentDirection++;

    if (this.currentDirection % this.directionCount() === 0) {
      this.currentDirection = 0;
    }

    let yRotation = (Math.PI / (this.directionCount() / 2)) * this.currentDirection;
    return new Vector3(0, yRotation, 0);
  }

  rotateToward(direction: Direction) : Vector3 {
    this.currentDirection = direction;

    let yRotation = (Math.PI / (this.directionCount() / 2)) * direction;
    return new Vector3(0, yRotation, 0);
  }

  getDirection() : Direction {
    return this.currentDirection;
  }

  private floor(num: number): number {
    return Math.floor(num) + 0.5;
  }

  private floorVector3(vec: Vector3): Vector3 {
    return new Vector3(Math.floor(vec.x), 0, Math.floor(vec.z))
  }

  private directionCount(): number {
    return Object.keys(Direction).length / 2;
  }

  private getForward(direction: Direction): Vector3 {
    switch (direction) {
      case Direction.NORTH:
        return new Vector3(0, 0, 1);
      case Direction.EAST:
        return new Vector3(1, 0, 0);
      case Direction.SOUTH:
        return new Vector3(0, 0, -1);
      case Direction.WEST:
        return new Vector3(-1, 0, 0);

    }

    return Vector3.Zero();
  }
}