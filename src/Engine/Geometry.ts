import { Vector3d } from "./3D/Vector3d";
import { GeometryParamInvalidError, PolygonEdgesError } from "./Errors";
import { GeometryType } from "./enums/GeometryType";
import { Color } from "./middleware/Color";
import { Movable } from "./middleware/Movable";
import { Position } from "./middleware/Position";
import { Vector } from "./middleware/Vector";

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
    set color(_color: Color){
        this._color = _color
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
    protected rotateAroundAnchor(context:CanvasRenderingContext2D):void{
        context.translate(this.anchor.x, this.anchor.y);
        context.rotate(this._rotateRad);
        context.translate(-this.anchor.x, -this.anchor.y);
    }

    abstract draw(context: CanvasRenderingContext2D): void

    get left(): number{
        throw new GeometryParamInvalidError()
    }
    get right(): number{
        throw new GeometryParamInvalidError()
    }
    get top(): number{
        throw new GeometryParamInvalidError()
    }
    get bottom(): number{
        throw new GeometryParamInvalidError()
    }
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
        this.rotateAroundAnchor(context)
        const halfWidth = this.width/2
        const halfHeight = this.height/2

        context.fillStyle = this.color.RGBA
        context.fillRect(this.x -halfWidth,this.y -halfHeight, this.width,this.height)

        context.lineWidth = this._lineSize; // largura da borda
        context.strokeStyle = this._strokeColor.RGBA; // cor da borda
        context.strokeRect(this.x- halfWidth, this.y -halfHeight, this.width, this.height);

        context.restore()
    }

    get left(): number {
        return this.x - this.width/2
    }
    get right(): number {
        return this.x + this.width/2
    }
    get top(): number {
        return this.y - this.height/2
    }
    get bottom(): number {
        return this.y + this.height/2
    }

}


type DrawPointSettings = {
    size?: number
    color?: Color
    isSquare?: boolean
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
    static draw(context: CanvasRenderingContext2D, points: Vector3d[] = [],settings: DrawPointSettings = {}){
        const size = settings.size || 3
        points.forEach(point=>{
            context.save();
            context.translate(point.x, point.y);
            
            if (settings.isSquare) {
                context.fillRect(-size/2, -size/2, size, size);
            } else {
                context.beginPath();
                context.arc(0, 0, size/2, 0, Math.PI * 2);
                context.fillStyle = settings.color?.RGBA || Color.BLUE.RGBA;
                context.fill();
                context.closePath();
            }
            context.restore()
        })
    }

    draw(context: CanvasRenderingContext2D): void {
        context.save()
        context.translate(this.x, this.y);
        context.rotate(this._rotateRad);
        context.fillStyle = this.color.RGBA;

        if (this._isSquare) {
            context.fillRect(-this.size/2,-this.size/2, this.size, this.size);
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
        this.rotateAroundAnchor(context)

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

    get left(): number {
        return this.x - this.radius
    }
    get right(): number {
        return this.x + this.radius
    }
    get top(): number {
        return this.y - this.radius
    }
    get bottom(): number {
        return this.y + this.radius
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
        this.rotateAroundAnchor(context)

        context.beginPath();
        context.moveTo(this._initial.x, this._initial.y)
        context.lineTo(this._final.x, this._final.y)
        context.strokeStyle = this.color.RGBA
        context.stroke()
        context.restore()
    }

}

type PolygonDrawSettings = {
    fillColor?: Color
    strokeColor?: Color
}

export class Polygon extends Geometry{
    protected _points: Position[]
    protected _isFill: boolean

    constructor(
        position: Position,
        points: Position[],
        color: Color = Color.BLUE, isFill: boolean = true ){
            super(position, GeometryType.POLYGON, color)
            this._points = points
            this._isFill = isFill
    }

    get points():Position[]{
        return this._points
    }
    //override
    translateTo(delta: Vector): void {
        super.translateTo(delta)
        this.points.forEach(point=>{
            point.translateTo(delta)
        })
    }

    moveTo(position: Position): void {
        super.moveTo(position)
        this.points.forEach(point=>{
            point.moveTo(position)
        })
    }

    draw(context: CanvasRenderingContext2D): void {
        if(this.points.length <= 2)
            throw new PolygonEdgesError
        context.save()
        this.rotateAroundAnchor(context)

        context.beginPath();
        this.points.forEach((point, i)=>{
            if(i === 0){
                context.moveTo(point.x, point.y)
            }else{
                context.lineTo(point.x, point.y)
            }
        })
        context.lineTo(this.points[0].x, this.points[0].y)
        context.strokeStyle = this._strokeColor.RGBA
        context.stroke()
        if(this._isFill){
            context.fillStyle= this.color.RGBA
            context.fill()
        }
        context.restore()
    }


    static draw(context: CanvasRenderingContext2D, points: Vector3d[], settings: PolygonDrawSettings = {}){
        if(points.length<3)return
        context.save()

        context.beginPath();
        points.forEach((point, i)=>{
            if(i == 0){
                context.moveTo(point.x,point.y)
            }else{
                context.lineTo(point.x,point.y)
            }
        })
        context.lineTo(points[0].x,points[0].y)
        // context.lineWidth = 1
        context.strokeStyle = settings.strokeColor?.RGBA || Color.BLACK.RGBA;
        context.stroke()
        if(settings.fillColor){
            context.fillStyle = settings.fillColor.RGBA;
            context.fill()
        }
        context.closePath();
        context.restore()
    }

}