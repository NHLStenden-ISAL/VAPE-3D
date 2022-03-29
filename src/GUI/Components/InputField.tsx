import { Grid, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { FilterString, KeyGroup } from "../InputFilter";

type InputFieldProps = {
  name: string,
  value: string,
  keyGroup: KeyGroup,
  setValue: Dispatch<SetStateAction<string>>,
  onBlur: (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => void,
}

export default function InputField({ name, value, keyGroup, setValue, onBlur }: InputFieldProps) {
  return (
    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
      <Grid item xs={3}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          id={name}
          value={value}
          onChange={(e) => setValue(FilterString(e.target.value, keyGroup))}
          onBlur={(e) => onBlur(e.target)}
        />
      </Grid>
    </Grid>
  );
}