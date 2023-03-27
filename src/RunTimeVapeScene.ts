import {Mesh, Scene} from "@babylonjs/core";
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
import Stack from "./Stack";
import {createGrid} from "./Helpers/ObjectCreator";

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
        this.programState = new ProgramState();
        this.canvas = this.getEngine().getRenderingCanvas();
        this.commandBroker = new CommandBroker();
        this.worldInformation = new WorldInformation(this.scene, this.commandBroker, this.setSelectedObject);
        this.sceneHelp = new SceneHelper(this.worldInformation, this.canvas);
        this.sceneHelp.createScene(true);
        // const mouseHandler = new MouseHandler(this.worldInformation, this.sceneHelper, this.programState);
        // mouseHandler.onMouseInteraction();
        // const keyboardHandler = new KeyboardHandler(this.worldInformation, SceneManager.appMan, this.programState);
        // keyboardHandler.onKeyboardInteraction();

    }

    get sceneHelper(): SceneHelper {
        return this.gridStack.peek().helper;
    }

    public pushGrid(worldInfo: WorldInformation) {
        //De binnenkomde worldInfo is een kopie van een laag
        //Maak nieuw grid aan boven de huidige -> Mesh
        const grid = createGrid(this.scene, 60, 1);
        //Zet de y-waarde van de grid correct
        grid.position.y = this.gridStack.count() * 15;

        //Voeg alle elementen uit nieuwe worldinfo toe aan nieuw grid (voeg ze toe aan de scene en zet de y waarde correct
        console.log("_----------------------------------------_");
        console.log(worldInfo);
        console.log("|||||||||||||||||||||||||||||||||||||||||");
        console.log(this.gridStack);
        console.log("_----------------------------------------_");

        this.gridStack.push({
            "grid": grid,
            "worldInfo": worldInfo,
            "helper": new SceneHelper(worldInfo, this.canvas)
        });
    }

    public popGrid() {
        //Verwijder de bovenste grid van de stack
        //Verwijder mesh
        this.gridStack.pop();
    }
}
