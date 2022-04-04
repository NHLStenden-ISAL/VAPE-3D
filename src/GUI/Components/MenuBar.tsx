import MenuIcon from '@mui/icons-material/Menu';
import PersistentDrawer from "./PersistentDrawer";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Pause, PauseCircle, PlayArrow, PlayCircle, Stop, StopCircle } from "@mui/icons-material";
import { useState } from "react";
import { BuildTypes, buildTypesArray, editorTypesArray } from '../../Helpers/ProgramState';
import IconButtonLarge from './IconButtonLarge';
import DropDown from './DropDown';
import ObserverContainer from '../../Helpers/ObserverContainer';

type MenuBarProps = {
  observerContainer: ObserverContainer,
}

export default function MenuBar({observerContainer }: MenuBarProps) {
  const [open, setOpen] = useState(false);

  const items = buildTypesArray;

  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  const startClick = () => { observerContainer.executeGameStart(); };
  const pauseClick = () => { observerContainer.executeGamePause(); };
  const stopClick = () => { observerContainer.executeGameStop(); };

  const onButtonPress = (type: string) => {
    console.log(type);
    observerContainer.executeStateBuild(type as BuildTypes);

    setOpen(false);
  };

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
              <DropDown itemArray={editorTypesArray} observerContainer={observerContainer} />
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