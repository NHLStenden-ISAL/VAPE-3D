import { AbstractMesh, Nullable, PointerEventTypes, PointerInfo, Scene, Vector3 } from "@babylonjs/core";
import { Clickable } from "../Compositions/Clickable";
import { BoxObject } from "../Objects/BoxObject";
import { GridObject } from "../Objects/GridObject";
import { SceneHelper } from "./SceneHelper";
import { EditorState } from "./StateHelper";

export class MouseHandler {
  private scene: Scene;
  private sceneHelper: SceneHelper;

  private mouseStartpoint: Nullable<Vector3>;
  private clickableObject: Nullable<Clickable>;

  private editorState: EditorState;

  constructor(scene: Scene, sceneHelper: SceneHelper) {
    this.scene = scene;
    this.sceneHelper = sceneHelper;

    this.editorState = { state: 'move' };

    this.mouseStartpoint = null;
    this.clickableObject = null;
  }

  public onMouseInteraction() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN:
          this.onPointerDown(pointerInfo);
          break;
        case PointerEventTypes.POINTERUP:
          this.onPointerUp();
          break;
        case PointerEventTypes.POINTERMOVE:
          this.onPointerMove();
          break;
      }
    });
  }

  private onPointerDown(pointerInfo: PointerInfo) {
    if (pointerInfo.pickInfo?.hit == true && this.editorState.state === 'move') {
      this.mouseStartpoint = this.getMouseWorldLocation();

      this.clickableObject = this.sceneHelper.getObjectByMesh(pointerInfo.pickInfo.pickedMesh);

      if (this.clickableObject === null) { return; }

      this.clickableObject.onClickExecute();
      this.sceneHelper.disableCameraControl();
    }
  }

  private onPointerMove() {
    if (this.mouseStartpoint == null || this.clickableObject == null) { return; }

    if (this.editorState.state === 'move') {
      let location = this.getMouseWorldLocation();

      if (location !== null) {
        this.clickableObject.onDragExecute(location);
      }
    }
  }

  private onPointerUp() {
    this.sceneHelper.enableCameraControl();
    this.clickableObject?.onReleaseExecute();

    this.resetClick();
  }

  public getMouseWorldLocation(): Nullable<Vector3> {
    let info = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

    return info?.hit ? info?.pickedPoint : null;
  }

  private resetClick() {
    this.clickableObject = null;
    this.mouseStartpoint = null;
  }

  private changeState(state: EditorState["state"]) {
    switch (state) {
      case 'wait':
        this.editorState = {
          state: 'wait',
        }
        break;
      case 'move':
        this.editorState = {
          state: 'move'
        }
        break;
      case 'delete':
        this.editorState = {
          state: 'delete'
        }
        break;
      default:
        break;
    }

  }
}
