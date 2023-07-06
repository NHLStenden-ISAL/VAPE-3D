import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createBox } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { VariableDataContainer } from "./DataContainers";
import { MemoryController, variableType } from "../MemoryManagement/memoryController";
import { Ellipse, Line, Rectangle, TextBlock } from "@babylonjs/gui";
import { SceneManager } from "../Helpers/SceneManager";

export default class VariableObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;
  private variableType: variableType;
  private variableSize: number;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction, stored?: Storable, variableType?: variableType, variableSize?: number) {
    const objectColor = Color3.Magenta();

    super(worldInfo, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    this.variableType = variableType ?? "char";
    this.variableSize = variableSize ?? 0;
    this.storable = stored ?? new Storable(this.worldInfo);
  }

  public copy(worldInfo: WorldInformation): VariableObject {
    return new VariableObject(worldInfo, this.gridPosition, this.direction, this.storable, this.variableType, this.variableSize);
  }

  protected createMesh(): Mesh {
    const box = createBox(this.worldInfo.getScene(), this.getUUID(), Color3.Magenta(), 0.8);

    // var rect1 = new Rectangle();
    // rect1.width = 0.05;
    // rect1.height = "30px";
    // rect1.cornerRadius = 20;
    // rect1.color = "white";
    // rect1.thickness = 2;
    // rect1.background = "magenta";
    // SceneManager.overlayUI.addControl(rect1);
    // rect1.linkWithMesh(box);   
    // rect1.linkOffsetY = -100;

    // var label = new TextBlock();
    //// label.text = this.variableType + (this.variableSize == 0 ? " " : "["+this.variableSize+"] ") + this.storable.getName();
    // label.text = "int i";
    // rect1.addControl(label);

    // var target = new Ellipse();
    // target.width = "10px";
    // target.height = "10px";
    // target.color = "red";
    // target.thickness = 4;
    // target.background = "red";
    // SceneManager.overlayUI.addControl(target);
    // target.linkWithMesh(box);   

    // var line = new Line();
    // line.lineWidth = 2;
    // line.color = "magenta";
    // line.y2 = 15;
    // line.linkOffsetY = -5;
    // SceneManager.overlayUI.addControl(line);
    // line.linkWithMesh(box); 
    // line.connectedControl = rect1;

    return box;
  }

  private onIntersectExecute(robotObject: RobotObject) {
    const memoryController = MemoryController.getInstance();
    if (this.storable.getName() === "") { return; }
    memoryController.activateVariable(this.storable.getName());

    this.interactedRobots.push(robotObject);
  }

  public getVariableType(){
    return this.variableType;
  }

  public setVariableType(type: variableType){
    this.variableType = type;
  }

  public getVariableSize(){
    return this.variableSize;
  }

  public setVariableSize(size: number){
    this.variableSize = size;
  }

  public getDataContainer(): VariableDataContainer {
    return new VariableDataContainer(
      this.getPositionForGUI(),
      this.getDirection(),
      this.storable.getName(),
      this.storable.getValue(),
      this.variableType,
      this.variableSize
    );
  }

  public getStorable(): Storable {
    return this.storable;
  }
}