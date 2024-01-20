import { Color } from "../middleware/Color";
import { Vector } from "../middleware/Vector";

export class Triangle{
    private _vertices: Vector[] = []
    private _color: Color = Color.BLUE
    constructor(vertices: Vector[], color: Color = Color.getRandom()){
        this._vertices = vertices
        this._color = color
    }

    normalVector(): Vector{
        return Triangle.normalVector(this)
    }
    isNegativeNormal(): boolean{
        return Triangle.isNegativeNormal(this)
    }


    //-------------------------------------
    static normalVector(triangle: Triangle): Vector{
        const p1 = triangle.vertices[0]
        const p2 = triangle.vertices[1]
        const p3 = triangle.vertices[2]

        const A = Vector.unitary(Vector.vectorTo(p1,p2))
        const B =  Vector.unitary(Vector.vectorTo(p2,p3))
        return Vector.crossProduct(A,B)
    }

    static isNegativeNormal(triangle: Triangle): boolean{
        const result = Triangle.normalVector(triangle)
        return  result.z<0
    }
    //------------------------------------

    get vertices(): Vector[]{
        return this._vertices
    }

    get color(): Color{
        return this._color
    }
    set color(color: Color){
        this._color = color
    }
}