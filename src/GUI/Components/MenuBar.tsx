import MenuIcon from '@mui/icons-material/Menu';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import PersistentDrawer from "./PersistentDrawer";
import PersistentConsole from "./PersistentConsole"
import { AppBar, Divider, Grid, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { AddBox, Delete, IndeterminateCheckBox, Layers, Pause, PlayArrow, Stop, Transform, Cameraswitch, Terminal, Start, Widgets, Settings } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { BuildTypes, buildTypesArray, EditorState, editorTypesArray } from '../../Helpers/ProgramState';
import IconButtonLarge from './IconButtonLarge';
import DropDown from './DropDown';
import ObserverContainer from '../../Helpers/ObserverContainer';
import { uploadTextFile } from '../../Helpers/DownloadHelper';
import PersistentLayer from "./PersistantLayers";
import { SceneManager } from "../../Helpers/SceneManager";

type MenuBarProps = {
  observerContainer: ObserverContainer,
}

export default function MenuBar({ observerContainer }: MenuBarProps) {
  const [editorState, setEditorState] = useState("");
  const selectedColor = "orange";
  const unselectedColor = "white";

  function editorStateToColor(state: string) {
    return editorState == state ? selectedColor : unselectedColor
  }

  function drawerOpenColor(open: boolean) {
    return open ? selectedColor : unselectedColor;
  }

  const [transformColor, setTransformColor] = useState("white");
  const [addColor, setAddColor] = useState("white");
  const [deleteColor, setDeleteColor] = useState("white");

  useEffect(() => {
    observerContainer.subscribeStateEditor((state) => setEditorState(state));
    setEditorState(editorTypesArray[0]);
  }, [observerContainer])

  const changeState = (state: EditorState) => {
    setTransformColor(state == "transform" ? selectedColor : unselectedColor);
    setAddColor(state == "create" ? selectedColor : unselectedColor);
    setDeleteColor(state == "delete" ? selectedColor : unselectedColor);
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [layersOpen, setLayersOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);

  const items = buildTypesArray;

  const handleDrawerOpen = () => { setDrawerOpen(!drawerOpen); };
  const handleDrawerClose = () => { setDrawerOpen(!drawerOpen); };

  const handleLayersOpen = () => { setLayersOpen(!layersOpen); };
  const handleLayersClose = () => { setLayersOpen(!layersOpen); };

  const handleConsoleOpen = () => { setConsoleOpen(!consoleOpen); }
  const handleConsoleClose = () => { setConsoleOpen(!consoleOpen); }

  const startClick = () => { setConsoleOpen(true); observerContainer.executeStateGame('run'); };
  const pauseClick = () => { observerContainer.executeStateGame('build'); };
  const stopClick = () => { setConsoleOpen(false); observerContainer.executeStateGame('reset'); };

  const editorClick = (state: EditorState) => { observerContainer.executeStateEditor(state); };

  const onButtonPress = (type: string) => {
    observerContainer.executeStateBuild(type as BuildTypes);

    setDrawerOpen(false);
    setLayersOpen(false);
  };

  return (
    <Box>
      <Box sx={{
        position: "absolute",
        left: "10px",
        top: "10px",
        height: "50px",
        width: "509px"
      }}>
        <AppBar position="absolute" sx={{ borderRadius: "10px" }}>
          <Toolbar>
            <Grid container justifyContent="space-between" alignContent="center" direction='row'>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={handleDrawerOpen}
                style={{ color: drawerOpenColor(drawerOpen) }}
              >
                {<Widgets />}
              </IconButton>

              <Divider orientation="vertical" flexItem />

              <IconButton
                size="large"
                // edge="start"
                color="inherit"
                onClick={handleLayersOpen}
                style={{ color: drawerOpenColor(layersOpen) }}
              >
                {<Layers />}
              </IconButton>

              <Divider orientation="vertical" flexItem />

              <IconButton
                size="large"
                // edge="start"
                color="inherit"
                onClick={() => {
                  uploadTextFile((contents: string) => {
                    observerContainer.uploadProgram(contents);
                  });
                }}
              >
                {<UploadFileIcon />}
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={() => { observerContainer.downloadProgram(); }}
              >
                {<SaveIcon />}
              </IconButton>

              <Divider orientation="vertical" flexItem />

              <IconButton
                size="large"
                // edge="start"
                onClick={() => { editorClick('transform'); }}
                style={{ color: editorStateToColor("transform") }}
              >
                {<Transform />}
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                onClick={() => { editorClick('create'); }}
                style={{ color: editorStateToColor("create") }}
              >
                {<AddBox />}
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={() => { editorClick('delete'); }}
                style={{ color: editorStateToColor("delete") }}
              >
                {<Delete />}
              </IconButton>

              <Divider orientation="vertical" flexItem />

              <IconButton
                size="large"
                // edge="start"
                color="inherit"
                onClick={startClick}
              >
                {<PlayArrow />}
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={pauseClick}
              >
                {<Pause />}
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={stopClick}
              >
                {<Stop />}
              </IconButton>

              <Divider orientation="vertical" flexItem />

              <IconButton
                size="large"
                // edge="start"
                color="inherit"
                onClick={handleConsoleOpen}
                style={{ color: drawerOpenColor(consoleOpen) }}
              >
                {<Terminal />}
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>

        <PersistentDrawer anchor="left" open={drawerOpen} itemArray={items} closeFunc={handleDrawerClose} onButtonPress={onButtonPress} />
        <PersistentLayer anchor="bottom" open={layersOpen} closeFunc={handleLayersClose} />
        <PersistentConsole anchor="right" open={consoleOpen} closeFunc={handleConsoleClose} />
      </Box>
      <Box sx={{
        position: "absolute",
        right: "10px",
        top: "10px",
        height: "50px",
        width: "100px"
      }}>
        <AppBar position="absolute" sx={{ borderRadius: "10px" }}>
          <Toolbar>
            <IconButton
              size="large"
              color="inherit"
            // onClick={handleConsoleOpen}
            // style={{ color: drawerOpenColor(consoleOpen) }}
            >
              {<Settings />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}