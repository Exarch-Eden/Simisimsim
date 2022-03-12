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

    public move (moveRate: Vector3) {
        // console.log('canvasobj move()');
        
        this._position.move(moveRate)
    }

    public draw (context: CanvasRenderingContext2D) {
        const pos = this._position

        // default draw for every CanvasObject
        // should be overwritten by child classes
        context.fillStyle = this._color
        context.beginPath()
        context.arc(pos.x, pos.y, 50, 0, Math.PI * 2)
        // context.strokeRect(pos.x, pos.y, 50, 50)
        // context.fillStyle = '#000'

        // context.fill()
        context.stroke()
        context.closePath()
    }

    public toString () {
        return `Position: ${this.position}`
    }
}

export default CanvasObject