import { Scene, Vector3, AbstractMesh, Color3 } from "@babylonjs/core";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { BaseObject } from "./BaseObject";

export class VariableObject extends BaseObject {
  constructor(scene: Scene, position: Vector3, objectList: BaseObject[]) {
    let customMesh = createCustomMesh(scene, Color3.Magenta(), "model route");
    let customHighlightColor = Color3.Magenta();

    super(scene, position, customMesh, customHighlightColor, objectList);
  }  
}