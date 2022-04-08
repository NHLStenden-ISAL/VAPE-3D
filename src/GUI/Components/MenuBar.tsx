import MenuIcon from '@mui/icons-material/Menu';
import PersistentDrawer from "./PersistentDrawer";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { AddBox, Delete, Pause, PauseCircle, PlayArrow, PlayCircle, Stop, StopCircle, Transform } from "@mui/icons-material";
import { useState } from "react";
import { BuildTypes, buildTypesArray, EditorState, editorTypesArray } from '../../Helpers/ProgramState';
import IconButtonLarge from './IconButtonLarge';
import DropDown from './DropDown';
import ObserverContainer from '../../Helpers/ObserverContainer';

type MenuBarProps = {
  observerContainer: ObserverContainer,
}

export default function MenuBar({ observerContainer }: MenuBarProps) {
  const [open, setOpen] = useState(false);

  const items = buildTypesArray;

  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  // const gameClick = (state: GameState) => { observerContainer.executeStateGame(state); };
  const startClick = () => { observerContainer.executeStateGame('run'); };
  const pauseClick = () => { observerContainer.executeStateGame('build'); };
  const stopClick = () => { observerContainer.executeStateGame('reset'); };

  const editorClick = (state: EditorState) => { observerContainer.executeStateEditor(state); };

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

              <IconButtonLarge
                onClick={() => { editorClick('transform'); }}
                icon={<Transform />}
              />
              <IconButtonLarge
                onClick={() => { editorClick('create'); }}
                icon={<AddBox />}
              />
              <IconButtonLarge
                onClick={() => { editorClick('delete'); }}
                icon={<Delete />}
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