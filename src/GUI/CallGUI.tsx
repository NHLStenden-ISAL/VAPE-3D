import InputField from "./Components/InputField";
import CallObject from "../Objects/CallObject";
import {Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Typography} from "@mui/material";
import { KeyGroup } from "./InputFilter";
import React, { useState } from "react";
import PositionArea from "./Components/PositionArea";
import DropDown from "./Components/DropDown";
import {editorTypesArray} from "../Helpers/ProgramState";
import {SceneManager} from "../Objects/SceneComponent";
import {RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";
import BaseObject from "../Objects/BaseObject";
import VapeScene from "../VapeScene";

export default function CallGUI({ selectedObject }: { selectedObject: CallObject }) {
    const guiBox = selectedObject.getDataContainer();
    const [call, setCall] = useState(guiBox.call);
    const position = guiBox.location;

    const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
        if (target.value.length <= 0) { return; }

        selectedObject.getStorable().changeValue(target.value);
    }

    function addItemIcon(text: string) {
        if (text === call) {
            selectedObject.getStorable().changeValue(call);
            return <RadioButtonChecked color="primary"/>
        } else {
            return <RadioButtonUnchecked color="inherit"/>
        }
    }

    const onClick = (text: string) => {
        setCall(text);
    }

    const layers = Array.from(SceneManager.scenes, ([name, value]) => ({name, value}));

    return (
        <Grid container spacing={1} direction='column'>
            <Grid item alignSelf='center'>
                <Typography variant="h6" p={2}>Call Object</Typography>
            </Grid>
            <Grid item >
                <List>
                    {
                        layers.map((val, index) => (
                            <ListItem button onClick={() => onClick(val.name)} key={index}>
                                <ListItemText>
                                    {addItemIcon(val.name)}
                                </ListItemText>
                                <ListItemText primary={val.name} />
                            </ListItem>
                        ))
                    }
                </List>
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
