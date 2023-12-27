import { GameNotDefinedInEngineError } from "./Errors";
import { Graphics } from "./Graphics";
import { Input } from "./Input";
import { Timer } from "./Timer";
import { InputKeys } from "./enums";
import { IGame } from "./interfaces/IGame";

export class Engine{
    //fps
    //graphic
    //gameloop
    //game
    private _game : IGame | undefined
    private _graphics : Graphics | undefined
    private _screenWidth: number = 800
    private _screenHeight: number = 600
    private _timer : Timer
    private _onPause: boolean = false

    constructor(){
        this._timer = new Timer()
    }


    start(game: IGame){
        this._graphics = new Graphics(this.screenWidth, this.screenHeight)
        this._game = game
        Input.generate()
        this.loop()
    }

    private loop(){
        if(!this._game){
            throw new GameNotDefinedInEngineError()
        }
        this._timer.resetTimer()
        requestAnimationFrame(this.mainLoop)
    }


    private mainLoop = ()=>{
        this.verifyPause()
        if(this._game && this._graphics && this._graphics.context && !this._onPause){
            this._game.update()
            this._graphics.clear()
            this._game.draw(this._graphics.context)
        }
        requestAnimationFrame(this.mainLoop)
    }

    private verifyPause():void{
        if(Input.keyPress(InputKeys.Pause)){
            this._onPause = !this._onPause
            console.log('Pause')
        }
    }




    set screenWidth(value: number){
        this._screenWidth = value
    }
    set screenHeight(value: number){
        this._screenHeight = value
    }

    get screenHeight():number{
        return this._screenHeight
    }
    get screenWidth():number{
        return this._screenWidth
    }
}