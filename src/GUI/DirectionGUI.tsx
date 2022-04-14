import DirectionObject from "../Objects/DirectionObject";
import { Grid, Typography } from "@mui/material";
import PositionArea from "./Components/PositionArea";

export default function DirectionGUI({ selectedObject }: { selectedObject: DirectionObject }) {
  const guiBox = selectedObject.getGUIBox();

  const position = guiBox.location;

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Direction Object</Typography>
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>
    </Grid>
  );
}