import { variableType } from "../memoryController";
import { VAPE_Base_Typing } from "./VAPE_Typing";

export class VAPE_ptr extends VAPE_Base_Typing{
    private static instance: VAPE_Base_Typing;
    readonly DEFAULT= "0".repeat(8*9);
    readonly TYPE:variableType = 'pointer';
    public readonly BITSIZE = 32;
    private constructor(){super()}
    static getInstance(){
        if(!this.instance){
            this.instance = new VAPE_ptr();
        }
        return this.instance
    }
    fromBinary(binary: string) {
        return parseInt(binary,2);
    }
    toBinary(input: any): string {
        return (Number(input)).toString(2).padStart(32,'0').slice(-32);
    }
    
}