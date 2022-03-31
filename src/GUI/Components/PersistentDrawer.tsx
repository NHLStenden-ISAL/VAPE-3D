import { AddBox, ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";

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
  return (
    <Drawer
      variant="persistent"
      anchor={anchor}
      open={open}
    >
      <DrawerHeader>
        <IconButton 
          onClick={closeFunc}
          size="large"
          edge='start'
          color="inherit"
        >
          {anchor === 'left' && <ChevronLeft/>}
          {anchor === 'right' && <ChevronRight/>}
          {anchor === 'bottom' && <ExpandMore/>}
          {anchor === 'top' && <ExpandLess/>}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {itemArray.map((text) => (
          <ListItem button onClick={() => onButtonPress(text)} key={text}>
            <ListItemIcon>
              <AddBox/>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

    </Drawer>
  )
}