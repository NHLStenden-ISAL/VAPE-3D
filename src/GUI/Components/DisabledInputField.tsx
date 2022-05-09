import { Grid, TextField, Typography } from "@mui/material";

type DisabledInputFieldProps = {
  name: string,
  value: string,
}

export default function DisabledInputField({ name, value }: DisabledInputFieldProps) {
  return (
    <Grid container direction='row' justifyContent="space-between" alignItems="center" pt={1}>
      <Grid item xs={4}>
        <Typography variant="body1" noWrap={true} marginBottom={0}>{name}</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id={name}
          value={value}
          disabled
          size="small"
        />
      </Grid>
    </Grid>
  );
}