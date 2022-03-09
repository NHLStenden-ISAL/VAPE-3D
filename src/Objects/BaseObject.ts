import { Vector3, Vector2, AbstractMesh, Mesh, HighlightLayer, Color3 } from "@babylonjs/core";
import { v4 as uuidv4 } from 'uuid';
import { CommandMoveObject } from "../Commands/CommandMoveObject";
import { CommandRotateObject } from "../Commands/CommandRotateObject";
import { Interactable } from "../Compositions/Interactable";
import { Direction, Transformable } from "../Compositions/Transformable";
import { createBox } from "../Helpers/ObjectCreator";
import { WorldInformation } from "../Helpers/WorldInformation";

export class BaseObject {
  protected transformable: Transformable;
  protected interactable: Interactable | undefined;
  protected worldInfo: WorldInformation;

  protected mesh: Mesh;
  protected highlight: HighlightLayer;
  protected highlightColor: Color3;

  protected gridPosition: Vector2;
  protected direction: Direction;
  protected height: number | undefined;

  private startPosition: Vector2;
  private startDirection: Direction;

  private readonly objectUUID: string;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, direction: Direction, lightColor: Color3) {
    this.objectUUID = uuidv4();

    this.worldInfo = worldInfo;
    worldInfo.addSceneObject(this);
    
    this.mesh = this.createMesh();
    this.height = this.mesh.getBoundingInfo().boundingBox.extendSize.y;

    this.gridPosition = gridPos;
    this.startPosition = this.gridPosition;

    this.direction = direction;
    this.startDirection = this.direction;

    this.highlight = new HighlightLayer('highlight', worldInfo.getScene());
    this.highlightColor = lightColor;

    this.transformable = new Transformable();
    this.interactable = undefined;

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
    this.turnOffHighlight();

    if (this.startPosition.equals(this.gridPosition)) { return; }

    const command = new CommandMoveObject(this);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  public onReleaseRightExecute(): void {

  }

  public onSelect(): void {
    console.log("Selected an object");
    this.turnOnHighlight();

    //TODO: Add GUI window with options for the object, most likely per class, so not here
  }

  public onDeselect(): void {
    this.turnOffHighlight();
  }

  public getMesh(): AbstractMesh | undefined {
    return this.mesh;
  }

  public getGridPosition(): Vector2 {
    return this.gridPosition;
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public getStartPosition(): Vector2 {
    return this.startPosition;
  }

  public getStartDirection(): Direction {
    return this.startDirection;
  }

  public move(position: Vector2): void {
    this.gridPosition = this.transformable.move(position);
    this.mesh.position = this.updateMeshPosition()
  }

  public rotate(): void {
    this.startDirection = this.direction;

    this.mesh.rotation = this.transformable.rotate();
    this.direction = this.transformable.getDirection();

    if (this.startDirection === this.direction) { return; }

    const command = new CommandRotateObject(this);
    this.worldInfo.getCommandBroker().executeCommand(command);
  }

  public rotateToward(direction: Direction) {
    this.direction = direction;
    this.mesh.rotation = this.transformable.rotateToward(direction);
  }

  public delete(): void {
    this.mesh.dispose();

    this.worldInfo.removeSceneObject(this);
  }

  public restore(): void {
    this.worldInfo.addSceneObject(this);

    this.mesh = this.createMesh();

    this.move(this.gridPosition);
    this.rotateToward(this.direction);
  }

  protected createMesh(): Mesh {
    return createBox(this.worldInfo.getScene(), this.objectUUID);
  }

  public getInteractable(): Interactable | undefined {
    return this.interactable;
  }

  public getUUID(): string {
    return this.objectUUID;
  }

  protected updateMeshPosition(): Vector3 {
    return new Vector3(this.gridPosition.x, this.height, this.gridPosition.y);
  }

  private turnOnHighlight() {
    this.highlight.addMesh(this.mesh, this.highlightColor);
  }

  private turnOffHighlight() {
    this.highlight.removeMesh(this.mesh);
  }
}