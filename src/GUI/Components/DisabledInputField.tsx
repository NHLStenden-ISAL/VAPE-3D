import { Grid, TextField, Typography } from "@mui/material";

type DisabledInputFieldProps = {
  name: string,
  value: string,
}

export default function DisabledInputField({ name, value }: DisabledInputFieldProps) {
  return (
    <Grid container direction='row' justifyContent="space-between" alignItems="center">
      <Grid item xs={3}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          id={name}
          value={value}
          disabled
        />
      </Grid>
    </Grid>
  );
}