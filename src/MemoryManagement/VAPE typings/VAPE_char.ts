import { variableType } from "../memoryController";
import { VAPE_Base_Typing } from "./VAPE_Typing";

export class VAPE_char extends VAPE_Base_Typing{
    readonly DEFAULT= '';
    readonly TYPE:variableType = 'char';
    public readonly BITSIZE = 8;

    private static instance: VAPE_Base_Typing
    private constructor(){super()}
    static getInstance(){
        if(!this.instance){
            this.instance = new VAPE_char();
        }
        return this.instance
    }

    fromBinary(binary: string, size: number): string | string[] {
        if(size===0){
            let num = parseInt(binary,2)
            if(num===0) return ''
            let result = String.fromCharCode(num)
            return result
        }else{
            let result: string[] = []
            for(let i=0; i<size; i++){
                result.push(this.fromBinary(binary.slice(8*i,8*(i+1)),0) as string)
            }
            return result;
        }
    }

    toBinary(input: any, size: number): string {
        if(size===0){
            if(typeof input === "string"){
                return (input.charCodeAt(0)>>>0).toString(2).padStart(8,'0').slice(-8);
            }else{
                return this.toBinary(String.fromCharCode(+input),0)
            }
        }else{
            let result = ''
            for(let i=0; i<size; i++){
                result+=this.toBinary(input[i],0);
            }
            return result;
        }
    }
    
}