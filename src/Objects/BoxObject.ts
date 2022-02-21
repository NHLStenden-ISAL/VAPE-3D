import { Mesh, Scene, Vector3 } from "@babylonjs/core";
import { Clickable } from "../Compositions/Clickable";
import { Transformable } from "../Compositions/Transformable"
import { createBox, createSphere } from "../Helpers/ObjectCreator";
import { ObjectTypes } from "../Helpers/SceneHelper";

export class BoxObject {
  private transformable: Transformable;
  private clickable: Clickable;

  private mesh: Mesh;

  constructor(scene: Scene, position: Vector3, objectList: Clickable[]) {
    //this.mesh = createBox(scene);
    this.mesh = createSphere(scene);

    
    this.transformable = new Transformable(this.mesh);
    this.clickable = new Clickable(ObjectTypes.BOX, this.mesh, this.onClick, this.onDrag, this.onRelease);
    objectList.push(this.clickable);

    this.moveBox(position);
  }

  onClick() {
    console.log("clicked something");
  }

  onDrag() {
    console.log("Drag race!!!");
  }

  onRelease() {
    console.log("time to release everyting");
  }

  getClickable(): Clickable{
    return this.clickable;
  }

  moveBox(position: Vector3) {
    this.mesh.position = this.transformable.move(position);
  }

  rotateBox() {
    this.mesh.rotation = this.transformable.rotate();
  }

}