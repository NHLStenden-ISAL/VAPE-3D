import MenuIcon from '@mui/icons-material/Menu';
import PersistentDrawer from "./PersistentDrawer";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Observable } from "@babylonjs/core";
import { Pause, PauseCircle, PlayArrow, PlayCircle, Stop, StopCircle } from "@mui/icons-material";
import { useState } from "react";
import { BuildState, buildTypes, EditorState, editorTypes } from '../../Helpers/StateManager';
import IconButtonLarge from './IconButtonLarge';
import DropDown from './DropDown';
import ObserverManager from '../../Helpers/ObserverManager';

type MenuBarProps = {
  observers: ObserverManager,
  start: Observable<undefined>,
  pause: Observable<undefined>,
  stop: Observable<undefined>,
  buildType: Observable<BuildState>,
  editor: Observable<EditorState>,
}

export default function MenuBar({observers, start, pause, stop, buildType, editor }: MenuBarProps) {
  const [open, setOpen] = useState(false);

  const items = buildTypes;

  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  const startClick = () => { start.notifyObservers(undefined); };
  const pauseClick = () => { pause.notifyObservers(undefined); };
  const stopClick = () => { stop.notifyObservers(undefined); };

  const onButtonPress = (type: string) => {
    console.log(type);
    buildType.notifyObservers(type as BuildState);

    setOpen(false);
  };

  const onStateSelect = (state: string) => {
    console.log(state);
    editor.notifyObservers(state as EditorState);
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignContent="center" direction='row'>
            <Grid item >
              <IconButtonLarge
                onClick={handleDrawerOpen}
                icon={<MenuIcon />}
              />
            </Grid>
            <Grid item >
              <IconButtonLarge
                onClick={startClick}
                icon={<PlayArrow />}
              />
              <IconButtonLarge
                onClick={pauseClick}
                icon={<Pause />}
              />
              <IconButtonLarge
                onClick={stopClick}
                icon={<Stop />}
              />
            </Grid>

            <Grid item>
              <DropDown itemArray={editorTypes} onSelect={onStateSelect} />
            </Grid>
            <Grid item >
              <IconButtonLarge
                onClick={undefined}
                icon={<MenuIcon />}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <PersistentDrawer anchor="left" open={open} itemArray={items} closeFunc={handleDrawerClose} onButtonPress={onButtonPress} />
    </Box>
  );
}