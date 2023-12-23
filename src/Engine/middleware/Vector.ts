export class Vector{
    constructor(
        private _x: number = 0,
        private _y: number = 0
    ){}
    get x(): number{
        return this._x
    }

    get y(): number{
        return this._y
    }

    add(other: Vector): Vector{
        return new Vector(this.x + other.x, this.y + other.y)
    }

    increase(other: Vector): void{
        this._x += other.x
        this._y += other.y
    }

    sub(other: Vector): Vector{
        return new Vector(this.x - other.x, this.y - other.y)
    }

    prod(num: number): Vector{
        return new Vector(this.x*num, this.y*num)
    }

    equal(other: Vector): boolean{
        return this.x == other.x && this.y == other.y
    }

    invertX(proportion: number = 1){
        this._x *=-proportion
    }

    invertY(proportion:number = 1){
        this._y *=-proportion
    }


    //atributos staticos

    static get Right(): Vector{
        return new Vector(1,0)
    }
    static get Left(): Vector{
        return new Vector(-1,0)
    }
    static get Down(): Vector{
        return new Vector(0,1)
    }
    static get Up(): Vector{
        return new Vector(0,-1)
    }
    static get One(): Vector{
        return new Vector(1,-1)
    }
    static get Zero(): Vector{
        return new Vector(0,0)
    }

}