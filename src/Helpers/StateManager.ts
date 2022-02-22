export type EditorState = Wait | Move | Delete | Create;

type Wait = {
  state: 'wait'
}

type Move = {
  state: 'move'
}

type Delete = {
  state: 'delete'
}

type Create = {
  state: 'create'
}

export class StateManager {
  private editorState: EditorState;

  constructor() {
    this.editorState = { state: 'move' };
  }

  public getEditor(): EditorState {
    return this.editorState;
  }

  public changeState(state: EditorState["state"]) {
    switch (state) {
      case 'wait':
        this.editorState = {
          state: 'wait',
        }
        break;
      case 'move':
        this.editorState = {
          state: 'move'
        }
        break;
      case 'delete':
        this.editorState = {
          state: 'delete'
        }
        break;
      case 'create':
        this.editorState = {
          state: 'create'
        }
        break;
      default:
        break;
    }
  }
}