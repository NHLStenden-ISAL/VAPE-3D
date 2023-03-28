import InputField from "./Components/InputField";
import CallObject from "../Objects/CallObject";
import { Grid, Typography } from "@mui/material";
import { KeyGroup } from "./InputFilter";
import { useState } from "react";
import PositionArea from "./Components/PositionArea";

export default function CallGUI({ selectedObject }: { selectedObject: CallObject }) {
    const guiBox = selectedObject.getDataContainer();
    const [call, setCall] = useState(guiBox.call);
    const position = guiBox.location;

    const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
        if (target.value.length <= 0) { return; }

        selectedObject.getStorable().changeValue(target.value);
    }

    return (
        <Grid container spacing={1} direction='column'>
            <Grid item alignSelf='center'>
                <Typography variant="h6" p={2}>Call Object</Typography>
            </Grid>
            <Grid item >
                {
                    <InputField name="Call Layer: " value={call} keyGroup={KeyGroup.ARITHMETIC} onBlur={onBlur} setValue={setCall}/>
                }
            </Grid>
            <Grid item>
                <PositionArea position={position} />
            </Grid>
        </Grid>
    );
}
