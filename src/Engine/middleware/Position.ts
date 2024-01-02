import { Vector3d } from "../3D/Vector3d"
import { Vector } from "./Vector"


export class Position{

    constructor(private _x: number =0, private _y: number =0, private _z:number =0){}

    get x():number{
        return this._x
    }
    get y():number{
        return this._y
    }

    get z():number{
        return this._z
    }

    set x(xx: number){
        this._x = xx
    }
    set y(yy:number){
        this._y = yy
    }

    set z(zz:number){
        this._z = zz
    }

    get info(): string{
        return `(x: ${this.x}, y: ${this.y}, z: ${this.z})`
    }

    static centerTo(p1: Position, p2: Position): Position{
        const dx = (p2.x - p1.x)
        const dy = (p2.y - p1.y)
        const dz = (p2.z - p1.z)

        return new Position(p1.x+dx/2, p1.y+dy/2, p1.z+dz/2) 
    }

    distanceTo(other: Position): number{
        const dx = other.x - this.x
        const dy = other.y - this.y
        const dz = other.z - this.z

        return Math.sqrt(dx*dx + dy*dy + dz*dz)
    }

    copy(): Position{
        return new Position(this.x, this.y, this.z)
    }

    equal(other:Position):boolean{
        return this._x === other._x && this._y === other._y && this.z == other.z
    }
    
    
    public moveTo(position: Position):void{
        this.x = position.x
        this.y = position.y
    }

    public moveToPos(position: Vector3d):void{
        this.x = position.x
        this.y = position.y
        this.z = position.z

    }

    public translateTo(delta: Vector){
        this.x += delta.x
        this.y += delta.y
        this.z += delta.z
    }


    static get Default():Position{
        return new Position()
    }

}