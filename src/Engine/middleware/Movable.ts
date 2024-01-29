import { Position } from "./Position";
import { Vector } from "./Vector";

export abstract class Movable{
    protected _rotateRad = 0
    protected _anchor: Position
    protected _positionInitial
    protected _position: Position
    protected _speed: Vector = Vector.Zero
    protected _speedMag: number = 0
    constructor(
        position: Position,
        speed: Vector = Vector.Zero,
    ){
        this._position = position.copy()
        this._anchor = this._position.copy()
        this._speed = speed.copy()
        this._positionInitial = this._position.copy()
    }

    //----------------------
    public moveTo(position: Position):void{
        this._position.x = position.x
        this._position.y = position.y
        this._position.z = position.z

    }

    public translateTo(delta: Vector){
        this._position.x += delta.x
        this._position.y += delta.y
        this._position.z += delta.z
    }


    //----------------------

    set position(pos: Position){
        this._position = pos
    }

    get position(): Position{
        return this._position
    }

    get x():number{
        return this._position.x
    }

    get y():number{
        return this._position.y
    }
    get z():number{
        return this._position.z
    }

    get speed():Vector{
        return this._speed
    }
    set speed(unit: Vector){
        this._speed = unit
    }
    get speedFinal():Vector{
        return this._speed.prod(this._speedMag)
    }
    set speedMag(value: number){
        this._speedMag = value
    }
    get speedMag():number{
        return this._speedMag
    }
    get rotateAngle(): number{
        return this._rotateRad * 180/ Math.PI
    }
    set rotateAngle(angle:number){
        this._rotateRad = angle*Math.PI/180
    }


    get anchor(): Position{
        return this._anchor
    }

    set anchor(pos:Position){
        this._anchor = pos
    }
    set anchorX(value:number){
        this._anchor.x = value
    }

    set anchorY(value:number){
        this._anchor.y = value
    }

    set anchorZ(value:number){
        this._anchor.z = value
    }
}