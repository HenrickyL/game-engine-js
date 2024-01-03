import { Vector3DMiddleware, Vector3d } from "./Vector3d";

export interface Triangle{
    vertices: Vector3d[]
}

export abstract class TriangleMiddleware{
    static isNegativeNormal(triangle: Triangle): boolean{
        const result = Vector3DMiddleware.normalTriangle(triangle)
        return  result.z<0
    }
}