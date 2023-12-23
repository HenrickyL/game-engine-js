import { NotImplementError } from "./Errors";
import { GeometryType } from "./enums/GeometryType";
import { Color } from "./middleware/Color";
import { Position } from "./middleware/Position";

export abstract class Geometry{

    constructor(
        protected _position: Position, 
        protected _type: GeometryType, 
        protected _color: Color = Color.BLUE){
    }


    get color():Color{
        return this._color
    }

    get type():GeometryType{
        return this._type
    }

    get position():Position{
        return this._position
    }



    draw(context: CanvasRenderingContext2D){
    }


    get left(){
        throw new NotImplementError();
    }
    get right(){
        throw new NotImplementError();
    }

    get top(){
        throw new NotImplementError();
    }
    get bottom(){
        throw new NotImplementError();
    }
}