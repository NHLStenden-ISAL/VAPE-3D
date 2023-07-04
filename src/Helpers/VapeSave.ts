import { BaseDataContainer } from "../Objects/DataContainers";

export class VapeSave {
    public readonly name: string;
    public readonly layers: Array<VapeSaveLayer>;

    constructor(name: string, layers?: Array<VapeSaveLayer>) {
        this.name = name;
        if(layers) {
            this.layers = layers;
        } else {
            this.layers = new Array<VapeSaveLayer>();
        }
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public static fromString(input: string) {
        const parsedJSON = JSON.parse(input);
        return new VapeSave(parsedJSON.name, parsedJSON.layers.map((vsl: any) => new VapeSaveLayer(vsl.name, vsl.contents.map((unit: any) => unit as BaseDataContainer))));
    }
}

export class VapeSaveLayer {
    public readonly name: string;
    public readonly contents: Array<BaseDataContainer>;

    constructor(name: string, contents?: Array<BaseDataContainer>) {
        this.name = name;
        if(contents) {
            this.contents = contents;
        } else {
            this.contents = new Array<BaseDataContainer>();
        }
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}