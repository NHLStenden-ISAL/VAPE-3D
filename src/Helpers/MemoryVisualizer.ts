import { DynamicTexture, Mesh, StandardMaterial } from "@babylonjs/core";
import { createHeap, createStackFrame, createVariableField } from "./ObjectCreator";
import { variableType } from "../MemoryManagement/memoryController";
import { config } from "../memoryConfig";
import { SceneManager } from "../Objects/SceneComponent";

export class MemoryVisualizer{
    private heapGrid: Mesh;
    private callStackGrids: Mesh[];
    private variableMeshes: Map<number, Mesh>;

    private static instance: MemoryVisualizer|undefined;

    private font = "22px monospace"
    private colors = {
        boolean: 'red',
        char: 'blue',
        float: 'lightgreen',
        int: 'lightblue',
        pointer: 'magenta'
    }

    private constructor(){
        this.heapGrid = createHeap(SceneManager.CurrentScene()!);
        this.callStackGrids = [];
        this.variableMeshes = new Map();
    }

    public static getInstance(){
        if(this.instance===undefined) this.instance = new MemoryVisualizer();
        return this.instance;
    }

    public static reset(){
        this.instance = undefined;
    }

    private writeToTexture(texture: DynamicTexture, msg: string, color: string){
        const fontType = "px monospace";
        const ctx = texture.getContext();
        ctx.font = '22'+fontType;
        const textWidth = ctx.measureText(msg).width;
        const ratio = textWidth / 22;
        const fontSize = Math.floor(texture.getSize().width / (ratio*1.1));
        texture.drawText(msg,null,null,fontSize+fontType,'white',color);
    }

    public renderCall(functionName: string, size:number){
        let frame = createStackFrame(size, this.callStackGrids.length, SceneManager.CurrentScene()!);
        
        this.callStackGrids.push(frame);
    }

    public renderReturn(){
        let frame = this.callStackGrids.pop();
        frame?.dispose();
    }

    public renderVariable(type: variableType, name: string, size: number, address: number){
        let variable = createVariableField(SceneManager.CurrentScene()!, size, this.callStackGrids.length-1);
        let texture = ((variable.material as StandardMaterial).diffuseTexture as DynamicTexture);
        this.writeToTexture(texture,`${type} ${name}`,this.colors[type]);
        
        let xOffset = address%config.bytesPerLine!;
        let zOffset = Math.floor(address/config.bytesPerLine!);

        let frame = this.callStackGrids.at(-1)!;
        let frameSize = frame.getBoundingInfo().boundingBox.extendSize;

        variable.position.x = (size/2)-(frameSize.x) + xOffset+frame.position.x;
        variable.position.z = (frameSize.y) - (zOffset+0.5)+frame.position.z;

        this.variableMeshes.set(address, variable);
        this.callStackGrids.at(-1)?.addChild(variable);
        
    }

    public renderAssignment(type: variableType, name: string, address: number, value: any){
        let texture = ((this.variableMeshes.get(address)!.material as StandardMaterial).diffuseTexture as DynamicTexture);
        this.writeToTexture(texture,`${type} ${name} = ${value}`,this.colors[type]);
    }

    public renderHeap(heap:string[]){
        console.log(heap);
    }
}