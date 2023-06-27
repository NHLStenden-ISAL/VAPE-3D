import MenuIcon from '@mui/icons-material/Menu';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import PersistentDrawer from "./PersistentDrawer";
import PersistentConsole from "./PersistentConsole"
import { AppBar, Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import {AddBox, Delete, IndeterminateCheckBox, Layers, Pause, PlayArrow, Stop, Transform, Cameraswitch } from "@mui/icons-material";
import { useState } from "react";
import { BuildTypes, buildTypesArray, EditorState, editorTypesArray } from '../../Helpers/ProgramState';
import IconButtonLarge from './IconButtonLarge';
import DropDown from './DropDown';
import ObserverContainer from '../../Helpers/ObserverContainer';
import { uploadTextFile } from '../../Helpers/DownloadHelper';
import PersistentLayer from "./PersistantLayers";
import {SceneManager} from "../../Objects/SceneComponent";

type MenuBarProps = {
  observerContainer: ObserverContainer,
}

export default function MenuBar({ observerContainer }: MenuBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [layersOpen, setLayersOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);

  const items = buildTypesArray;

  const handleDrawerOpen = () => { setDrawerOpen(true); };
  const handleDrawerClose = () => { setDrawerOpen(false); };

  const handleLayersOpen = () => { setLayersOpen(true); };
  const handleLayersClose = () => { setLayersOpen(false); };

  const handleConsoleOpen = () => { setConsoleOpen(true); }
  const handleConsoleClose = () => { setConsoleOpen(false); }

  const startClick = () => { setConsoleOpen(true); observerContainer.executeStateGame('run'); };
  const pauseClick = () => { observerContainer.executeStateGame('build'); };
  const stopClick = () => { observerContainer.executeStateGame('reset'); };

  const editorClick = (state: EditorState) => { observerContainer.executeStateEditor(state); };

  const onButtonPress = (type: string) => {
    console.log(type);
    observerContainer.executeStateBuild(type as BuildTypes);

    setDrawerOpen(false);
    setLayersOpen(false);
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignContent="center" direction='row'>
            <Grid item>
              <IconButtonLarge
                onClick={handleDrawerOpen}
                icon={<MenuIcon />}
              />
            </Grid>
            <Grid item>
              <IconButtonLarge
                onClick={handleLayersOpen}
                icon={<Layers />}
              />
              <IconButtonLarge
                  onClick={() => { SceneManager.SceneAddClean(); }}
                  icon={<AddBox />}
              />
              <IconButtonLarge
                  onClick={() => { SceneManager.SceneRemoveCurrent(); }}
                  icon={<IndeterminateCheckBox />}
              />
            </Grid>
            <Grid item>
              <IconButtonLarge
                onClick={() => { uploadTextFile((contents: string) => {
                  observerContainer.uploadProgram(contents);
                }); }}
                icon={<UploadFileIcon />}
              />
              <IconButtonLarge
                onClick={() => { observerContainer.downloadProgram(); }}
                icon={<SaveIcon />}
              />
              <IconButtonLarge
                  onClick={() => { SceneManager.ResetCamCurrentScene(); }}
                  icon={<Cameraswitch  />}
              />
            </Grid>
            <Grid item >
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
                onClick={handleConsoleOpen}
                icon={<MenuIcon />}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <PersistentDrawer anchor="left" open={drawerOpen} itemArray={items} closeFunc={handleDrawerClose} onButtonPress={onButtonPress} />
      <PersistentLayer anchor="bottom" open={layersOpen} closeFunc={handleLayersClose} />
      <PersistentConsole anchor="right" open={consoleOpen} closeFunc={handleConsoleClose} />
    </Box>
  );
}