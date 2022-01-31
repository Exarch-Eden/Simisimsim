import Vector3 from "./Vector3"

class CanvasObject {
    private _position: Vector3
    private _color: string

    constructor(position: Vector3, color?: string) {
        this._position = position
        this._color = color || '#ccc'
    }

    public get position () {
        return this._position;
    }

    public draw (context: CanvasRenderingContext2D) {
        const pos = this._position

        // default draw for every CanvasObject
        // should be overwritten by child classes
        context.fillStyle = this._color
        context.beginPath()
        context.strokeRect(pos.x, pos.y, 50, 50)
        context.fill()
    }

    public toString () {
        return `Position: ${this.position}`
    }
}

export default CanvasObject