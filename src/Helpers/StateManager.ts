export type EditorState = 'wait' | 'transform' | 'delete' | 'create';
export type GameState = 'build' | 'run' | 'reset';

export class StateManager {
  private editorState: EditorState;
  private gameState: GameState;

  constructor() {
    this.editorState = 'transform';
    this.gameState = 'build';
  }

  public getEditorState(): EditorState {
    return this.editorState;
  }

  public setEditorState(state: EditorState) {
    this.editorState = state;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public setGameState(state: GameState) {
    this.gameState = state;
  }

  public loopGameState() {
    switch (this.gameState) {
      case 'build':
        this.gameState = 'run';
        break;
      default:
        this.gameState = 'build';
        break;
    }
  }


}