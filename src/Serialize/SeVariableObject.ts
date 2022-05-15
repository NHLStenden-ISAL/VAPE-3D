import SeBaseObject from "./SeBaseObject";

export default class SeVariableObject extends SeBaseObject {
    public readonly type = "Variable";
    public name;
    public value;

    constructor(base : SeBaseObject, name : string, value : string) {
        super(base.gridPosition,base.direction,base.lightColor);
        this.name = name;
        this.value = value;
    }
}