import {createLayer} from "../Helpers/ObjectCreator";
import {Color3, Mesh,  Vector2} from "@babylonjs/core";
import WorldInformation from "../Helpers/WorldInformation";
import BaseObject from "./BaseObject";
import {Direction} from "../Compositions/Transformable";
import {DirectionDataContainer} from "./DataContainers";

export default class LayerObject extends BaseObject {

    constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
        const objectColor = Color3.Purple();
        super(worldInfo, gridPos, dir, objectColor);
    }

    public copy(worldInfo: WorldInformation): LayerObject {
        return new LayerObject(worldInfo, this.gridPosition, this.direction);
    }

    protected createMesh(): Mesh {
        return createLayer(this.worldInfo.getScene(), 60, 1, 1);
    }

    public restore(): void {
        super.restore();
    }

    public getDataContainer(): DirectionDataContainer {
        return new DirectionDataContainer(
            this.getPositionForGUI(),
            this.getDirection()
        )
    }

}