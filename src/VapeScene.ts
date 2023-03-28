import {Scene} from "@babylonjs/core";
import WorldInformation from "./Helpers/WorldInformation";
import CommandBroker from "./Helpers/CommandBroker";
import SceneHelper from "./Helpers/SceneHelper";
import {SetSelectedObject} from "./Helpers/AppManager";
import {Engine} from "@babylonjs/core/Engines/engine";
import {Nullable} from "@babylonjs/core/types";
import {SceneManager} from "./Objects/SceneComponent";
import MouseHandler from "./Helpers/MouseHandler";
import KeyboardHandler from "./Helpers/KeyboardHandler";
import ProgramState from "./Helpers/ProgramState";

export default class VapeScene extends Scene {
    public scene: Scene;
    canvas: Nullable<HTMLCanvasElement>;
    sceneHelper: SceneHelper;
    commandBroker: CommandBroker;
    worldInformation: WorldInformation;
    programState: ProgramState;
    setSelectedObject: SetSelectedObject;

    constructor(engine: Engine, setSelectedObject: SetSelectedObject) {
        super(engine);
        this.scene = new Scene(engine);
        this.setSelectedObject = setSelectedObject;
        this.programState = new ProgramState();
        this.canvas = this.getEngine().getRenderingCanvas();
        this.commandBroker = new CommandBroker();
        this.worldInformation = new WorldInformation(this.scene, this.commandBroker, this.setSelectedObject);
        this.sceneHelper = new SceneHelper(this.worldInformation, this.canvas);
        this.sceneHelper.createScene(false);
        const mouseHandler = new MouseHandler(this.worldInformation, this.sceneHelper, this.programState);
        mouseHandler.onMouseInteraction();
         const keyboardHandler = new KeyboardHandler(this.worldInformation, SceneManager.appMan, this.programState);
         keyboardHandler.onKeyboardInteraction();
    }
}
