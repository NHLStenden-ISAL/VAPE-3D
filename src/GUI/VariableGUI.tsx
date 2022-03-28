import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { VariableObject } from "../Objects/VariableObject";

export default function VariableGUI({selectedObject} : {selectedObject: VariableObject}) {
  const guiBox = selectedObject.getGUIBox();

  const [name, setName] = useState(guiBox.name);
  const [value, setValue] = useState(guiBox.value);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  // const onChange = (e: KeyboardEvent<HTMLInputElement>) => {
  //   // setValue(e.target.value);
  //   console.log(e.key);
  // }

  const onBlur = (value: string) => {

    console.log(`We're done now lol ${value}`)
  }



  return (
    <div>
      <form>
        <InputField name="Name" value={name} setValue={setName} onBlur={onBlur} />
        <br />
        <InputField name="Value" value={value} setValue={setValue} onBlur={onBlur} />
      </form>
    </div>
  );
}

type InputFieldProps = { 
  name: string, 
  value: string,
  setValue: Dispatch<SetStateAction<string>> ,
  // onChange: (e: KeyboardEvent<HTMLInputElement>) => void,
  onBlur: (value : string) => void,
}

export function InputField({ name, value, setValue, onBlur } : InputFieldProps) {
  return (
    <label htmlFor={name}>
      {name}
      <input 
        type='text' 
        id={name} 
        value={value}
        onChange={(e) => { setValue(e.target.value) } }
        onBlur={() => onBlur(value)} 
      />
    </label>
  )
}