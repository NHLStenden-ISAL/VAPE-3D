import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react";

type DropDownProps = {
  itemArray: readonly string[],
  onSelect: (itemName: string) => void
}

export default function DropDown({itemArray, onSelect }: DropDownProps) {
  const [editor, setEditor] = useState(itemArray[0]);

  const onChange = (event: SelectChangeEvent) => {
    const state: string = event.target.value;
    setEditor(state);
    onSelect(state);
  }

  const changeValueText = (state: string) => {
    setEditor(state);
    onSelect(state);
  }

  return (
    <Select
      value={editor}
      onChange={onChange}
    >
      {itemArray.map((text) => (
        <MenuItem key={text} value={text}>{text}</MenuItem>
      ))}

    </Select>
  )
}