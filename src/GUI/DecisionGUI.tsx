import { useState } from "react";
import { DecisionObject } from "../Objects/DecisionObject";
import { KeyGroup } from "./InputFilter";
import DisabledInputField from "./Info/DisabledInputField";
import InputField from "./Info/InputField";

export default function DecisionGUI({ selectedObject }: { selectedObject: DecisionObject }) {
  const guiBox = selectedObject.getGUIBox();

  const [statement, setStatement] = useState(guiBox.statement);
  const position = guiBox.location;

  const onBlur = (target: EventTarget & HTMLInputElement) => {
    if (target.value.length <= 0) { return; }

    selectedObject.getStorable().changeValue(target.value);
  }


  return (
    <div>
      <h3>Decision object</h3>
      <InputField name="If" value={statement} keyGroup={KeyGroup.SYMBALPHANUMERIC} setValue={setStatement} onBlur={onBlur} />
      <br />
      <DisabledInputField name="X" value={position.x.toString()}/>
      <DisabledInputField name="Y" value={position.y.toString()}/>
    </div>
  );
}