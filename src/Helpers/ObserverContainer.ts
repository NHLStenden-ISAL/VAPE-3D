import { Observable } from "@babylonjs/core";
import { BuildTypes, EditorState, GameState } from "./ProgramState";

export default class ObserverContainer {
  private stateGameObservable: Observable<GameState>;
  private stateBuildTypeObservable: Observable<BuildTypes>;
  private stateEditorObservable: Observable<EditorState>;

  constructor() {
    this.stateGameObservable = new Observable();
    this.stateBuildTypeObservable = new Observable();
    this.stateEditorObservable = new Observable();
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
}