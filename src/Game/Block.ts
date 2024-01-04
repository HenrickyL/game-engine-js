import { GameObject } from "../Engine/GameObject";
import { Rect } from "../Engine/Geometry";
import { MathMiddleware} from "../Engine/middleware";
import { Color } from "../Engine/middleware/Color";
import { Position } from "../Engine/middleware/Position";
import { Vector } from "../Engine/middleware/Vector";
import { Ball } from "./Ball";

export class Block extends GameObject{
    private _onCollide: boolean = false
    private _callback: (current: Block)=>void
    constructor(position: Position, callback: (current: Block)=>void) {
        super(position, new Rect(position, 40,40))
        const randInt = MathMiddleware.randInt
        const randFloat = MathMiddleware.randFloat
        this.bbox.color = Color.getRandom()
        const direction = randInt(-3,3) >0 ? Vector.Right : Vector.Left
        this.speed = Vector.Down.add(direction.prod(randFloat(-0.5,1.2)))
        this.speedMag = 12
        this._callback = callback
    }

    update(): void {
        if(this._onCollide){
            this.translateTo(this.speedFinal)

            if(this.y > 600){
                this._callback(this)
            }
        }
    }

    onCollision(obj: GameObject): void {
        if(obj instanceof Ball){
            this._onCollide = true
            this.bbox.color.alpha = 0.2
        }
    }

}