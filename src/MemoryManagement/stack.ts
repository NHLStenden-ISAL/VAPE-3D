export class Stack<T>{
    private _stack: Array<T>;

    constructor(){
        this._stack = [];
    }

    public push(val: T){
        this._stack.push(val);
    }

    public pop(): T | undefined{
        return this._stack.pop();
    }

    public peek(): T | undefined{
        return this._stack[this._stack.length-1];
    }

    public dump(): readonly T[]{
        return this._stack;
    }

    //Iterates over stack from bottom to top
    public forEach(callback:(value:T,index?:number)=>void){
        this._stack.forEach(callback);
    }

    //Iterates over stack from top to bottom
    public downwardsForEach(callback:(value:T, index?:number)=>void){
        for(let i=this._stack.length-1;i>=0;i--){
            callback(this._stack[i],i);
        }
    }
}