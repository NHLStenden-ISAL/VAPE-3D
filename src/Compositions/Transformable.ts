import { Mesh, Vector3 } from "@babylonjs/core";

export class Transformable {
  private mesh: Mesh;

  private height: number;
  //private position: Vector3;
  private rotation: Vector3;

  private rotationAmount: number;
  private rotationCounter: number;

  constructor(mesh: Mesh) {
    this.mesh = mesh;

    this.height = mesh.getBoundingInfo().boundingBox.extendSize.y;
    //this.position = mesh.position;
    this.rotation = mesh.rotation;

    //The amount of rotations that make a full circle (4 == 90 degree, 8 == 45 degree, etc.)
    this.rotationAmount = 4;
    this.rotationCounter = 0;
  }

  move(position: Vector3): Vector3 {
    return new Vector3(this.floor(position.x), this.height, this.floor(position.z));
  }

  rotate(): Vector3 {
    this.rotationCounter++;
    let yRotation = this.rotation.y;

    if (this.rotationCounter < this.rotationAmount) {
      yRotation += Math.PI / (this.rotationAmount / 2);
    }
    else {
      yRotation = 0;
      this.rotationCounter = 0;
    }

    this.rotation = new Vector3(this.rotation.x, yRotation, this.rotation.z);
    return this.rotation;
  }

  private floor(num: number) {
    return Math.floor(num) + 0.5;
  }
}