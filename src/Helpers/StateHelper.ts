export type EditorState = Wait | Move | Delete;

type Wait = {
  state: 'wait'
}

type Move = {
  state: 'move'
}

type Delete = {
  state: 'delete'
}