import SeBaseObject from "./SeBaseObject";

export default class SeRobotObject extends SeBaseObject {
    public readonly type = "Robot";

    constructor(base : SeBaseObject) {
        super(base.gridPosition,base.direction,base.lightColor);
    }
}