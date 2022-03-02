import { Vector3, AbstractMesh, Mesh, HighlightLayer, Scene, Color3, Nullable, Vector2 } from "@babylonjs/core";
import { Interactable } from "../Compositions/Interactable";
import { Transformable } from "../Compositions/Transformable";

export class BaseObject {
  protected transformable: Transformable;
  protected interactable: Nullable<Interactable>;
  protected mesh: Mesh;
  protected highlight: HighlightLayer;

  protected objectList: BaseObject[];

  protected highlightColor: Color3;

  constructor(scene: Scene, position: Vector3, mesh: Mesh, lightColor: Color3, objectList: BaseObject[]) {
    this.highlight = new HighlightLayer('highlight', scene);
    this.highlightColor = lightColor;

    this.interactable = null;

    this.objectList = objectList;
    this.objectList.push(this);

    this.mesh = mesh;
    this.transformable = new Transformable(this.mesh);
    this.move(position);
  }

  onClickLeftExecute(): void {
    this.turnOnHighlight();
  }

  onClickRightExecute(): void {
    this.turnOnHighlight();
  }

  onDragExecute(position: Vector3): void {
    this.move(position);
  }

  onReleaseLeftExecute(): void {
    this.turnOffHighlight();
  }

  onReleaseRightExecute(): void {

  }

  onSelect(): void {
    console.log("Select an object");
    this.turnOnHighlight();

    //TODO: Add GUI window with options for the object, most likely per class, so not here
  }

  onDeselect(): void {
    this.turnOffHighlight();
  }

  getMesh(): AbstractMesh {
    return this.mesh;
  }

  getGridPosition(): Vector2 {
    return new Vector2(this.mesh.position.x, this.mesh.position.z);
  }

  move(position: Vector3): void {
    this.mesh.position = this.transformable.move(position);
  }

  rotate(): void {
    this.mesh.rotation = this.transformable.rotate();
  }

  delete(): void {
    this.mesh.dispose();

    let indexOfObject = this.objectList.findIndex((element) => this === element);
    this.objectList.splice(indexOfObject, 1);
  }

  getInteractable(): Nullable<Interactable> {
    return this.interactable;
  }

  private turnOnHighlight() {
    this.highlight.addMesh(this.mesh, this.highlightColor);
  }

  private turnOffHighlight() {
    this.highlight.removeMesh(this.mesh);
  }
}