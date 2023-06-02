import { VAPE_Base_Typing } from "./VAPE typings/VAPE_Typing";

export class VariableContainer{
    private raw_binary: string;
    private instance:VAPE_Base_Typing;
    private size: number;
    public activated = false;

    public constructor(instance:VAPE_Base_Typing, size:number, data?:string){
        this.instance = instance;
        this.size = size;
        this.raw_binary = ''
        if(data){
            this.write(data);
        }else{
            if(size===0){
                this.write(instance.DEFAULT);
            }else{
                this.write(Array(size).fill(instance.DEFAULT));
            }
        }
    }

    public getByteSize(){
        return this.raw_binary.length/8
    }

    public get value():any{
        return this.read();
    }

    public set value(data:any){
        this.write(data);
    }

    public writeAs(binary:string){
        let bin = binary.slice(0,(this.size===0? 1 : this.size)*this.instance.BITSIZE).padStart((this.size===0? 1 : this.size)*this.instance.BITSIZE,'0');
        this.raw_binary = bin;
    }

    public readAs(typing:VAPE_Base_Typing){
        return typing.fromBinary(this.raw_binary, this.size);
    }

    public write(raw_data:any){
        let size = raw_data.length ?? 0
        let value = this.instance.toBinary(raw_data, size)
        this.raw_binary = value.slice(0,(this.size===0? 1 : this.size)*this.instance.BITSIZE).padStart((this.size===0? 1 : this.size)*this.instance.BITSIZE,'0');
    }

    public read(){
        return this.instance.fromBinary(this.raw_binary, this.size);
    }

    public getType(){
        return this.instance.TYPE;
    }

    public dumpBinary(){
        return this.raw_binary;
    }

    public hexDump(){
        return parseInt(this.raw_binary,2).toString(16);
    }
}