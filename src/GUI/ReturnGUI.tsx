import { Grid, Typography } from "@mui/material";
import PositionArea from "./Components/PositionArea";
import ReturnObject from "../Objects/ReturnObject";

export default function ReturnGUI({ selectedObject }: { selectedObject: ReturnObject }) {
  const guiBox = selectedObject.getDataContainer();

  const position = guiBox.location;

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Return Object</Typography>
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>
    </Grid>
  );
}