import AppManager from "./AppManager";
import StateManager from "./StateManager";
import WorldInformation from "./WorldInformation";

export default class KeyboardHandler {
  private worldInfo: WorldInformation;
  private appManager: AppManager;
  private stateManager: StateManager;

  constructor(worldInfo: WorldInformation, appManager: AppManager, stateManager: StateManager) {
    this.worldInfo = worldInfo;
    this.appManager = appManager;
    this.stateManager = stateManager;
  }

  public onKeyboardInteraction() {
    this.worldInfo.getScene().onKeyboardObservable.add((kbInfo) => {
      if (this.stateManager.getGameState() === 'build') {
        if (kbInfo.type === 1) {
          switch (kbInfo.event.key) {
            case 'c':
            case 'C':
              this.appManager.changeEditorState('create');
              console.log("Enter create state");
              break;
            case 'm':
            case 'M':
              this.appManager.changeEditorState('transform');
              console.log("Enter transform state");
              break;
            case 'd':
            case 'D':
              this.appManager.changeEditorState('delete');
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
    });
  }
}