import { useState } from "react";
import { VariableObject } from "../Objects/VariableObject";
import { KeyGroup } from "./InputFilter";
import DisabledInputField from "./Info/DisabledInputField";
import InputField from "./Info/InputField";

export default function VariableGUI({ selectedObject }: { selectedObject: VariableObject }) {
  const guiBox = selectedObject.getGUIBox();

  const [name, setName] = useState(guiBox.name);
  const [value, setValue] = useState(guiBox.value);
  const position = guiBox.location;
  const isKnown = guiBox.isKnown;

  const onBlur = (target: EventTarget & HTMLInputElement) => {
    if (target.value.length <= 0) { return; }
    
    if (target.id === "Name") {
      selectedObject.getStorable().changeName(target.value);
    }

    if (target.id === "Value") {
      selectedObject.getStorable().changeValue(target.value);
    }
  }

  return (
    <div>
      <h3>Variable object</h3>
      <InputField name="Name" value={name} keyGroup={KeyGroup.ALPHANUMERIC} setValue={setName} onBlur={onBlur} />
      <br />
      <InputField name="Value" value={value} keyGroup={KeyGroup.ALPHANUMERIC} setValue={setValue} onBlur={onBlur} />
      <br />
      <DisabledInputField name="X" value={position.x.toString()}/>
      <DisabledInputField name="Y" value={position.y.toString()}/>
      <br />
      <CheckBox name="IsKnown" value={isKnown}/>
    </div>
  );
}


type CheckBoxProps = {
  name: string,
  value: boolean,
}

function CheckBox({name, value}: CheckBoxProps) {
  return (
    <label htmlFor={name}>
      {name}
      <input
        type='checkbox'
        id={name}
        readOnly
        checked={value}
      />
    </label>
  )
}
