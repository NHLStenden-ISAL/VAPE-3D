import InputField from "./Components/InputField";
import CallObject from "../Objects/CallObject";
import {Grid, List, ListItem, ListItemText, TextField, Tooltip, Typography} from "@mui/material";
import { KeyGroup } from "./InputFilter";
import React, { useState } from "react";
import PositionArea from "./Components/PositionArea";
import {SceneManager} from "../Objects/SceneComponent";
import {RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";

export default function CallGUI({ selectedObject }: { selectedObject: CallObject }) {
    const guiBox = selectedObject.getDataContainer();
    const [call, setCall] = useState(guiBox.call);
    const [args, setArgs] = useState(guiBox.args);
    const [returnVar, setReturnVar] = useState(guiBox.returnVar);
    const position = guiBox.location;

    const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
        if (target.value.length <= 0) { return; }
        if(target.id === "Call Layer: "){
            selectedObject.getStorable().changeValue(target.value);
        }
        else if(target.id === 'arguments'){
            const pattern = /([^\s=]+\s?=\s?[^\s,=]+)/g
            if(pattern.test(target.value)){
                selectedObject.setArguments(target.value);
            }else{
                throw new Error("Invalid parameter syntax")
            }
        }
        else if(target.id === "return"){
            selectedObject.setReturnVariable(target.value);
        }
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
                <Tooltip title="Put the variable to return a value to here. Leave this field empty to make a 'void' function"><Typography>Return variable:</Typography></Tooltip>
                <TextField id="return" multiline value={returnVar} onChange={(e)=>setReturnVar(e.target.value)} onBlur={(e)=>onBlur(e.target)}/>
            </Grid>
            <Grid item>
                <Tooltip title="To give arguments to the called function you need to use the following syntax (without the quotes) 'number=4,arrayOfNumbers=[3,1,6]'. The left side is a variable in the called functions scope nd the right side is an expression that results in a value. This can be literals or a variable of the current valid scope"><Typography>Arguments:</Typography></Tooltip>
                <TextField id="arguments" multiline value={args} onChange={(e)=>setArgs(e.target.value)} onBlur={(e)=>onBlur(e.target)}/>
            </Grid>
            <Grid item>
                <PositionArea position={position} />
            </Grid>
        </Grid>
    );
}
