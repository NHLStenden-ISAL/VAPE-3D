import InputField from "./Components/InputField";
import VariableObject from "../Objects/VariableObject";
import { Grid, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import { KeyGroup } from "./InputFilter";
import { useState } from "react";
import PositionArea from "./Components/PositionArea";
import { variableType, variableTypes } from "../MemoryManagement/memoryController";

export default function VariableGUI({ selectedObject }: { selectedObject: VariableObject }) {
  const guiBox = selectedObject.getDataContainer();

  const [name, setName] = useState(guiBox.name);
  const [size, setSize] = useState(guiBox.variableSize);
  const [variableType, setVariableType] = useState(guiBox.variableType);
  const position = guiBox.location;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.value.length <= 0) { return; }

    if (target.id === "Name") {
      selectedObject.getStorable().changeName(target.value);
    }
    else if (target.id === "Size") {
      let sizeValue = parseInt(target.value);
      console.log(sizeValue);
      selectedObject.setVariableSize(sizeValue);
    }
  }

  const onSelect = (event: SelectChangeEvent) => {
    setVariableType(event.target.value as variableType);
    (selectedObject as VariableObject).setVariableType(event.target.value as variableType);
  }

  const handleNumber=(value:string)=>{
    let number = parseInt(value);
    if (number < 0) number = 0;
    setSize(number);
  }

  return (
    <Grid container spacing={1} direction="column">
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Variable Object</Typography>
      </Grid>
      <Grid item >
        <InputField name="Name" value={name} keyGroup={KeyGroup.ALPHANUMERIC} setValue={setName} onBlur={onBlur} />
      </Grid>
      <Grid item >
        <Grid>
          <Typography variant="body1">Variable type</Typography>
          <Select onChange={onSelect} value={variableType}>
            {
              variableTypes.map((value)=>(
                <MenuItem value={value} key={value}>{value}</MenuItem>
              ))
            }
          </Select>
        </Grid>
      </Grid>
      <Grid item>
        <Grid>
          <Tooltip title="When variable size is '0', it acts like a normal variable. When the size is 1 or greater, it means it's an array of so many elements"><Typography variant="body1">Variable size</Typography></Tooltip>
        </Grid>
        <TextField name="Size" id="Size" value={size} type="number" onChange={(e)=>handleNumber(e.target.value)} onBlur={(e)=>{onBlur(e.target)}}/>
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>
    </Grid>
  );
}
