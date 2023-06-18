import RobotObject from "../Objects/RobotObject";
import { Grid, Typography } from "@mui/material";
import PositionArea from "./Components/PositionArea";
import DisabledInputField from "./Components/DisabledInputField";

export default function RobotGUI({ selectedObject }: { selectedObject: RobotObject }) {
  const guiBox = selectedObject.getDataContainer();

  const position = guiBox.location;
  const variables = selectedObject.getVariables();

  const variableIntro = (name: string, value: string) => {
    return <Grid container direction='row' justifyContent="space-between" alignItems="center">
      <Grid item xs={4}>
        <Typography key={name} variant="body1">{name}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Robot Object</Typography>
      </Grid>
      <Grid item p={2}>
        <p>Stored Variables:</p>
        {variableIntro('Name', 'Value')}
        {Array.from(variables.keys()).map((key) => {
          const value = variables.get(key) || "";
          return <DisabledInputField key={key} name={key} value={value} />
          })
        }
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>
    </Grid>
  );
}