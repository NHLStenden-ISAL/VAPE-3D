export const buildTypes = ['variable', 'robot', 'direction', 'decision'] as const;
export type BuildState = typeof buildTypes[number];
export type EditorState = 'wait' | 'transform' | 'delete' | 'create';
export type GameState = 'build' | 'run' | 'reset';

export default class StateManager {
  private editorState: EditorState;
  private gameState: GameState;
  private buildState: BuildState;

  constructor() {
    this.editorState = 'transform';
    this.gameState = 'build';
    this.buildState = 'variable';
  }

  public getEditorState(): EditorState {
    return this.editorState;
  }

  public setEditorState(state: EditorState): void {
    this.editorState = state;
  }

  public getBuildState(): BuildState {
    return this.buildState;
  }

  public setBuildState(state: BuildState): void {
    this.buildState = state;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public setGameState(state: GameState) {
    this.gameState = state;
  }

  public loopGameState(): void {
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