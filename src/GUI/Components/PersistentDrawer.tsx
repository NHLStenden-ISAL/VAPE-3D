import { AddBox, ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
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
  const iconMap: Map<string, any> = new Map<string, any>([
    ['left', <ChevronLeft />],
    ['right', <ChevronRight />],
    ['bottom', <ExpandMore />],
    ['top', <ExpandLess />],
  ]);

  return (
    <Drawer
      variant="persistent"
      anchor={anchor}
      open={open}
    >
      <DrawerHeader>
        <IconButtonLarge
          onClick={closeFunc}
          icon={iconMap.get(anchor)}
        />
      </DrawerHeader>
      <Divider />
      <List>
        {itemArray.map((text) => (
          <ListItem button onClick={() => onButtonPress(text)} key={text}>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

    </Drawer>
  )
}