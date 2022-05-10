import { AddBox, ChevronLeft, ChevronRight, ExpandLess, ExpandMore, Padding } from "@mui/icons-material";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, styled, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import IconButtonLarge from "./IconButtonLarge";
import { addConsoleListener, removeConsoleListener } from "./../../Helpers/Logger"
import React from "react";

const DrawerHeader = styled('div')(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  justifyContent: 'flex-end',
}));

export type PersistentConsoleProps = {
  anchor: "left" | "top" | "right" | "bottom",
  open: boolean,
  closeFunc: () => void
}

export type PersistentConsoleState = {
  consoleText: Array<string>
}

const iconMap: Map<string, any> = new Map<string, any>([
  ['left', <ChevronLeft />],
  ['right', <ChevronRight />],
  ['bottom', <ExpandMore />],
  ['top', <ExpandLess />],
]);

export default class PersistentConsole extends React.Component<PersistentConsoleProps, PersistentConsoleState> {

  private listenerID = -1;
  private mounted = false;

  constructor(props: PersistentConsoleProps) {
    super(props);
    this.state = { consoleText: []};
    
    const self = this;
    this.listenerID = addConsoleListener((message : string) => {
      self.state.consoleText.push(message);
      if (self.mounted) {
        self.forceUpdate();
      }
    });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    removeConsoleListener(this.listenerID);
  }
  
  render() {
      return (
      <Drawer
        variant="persistent"
        anchor={this.props.anchor}
        open={this.props.open}
        PaperProps={{ sx: {width:"400px"} }}
      >
        <DrawerHeader>
          <IconButtonLarge
            onClick={this.props.closeFunc}
            icon={iconMap.get(this.props.anchor)}
          />
          <b className="console-header">Console</b>
        </DrawerHeader>
        <Divider />
        <div style={{height:"100%",overflow:"scroll"}}>
        {this.state.consoleText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        </div>
        <Divider />
      </Drawer>
    );
  }
}