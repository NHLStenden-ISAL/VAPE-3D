export const buildTypesArray = ['call', 'grid', 'variable', 'robot', 'direction', 'decision', 'evaluate', 'print'] as const;
export type BuildTypes = typeof buildTypesArray[number];
export const editorTypesArray = ['transform', 'create', 'delete', 'play'] as const;
export type EditorState = typeof editorTypesArray[number];
export type GameState = 'build' | 'run' | 'reset';

export default class ProgramState {
  private editorState: EditorState;
  private gameState: GameState;
  private buildState: BuildTypes;

  constructor() {
    this.editorState = 'transform';
    this.gameState = 'build';
    this.buildState = buildTypesArray[0];
  }

  public getEditorState(): EditorState {
    return this.editorState;
  }

  public setEditorState(state: EditorState): void {
    this.editorState = state;
  }

  public getBuildState(): BuildTypes {
    return this.buildState;
  }

  public setBuildState(state: BuildTypes): void {
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