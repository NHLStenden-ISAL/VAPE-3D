import { Direction } from "../Compositions/Transformable";

export default class SeBaseObject {
    public gridPosition: {x:number,y:number};
    public direction: Direction;
    public lightColor: { r:number, g:number, b:number};

    constructor(gridPosition:{x:number,y:number}, direction:Direction, lightColor:{r:number,g:number,b:number}) {
        this.gridPosition = gridPosition;
        this.direction = direction;
        this.lightColor = lightColor;
    }
}