import MenuIcon from '@mui/icons-material/Menu';
import PersistentDrawer from "./PersistentDrawer";
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Observable } from "@babylonjs/core";
import { Pause, PauseCircle, PlayArrow, PlayCircle, Stop, StopCircle } from "@mui/icons-material";
import { useState } from "react";
import { BuildState, buildTypes } from '../../Helpers/StateManager';

type MenuBarProps = {
  start: Observable<null>,
  pause: Observable<null>,
  stop: Observable<null>,
  select: Observable<BuildState>,
}

export default function MenuBar({ start, pause, stop, select }: MenuBarProps) {
  const [open, setOpen] = useState(false);

  const items = buildTypes;

  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  const startClick = () => { start.notifyObservers(null); };
  const pauseClick = () => { pause.notifyObservers(null); };
  const stopClick = () => { stop.notifyObservers(null); };

  const onButtonPress = (type: string) => {
    console.log(type);
    select.notifyObservers(type as BuildState);

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
              >
                <Pause />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={stopClick}
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