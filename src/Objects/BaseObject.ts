import { Vector3, AbstractMesh, Mesh, HighlightLayer, Color3, Nullable, Vector2 } from "@babylonjs/core";
import { CommandMoveObject } from "../Commands/CommandMoveObject";
import { Interactable } from "../Compositions/Interactable";
import { Direction, Transformable } from "../Compositions/Transformable";
import { WorldInformation } from "../Helpers/WorldInformation";

export class BaseObject {
  protected transformable: Transformable;
  protected interactable: Nullable<Interactable>;
  protected worldInfo: WorldInformation;

  protected mesh: Mesh;
  protected highlight: HighlightLayer;
  protected highlightColor: Color3;

  protected position: Vector3;
  protected direction: Direction;

  public startPosition: Vector3;
  public endPosition: Vector3;

  constructor(worldInfo: WorldInformation, mesh: Mesh, pos: Vector3, dir: Direction, lightColor: Color3) {
    this.worldInfo = worldInfo;
    worldInfo.addSceneObject(this);

    this.mesh = mesh;
    this.position = pos;
    this.direction = dir;

    this.startPosition = pos;
    this.endPosition = pos;

    this.highlight = new HighlightLayer('highlight', worldInfo.getScene());
    this.highlightColor = lightColor;

    this.transformable = new Transformable(this.mesh);
    this.interactable = null;

    this.move(this.position);
  }

  onClickLeftExecute(): void {
    this.startPosition = this.position;
    this.turnOnHighlight();
  }

  onClickRightExecute(): void {
    this.turnOnHighlight();
  }

  onDragExecute(mouseLocation: Vector3): void {
    this.move(mouseLocation);
  }

  onReleaseLeftExecute(): void {
    this.endPosition = this.position;
    this.turnOffHighlight();

    const command = new CommandMoveObject(this);
    this.worldInfo.getCommandBroker().executeCommand(command);
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

  getStartPosition(): Vector3 {
    return this.startPosition;
  }

  getEndPosition(): Vector3 {
    return this.endPosition;
  }

  move(position: Vector3): void {
    this.position = this.transformable.move(position);
    this.mesh.position = this.position;
  }

  rotate(): void {
    this.mesh.rotation = this.transformable.rotate();
    this.direction = this.transformable.getDirection();
  }

  rotateToward(direction: Direction) {
    this.direction = direction;
    this.mesh.rotation = this.transformable.rotateToward(direction);
  }


  delete(): void {
    this.mesh.dispose();

    const indexOfObject = this.worldInfo.getSceneObjects().findIndex((element) => this === element);
    this.worldInfo.getSceneObjects().splice(indexOfObject, 1);
  }

  restore() : void {
    this.worldInfo.getSceneObjects().push(this);
    this.transformable = new Transformable(this.mesh);

    this.move(this.position);
    this.rotateToward(this.direction);
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