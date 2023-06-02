import { VAPE_Base_Typing } from "./VAPE_Typing";

export class VAPE_bool extends VAPE_Base_Typing{
    readonly DEFAULT= false;
    readonly TYPE = 'bool';
    public readonly BITSIZE = 8;

    private static instance: VAPE_Base_Typing
    private constructor(){super()}
    static getInstance(){
        if(!this.instance){
            this.instance = new VAPE_bool();
        }
        return this.instance
    }

    fromBinary(binary: string, size:number): boolean | boolean[] {
        if(size===0){
            return !!parseInt(binary,2)
        }else{
            let res: boolean[] = []
            for(let i=0; i< size; i++){
                res.push(this.fromBinary(binary.slice(8*i,8*(i+1)),2) as boolean)
            }
            return res
        }
    }
    toBinary(input: any, size:number): string {
        if(size===0){
            if(typeof input === 'boolean'){
                //convert boolean naar 1/0 door unary + operator
                return "0000000"+(+input);
            }else{
                return this.toBinary(!!input, 0);
            }
        }else{
            let res = ""
            for(let i=0; i<size; i++){
                res+= this.toBinary(input[i],0);
            }
            return res;
        }
    }
    
}