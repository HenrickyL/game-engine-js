import { Point, Polygon } from "../Geometry"
import { Graphics } from "../Graphics"
import { Color } from "../middleware/Color"
import { Matrix4x4 } from "./Matrix4x4"
import { Mesh } from "./Mesh"
import { Triangle, TriangleMiddleware } from "./Triangle"
import { Vector3DMiddleware, Vector3d } from "./Vector3d"

/*
a : Proportion = hight/width
theta: scale factor (angle)
F : Factor Projection = 1 / tan(theta/2)
scale coefficient ->q = zfar/(zfar-znear) - (zfar*znear)/(zfar-znear)
zFar
ZNear


x,y,z =>  aFx/z, Fy/z, (zq - znear q)/z

*/
type UpdateSettings = {
    angleX: number, 
    angleZ: number, 
    angleY: number,
    theta?: number
}
type RenderSettings = {
    isColor?: boolean
    isPoint?: boolean

}
export class Render3d{
    private _graphics: Graphics

    private _width: number = 0
    private _height: number = 0
    private _zFar: number = 1000
    private _zNear: number = 0.
    private _theta: number = 90 //angle vision - scale factor

    private _lastTheta: number = 90
    
    private _aspectRatio: number = 0
    private _FovRad: number = 0

    private _matrixProjection: Matrix4x4 = new Matrix4x4()
    private _matRotX: Matrix4x4 = new Matrix4x4()
    private _matRotZ: Matrix4x4 = new Matrix4x4()
    private _matRotY: Matrix4x4 = new Matrix4x4()

    //init can
    private _camera: Vector3d

    //test
    private _angleXRad: number = 0
    private _angleZRad: number = 0
    private _angleYRad: number = 0
    private _zDistance:number = 2


    constructor(graphics: Graphics, theta: number = 90, zNear: number = 0, zFar:number = 0){
        this._graphics = graphics
        this._camera = {x:0,y:0,z:0}  
        this.setProjectionParams(graphics.width, graphics.height, theta, zFar, zNear)
    }

    
    update(settings:UpdateSettings = {angleX:0, angleZ:0, angleY:0}){
        this._angleXRad = settings.angleX 
        this._angleZRad = settings.angleZ 
        this._angleYRad = settings.angleY 
        if(settings.theta &&  settings.theta != this._theta){
            this.theta = settings.theta
        }

        this.calculatedMatrixRotateX()
        this.calculatedMatrixRotateZ()
        this.calculatedMatrixRotateY()
    }
    

    render(mesh: Mesh, settings: RenderSettings = {}){
        this._graphics.clear()

        mesh.triangles.forEach(triangle =>{
            const projectedTriangle = this.projectVertex(triangle)
            if(projectedTriangle){
                if(settings.isPoint)
                    Point.draw(this._graphics.context, projectedTriangle.vertices,{isSquare: false, size: 5})
                else
                    Polygon.draw(this._graphics.context, projectedTriangle.vertices, settings.isColor? {fillColor: Color.GREEN}: {})
            }
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

    private calculatedMatrixRotateZ(){
        this._matRotZ = new Matrix4x4() 

        const angle = this._angleZRad
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        
        this._matRotZ.set(0,0, cos)
        this._matRotZ.set(0,1, sin)
        this._matRotZ.set(1,0, -sin)
        this._matRotZ.set(1,1, cos)
        this._matRotZ.set(2,2, 1)
        this._matRotZ.set(3,3, 1)

    }
    private calculatedMatrixRotateY(){
        this._matRotY = new Matrix4x4() 

        const angle = this._angleYRad
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        
        this._matRotY.set(0,0, cos)
        this._matRotY.set(0,1, 0)
        this._matRotY.set(0,2, sin)
        this._matRotY.set(1,1, 1)
        this._matRotY.set(2,0, -sin)
        this._matRotY.set(2,2, cos)
    }

    private calculatedMatrixRotateX(){
        this._matRotX = new Matrix4x4() 

        const angle = this._angleXRad
        const sin = Math.sin(angle * 0.5)
        const cos = Math.cos(angle * 0.5)
        
        this._matRotX.set(0,0, 1)
        this._matRotX.set(1,1, cos)
        this._matRotX.set(1,2, sin)
        this._matRotX.set(2,1, -sin)
        this._matRotX.set(2,2, cos)
        this._matRotX.set(3,3, 1)
        
    }

    private onSeeTriangle(triangle: Triangle): boolean{
        const normal = Vector3DMiddleware.normalTriangle(triangle)

        const v = triangle.vertices
        //same plane, so i can take any point
        const adjust:Vector3d = {
            x: (v[0].x - this._camera.x),
            y: (v[0].y - this._camera.x),
            z: (v[0].z - this._camera.x)
        } 
        return Vector3DMiddleware.dotProduct(normal,adjust) < 0
    }

    private projectVertex(triangle: Triangle): Triangle | null{
        const vertices = triangle.vertices
        const triangleTranslated = this.preProjectionCalculation(vertices)

        if(this.onSeeTriangle(triangleTranslated)){
            const result: Vector3d[] = triangleTranslated.vertices
            .map(vertex=>{
                const res = this.multiplyMatrixVector(vertex, this._matrixProjection)
                res.x += 1
                res.y += 1
        
                res.x *= 0.5 * this._width 
                res.y *= 0.5 * this._height 
                return res
            })
            
            return {vertices: result}
        }
        return null
    }

    private preProjectionCalculation(vertices: Vector3d[]): Triangle{
        const result: Triangle = {vertices: []}

        vertices.forEach(vertex=>{
            const vY = this.multiplyMatrixVector(vertex, this._matRotY)
            const vZ = this.multiplyMatrixVector(vY, this._matRotZ)
            const v = this.multiplyMatrixVector(vZ, this._matRotX)
    
            const translatedVertex = {
                x: v.x,
                y: v.y,
                z: v.z+ this._zDistance
            }
            result.vertices.push(translatedVertex)
        })
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

    get width(){
        return this._width
    }

    get height(){
        return this._height
    }

    set z(value:number){
        this._zDistance = value
    }
}