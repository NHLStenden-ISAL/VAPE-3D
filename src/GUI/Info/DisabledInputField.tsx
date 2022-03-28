type DisabledInputFieldProps = {
  name: string,
  value: string,
}

export default function DisabledInputField({name, value}: DisabledInputFieldProps) {
  return (
    <label htmlFor={name}>
      {name}
      <input
        type='text'
        id={name}
        value={value}
        disabled={true}
      />
    </label>
  );
}