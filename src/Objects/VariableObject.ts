import { Mesh, HighlightLayer, Scene, Vector3, Nullable, Color3, AbstractMesh } from "@babylonjs/core";
import { Transformable } from "../Compositions/Transformable";
import { createSphere, createBox } from "../Helpers/ObjectCreator";
import { IObject } from "./IObject";

export class VariableObject implements IObject {
  private transformable: Transformable;
  private mesh: Mesh;
  private highlight: HighlightLayer;

  private objectList: IObject[];

  constructor(scene: Scene, position: Vector3, objectList: IObject[]) {
    this.mesh = createBox(scene);
    this.highlight = new HighlightLayer('highlight', scene);

    this.transformable = new Transformable(this.mesh);
    this.move(position);

    this.objectList = objectList;
    this.objectList.push(this);
  }

  onClickExecute(): void {
    this.highlight.addMesh(this.mesh, Color3.Purple());
  }

  onDragExecute(position: Vector3): void {
    this.move(position);
  }

  onReleaseExecute(): void {
    this.highlight.removeMesh(this.mesh);
  }

  getMesh(): AbstractMesh {
    return this.mesh;
  }

  move(position: Nullable<Vector3>): void {
    if (position !== null) {
      this.mesh.position = this.transformable.move(position);
    }
  }

  rotate(): void {
    this.mesh.rotation = this.transformable.rotate();
  }

  delete(): void {
    this.mesh.dispose();

    let indexOfObject = this.objectList.findIndex((element) => this === element);
    this.objectList.splice(indexOfObject, 1);
  }

}