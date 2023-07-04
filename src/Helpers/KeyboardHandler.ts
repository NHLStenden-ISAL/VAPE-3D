import AppManager from "./AppManager";
import ProgramState from "./ProgramState";
import WorldInformation from "./WorldInformation";
import {SceneManager} from "../Objects/SceneComponent";

export default class KeyboardHandler {
  private worldInfo: WorldInformation;
  private appManager: AppManager;
  private programState: ProgramState;

  constructor(worldInfo: WorldInformation, appManager: AppManager, programState: ProgramState) {
    this.worldInfo = worldInfo;
    this.appManager = appManager;
    this.programState = SceneManager.programState;
  }

  public onKeyboardInteraction() {
    this.worldInfo.getScene().onKeyboardObservable.add((kbInfo) => {
      if (SceneManager.programState.getGameState() === 'build') {
        if (kbInfo.type === 1) {
          switch (kbInfo.event.key) {
            case 'c':
            case 'C':
              this.appManager.getObserverContainer().executeStateEditor('create');
              break;
            case 't':
            case 'T':
              this.appManager.getObserverContainer().executeStateEditor('transform');
              break;
            case 'd':
            case 'D':
              this.appManager.getObserverContainer().executeStateEditor('delete');
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