import BaseObject from "./BaseObject";
import Interactable from "../Compositions/Interactable";
import RobotObject from "./RobotObject";
import Storable from "../Compositions/Storable";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { GuiBoxVariable } from "../GUI/Components/GuiBoxes";

export default class VariableObject extends BaseObject {
  private interactedRobots: RobotObject[];
  private storable: Storable;

  constructor(worldInfo: WorldInformation, gridPosition: Vector2, direction: Direction) {
    const objectColor = Color3.Magenta();

    super(worldInfo, gridPosition, direction, objectColor);

    this.interactable = new Interactable(this, (robotObject: RobotObject) => this.onIntersectExecute(robotObject));
    this.interactedRobots = [];

    this.storable = new Storable(this.worldInfo);
  }

  protected createMesh(): Mesh {
    return createCustomMesh(this.worldInfo.getScene(), this.getUUID(), Color3.Magenta(), "");
  }

  private onIntersectExecute(robotObject: RobotObject) {
    if (this.storable.getName() === "") { return; }

    this.storable.changeIsKnown(true);
    robotObject.addVariable(this.storable.getContainer());

    console.log(`Name: ${this.storable.getName()}, Value ${this.storable.getValue()}`);

    this.interactedRobots.push(robotObject);
  }

  public delete(): void {
    this.interactedRobots.forEach(robot => {
      robot.removeVariable(this.storable.getContainer());
    });

    super.delete();
  }

  public restore(): void {
    this.interactedRobots.forEach(robot => {
      robot.addVariable(this.storable.getContainer());
    });

    super.restore();
  }

  public getGUIBox(): GuiBoxVariable {
    return {
      location: this.getPositionForGUI(),
      direction: this.getDirection(),
      isKnown: this.storable.getIsKnown(),
      name: this.storable.getName(),
      value: this.storable.getValue()
    };
  }

  public getStorable(): Storable {
    return this.storable;
  }
}