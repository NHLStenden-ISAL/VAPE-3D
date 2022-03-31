import DisabledInputField from "./Components/DisabledInputField";
import DirectionObject from "../Objects/DirectionObject";
import { Grid, Typography } from "@mui/material";

export default function DirectionGUI({ selectedObject }: { selectedObject: DirectionObject }) {
  const guiBox = selectedObject.getGUIBox();

  const position = guiBox.location;

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Direction Object</Typography>
      </Grid>
      <Grid item container direction='row' justifyContent="space-around">
        <Grid item xs={5}>
          <DisabledInputField name="X" value={position.x.toString()} />
        </Grid>
        <Grid item xs={5}>
          <DisabledInputField name="Y" value={position.y.toString()} />
        </Grid>
      </Grid>
    </Grid>
  );
}