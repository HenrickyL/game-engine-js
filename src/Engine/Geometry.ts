import { GeometryType } from "./enums/GeometryType";
import { Color } from "./middleware/Color";
import { Movable } from "./middleware/Movable";
import { Position } from "./middleware/Position";

export abstract class Geometry extends Movable{
    protected _lineSize: number = 2
    protected _strokeColor: Color = Color.BLACK
    constructor(
        position: Position,
        protected _type: GeometryType,
        protected _color: Color = Color.BLUE){
            super(position)
    }

    get color():Color{
        return this._color
    }

    get type():GeometryType{
        return this._type
    }

    set lineSize(size:number){
        this.lineSize = size
    }

    set strokeColor(color:Color){
        this._strokeColor = color
    }

    abstract draw(context: CanvasRenderingContext2D): void

    // abstract get left(): number
    // abstract get right(): number
    // abstract get top(): number
    // abstract get bottom(): number
}


export class Rect extends Geometry{
    constructor(position: Position,
        protected _width: number,
        protected _height: number,
        color: Color = Color.BLUE){
            super(position, GeometryType.RECTANGLE, color)

    }

    get width():number{
        return this._width
    }

    get height():number{
        return this._height
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save()

        context.translate(this.anchor.x, this.anchor.y);
        context.rotate(this._rotateRad);
        context.translate(-this.anchor.x, -this.anchor.y);
        const halfWidth = this.width/2
        const halfHeight = this.height/2

        context.fillStyle = this.color.RGBA
        context.fillRect(this.x -halfWidth,this.y -halfHeight, this.width,this.height)

        context.lineWidth = this._lineSize; // largura da borda
        context.strokeStyle = this._strokeColor.RGBA; // cor da borda
        context.strokeRect(this.x- halfWidth, this.y -halfHeight, this.width, this.height);

        context.restore()
    }

}



export class Point extends Geometry{
    protected _size: number = 5
    protected _isSquare = true;

    constructor(
        position: Position,
        isSquare: boolean = true,
        color: Color = Color.RED){
            super(position, GeometryType.POINT, color)
            this._isSquare = isSquare

    }

    set size(value: number){
        this._size = value
    }

    get size():number{
        return this._size
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save()
        context.translate(this.x, this.y);
        context.rotate(this._rotateRad);
        context.fillStyle = this.color.RGBA;

        if (this._isSquare) {
            context.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        } else {
            context.beginPath();
            context.arc(0, 0, this.size/2, 0, Math.PI * 2);
            context.fill();
            context.closePath();

        }

        context.restore()
    }

}


export class Circle extends Geometry{
    protected _radius: number
    protected _isFill: boolean

    constructor(
        position: Position,
        radius: number,
        color: Color = Color.RED, isFill = true){
            super(position, GeometryType.CIRCLE, color)
            this._radius = radius
            this._isFill = isFill

    }

    set radius(value: number){
        this._radius = value
    }

    get radius():number{
        return this._radius
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save()
        context.translate(this.anchor.x, this.anchor.y);
        context.rotate(this._rotateRad);
        context.translate(-this.anchor.x, -this.anchor.y);

        const halfRadius = this._radius/2
        context.beginPath();
        context.arc(this.x -halfRadius,this.y -halfRadius, this.radius, 0, Math.PI * 2);
        context.closePath();
        if(this._isFill){
            context.fillStyle = this.color.RGBA;
            context.fill();
        }
        context.strokeStyle = this._strokeColor.RGBA
        context.stroke()
        context.restore()
    }

}



export class Line extends Geometry{
    protected _initial: Position
    protected _final: Position

    constructor(
        initial: Position,
        final: Position,
        color: Color = Color.RED){
            super(initial, GeometryType.LINE, color)
            this._initial = initial
            this._final = final
            this.position = Position.centerTo(initial, final)
    }


    get initialPosition():Position{
        return this._initial
    }
    get finalPosition():Position{
        return this._initial
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save()
        // context.translate(this.x, this.y);
        context.beginPath();
        context.moveTo(this._initial.x, this._initial.y)
        context.lineTo(this._final.x, this._final.y)
        context.strokeStyle = this.color.RGBA
        context.stroke()
        context.restore()
    }

}