import { Triangle } from "./Triangle"

export interface Vector3d{
    x: number
    y: number
    z: number
}


export abstract class Vector3DMiddleware{

    static crossProduct(A: Vector3d, B: Vector3d): Vector3d{
        return {
            x: A.y*B.z - A.z*B.y,
            y: A.z*B.x - A.x*B.z,
            z: A.x*B.y - A.y*B.x
        }
    }

    static vectorTo(p1: Vector3d, p2: Vector3d): Vector3d{
            return {
                x: p2.x - p1.x, 
                y: p2.y - p1.y, 
                z: p2.z - p1.z
            }
    }

    static unitary(vec: Vector3d): Vector3d{
        const module = Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z)
        return {
            x: vec.x/module,
            y: vec.y/module,
            z: vec.z/module
        }
    }

    static dotProduct(A: Vector3d, B:Vector3d): number{
        return A.x*B.x + A.y*B.y + A.z*B.z
    }

    static normalTriangle(triangle: Triangle): Vector3d{
        const p1 = triangle.vertices[0]
        const p2 = triangle.vertices[1]
        const p3 = triangle.vertices[2]

        const A = Vector3DMiddleware.unitary(Vector3DMiddleware.vectorTo(p1,p2))
        const B =  Vector3DMiddleware.unitary(Vector3DMiddleware.vectorTo(p2,p3))
        return Vector3DMiddleware.crossProduct(A,B)
    }
}