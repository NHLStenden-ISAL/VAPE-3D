import { Observable } from "@babylonjs/core";
import { BuildTypes, EditorState, GameState } from "./ProgramState";

//TODO: a command pattern needs to be inserted between these observers and their actions

export default class ObserverContainer {
  private stateGameObservable: Observable<GameState>;
  private stateBuildTypeObservable: Observable<BuildTypes>;
  private stateEditorObservable: Observable<EditorState>;

  private downloadProgramFunc: Function;
  private uploadProgramFunc: Function;

  constructor() {
    this.stateGameObservable = new Observable();
    this.stateBuildTypeObservable = new Observable();
    this.stateEditorObservable = new Observable();

    this.downloadProgramFunc = () => {};
    this.uploadProgramFunc = () => {};
  }

  public executeStateGame(objType: GameState) {
    this.stateGameObservable.notifyObservers(objType);
  }
  public subscribeStateGame(subscriber: (objType: GameState) => void) {
    this.stateGameObservable.add(subscriber);
  }

  public executeStateBuild(objType: BuildTypes) {
    this.stateBuildTypeObservable.notifyObservers(objType);
  }
  public subscribeStateBuild(subscriber: (objType: BuildTypes) => void) {
    this.stateBuildTypeObservable.add(subscriber);
  }

  public executeStateEditor(state: EditorState) {
    this.stateEditorObservable.notifyObservers(state);
  }
  public subscribeStateEditor(subscriber: (state: EditorState) => void) {
    this.stateEditorObservable.add(subscriber);
  }

  public setDownloadProgram(f : Function) {
    this.downloadProgramFunc = f;
  }

  public setUploadProgram(f : Function) {
    this.uploadProgramFunc = f;
  }

  public downloadProgram() : void {
    this.downloadProgramFunc();
  }

  public uploadProgram() : void {
    this.uploadProgramFunc();
  }
}