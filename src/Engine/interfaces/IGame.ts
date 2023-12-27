import { Graphics } from "../Graphics"

export interface IGame{
    init(graphic: Graphics):void
    update():void
    draw(context: CanvasRenderingContext2D):void
}
