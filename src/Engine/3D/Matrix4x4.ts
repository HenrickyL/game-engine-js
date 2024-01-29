import { Position } from "../middleware/Position"
import { Vector } from "../middleware/Vector"

export class Matrix4x4{
    private _matrix:Array<Array<number>>
    private static _identity: Matrix4x4

    constructor(){
        this._matrix = new Array<Array<number>>(4)
        for(let i=0; i< 4; i++){
            this._matrix[i] = new Array<number>(4).fill(0)
        }
    }
   

    public get(i:number,j:number): number{
        return this._matrix[i][j]
    }

    set(i:number, j:number, value: number):void{
        this._matrix[i][j] = value
    }

    get matrix(): Array<Array<number>>{
        return this._matrix
    }

    static get Identity(): Matrix4x4{
        if(!Matrix4x4._identity){
            const m = new Matrix4x4()
            m.set(0,0,1)
            m.set(1,1,1)
            m.set(2,2,1)
            m.set(3,3,1)
            Matrix4x4._identity = m
        }
        return Matrix4x4._identity
    }


    static MakeTranslation(p: Position): Matrix4x4{
        const m = new Matrix4x4()
        m.set(0,0,1)
        m.set(1,1,1)
        m.set(2,2,1)
        m.set(3,3,1)

        m.set(3,0,p.x)
        m.set(3,1,p.y)
        m.set(3,2,p.z)
        return m
    }

    static MakeProjection(theta:number,aspectRatio: number, zNear: number, zFar: number): Matrix4x4{
        const a = aspectRatio
        const f = 1/ (Math.tan(theta * 0.5 / 180*Math.PI))
        const af = a *f 
        const q = zFar/(zFar - zNear)
        const zNearQ = (-zFar * zNear)/(zFar - zNear)

        const m = new Matrix4x4()
        m.set(0,0, af)
        m.set(1,1, f)
        m.set(2,2, q)
        m.set(3,2, zNearQ)
        m.set(2,3, 1)
        return m
    }


    static multiply(m1: Matrix4x4, m2: Matrix4x4): Matrix4x4 {
        const result = new Matrix4x4();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    result._matrix[i][j] += m1._matrix[i][k] * m2._matrix[k][j];
                }
            }
        }
        return result;
    }
    //alpha beta gama
    static MakeRotation(radX: number, radY: number, radZ: number): Matrix4x4 {
        const cosX = Math.cos(radX)
        const sinX = Math.sin(radX)

        const sinY = Math.sin(radY)
        const cosY = Math.cos(radY)

        const cosZ = Math.cos(radZ)
        const sinZ = Math.sin(radZ)


        const m = new Matrix4x4()
        // Rotação em torno do eixo x
        m.set(0, 0, cosY * cosZ);
        m.set(0, 1, -cosY * sinZ);
        m.set(0, 2, sinY);
        
        // Rotação em torno do eixo y
        m.set(1, 0, sinX * sinY * cosZ + cosX * sinZ);
        m.set(1, 1, -sinX * sinY * sinZ + cosX * cosZ);
        m.set(1, 2, -sinX * cosY);
        
        // Rotação em torno do eixo z
        m.set(2, 0, -cosX * sinY * cosZ + sinX * sinZ);
        m.set(2, 1, cosX * sinY * sinZ + sinX * cosZ);
        m.set(2, 2, cosX * cosY);

        // Os elementos da diagonal
        m.set(3, 3, 1);
        
        return m
    }

    static multiplyMatrixVector(p: Vector, matrix: Matrix4x4): Vector{
        const m = matrix.matrix
        const result  = new Vector(
            p.x * m[0][0] + p.y * m[1][0] + p.z * m[2][0] + m[3][0],
            p.x * m[0][1] + p.y * m[1][1] + p.z * m[2][1] + m[3][1],
            p.x * m[0][2] + p.y * m[1][2] + p.z * m[2][2] + m[3][2],
            p.x * m[0][3] + p.y * m[1][3] + p.z *m[2][3] + m[3][3]
        )
        return result
    }
}