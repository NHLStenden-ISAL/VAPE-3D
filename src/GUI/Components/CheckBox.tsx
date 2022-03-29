import { Checkbox, Grid, Typography } from "@mui/material"

type CheckBoxProps = {
  name: string,
  value: boolean,
}

export default function CheckBox({ name, value }: CheckBoxProps) {
  return (
    <Grid container direction='row' justifyContent="space-evenly" alignItems="center">
      <Grid item xs={3}>
        <Typography variant='body1'>{name}</Typography>
      </Grid>
      <Grid item xs={9}>
        <Checkbox
          checked={value}
          disabled
        />
      </Grid>
    </Grid>
  )
}