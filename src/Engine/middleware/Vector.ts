export class Vector{
    constructor(
        private _x: number = 0,
        private _y: number = 0,
        private _z: number = 0,
        private _w: number = 1
    ){}
    get x(): number{
        return this._x
    }

    set x(value: number){
        this._x = value
    }

    get y(): number{
        return this._y
    }

    set y(value: number){
        this._y = value
    }

    get z(): number{
        return this._z
    }

    set z(value: number){
        this._z = value
    }

    get w():number{
        return this._w
    }

    set w(value: number){
        this._w = value
    }

    add(other: Vector): Vector{
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
    }

    increase(other: Vector): void{
        this._x += other.x
        this._y += other.y
        this._z += other.z
    }

    sub(other: Vector): Vector{
        return new Vector(this.x - other.x, this.y - other.y, this._z - other.z)
    }

    prod(num: number): Vector{
        return new Vector(this.x*num, this.y*num, this.z*num)
    }

    equal(other: Vector): boolean{
        return this.x === other.x && this.y === other.y && this.z === other.z
    }

    invertX(proportion: number = 1){
        this._x *=-proportion
    }
    

    invertY(proportion:number = 1){
        this._y *=-proportion
    }

    invertZ(proportion:number = 1){
        this._z *=-proportion
    }

    copy():Vector{
        return new Vector(this.x, this.y, this.z)
    }
    inverse():Vector{
        return new Vector(-this._x, -this._y, -this.z)
    }

    unitary():Vector{
        const mag = this.magnitude()
        return new Vector(this.x/mag, this.y/mag, this.z/mag)
    }
    magnitude():number{
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    }

    crossProduct(other: Vector): Vector{
        return Vector.crossProduct(this, other)
    }

    vectorTo(other: Vector): Vector{
        return Vector.vectorTo(this, other)
    }

    dotProduct( other:Vector): number{
        return Vector.dotProduct(this, other)
    }
    //------------------------------------------------------
    static crossProduct(A: Vector, B: Vector): Vector{
        return new Vector(
            A.y*B.z - A.z*B.y,
            A.z*B.x - A.x*B.z,
            A.x*B.y - A.y*B.x
        )
    }
    static vectorTo(p1: Vector, p2: Vector): Vector{
        return new Vector(
            p2.x - p1.x, 
            p2.y - p1.y, 
            p2.z - p1.z
        )
    }

    static dotProduct(A: Vector, B:Vector): number{
        return A.x*B.x + A.y*B.y + A.z*B.z
    }

    static unitary(vec: Vector): Vector{
        const module = Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z)
        return new Vector(
            vec.x/module,
            vec.y/module,
            vec.z/module
        )
    }

    // Atributos estáticos
    static get Right(): Vector {
        return new Vector(1, 0, 0);
    }

    static get Left(): Vector {
        return new Vector(-1, 0, 0);
    }

    static get Down(): Vector {
        return new Vector(0, 1, 0);
    }

    static get Up(): Vector {
        return new Vector(0, -1, 0);
    }

    static get Forward(): Vector {
        return new Vector(0, 0, 1);
    }

    static get Backward(): Vector {
        return new Vector(0, 0, -1);
    }

    static get One(): Vector {
        return new Vector(1, 1, 1);
    }

    static get Zero(): Vector {
        return new Vector(0, 0, 0);
    }

}