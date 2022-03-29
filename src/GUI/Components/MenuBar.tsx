import { AppBar, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, styled, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronLeft, Pause, PauseCircle, PlayArrow, PlayCircle, Stop, StopCircle } from "@mui/icons-material";
import { useState } from "react";
import { Box } from "@mui/system";

export default function MenuBar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  const selectObjectType = (type:string) => {
    console.log(type);
    setOpen(false);
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignContent="center" direction='row'>
            <Grid item >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
              >
                <PlayArrow />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
              >
                <Pause />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
              >
                <Stop />
              </IconButton>
            </Grid>
            <Grid item >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <PersistentDrawerLeft open={open} closeFunc={handleDrawerClose} objectSelect={selectObjectType}></PersistentDrawerLeft>
    </Box>
  );
}

const DrawerHeader = styled('div')(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  justifyContent: 'flex-end',
}));

function PersistentDrawerLeft({ open, closeFunc, objectSelect }: { open: boolean, closeFunc: () => void, objectSelect: (objType: string) => void }) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton 
          onClick={closeFunc}
          size="large"
          edge="start"
          color="inherit"
        >
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['first', 'second', 'third', 'last'].map((text) => (
          <ListItem button onClick={() => objectSelect(text)} key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}