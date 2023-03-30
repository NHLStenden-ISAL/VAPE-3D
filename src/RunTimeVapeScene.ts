import {Mesh, Scene} from "@babylonjs/core";
import WorldInformation from "./Helpers/WorldInformation";
import CommandBroker from "./Helpers/CommandBroker";
import SceneHelper from "./Helpers/SceneHelper";
import {SetSelectedObject} from "./Helpers/AppManager";
import {Engine} from "@babylonjs/core/Engines/engine";
import {Nullable} from "@babylonjs/core/types";
// import {SceneManager} from "./Objects/SceneComponent";
// import MouseHandler from "./Helpers/MouseHandler";
// import KeyboardHandler from "./Helpers/KeyboardHandler";
import ProgramState from "./Helpers/ProgramState";
import Stack from "./Stack";
import {createGrid} from "./Helpers/ObjectCreator";
import BaseObject from "./Objects/BaseObject";
import MouseHandler from "./Helpers/MouseHandler";
import {SceneManager} from "./Objects/SceneComponent";
// import BaseObject from "./Objects/BaseObject";

type GridCombo = {
    grid: Mesh,
    worldInfo: WorldInformation,
    helper: SceneHelper
};

export default class RunTimeVapeScene extends Scene {
    public scene: Scene;
    canvas: Nullable<HTMLCanvasElement>;
    sceneHelp: SceneHelper;
    commandBroker: CommandBroker;
    worldInformation: WorldInformation;
    programState: ProgramState;
    setSelectedObject: SetSelectedObject;

    gridStack: Stack<GridCombo>;

    constructor(engine: Engine, setSelectedObject: SetSelectedObject) {
        super(engine);
        this.gridStack = new Stack<GridCombo>();
        this.scene = new Scene(engine);
        this.setSelectedObject = setSelectedObject;
        this.programState = SceneManager.programState;
        this.canvas = this.getEngine().getRenderingCanvas();
        this.commandBroker = new CommandBroker();
        this.worldInformation = new WorldInformation(this.scene, this.commandBroker, this.setSelectedObject);
        this.sceneHelp = new SceneHelper(this.worldInformation, this.canvas);
        this.sceneHelp.createScene(true);
        // const mouseHandler = new MouseHandler(this.worldInformation, this.sceneHelp, SceneManager.programState);
        // mouseHandler.onMouseInteraction();
        // const keyboardHandler = new KeyboardHandler(this.worldInformation, SceneManager.appMan, SceneManager.programState);
        // keyboardHandler.onKeyboardInteraction();
    }

    get sceneHelper(): SceneHelper {
        return this.gridStack.peek().helper;
    }

    public pushGrid(worldInfo: WorldInformation) {
        const grid = createGrid(this.scene, 60, 1);
        const height = this.gridStack.count() * 15;
        grid.position.y = height;
        console.log(worldInfo);
        worldInfo.getSceneObjects().forEach((val: BaseObject, key: string) => {
            // @ts-ignore
            val.setHeight(height + val.getMesh().getBoundingInfo().boundingBox.extendSize.y);
        });

        this.gridStack.push({
            "grid": grid,
            "worldInfo": worldInfo,
            "helper": new SceneHelper(worldInfo, this.canvas)
        });
    }

    public popGrid() {
        this.gridStack.pop();
    }
}
