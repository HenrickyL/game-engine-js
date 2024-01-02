import { Graphics } from "../Engine/Graphics";
import { Input } from "../Engine/Input";
import { ObjectGroup, Scene } from "../Engine/Scene";
import { InputKeys } from "../Engine/enums";
import { IGame } from "../Engine/interfaces/IGame";
import { Position } from "../Engine/middleware/Position";
import { Ball } from "./Ball";
import { Block } from "./Block";
import { Player } from "./Player";

export class GameTest implements IGame{
    private _graphics : Graphics  = new Graphics()
    private _scene: Scene
    private _ball: Ball  = new Ball()

    constructor(){
        this._scene = new Scene()
    }

    init(graphic: Graphics): void {
        this._graphics = graphic
        const bottomCenter = this._graphics.bottomCenter
        const posPlayer = new Position(bottomCenter.x, bottomCenter.y -50)
        const player = new Player(posPlayer)
        this._scene.add(player, ObjectGroup.MOVING)

        this._ball = new Ball(player)
        this._scene.add(this._ball, ObjectGroup.MOVING)

        const qtdX = 5
        const qtdY = 5
        const offsetX = 80
        const offsetY = 50
        const width = this._graphics.width
        let posX = width/qtdX + 50
        let posY = 50
        for(let i=0; i< qtdY; i++){
            posX = width/qtdX + 50
            for(let j=0; j< qtdX; j++){
                let pos = new Position(posX, posY)
                const block = new Block(pos,this.removeBlock)
                this._scene.add(block, ObjectGroup.STATIC)
                posX += offsetX
            }
            posY += offsetY
        }
    }

    private removeBlock =  (block: Block):void=>{
        this._scene.remove(block, ObjectGroup.STATIC)
    }
    update(): void {
        if(Input.keyPress(InputKeys.Space)){
            this._ball.start()
        }
        this._scene.update()
        this._scene.collisionDetection()
    }

    draw(context: CanvasRenderingContext2D): void {
        this._scene.draw(context)
    }

    
}



