import { Grid, TextField, Typography } from "@mui/material";
import PositionArea from "./Components/PositionArea";
import ReturnObject from "../Objects/ReturnObject";
import { useState } from "react";

export default function ReturnGUI({ selectedObject }: { selectedObject: ReturnObject }) {
  const guiBox = selectedObject.getDataContainer();
  const [statement, setStatement] = useState(guiBox.statement);

  const position = guiBox.location;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.id === 'Statement') {
      selectedObject.setStatement(target.value);
    }
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Return Object</Typography>
      </Grid>
      <Grid item>
      <TextField fullWidth
            id='Statement'
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            onBlur={(e) => onBlur(e.target)}
          />
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>
    </Grid>
  );
}