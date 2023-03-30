import BaseObject from "../Objects/BaseObject";
import SceneHelper from "./SceneHelper";
import ProgramState from "./ProgramState";
import WorldInformation from "./WorldInformation";
import { PointerEventTypes, Vector2 } from "@babylonjs/core";
import {SceneManager} from "../Objects/SceneComponent";

export default class MouseHandler {
  private worldInfo: WorldInformation;
  private sceneHelper: SceneHelper;
  private programState: ProgramState;

  private mouseStartpoint: Vector2 | undefined;
  private clickedObject: BaseObject | undefined;
  private selectedObject: BaseObject | undefined;

  private isDragging: boolean;

  constructor(worldInfo: WorldInformation, sceneHelper: SceneHelper, programState: ProgramState) {
    this.worldInfo = worldInfo;
    this.sceneHelper = sceneHelper;
    this.programState = programState;

    this.mouseStartpoint = undefined;
    this.clickedObject = undefined;
    this.selectedObject = undefined;
    this.isDragging = false;
  }

  public onMouseInteraction() {
    this.worldInfo.getScene().onPointerObservable.add((pointerInfo) => {
      if (SceneManager.programState.getGameState() !== 'build') { return; }

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
            this.clickedObject = this.worldInfo.getObjectByMesh(pointerInfo.pickInfo.pickedMesh);
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
          if (this.isDragging) {
            this.onLeftPointerDrag();
          }
          break;
      }
    });
  }

  private onLeftPointerDown() {
    if (!this.clickedObject) { return; }

    this.isDragging = true;

    this.clickedObject.onClickLeftExecute();
    this.sceneHelper.disableCameraControl();
  }

  private onLeftPointerUp() {
    if (!this.clickedObject) { return; }

    this.isDragging = false;

    this.sceneHelper.enableCameraControl();
    this.clickedObject.onReleaseLeftExecute();
  }

  private onLeftPointerTap() {
    switch (SceneManager.programState.getEditorState()) {
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
    if (!this.clickedObject) { return; }
    this.selectedObject = this.clickedObject;

    //TODO: add select
    this.clickedObject.onSelect();
  }

  private createOnTap() {
    if (this.clickedObject) { return; }

    if (this.mouseStartpoint) {
      this.sceneHelper.addObject(this.mouseStartpoint, SceneManager.programState.getBuildState());
    }
  }

  private deleteOnTap() {
    if (!this.clickedObject) { return; }
    this.sceneHelper.deleteObject(this.clickedObject);
  }

  private rotateOnTap() {
    if (!this.clickedObject) { return; }

    this.clickedObject.rotate();
  }

  private onLeftPointerDrag() {
    if (!this.mouseStartpoint || !this.clickedObject) { return; }

    if (SceneManager.programState.getEditorState() === 'transform') {
      let mouseLocation = this.getMouseGridPosition();

      if (mouseLocation) {
        this.clickedObject.onDragExecute(mouseLocation);
      }
    }
  }

  private getMouseGridPosition(): Vector2 | undefined {
    const info = this.worldInfo.getScene().pick(this.worldInfo.getScene().pointerX, this.worldInfo.getScene().pointerY);

    if (!info?.hit)
      return undefined;

    if (!info.pickedPoint)
      return undefined;

    return new Vector2(info.pickedPoint.x, info.pickedPoint.z);
  }

  private resetClick() {
    this.mouseStartpoint = undefined;
    this.clickedObject = undefined;
  }

  private resetSelection() {
    if (this.selectedObject) {
      this.selectedObject.onDeselect();
      this.selectedObject = undefined;
    }
  }
}
