import { AbstractMesh, Nullable, Vector3 } from "@babylonjs/core";


export interface IObject {
  //Clickable
  onClickExecute(): void;
  onDragExecute(position: Vector3): void;
  onReleaseExecute(): void;

  getMesh(): AbstractMesh;

  //Transformable
  move(position: Nullable<Vector3>): void;
  rotate(): void;

  //Deletable
  delete(): void;
}