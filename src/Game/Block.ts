import { GameObject } from "../Engine/GameObject";
import { Rect } from "../Engine/Geometry";
import { randFloat, randInt } from "../Engine/middleware";
import { Color } from "../Engine/middleware/Color";
import { Position } from "../Engine/middleware/Position";
import { Vector } from "../Engine/middleware/Vector";
import { Ball } from "./Ball";

export class Block extends GameObject{
    private _onCollide: boolean = false
    constructor(position: Position) {
        super(position, new Rect(position, 40,40))
        this.bbox.color = new Color(randInt(0,255), randInt(0,255), randInt(0,255))
        const direction = randInt(-3,3) >0 ? Vector.Right : Vector.Left
        this.speed = Vector.Down.add(direction.prod(randFloat(-0.5,1.2)))
        this.speedMag = 12
    }

    update(): void {
        if(this._onCollide){
            this.translateTo(this.speedFinal)
        }
    }

    onCollision(obj: GameObject): void {
        if(obj instanceof Ball){
            this._onCollide = true
            this.bbox.color.alpha = 0.2
        }
    }

}