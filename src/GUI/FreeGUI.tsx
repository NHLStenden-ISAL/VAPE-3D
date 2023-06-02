import { Grid, TextField, Typography } from "@mui/material";
import PositionArea from "./Components/PositionArea";
import { useState } from "react";
import FreeObject from "../Objects/FreeObject";

export default function FreeGUI({ selectedObject }: { selectedObject: FreeObject }) {
  const guiBox = selectedObject.getDataContainer();
  const [pointer, setPointer] = useState(guiBox.pointer);

  const position = guiBox.location;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.id === 'pointer') {
      selectedObject.setPointer(target.value);
    }
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Free Heap Pointer</Typography>
      </Grid>
      <Grid item>
      <TextField fullWidth
            id='pointer'
            value={pointer}
            onChange={(e) => setPointer(e.target.value)}
            onBlur={(e) => onBlur(e.target)}
          />
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>
    </Grid>
  );
}