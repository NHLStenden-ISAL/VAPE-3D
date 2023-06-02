import { VAPE_Base_Typing } from "./VAPE_Typing";

export class VAPE_float extends VAPE_Base_Typing{
    readonly DEFAULT= 0.0;
    readonly TYPE = 'float';
    public readonly BITSIZE = 32;

    private static instance: VAPE_Base_Typing
    private constructor(){super()}
    static getInstance(){
        if(!this.instance){
            this.instance = new VAPE_float();
        }
        return this.instance
    }

    fromBinary(binary: string, size: number): number | number[] {
        if(size===0){
            return this.binToFloat(binary);
        }else{
            let res = []
            for(let i=0; i<size; i++){
                res.push(this.fromBinary(binary.slice(32*i, 32*(i+1)), 0) as number)
            }
            return res
        }
        
    }

    private binToFloat(binary: string) {
        let val = 0.0;
        let sign = parseInt(binary.slice(0, 1), 2) ? -1 : 1;
        let exponent = parseInt(binary.slice(1, 9), 2);
        let mantissa = parseInt(binary.slice(9, 32), 2);

        switch (exponent) {
            case 0:
                break;
            case 0xFF:
                if (mantissa)
                    val = NaN;
                else if (sign > 0)
                    val = Number.POSITIVE_INFINITY;
                else
                    val = Number.NEGATIVE_INFINITY;
                break;
            default:
                val = sign * ((mantissa / 8388608.0) + 1) * Math.pow(2, exponent - 127);
        }
        return val;
    }

    toBinary(input: any, size: number): string {
        if(size===0){
            // every number in JS is technically a float
            if(typeof input === 'number'){
                return this.floatToBin(input)
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

    private floatToBin(input: any) {
        const ArrBuffer = new ArrayBuffer(4);
        const dataView = new DataView(ArrBuffer);
        dataView.setFloat32(0, input, false);
        let res = "";
        for (let i = 0; i < 4; i++) {
            let bits = dataView.getUint8(i).toString(2);
            if (bits.length < 8) {
                bits = new Array(8 - bits.length).fill('0').join('') + bits;
            }
            res += bits;
        }

        return res;
    }
}