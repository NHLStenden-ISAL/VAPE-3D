import { VAPE_Base_Typing } from "./VAPE typings/VAPE_Typing";
import { VAPE_bool } from "./VAPE typings/VAPE_bool";
import { VAPE_char } from "./VAPE typings/VAPE_char";
import { VAPE_float } from "./VAPE typings/VAPE_float";
import { VAPE_int } from "./VAPE typings/VAPE_int";
import { VAPE_ptr } from "./VAPE typings/VAPE_ptr";
import {loadData, evaluate} from "./mathlib";
import { Stack } from "./stack";
import { VariableContainer } from "./variableContainer";
import { Heap } from "./Heap";
import { config } from "../memoryConfig";

// acceptable typings
export const variableTypes = ["char" , "boolean" , "float" , "pointer" , "int"] as const
export type variableType = typeof variableTypes[number];

// get the instance of typing, see "VAPE typings" folder for implementations
function typeFactory(typing:variableType): VAPE_Base_Typing{
    switch(typing){
        case "boolean":
            return VAPE_bool.getInstance();
        case "char":
            return VAPE_char.getInstance();
        case "float":
            return VAPE_float.getInstance();
        case "pointer":
            return VAPE_ptr.getInstance();
        case "int":
            return VAPE_int.getInstance();
    }
}

// gets the size of a variable type
function sizeof(typing:variableType){
    const sizeLookup={
        char:1,
        boolean:1,
        float:4,
        int:4,
        pointer:4
    }
    return sizeLookup[typing];
}

// gets the size of a variable type, multiplied by amount
function getSize(typing:variableType, length:number){
    let size = sizeof(typing)

    if(length===0) return size;
    return length*size;
}

// convert typing to a number
function getTypeNumber(typing:variableType){
    const typeNumberLookup = {
        char:0,
        boolean:1,
        float:2,
        int:3,
        pointer:4
    }

    return typeNumberLookup[typing];
}

// get the typing from a number
function getTypingByNumber(number:number):variableType{
    const reverseTypeNumberLookup:{[key:number]:variableType} = {
        0:"char",
        1:"boolean",
        2:"float",
        3:"int",
        4:"pointer"
    }

    return reverseTypeNumberLookup[number];
}

export interface memoryConfig{
    maxMemory?: number,
    bytesPerLine?: number,
    debug?: boolean
}

export interface functionVariable{
    name: string,
    type: variableType,
    size: number
}

interface functionObj {
    size:number,
    variables:functionVariable[]
}

interface stackFrame{
    id: number,
    functionName: string,
    size: number,
    variables: Map<string, VariableContainer>
    returnVariable: string
}

export class MemoryController{
    private _nextId=0;
    private _heap:Heap;
    private _stack:Stack<stackFrame>;
    private _maxMemory:number;
    private _bytesPerLine:number;
    private _bytesUsed=0;
    private _functions:Map<string,functionObj>;
    private _addresses:Map<number, VariableContainer>;
    private debug:boolean;
    private _nexAddress=0;

    private static _instance: MemoryController;

    private constructor(config?: memoryConfig){
        this.debug = config?.debug || false;
        this._maxMemory = config?.maxMemory || 1024;
        this._bytesPerLine = config?.bytesPerLine || 16;
        this._functions = new Map();
        this._stack = new Stack();
        this._addresses = new Map();
        this._heap = new Heap(this._maxMemory);
        //scoping issue with 'this' keyword...
        let that = this;
        //load mathjs functions for use in expression evaluator
        loadData({
            malloc(size:number, type:variableType){
                return that.malloc(size,type);
            },
            sizeof,
            dereference(pointer:number,index?:number){
                return that.readFromPointer(pointer,index);
            },
            createPointer(varName:string, type: variableType){
                let typenum = getTypeNumber(type);
                let address = that.getAddress(that.getVariableByName(varName));
                if(address===undefined){
                    throw new Error("Invalid address");
                }
                return that.addressToPointer(address, typenum);
            }
        });
    }

    public static getInstance(){
        if(!this._instance){
            // config file is located in /src/memoryConfig.ts
            this._instance = new MemoryController(config);
        }
        return this._instance;
    }

    public static reset(){
        this._instance = new MemoryController(config);
    }

    // returns how many bytes are used
    private getUsedSize(){
        return this._bytesUsed + this._heap.getSize()
    }

    // returns a object with variables as a scope for mathjs to calculate with
    public getScope(){
        let top = this._stack.peek();
        let scope: {[key:string]:any} = {};
        top?.variables.forEach((variable,variableName)=>{
            if(variable.activated) scope[variableName] = variable.value;
        });
        return scope;
    }

    // prints the entire stack and heap
    private prettyPrint(){
        //print every layer
        this._stack.downwardsForEach(frame=>{
            console.log(`[(${frame.id})-${frame.functionName}---${frame.returnVariable}] size: ${frame.size}`);
            frame.variables.forEach((variable,varName)=>{
                console.log(`${varName.padEnd(20,'-')}--(${variable.activated?'ACTIVE':'INACTIVE'})-${variable.getType().padEnd(8,'-')}--ADDR:[${this.getAddress(variable)}]--HEX:${variable.hexDump()}--(${variable.value})`);
            });
            
        });
        console.log(`\nHEAP (size = ${this._heap.getSize()}):\n${this._heap.hexdump()}`)

        //print used bytes
        console.log(`${this.getUsedSize()} used | ${this._maxMemory} total\n---------\n`);
    }

    // adds parsed functions to the controller for future calls
    public addFunctions(functions: Map<string, functionVariable[]>){
        functions.forEach((functionVars,functionName)=>{
            let size = 0;
            let vars: functionVariable[] = [];
            functionVars.forEach(variable=>{
                size += getSize(variable.type, variable.size);
                vars.push(variable);
                
            });
            size = Math.ceil(size/this._bytesPerLine)*this._bytesPerLine;
            this._functions.set(functionName,{size,variables:vars});
        });
    }

    public activateVariable(variableName:string){
        let variable = this._stack.peek()?.variables.get(variableName)
        if(variable !== undefined) variable.activated = true;

        this.debug && console.log(`[${variableName}] succesfully activated`)
        this.debug && this.prettyPrint();
    }

    // call function by name
    public call(functionName:string, returnVariable:string, params?:{[key:string]:string}){
        //get function by name
        let func = this._functions.get(functionName);

        if (func===undefined) throw new Error("Invalid functionName")
        //get total frame size
        let size = func.size;
        if(this.getUsedSize()+size > this._maxMemory) throw new Error("Stack Overflow");
        this._bytesUsed+=size;

        //create all variables needed
        let variables:Map<string,VariableContainer> = new Map();
        func.variables.forEach(variable=>{
            //set variables from parameters {type:variable.type,value:(params && params[variable.name] && evaluate(params[variable.name],this.getScope())) ?? 0}
            let varContainer: VariableContainer
            if(params && params[variable.name]){
                varContainer = new VariableContainer(typeFactory(variable.type), variable.size, evaluate(params[variable.name],this.getScope()));
                varContainer.activated = true;
            }else{
                varContainer = new VariableContainer(typeFactory(variable.type), variable.size);    
            }
            variables.set(variable.name,varContainer);
            this._addresses.set(this._nexAddress,varContainer);
            this._nexAddress+=getSize(variable.type,variable.size);
            
        });
        this._nexAddress = size;

        //push stackframe
        this._stack.push({returnVariable,variables,id:++this._nextId,size,functionName});

        this.debug && console.log(`Succesfully called [${functionName}] with return variable '${returnVariable}' and params? {${JSON.stringify(params)}}`);
        this.debug && this.prettyPrint();
    }

    //return value from function
    public returnFunction(returnExpression:string){
        //evaluate return expression
        let returnValue = evaluate(returnExpression,this.getScope());

        //pop top
        let top = this._stack.pop();
        if(top===undefined) throw new Error("Invalid return")
        this._bytesUsed-=top.size;
        //remove all variables from address map
        this._addresses.forEach((variable,key)=>{
            //check if a variable exists in popped stackframe
            //not best code, probably needs better fix.
            if(Array.from((top as stackFrame).variables.values()).includes(variable)){
                //perhaps first store in temporary array and delete afterwards?
                this._addresses.delete(key);
                this._nexAddress-=variable.getByteSize();
            }
        });
        
        //exit early when the function is void, so not parameters given
        if(top.returnVariable==="") return;


        //assign the return variable to the return value
        (this._stack.peek()?.variables.get(top.returnVariable) as VariableContainer).value=returnValue;

        this._nextId--;

        this.debug && console.log(`Succesfully returned from [${top.functionName}] with value (${returnValue})`);
        this.debug && this.prettyPrint();
    }

    public evaluate(statement: string){
        return evaluate(statement, this.getScope());
    }

    // set variableName to value
    public assign(variableName:string, expression:string, index?:number){
        if(!(this._stack.peek()?.variables.get(variableName) as VariableContainer).activated) throw new Error(`Variabe ${variableName} has not yet been activated`);
        if(expression.includes('=')) throw new Error("Illegal character '='");
        if(!this._stack.peek()?.variables.has(variableName)) throw new Error("unknown variable");
        let val;
        // try to evaluate
        try{
            val = evaluate(expression,this.getScope());
        }catch(error){
            // catch error when a an unknown variable gets used in expression
            console.error(error);
        }

        // if index is supplied, then overwrite value on said index
        if(index!==undefined){
            let arr = (this._stack.peek()?.variables.get(variableName) as VariableContainer).value;
            arr[index] = val;
            (this._stack.peek()?.variables.get(variableName) as VariableContainer).value=arr;
        }else{
            (this._stack.peek()?.variables.get(variableName) as VariableContainer).value=val;
        }

        
        this.debug && console.log(`[${variableName}] succesfully set to ${expression} (${val})`);

        this.debug && this.prettyPrint();
    }

    // turn a pointer value into a address and type number
    private pointerToAddress(pointer:number){
        let address = pointer >>> 8;
        let type = pointer & 0xFF;
        return {address,type}
    }

    // turn address and type number into a pointer value
    private addressToPointer(address:number, type:number){
        let pointer = (address << 8) + type
        return pointer
    }

    // allocate {size} bytes on heap as {type}
    private malloc(size:number, type:variableType){
        let address = this._heap.allocate(size);
        let typenum = getTypeNumber(type);
        return this.addressToPointer(address, typenum);
    }

    // free {pointer} from heap
    public free(pointer:string){
        let pointerval = this.getVariableByName(pointer).value
        let {address} = this.pointerToAddress(pointerval);
        this._heap.free(address);

        this.debug && console.log(`Succesfully freed pointer ${pointer}`);
        this.debug && this.prettyPrint();
    }

    // write the value of {expression} to a pointer, possibly with an index
    public writeToPointer(pointer:string,expression:string,index?:number){
        let value = evaluate(expression,this.getScope());
        let pointerval = this.getVariableByName(pointer).value;
        let {address, type} = this.pointerToAddress(pointerval);
        let variableType = getTypingByNumber(type)
        let typeInstance = typeFactory(variableType)
        let size = (value).length ?? 0
        let binary = typeInstance.toBinary(value, size);
        // adjusted index is the index multiplied by the bytesizeof variable type to get the address so many bytes further
        let adjustedIndex = (index??0)*sizeof(variableType)
        let {variable,index:indexFromVariable} = this.getVariableByAddress(address+adjustedIndex,variableType);
        //if pointer points to stack variable
        if(variable!==null){
            if(indexFromVariable===0){
                variable.writeAs(binary);
            }else{
                let val = variable.readAs(typeInstance);
                val[indexFromVariable] = value[0];
                variable.writeAs(typeInstance.toBinary(val,size));
            }
            this.debug && console.log(`Succesfully wrote {${value}} to pointer [${pointer}] (ADDR: ${address+adjustedIndex})`);
        }else{
            this._heap.write(address-adjustedIndex,binary.length/8,binary);
            this.debug && console.log(`Succesfully wrote {${value}} to pointer [${pointer}] (ADDR: ${address-adjustedIndex})`);
        }

        
        this.debug && this.prettyPrint();
    }

    // read the value from a pointer value
    private readFromPointer(pointer:number, index:number=0){
        let {address, type:typenum} = this.pointerToAddress(pointer);
        let result
        let type = getTypingByNumber(typenum)
        let adjustedIndex = (index ?? 0)*sizeof(type);
        let {variable=null,index:indexFromVariable} = this.getVariableByAddress(address+adjustedIndex,type);
        let typeInstance = typeFactory(type);
        if(variable!==null){
            if(indexFromVariable===0){
                result = variable.readAs(typeInstance);
            }else{
                result = variable.readAs(typeInstance)[indexFromVariable];
            }
            
        }else{
            let binary = this._heap.read(address-adjustedIndex,sizeof(type));
            result = typeInstance.fromBinary(binary,0);
        }
        return result;
    }

    // return variableContainer associated with the variable name,
    // tries to get the top most container first because of scoping
    private getVariableByName(variableName:string):VariableContainer{
        let varContainer=null;
        this._stack.downwardsForEach((frame)=>{
            if(frame.variables.has(variableName)){
                varContainer=frame.variables.get(variableName);
                return;
            }
        });
        if(varContainer===null){
            throw new Error(`[ERROR]: variable '${variableName}' does not exist!`)
        }
        return varContainer;
    }

    // returns the address associated to a variable container
    private getAddress(variableContainer:VariableContainer): number | undefined{
        let resultAddress;
        this._addresses.forEach((varCon,addr)=>{
            if(varCon===variableContainer){
                resultAddress = addr;
                return;
            }
        });
        return resultAddress;
    }

    // tries to retrieve a variable container from the stack by address.
    // fails when address does not exist or does not neatly point to a value
    // (like the second byte of an integer)
    private getVariableByAddress(address:number, type:variableType):{variable:VariableContainer|null,index:number}{
        let varAddress:number;
        let result:VariableContainer|null=null;
        // if address is outside of stack
        if(address > this._bytesUsed) return {variable:null,index:NaN}
        this._addresses.forEach((variable,beginAddress)=>{
            if(address<beginAddress){
                return;
            }else{
                varAddress = beginAddress;
                result = variable;
            }
        });
        // if given address aligns with an increment of type
        let bytesFromAddress = (address-varAddress!)/sizeof(type)
        if(bytesFromAddress === (Math.round(bytesFromAddress))){
            return {variable:result,index:bytesFromAddress};
        }else{
            throw new Error(`[ERROR]: misalligned address (${bytesFromAddress})`)
        }
    }
}