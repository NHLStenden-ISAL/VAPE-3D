import { useState } from "react";
import EvaluateObject from "../Objects/Arithmetic/EvaluateObject";
import { Grid, TextField, Tooltip, Typography } from "@mui/material";
import { KeyGroup } from "./InputFilter";
import InputField from "./Components/InputField";
import PositionArea from "./Components/PositionArea";

export default function EvaluateGUI({ selectedObject }: { selectedObject: EvaluateObject }) {
  const guiBox = selectedObject.getDataContainer();

  const [statement, setStatement] = useState(guiBox.statement);
  const [name, setName] = useState(guiBox.name);
  const [index, setIndex] = useState(guiBox.index);
  const position = guiBox.location;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.id === 'Evaluate') {
      selectedObject.getStorable().changeName(target.value);
    }
    else if (target.id === 'Statement') {
      selectedObject.changeStatement(target.value);
    }
    else if (target.id === 'Index') {
      const pattern = /[0-9]*/;
      if(!pattern.test(target.value)) throw new Error("Invalid character in index field");
      selectedObject.setIndex(target.value)
    }
  }

  function handleNumber(value: string): void {
    const pattern = /[0-9]*/;
    if(!pattern.test(value)) throw new Error("Invalid character in index field");
    setIndex(value)
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant='h6' p={2}> Evaluate Object</Typography>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <InputField name="Evaluate" value={name} keyGroup={KeyGroup.ALPHANUMERIC} setValue={setName} onBlur={onBlur} />
        </Grid>
        <Grid item>
          <Typography variant='body1'>Which equals</Typography>
        </Grid>
        <Grid item p={1}>
          <TextField fullWidth
            id='Statement'
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            onBlur={(e) => onBlur(e.target)}
          />
        </Grid>
        <Grid item>
        <Grid>
          <Tooltip title="leave empty when you want to reassign the entire variable"><Typography variant="body1">Index</Typography></Tooltip>
        </Grid>
        <TextField name="Index" id="Index" value={index} type="number" onChange={(e)=>handleNumber(e.target.value)} onBlur={(e)=>{onBlur(e.target)}}/>
        </Grid>
        <Grid item>
          <PositionArea position={position} />
        </Grid>
      </Grid>
    </Grid>
  )
}