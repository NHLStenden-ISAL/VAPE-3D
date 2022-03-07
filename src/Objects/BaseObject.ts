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

  protected gridPosition: Vector2;
  protected direction: Direction;
  protected height: number;

  private startPosition: Vector2;
  private endPosition: Vector2;


  constructor(worldInfo: WorldInformation, mesh: Mesh, gridPos: Vector2, dir: Direction, lightColor: Color3) {
    this.worldInfo = worldInfo;
    worldInfo.addSceneObject(this);

    this.mesh = mesh;
    this.gridPosition = gridPos;
    this.direction = dir;
    this.height = mesh.getBoundingInfo().boundingBox.extendSize.y;

    this.startPosition = gridPos;
    this.endPosition = gridPos;

    this.highlight = new HighlightLayer('highlight', worldInfo.getScene());
    this.highlightColor = lightColor;

    this.transformable = new Transformable(this.mesh);
    this.interactable = null;

    this.move(this.gridPosition);
  }

  public onClickLeftExecute(): void {
    this.startPosition = this.gridPosition;
    this.turnOnHighlight();
  }

  public onClickRightExecute(): void {
    this.turnOnHighlight();
  }

  public onDragExecute(mouseLocation: Vector2): void {
    this.move(mouseLocation);
  }

  public onReleaseLeftExecute(): void {
    this.endPosition = this.gridPosition;
    this.turnOffHighlight();

    const command = new CommandMoveObject(this);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  public onReleaseRightExecute(): void {

  }

  public onSelect(): void {
    console.log("Select an object");
    this.turnOnHighlight();

    //TODO: Add GUI window with options for the object, most likely per class, so not here
  }

  public onDeselect(): void {
    this.turnOffHighlight();
  }

  public getMesh(): AbstractMesh {
    return this.mesh;
  }

  public getGridPosition(): Vector2 {
    return this.gridPosition;
  }

  public getStartPosition(): Vector2 {
    return this.startPosition;
  }

  public getEndPosition(): Vector2 {
    return this.endPosition;
  }

  public move(position: Vector2): void {
    this.gridPosition = this.transformable.move(position);
    this.mesh.position = new Vector3(this.gridPosition.x, this.height, this.gridPosition.y);
  }

  public rotate(): void {
    this.mesh.rotation = this.transformable.rotate();
    this.direction = this.transformable.getDirection();
  }

  public rotateToward(direction: Direction) {
    this.direction = direction;
    this.mesh.rotation = this.transformable.rotateToward(direction);
  }


  public delete(): void {
    this.mesh.dispose();

    const indexOfObject = this.worldInfo.getSceneObjects().findIndex((element) => this === element);
    this.worldInfo.getSceneObjects().splice(indexOfObject, 1);
  }

  public restore() : void {
    this.worldInfo.getSceneObjects().push(this);
    this.transformable = new Transformable(this.mesh);

    this.move(this.gridPosition);
    this.rotateToward(this.direction);
  }

  public getInteractable(): Nullable<Interactable> {
    return this.interactable;
  }

  private turnOnHighlight() {
    this.highlight.addMesh(this.mesh, this.highlightColor);
  }

  private turnOffHighlight() {
    this.highlight.removeMesh(this.mesh);
  }
}