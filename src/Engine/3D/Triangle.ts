import { Color } from "../middleware/Color";
import { Vector3DMiddleware, Vector3d } from "./Vector3d";

export interface Triangle{
    vertices: Vector3d[]
    color: Color
}

export abstract class TriangleMiddleware{
    static isNegativeNormal(triangle: Triangle): boolean{
        const result = Vector3DMiddleware.normalTriangle(triangle)
        return  result.z<0
    }

    static generate(vertices: Vector3d[], color: Color= Color.BLUE):Triangle{
        return{
            vertices,
            color
        }
    }
}