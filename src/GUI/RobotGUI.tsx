import RobotObject from "../Objects/RobotObject";
import { Grid, Typography } from "@mui/material";
import PositionArea from "./Components/PositionArea";

export default function RobotGUI({ selectedObject }: { selectedObject: RobotObject }) {
  const guiBox = selectedObject.getGUIBox();

  const position = guiBox.location;

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Robot Object</Typography>
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>
    </Grid>
  );
}