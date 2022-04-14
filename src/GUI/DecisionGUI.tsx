import DecisionObject from "../Objects/DecisionObject";
import { Direction } from "../Compositions/Transformable";
import { FilterString, KeyGroup } from "./InputFilter";
import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PositionArea from "./Components/PositionArea";

export default function DecisionGUI({ selectedObject }: { selectedObject: DecisionObject }) {
  const guiBox = selectedObject.getGUIBox();

  const [statement, setStatement] = useState(guiBox.statement);
  const position = guiBox.location;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.value.length <= 0) { return; }

    selectedObject.getStorable().changeValue(target.value);
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Decision Object</Typography>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <Typography variant="body1">If</Typography>
        </Grid>
        <Grid item p={1}>
          <TextField fullWidth
            id="If"
            value={statement}
            onChange={(e) => setStatement(FilterString(e.target.value, KeyGroup.SYMBALPHANUMERIC))}
            onBlur={(e) => onBlur(e.target)}
          />
        </Grid>
        <Grid item >
          <Typography variant="body1">is true, turn {Direction[guiBox.direction].toLowerCase()}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>

    </Grid>
  );
}