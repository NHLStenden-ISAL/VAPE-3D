import { Vector2, Vector3 } from "@babylonjs/core";

export enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST
}

export class Transformable {
  private currentDirection: Direction;

  constructor() {
    this.currentDirection = Direction.NORTH;
  }

  move(position: Vector2): Vector2 {
    return new Vector2(this.floor(position.x), this.floor(position.y));
  }

  stepForward(position: Vector2): Vector2 {
    return position.addInPlace(this.getForward(this.currentDirection));
  }

  rotate(): Vector3 {
    this.currentDirection++;

    if (this.currentDirection % this.directionCount() === 0) {
      this.currentDirection = 0;
    }

    const yRotation = (Math.PI / (this.directionCount() / 2)) * this.currentDirection;

    return new Vector3(0, yRotation, 0);
  }

  rotateToward(direction: Direction): Vector3 {
    this.currentDirection = direction;

    const yRotation = (Math.PI / (this.directionCount() / 2)) * direction;
    return new Vector3(0, yRotation, 0);
  }

  getDirection(): Direction {
    return this.currentDirection;
  }

  private floor(num: number): number {
    return Math.floor(num) + 0.5;
  }

  private directionCount(): number {
    return Object.keys(Direction).length / 2;
  }

  private getForward(direction: Direction): Vector2 {
    switch (direction) {
      case Direction.NORTH:
        return new Vector2(0, 1);
      case Direction.EAST:
        return new Vector2(1, 0);
      case Direction.SOUTH:
        return new Vector2(0, -1);
      case Direction.WEST:
        return new Vector2(-1, 0);
    }

    return Vector2.Zero();
  }
}