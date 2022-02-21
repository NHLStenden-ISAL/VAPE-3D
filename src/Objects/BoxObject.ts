import { Color3, HighlightLayer, Mesh, Nullable, Scene, Vector3 } from "@babylonjs/core";
import { Clickable } from "../Compositions/Clickable";
import { Transformable } from "../Compositions/Transformable"
import { createBox } from "../Helpers/ObjectCreator";

export class BoxObject {
  private transformable: Transformable;
  private clickable: Clickable;

  private mesh: Mesh;
  private highlight: HighlightLayer;

  constructor(scene: Scene, position: Vector3, objectList: Clickable[]) {
    this.mesh = createBox(scene);
    this.highlight = new HighlightLayer('highlight', scene);

    this.transformable = new Transformable(this.mesh);
    this.clickable = new Clickable(this.mesh, () => { this.onClick() }, (location: Vector3) => { this.onDrag(location) }, () => { this.onRelease() });

    objectList.push(this.clickable);
    this.move(position);
  }

  //Clickable
  onClick() {
    this.highlight.addMesh(this.mesh, Color3.Purple());
  }

  onDrag(location: Vector3) {
    this.move(location);
  }

  onRelease() {
    this.highlight.removeMesh(this.mesh);
  }

  getClickable(): Clickable {
    return this.clickable;
  }

  //Transformable
  move(position: Nullable<Vector3>) {
    if (position !== null) {
      this.mesh.position = this.transformable.move(position);
    }
  }

  rotate() {
    this.mesh.rotation = this.transformable.rotate();
  }
}