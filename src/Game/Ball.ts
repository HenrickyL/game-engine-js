import { GameObject } from "../Engine/GameObject";
import { Circle } from "../Engine/Geometry";
import { Timer } from "../Engine/Timer";
import { randFloat, randInt } from "../Engine/middleware";
import { Color } from "../Engine/middleware/Color";
import { Position } from "../Engine/middleware/Position";
import { Vector } from "../Engine/middleware/Vector";
import { Block } from "./Block";
import { Player } from "./Player";

export class Ball extends GameObject{
    private timer: Timer = new Timer()
    private elapsed: number = 800
    private _start : boolean = false
    private _reset : boolean = false
    private static _radius: number = 15
    private _player: Player
    constructor(player: Player = new Player(Position.Default)){
        super(player.position, new Circle(player.position, Ball._radius, Color.RED))
        this.speedMag = 8
        this._player = player
        
        this._positionInitial = new Position(this._player.x, this._player.top - Ball.radius )
        this.moveTo(this._positionInitial)
    }

    start(){
        if(!this._start){
            const direction = randInt(-2,2) > 0 ? Vector.Right  : Vector.Left 
            this.speed = Vector.Up.add( direction.prod(randFloat(0.7, 1.3)) )
            this._positionInitial = new Position(this._player.x, this._player.top - Ball.radius )
            this.moveTo(this._positionInitial)
            this._start = true
            this.timer.resetTimer()
        }
    }

    update(): void {
        if(this._start ){

            if(this._reset){
                if( this.timer.getElapsedMiliSeconds() > this.elapsed){
                    this._reset = false
                    this._start = false
                    this.start()
                }else{
                    return
                }
            }
            this.translateTo(this.speedFinal)

            if(this.left <0 || this.right > 800){
                this.speed.invertX()
            }
            if(this.top < 0 || this.bottom > 600){
                this.speed.invertY()
            }
            this.timer.resetTimer()
        }else{
            this.translateTo( new Vector(-this.x + this._player.x, 0))
        }
    }
    onCollision(obj: GameObject): void {
       if(obj instanceof Player){
        this.speed.invertY()
       }else if(obj instanceof Block){
        this._reset = true
       }
    }


    get onStart():boolean{
        return this._start
    }

    static get radius():number{
        return Ball._radius
    }

}