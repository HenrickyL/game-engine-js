import {Circle, Geometry, Rect } from "../Engine/Geometry";
import { Graphics } from "../Engine/Graphics";
import { IGame } from "../Engine/interfaces/IGame";
import { Color } from "../Engine/middleware/Color";
import { Position } from "../Engine/middleware/Position";
import { Vector } from "../Engine/middleware/Vector";

export class GameTest implements IGame{
    private objs: Geometry[] =[]
    private _graphics : Graphics  = new Graphics
    init(graphic: Graphics): void {
        this._graphics = graphic
        const pos = this._graphics?.middleCenter || Position.Default
        const direction = [ Vector.Up.add(Vector.Right), Vector.Up.add(Vector.Left), Vector.Down.add(Vector.Right), Vector.Down.add(Vector.Left)] 
        const count = 1500
        for(let i =0; i< count; i++){
            const index = randInt(0, direction.length)
            const color = new Color(randInt(0,255),randInt(0,255), randInt(0,255))
            const obj = new Circle(pos,randInt(10,25), color)
            obj.speed = direction[index]
            obj.speedMag = randInt(1,5)
            this.objs.push(obj)
        }
    }
    update(): void {
        this.objs.forEach(obj=>{
            obj.translateTo(obj.speedFinal)
            if(obj.x > this._graphics.width || obj.x < 0){
                obj.speed.invertX(randInt(0.8,1.2))
            }

            if(obj.y > this._graphics.height || obj.y < 0){
                obj.speed.invertY()
            }


        })
    }
    draw(context: CanvasRenderingContext2D): void {
        this.objs.forEach(obj=>{
            obj.draw(context)
        })
    }
}



function randInt(ini:number, final: number): number{
    return Math.floor(Math.random() * (final- ini) + ini)
}