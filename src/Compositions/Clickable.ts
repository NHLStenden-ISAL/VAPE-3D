import { AbstractMesh, Mesh, Nullable } from "@babylonjs/core";
import { ObjectTypes } from "../Helpers/SceneHelper";

type Callback = () => void;

export class Clickable {

  private objectType: ObjectTypes;
  private abstractMesh: AbstractMesh;

  private onClick: Callback;
  private onDrag: Callback;
  private onRelease: Callback;

  constructor(objType: ObjectTypes, mesh: AbstractMesh, onClick: Callback, onDrag: Callback, onRelease: Callback) {
    this.objectType = objType;
    this.abstractMesh = mesh;

    this.onClick = onClick;
    this.onDrag = onDrag;
    this.onRelease = onRelease;
  }

  getObjectType(): ObjectTypes {
    return this.objectType;
  }

  onClickExecute() {
    this.onClick();
  }

  onDragExecute() {
    this.onDrag();
  }

  onReleaseExecute() {
    this.onRelease();
  }

  getMesh() {
    return this.abstractMesh;
  }
}