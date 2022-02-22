import { Scene } from "@babylonjs/core";
import { SceneHelper } from "./SceneHelper";
import { StateManager } from "./StateManager";

export class KeyboardHandler {
  private scene: Scene;
  private sceneHelper: SceneHelper;
  private stateManager: StateManager;

  private isTyping: boolean;

  constructor(scene: Scene, sceneHelper: SceneHelper, stateManager: StateManager) {
    this.scene = scene;
    this.sceneHelper = sceneHelper;
    this.stateManager = stateManager;

    this.isTyping = false;
  }

  public onKeyboardInteraction() {
    this.scene.onKeyboardObservable.add((kbInfo) => {
      if (this.isTyping === false && kbInfo.type === 1) {
        switch (kbInfo.event.key) {
          case 'c':
          case 'C':
            this.stateManager.changeState('create');
            console.log("Enter create state");
            break;
          case 'm':
          case 'M':
            this.stateManager.changeState('move');
            console.log("Enter move state");
            break;
          case 'd':
          case 'D':
            this.stateManager.changeState('delete');
            console.log("Enter delete state");
            break;
        }
      }
    });
  }
}