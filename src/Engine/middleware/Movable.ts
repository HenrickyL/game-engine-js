import { Position } from "./Position";
import { Vector } from "./Vector";

export abstract class Movable{
    protected _rotateRad = 0
    protected _positionInitial

    constructor(
        protected _position: Position,
        protected _speed: Vector,
    ){
        this._positionInitial = new Position(_position.x, _position.y)
    }

    //----------------------
    moveTo(position: Position):void{
        this._position.x = position.x
        this._position.y = position.y
    }

    translateTo(delta: Vector){
        this._position.x += delta.x
        this._position.y += delta.y
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

    get speed():Vector{
        return this._speed
    }
    get rotateAngle(): number{
        return this._rotateRad * 180/ Math.PI
    }
    set rotateAngle(angle:number){
        this._rotateRad = angle*Math.PI/180
    }
}