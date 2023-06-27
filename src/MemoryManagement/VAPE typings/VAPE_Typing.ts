export abstract class VAPE_Base_Typing{
    abstract readonly DEFAULT:any;
    abstract readonly TYPE:string;
    abstract readonly BITSIZE:number;
    abstract fromBinary(binary:string, size:number):any
    abstract toBinary(input:any, size:number):string

}