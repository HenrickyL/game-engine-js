import { Graphics } from "../Graphics"
import { Matrix4x4 } from "./Matrix4x4"
import { Mesh } from "./Mesh"
import { Vector3d } from "./Vector3d"

/*
a : Proportion = hight/width
theta: scale factor (angle)
F : Factor Projection = 1 / tan(theta/2)
scale coefficient ->q = zfar/(zfar-znear) - (zfar*znear)/(zfar-znear)
zFar
ZNear


x,y,z =>  aFx/z, Fy/z, (zq - znear q)/z

*/

type RenderSettings = {

}
export class Render3d{
    private _graphics: Graphics

    private _width: number = 0
    private _height: number = 0
    private _theta: number = 90 //angle vision - scale factor
    private _zFar: number = 1000
    private _zNear: number = 0.
    
    private _aspectRatio: number = 0
    private _FovRad: number = 0

    private _matrixProjection: Matrix4x4 = new Matrix4x4()

    //test
    private _zDistance:number = 2


    constructor(graphics: Graphics, theta: number = 90, zNear: number = 0, zFar:number = 0){
        this._graphics = graphics
        this.setProjectionParams(graphics.width, graphics.height, theta, zFar, zNear)
    }

    

    

    render(mesh: Mesh, settings: RenderSettings = {}){
        this._graphics.clear()

        mesh.triangles.forEach(triangle =>{
            const vertices = triangle.vertices;

            const projectedVertices = vertices.map(vertex=>this.projectVertex(vertex))
        })
    }

    //------------------------------------------

    private setProjectionParams(width:number, height:number, theta: number, zNear: number, zFar:number){
        this._width = width;
        this._height = height;
        this._theta = theta;
        if(zNear!==0)this._zNear = zNear;
        if(zFar!==0) this._zFar = zFar;

        this._aspectRatio = this._height/ this._width
        this._FovRad = 1/ (Math.tan(this._theta * 0.5 / 180*Math.PI))
        this.calculatedMatrixProjection()
    }

    private calculatedMatrixProjection(){
        this._matrixProjection = new Matrix4x4()
        const a = this._aspectRatio
        const f = this._FovRad
        const af = a *f 
        const q = this._zFar/(this._zFar - this._zNear)

        this._matrixProjection.set(0,0, af)
        this._matrixProjection.set(1,1, f)
        this._matrixProjection.set(2,2, q)
        this._matrixProjection.set(3,2, -q*this._zNear)
        this._matrixProjection.set(2,3, 1)
        this._matrixProjection.set(3,3, 0)
    }

    private projectVertex(vertex: Vector3d){
        const v = vertex


        const translatedVertex = {
            x: v.x,
            y: v.y,
            z: v.z+ this._zDistance
        }

        const result = this.multiplyMatrixVector(translatedVertex, this._matrixProjection)

        result.x += 1
        result.y += 1

        result.x *= 0.5 * this._width 
        result.y *= 0.5 * this._height 
        return result
    }

    private multiplyMatrixVector(p: Vector3d, matrix: Matrix4x4): Vector3d{
        const m = matrix.matrix
        const result: Vector3d  = {
            x:  p.x * m[0][0] + p.y * m[1][0] + p.z * m[2][0] + m[3][0],
            y:  p.x * m[0][1] + p.y * m[1][1] + p.z * m[2][1] + m[3][1],
            z:  p.x * m[0][2] + p.y * m[1][2] + p.z * m[2][2] + m[3][2]
        }
        const w = p.x * m[0][3] + p.y * m[1][3] + p.z *m[2][3] + m[3][3]
        if(w !== 0){
            result.x /= w
            result.y /= w
            result.z /= w
        }
        return result
    }

    set theta(value:number){
        this._theta = value/180*Math.PI
        this.setProjectionParams(this._width, this._height, this._theta, this._zFar, this._zNear)
    }
}