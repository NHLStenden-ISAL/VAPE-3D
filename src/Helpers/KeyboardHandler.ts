import { Scene } from "@babylonjs/core";
import { AppManager } from "./AppManager";
import { StateManager } from "./StateManager";

export class KeyboardHandler {
  private scene: Scene;
  private appManager: AppManager;
  private stateManager: StateManager;

  private isTyping: boolean;
  private isRunning: boolean;

  constructor(scene: Scene, appManager: AppManager, stateManager: StateManager) {
    this.scene = scene;
    this.appManager = appManager;
    this.stateManager = stateManager;

    this.isTyping = false;
    this.isRunning = false;
  }

  public onKeyboardInteraction() {
    this.scene.onKeyboardObservable.add((kbInfo) => {
      if (this.isTyping === false && this.isRunning === false) {
        if (kbInfo.type === 1) {
          switch (kbInfo.event.key) {
            case 'c':
            case 'C':
              this.stateManager.setEditorState('create');
              console.log("Enter create state");
              break;
            case 'm':
            case 'M':
              this.stateManager.setEditorState('transform');
              console.log("Enter transform state");
              break;
            case 'd':
            case 'D':
              this.stateManager.setEditorState('delete');
              console.log("Enter delete state");
              break;
          }
        }
      }

      if (kbInfo.type === 1) {
        switch (kbInfo.event.key) {
          case 'p':
          case 'P':
            if (this.stateManager.getGameState() === 'build') {
              this.appManager.startProgram();
              this.isRunning = true;
            } else {
              this.appManager.pauseProgram();
              this.isRunning = false;
            }
            break;
        }
      }
    });
  }
}