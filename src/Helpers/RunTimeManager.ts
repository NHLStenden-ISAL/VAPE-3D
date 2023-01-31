import CommandBroker from "./CommandBroker";
import KeyboardHandler from "./KeyboardHandler";
import MouseHandler from "./MouseHandler";
import SceneHelper from "./SceneHelper";
import WorldInformation, { VAPLProgram } from "./WorldInformation";
import { Scene } from "@babylonjs/core";
import { SceneManager } from "../Objects/SceneComponent";

export class RunTimeManager {
    public static runVAPE() {
        console.log('forest');
    }

    public static stopVAPE() {
        console.log("stopVAPE");
        // SceneManager.runTime = undefined;
    }
}

