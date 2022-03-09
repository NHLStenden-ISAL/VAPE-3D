import { AppManager } from "./AppManager";
import { StateManager } from "./StateManager";
import { WorldInformation } from "./WorldInformation";

export class KeyboardHandler {
  private worldInfo: WorldInformation;
  private appManager: AppManager;
  private stateManager: StateManager;

  private isTyping: boolean;
  private isRunning: boolean;

  constructor(worldInfo: WorldInformation, appManager: AppManager, stateManager: StateManager) {
    this.worldInfo = worldInfo;
    this.appManager = appManager;
    this.stateManager = stateManager;

    this.isTyping = false;
    this.isRunning = false;
  }

  public onKeyboardInteraction() {
    this.worldInfo.getScene().onKeyboardObservable.add((kbInfo) => {
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
            case 'z':
              if (kbInfo.event.ctrlKey) {
                this.appManager.undo();
              }
              break;
            case 'y':
              if (kbInfo.event.ctrlKey) {
                this.appManager.redo();
              }
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