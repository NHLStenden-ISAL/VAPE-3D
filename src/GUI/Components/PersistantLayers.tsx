import {AddBox, ChevronLeft, ChevronRight, ExpandLess, ExpandMore, RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, styled} from "@mui/material";
import IconButtonLarge from "./IconButtonLarge";
import React, {useState} from "react";
import {SceneManager} from "../../Objects/SceneComponent";

const DrawerHeader = styled('div')(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: 1,
    justifyContent: 'flex-end',
}));

export type PersistentLayersProps = {
    anchor: "left" | "top" | "right" | "bottom",
    open: boolean,
    closeFunc: () => void
}

const iconMap: Map<string, any> = new Map<string, any>([
    ['left', <ChevronLeft />],
    ['right', <ChevronRight />],
    ['bottom', <ExpandMore />],
    ['top', <ExpandLess />],
]);

const onClick = (text: string) => {
    SceneManager.SceneSwitch(text);
    console.log('SceneSwitch -> ' + text);
    // onButtonPress(text);
    // setObject(text);
}

function addItemIcon(text: string) {
    if (text === SceneManager.activeScene) {
        return <RadioButtonChecked color="primary"/>
    } else {
        return <RadioButtonUnchecked color="inherit"/>
    }
}

export default class PersistentLayers extends React.Component<PersistentLayersProps> {
    private mounted = false;
    private layers = Array.from(SceneManager.scenes, ([name, value]) => ({name, value}));
    private listenerID = -1;

    constructor(props: PersistentLayersProps) {
        super(props);
        this.state = { layersText: []};

        const self = this;


        this.listenerID = SceneManager.addSceneListener((message : string) => {
            self.layers = Array.from(SceneManager.scenes, ([name, value]) => ({name, value}));
            if (self.mounted) {
                self.forceUpdate();
            }
        });

        // window.addEventListener('keydown', (event) => {
        //     self.layers = Array.from(SceneManager.scenes, ([name, value]) => ({name, value}));
        //     if (self.mounted) {
        //         self.forceUpdate();
        //     }
        // });
    }

    // onClick = (text: string) => {
    //     console.log('' + text);
    //     // onButtonPress(text);
    //     // setObject(text);
    // }
    //
    // addItemIcon(text: string) {
    //     return <AddBox color="primary"/>
    //     // if (text === object) {
    //     //     return <AddBox color="primary"/>
    //     // } else {
    //     //     return <AddBox color="inherit"/>
    //     // }
    // }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        SceneManager.removeConsoleListener(this.listenerID);
    }

    render() {
        return (
            <Drawer
                variant="persistent"
                anchor={this.props.anchor}
                open={this.props.open}
                PaperProps={{ sx: {width:"300px"} }}
            >
                <DrawerHeader
                    onClick={this.props.closeFunc}>
                    <b
                        className="layers-header"
                    >layers</b>
                    <IconButtonLarge
                        onClick={this.props.closeFunc}
                        icon={iconMap.get(this.props.anchor)}
                    />
                </DrawerHeader>
                <Divider />
                <div style={{height:"100%",overflow:"scroll"}}>
                    <List>
                        {
                            this.layers.map((val, index) => (
                                <ListItem button onClick={() => onClick(val.name)} key={index}>
                                    <ListItemIcon>
                                        {addItemIcon(val.name)}
                                    </ListItemIcon>
                                    <ListItemText primary={val.name} />
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
                <Divider />
            </Drawer>
        );
    }
}
