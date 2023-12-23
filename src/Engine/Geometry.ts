import { GeometryType } from "./enums/GeometryType";
import { Color } from "./middleware/Color";
import { Movable } from "./middleware/Movable";
import { Position } from "./middleware/Position";

export abstract class Geometry extends Movable{

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
        color: Color = Color.RED){
            super(position, GeometryType.RECTANGLE, color)

    }

    get width():number{
        return this._width
    }

    get height():number{
        return this._height
    }


    draw(context: CanvasRenderingContext2D): void {


        context.fillStyle = this.color.RGBA
        context.fillRect(this.position.x, this.position.y, this.width,this.height)

    }
    
}