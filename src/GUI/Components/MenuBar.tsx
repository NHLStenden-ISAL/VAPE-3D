import MenuIcon from '@mui/icons-material/Menu';
import PersistentDrawer from "./PersistentDrawer";
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Observable } from "@babylonjs/core";
import { Pause, PauseCircle, PlayArrow, PlayCircle, Stop, StopCircle } from "@mui/icons-material";
import { useState } from "react";

type MenuBarProps = {
  start: Observable<any>,
  pause: Observable<any>,
  stop: Observable<any>,
}

export default function MenuBar({ start, pause, stop }: MenuBarProps) {
  const [open, setOpen] = useState(false);

  const items = ['variable', 'robot', 'direction', 'decision']

  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  const startClick = () => { start.notifyObservers(false); };
  const pauseClick = () => { pause.notifyObservers(false); };
  const stopClick = () => { stop.notifyObservers(false); };

  const onButtonPress = (type: string) => {
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
                onClick={startClick}
              >
                <PlayArrow />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={pauseClick}
                // onClick={pauseProgram}
              >
                <Pause />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={stopClick}
                // onClick={stopProgram}
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
      <PersistentDrawer anchor="left" open={open} itemArray={items} closeFunc={handleDrawerClose} onButtonPress={onButtonPress} />
    </Box>
  );
}