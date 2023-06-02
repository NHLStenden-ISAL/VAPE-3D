import { VAPE_Base_Typing } from "./VAPE_Typing";

export class VAPE_int extends VAPE_Base_Typing{
    readonly DEFAULT = 0;
    readonly TYPE = 'int';
    private static MAX_INT_SIZE = 2147483647
    private static MIN_INT_SIZE = -2147483648
    public readonly BITSIZE = 32;

    private static instance: VAPE_Base_Typing
    private constructor(){super()}
    static getInstance(){
        if(!this.instance){
            this.instance = new VAPE_int();
        }
        return this.instance
    }

    fromBinary(binary: string, size: number): number | number[] {
        if(size===0){
            return this.binToInt(binary);
        }else{
            let res = []
            for(let i=0; i<size; i++){
                res.push(this.fromBinary(binary.slice(32*i, 32*(i+1)), 0) as number)
            }
            return res
        }
    }

    private binToInt(binary: string) {
        if (binary.length !== 32){
            console.log(binary,binary.length)
            throw new Error("Invalid binary length");
        }
        let sign = (+binary[0]) ? -1 : 1;
        let num = parseInt(binary.slice(1), 2);
        return sign * num;
    }

    toBinary(input: any, size: number): string {
        if(size===0){
            // just round to be sure, because floating point numbers
            if(typeof input === 'number'){
                return this.intToBin(Math.round(input))
            }else{
                if(typeof input === "boolean"){
                    return this.toBinary(+input,0)
                }
                if(typeof input === "string"){
                    return this.toBinary(input.charCodeAt(0),0)
                }
                return this.toBinary(input,0)
            }
        }else{
            let res = ""
            for(let i=0; i<size; i++){
                res+=(this.toBinary(input[i],0))
            }
            return res;
        }
    }
    

    private intToBin(input: any) {
        if (input > VAPE_int.MAX_INT_SIZE || input < VAPE_int.MIN_INT_SIZE)
            throw new Error("Out of range");
        return (Math.floor(input) >>> 0).toString(2).padStart(32, '0').slice(-32);
    }
}