import { Observable } from "@babylonjs/core";
import { BuildTypes, EditorState } from "./ProgramState";

export default class ObserverContainer {
  private gameStartObservable: Observable<undefined>;
  private gamePauseObservable: Observable<undefined>;
  private gameStopObservable: Observable<undefined>;

  private stateBuildTypeObservable: Observable<BuildTypes>;
  private stateEditorObservable: Observable<EditorState>;

  constructor() {
    this.gameStartObservable = new Observable();
    this.gamePauseObservable = new Observable();
    this.gameStopObservable = new Observable();

    this.stateBuildTypeObservable = new Observable();
    this.stateEditorObservable = new Observable();
  }

  public subscribeGameStart(subscriber: ()=> void) {
    this.gameStartObservable.add(subscriber);
  }
  public executeGameStart() {
    this.gameStartObservable.notifyObservers(undefined);
  }

  public subscribeGamePause(subscriber: ()=> void) {
    this.gamePauseObservable.add(subscriber);
  }
  public executeGamePause() {
    this.gamePauseObservable.notifyObservers(undefined);
  }

  public executeGameStop() {
    this.gameStopObservable.notifyObservers(undefined);
  }
  public subscribeGameStop(subscriber: ()=> void) {
    this.gameStopObservable.add(subscriber);
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
}