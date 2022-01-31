
class Vector3 {
    private _x: number
    private _y: number
    private _z: number

    constructor(x: number, y: number, z?: number) {
        this._x = x
        this._y = y
        this._z = z || 0
    }

    public get x () {
        return this._x
    }

    public get y () {
        return this._y
    }
    
    public get z () {
        return this._z
    }

    public toString () {
        return `Vector3 [x: ${this.x}, y: ${this.y}, z: ${this.z}]`
    }
}

export default Vector3