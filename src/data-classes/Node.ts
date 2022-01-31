import CanvasObject from "./CanvasObject";
import Planet from "./Planet";
import Vector3 from "./Vector3";

class Node extends CanvasObject {
    private _planets: Planet[]

    constructor(position: Vector3, planets: Planet[]) {
        super(position)
        this._planets = planets
    }


}

// const node = new Node(new Vector3(2, 2))

export default Node