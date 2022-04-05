import AppManager from "./AppManager";
import ProgramState from "./ProgramState";
import WorldInformation from "./WorldInformation";

export default class KeyboardHandler {
  private worldInfo: WorldInformation;
  private appManager: AppManager;
  private programState: ProgramState;

  constructor(worldInfo: WorldInformation, appManager: AppManager, programState: ProgramState) {
    this.worldInfo = worldInfo;
    this.appManager = appManager;
    this.programState = programState;
  }

  public onKeyboardInteraction() {
    this.worldInfo.getScene().onKeyboardObservable.add((kbInfo) => {
      if (this.programState.getGameState() === 'build') {
        if (kbInfo.type === 1) {
          switch (kbInfo.event.key) {
            case 'c':
            case 'C':
              this.appManager.getObserverContainer().executeStateEditor('create');
              console.log("Enter create state");
              break;
            case 't':
            case 'T':
              this.appManager.getObserverContainer().executeStateEditor('transform');
              console.log("Enter transform state");
              break;
            case 'd':
            case 'D':
              this.appManager.getObserverContainer().executeStateEditor('delete');
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