import { DynamicTexture, Mesh, StandardMaterial } from "@babylonjs/core";
import { createHeap, createStackFrame, createVariableField } from "./ObjectCreator";
import { variableType } from "../MemoryManagement/memoryController";
import { config } from "../memoryConfig";
import { SceneManager } from "../Objects/SceneComponent";

export class MemoryVisualizer{
    private heapGrid: Mesh;
    private heapCells: Mesh[];
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
    private heapColors = [
        'red','blue','green','magenta','lightblue','lightgreen','orange'
    ];

    private parameters:Map<number, any>;

    private constructor(){
        this.heapGrid = createHeap(SceneManager.CurrentScene()!);
        this.callStackGrids = [];
        this.heapCells = [];
        this.variableMeshes = new Map();
        this.parameters = new Map();
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
        let fontSize = Math.floor(texture.getSize().width / (ratio*1.1));
        fontSize = Math.min(200,fontSize);
        texture.drawText(msg,null,null,fontSize+fontType,'white',color);
    }

    public renderCall(functionName: string, size:number, params:{address:number, value: any}[]){
        let frame = createStackFrame(size, this.callStackGrids.length, SceneManager.CurrentScene()!);
        params.forEach(param=>{
            this.parameters.set(param.address,param.value);
        });
        console.log(this.parameters)
        this.callStackGrids.push(frame);
    }

    public renderReturn(){
        let frame = this.callStackGrids.pop();
        frame?.dispose();
    }

    public renderVariable(type: variableType, name: string, size: number, address: number, index: number, layer: number){
        let variable = createVariableField(SceneManager.CurrentScene()!, size, this.callStackGrids.length-1);
        let texture = ((variable.material as StandardMaterial).diffuseTexture as DynamicTexture);
        
        let xOffset = index%config.bytesPerLine!;
        let zOffset = Math.floor(index/config.bytesPerLine!);

        let frame = this.callStackGrids.at(-1)!;
        let frameSize = frame.getBoundingInfo().boundingBox.extendSize;

        variable.position.x = (size/2)-(frameSize.x) + xOffset+frame.position.x;
        variable.position.z = (frameSize.y) - (zOffset+0.5)+frame.position.z;

        this.variableMeshes.set(address, variable);
        this.callStackGrids.at(-1)?.addChild(variable);

        if(this.parameters.has(address)){
            this.writeToTexture(texture,`${type} ${name} = ${this.parameters.get(address)}`,this.colors[type]);
            this.parameters.delete(address);
        }else{
            this.writeToTexture(texture,`${type} ${name}`,this.colors[type]);
        }
    }

    public renderAssignment(type: variableType, name: string, address: number, value: any){
        let texture = ((this.variableMeshes.get(address)!.material as StandardMaterial).diffuseTexture as DynamicTexture);
        this.writeToTexture(texture,`${type} ${name} = ${value}`,this.colors[type]);
    }

    private placeHeapCells(){
        this.heapCells.forEach((mesh, index)=>{
            let xOffset = index%config.bytesPerLine!;
            let zOffset = Math.floor(index/config.bytesPerLine!);

            let heapPos = this.heapGrid.position;
            let heapSize = this.heapGrid.getBoundingInfo().boundingBox.extendSize;

            mesh.position.z = heapPos.z+zOffset-heapSize.y+0.5;
            mesh.position.x = heapSize.x-xOffset-0.5;
        });
    }

    public renderHeap(heap:string[]){
        if(heap.length < this.heapCells.length){
            for(let i=heap.length; i<this.heapCells.length; i++){
                this.heapCells[i].dispose();
            }
            this.heapCells = this.heapCells.slice(0,heap.length);
        }
        if(heap.length > this.heapCells.length){
            for(let i = this.heapCells.length; i < heap.length; i++){
                let field = createVariableField(SceneManager.CurrentScene()!, 1, 0);
                field.rotation.y = Math.PI;
                this.heapCells.push(field);
            }
        }
        heap.forEach((hex,index)=>{
            let texture = (this.heapCells[index].material as StandardMaterial).diffuseTexture as DynamicTexture;
            this.writeToTexture(texture, `0x${hex}`, this.heapColors[index%7]);
        });
        this.placeHeapCells();
    }
}