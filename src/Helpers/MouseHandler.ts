import { Nullable, PointerEventTypes, Scene, Vector3 } from "@babylonjs/core";
import { BaseObject } from "../Objects/BaseObject";
import { SceneHelper } from "./SceneHelper";
import { StateManager } from "./StateManager";

export class MouseHandler {
  private scene: Scene;
  private sceneHelper: SceneHelper;
  private stateManager: StateManager;

  private mouseStartpoint: Nullable<Vector3>;
  private clickedObject: Nullable<BaseObject>;
  private selectedObject: Nullable<BaseObject>;

  private isDraging: boolean;

  constructor(scene: Scene, sceneHelper: SceneHelper, stateManager: StateManager) {
    this.scene = scene;
    this.sceneHelper = sceneHelper;
    this.stateManager = stateManager;

    this.mouseStartpoint = null;
    this.clickedObject = null;
    this.selectedObject = null;
    this.isDraging = false;
  }

  public onMouseInteraction() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      if (this.stateManager.getEditorState() === 'wait') { return; }

      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERTAP:
          //Check which mouse button it was (0 == left mouse button, 2 == right mouse button)
          if (pointerInfo.event.button === 0) {
            this.onLeftPointerTap();
          } else if (pointerInfo.event.button === 2) {
            this.onRightPointerTap();
          } 
          break;
        case PointerEventTypes.POINTERDOWN:
          this.resetSelection();

          //Check if you've hit something clickable
          if (pointerInfo.pickInfo?.hit === true) {
            this.clickedObject = this.sceneHelper.getObject(pointerInfo.pickInfo.pickedMesh);
            this.mouseStartpoint = this.getMouseGridPosition();

            if (pointerInfo.event.button === 0) {
              this.onLeftPointerDown();
            }
          }
          break;
        case PointerEventTypes.POINTERUP:
          if (pointerInfo.event.button === 0) {
            this.onLeftPointerUp();
          }

          this.resetClick();
          break;
        case PointerEventTypes.POINTERMOVE:    
          if (this.isDraging) {
            this.onLeftPointerDrag();
          }
          break;
      }
    });
  }

  private onLeftPointerDown() {
    if (this.clickedObject === null) { return; }

    this.isDraging = true;

    this.clickedObject.onClickLeftExecute();
    this.sceneHelper.disableCameraControl();
  }

  private onLeftPointerUp() {

    this.isDraging = false;

    this.sceneHelper.enableCameraControl();
    this.clickedObject?.onReleaseLeftExecute();
  }

  private onLeftPointerTap() {
    switch (this.stateManager.getEditorState()) {
      case 'transform':
        this.rotateOnTap();
        break;
      case 'create':
        this.createOnTap();
        break;
      case 'delete':
        this.deleteOnTap();
        break;
    }
  }

  private onRightPointerTap() {
    if (this.clickedObject === null) { return; }
    this.selectedObject = this.clickedObject;

    //TODO: add select
    this.clickedObject.onSelect();
  }

  private createOnTap() {
    if (this.clickedObject !== null) { return; }

    if (this.mouseStartpoint !== null) {
      this.sceneHelper.addObject(this.mouseStartpoint);
    }
  }

  private deleteOnTap() {
    if (this.clickedObject === null) { return; }

    this.clickedObject.delete();
  }

  private rotateOnTap() {
    if (this.clickedObject === null) { return; }

    this.clickedObject.rotate();
  }

  private onLeftPointerDrag() {
    if (this.mouseStartpoint === null || this.clickedObject === null) { return; }

    if (this.stateManager.getEditorState() === 'transform') {
      let location = this.getMouseGridPosition();

      if (location !== null) {
        this.clickedObject.onDragExecute(location);
      }
    }
  }

  public getMouseGridPosition(): Nullable<Vector3> {
    let info = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

    return info?.hit ? info?.pickedPoint : null;
  }

  private resetClick() {
    this.mouseStartpoint = null;
    this.clickedObject = null;
  }

  private resetSelection() {
    if (this.selectedObject !== null) {
      this.selectedObject.onDeselect();
      this.selectedObject = null;
    }
  }
}
