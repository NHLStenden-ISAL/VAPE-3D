import { Observable } from "@babylonjs/core";
import { BuildState, EditorState } from "./StateManager";

export default class ObserverManager {
  private gameStartObservable: Observable<undefined>;
  private gamePauseObservable: Observable<undefined>;
  private gameStopObservable: Observable<undefined>;

  private buildTypeObservable: Observable<BuildState>;
  private editorStateObservable: Observable<EditorState>;

  constructor() {
    this.gameStartObservable = new Observable();
    this.gamePauseObservable = new Observable();
    this.gameStopObservable = new Observable();

    this.buildTypeObservable = new Observable();
    this.editorStateObservable = new Observable();
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
}