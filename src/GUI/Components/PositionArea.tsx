import { Vector2 } from "@babylonjs/core";
import { Grid } from "@mui/material";
import DisabledInputField from "./DisabledInputField";

export default function PositionArea({position} : {position: Vector2}) {
  return (
    <Grid paddingTop={1.5} container direction='row' justifyContent="space-around">
      <Grid item xs={5}>
        <DisabledInputField name="X" value={position.x.toString()} />
      </Grid>
      <Grid item xs={5}>
        <DisabledInputField name="Y" value={position.y.toString()} />
      </Grid>
    </Grid>
  )
}