import { AddBox, ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import { useState } from "react";
import IconButtonLarge from "./IconButtonLarge";

const DrawerHeader = styled('div')(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  justifyContent: 'flex-end',
}));

type PersistentDrawerProps = {
  anchor: "left" | "top" | "right" | "bottom",
  open: boolean,
  itemArray: readonly string[],
  closeFunc: () => void,
  onButtonPress: (itemName: string) => void
}

export default function PersistentDrawer({ anchor, open, itemArray, closeFunc, onButtonPress }: PersistentDrawerProps) {
  const [object, setObject] = useState(itemArray[0]);

  const iconMap: Map<string, any> = new Map<string, any>([
    ['left', <ChevronLeft />],
    ['right', <ChevronRight />],
    ['bottom', <ExpandMore />],
    ['top', <ExpandLess />],
  ]);

  const onClick = (text: string) => {
    onButtonPress(text);
    setObject(text);
  }

  function addItemIcon(text: string) {
    if (text === object) {
      return <AddBox color="primary"/>
    } else {
      return <AddBox color="inherit"/>
    }
  }

  return (
    <Drawer
      variant="persistent"
      anchor={anchor}
      open={open}
    >
      <DrawerHeader>
      <b className="drawer-header">Toolbox</b>
        <IconButtonLarge
          onClick={closeFunc}
          icon={iconMap.get(anchor)}
        />
      </DrawerHeader>
      <Divider />
      <List>
        {itemArray.map((text) => (
          <ListItem button onClick={() => onClick(text)} key={text}>
            <ListItemIcon>
              {addItemIcon(text)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}