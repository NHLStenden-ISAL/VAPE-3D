export default interface ICommand {
  execute(): void;
  undo(): void;
  redo(): void;
}