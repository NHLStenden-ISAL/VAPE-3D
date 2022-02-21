import { AbstractMesh, Vector3 } from "@babylonjs/core";

type Callback = () => void;
type LocationCallback = (location: Vector3) => void;

export class Clickable {
  private abstractMesh: AbstractMesh;

  private onClick: Callback;
  private onDrag: LocationCallback;
  private onRelease: Callback;

  constructor(mesh: AbstractMesh, onClick: Callback, onDrag: LocationCallback, onRelease: Callback) {
    this.abstractMesh = mesh;

    this.onClick = onClick;
    this.onDrag = onDrag;
    this.onRelease = onRelease;
  }

  onClickExecute() {
    this.onClick();

  }

  onDragExecute(location: Vector3) {
    this.onDrag(location);
  }

  onReleaseExecute() {
    this.onRelease();
  }

  getMesh() {
    return this.abstractMesh;
  }
}