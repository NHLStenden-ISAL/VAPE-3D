import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react";
import ObserverContainer from "../../Helpers/ObserverContainer";
import { EditorState } from "../../Helpers/ProgramState";

type DropDownProps = {
  itemArray: readonly string[],
  observerContainer: ObserverContainer,
}

export default function DropDown({ itemArray, observerContainer }: DropDownProps) {
  const [editor, setEditor] = useState(itemArray[0]);

  const onChange = (event: SelectChangeEvent) => {
    const state: string = event.target.value;
    observerContainer.executeStateEditor(state as EditorState);
  }
  
  useEffect(() => {
    observerContainer.subscribeStateEditor((state) => changeState(state));
  }, [observerContainer])

  const changeState = (state: EditorState) => {
    setEditor(state);
  }

  return (
    <Select
      value={editor}
      onChange={onChange}
      style={{color: "white"}}
    >
      {itemArray.map((text) => (
        <MenuItem key={text} value={text}>{text}</MenuItem>
      ))}

    </Select>
  )
}