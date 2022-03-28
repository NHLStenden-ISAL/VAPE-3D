import { Dispatch, SetStateAction } from "react";
import { FilterString, KeyGroup } from "../InputFilter";

type InputFieldProps = {
  name: string,
  value: string,
  keyGroup: KeyGroup,
  setValue: Dispatch<SetStateAction<string>>,
  onBlur: (target: EventTarget & HTMLInputElement) => void,
}

export default function InputField({ name, value, keyGroup, setValue, onBlur }: InputFieldProps) {
  return (
    <label htmlFor={name}>
      {name}
      <input
        type='text'
        id={name}
        value={value}
        onChange={(e) => { setValue(FilterString(e.target.value, keyGroup)) }}
        onBlur={(e) => onBlur(e.target)}
      />
    </label>
  );
}