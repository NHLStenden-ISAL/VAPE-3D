import { Nullable, PointerEventTypes, Scene, Vector3 } from "@babylonjs/core";
import { IObject } from "../Objects/IObject";
import { SceneHelper } from "./SceneHelper";
import { StateManager } from "./StateManager";

export class MouseHandler {
  private scene: Scene;
  private sceneHelper: SceneHelper;
  private stateManager: StateManager;

  private mouseStartpoint: Nullable<Vector3>;
  private clickedIObject: Nullable<IObject>;

  constructor(scene: Scene, sceneHelper: SceneHelper, stateManager: StateManager) {
    this.scene = scene;
    this.sceneHelper = sceneHelper;
    this.stateManager = stateManager;

    this.mouseStartpoint = null;
    this.clickedIObject = null;
  }

  public onMouseInteraction() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN:
          //Check if you've hit something clickable
          if (pointerInfo.pickInfo?.hit === true) {
            this.clickedIObject = this.sceneHelper.getIObject(pointerInfo.pickInfo.pickedMesh);
          }

          //Check which mouse button it was (0 == left mouse button, 2 == right mouse button)
          if (pointerInfo.event.button === 0) {
            this.onLeftPointerDown();
          } else if (pointerInfo.event.button === 2) {
            this.onRightPointerDown();
          }
          break;
        case PointerEventTypes.POINTERUP:
          this.onPointerUp();
          break;
        case PointerEventTypes.POINTERMOVE:
          this.onPointerMove();
          break;
        case PointerEventTypes.POINTERTAP:
          if (this.stateManager.getEditor().state === 'delete') {
            this.clickedIObject?.delete();
            console.log("remove object");
          }
          break;
      }
    });
  }

  private onLeftPointerDown() {
    this.mouseStartpoint = this.getMouseGridPosition();

    switch (this.stateManager.getEditor().state) {
      case 'move':
        this.moveOnDown();
        break;
      case 'create':
        this.createOnDown();
        break;
    }
  }

  private onRightPointerDown() {
    //TODO: add select
  }

  private moveOnDown() {
    if (this.clickedIObject === null) { return; }

    this.clickedIObject.onClickExecute();
    this.sceneHelper.disableCameraControl();
  }

  private createOnDown() {
    if (this.clickedIObject !== null) { return; }

    if (this.mouseStartpoint !== null) {
      this.sceneHelper.addObject(this.mouseStartpoint);
    }
  }

  private onPointerMove() {
    if (this.mouseStartpoint === null || this.clickedIObject === null) { return; }

    if (this.stateManager.getEditor().state === 'move') {
      let location = this.getMouseGridPosition();

      if (location !== null) {
        this.clickedIObject.onDragExecute(location);
      }
    }
  }

  private onPointerUp() {
    this.sceneHelper.enableCameraControl();
    this.clickedIObject?.onReleaseExecute();

    this.resetClick();
  }

  public getMouseGridPosition(): Nullable<Vector3> {
    let info = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

    return info?.hit ? info?.pickedPoint : null;
  }

  private resetClick() {
    this.mouseStartpoint = null;
    this.clickedIObject = null;
  }
}
