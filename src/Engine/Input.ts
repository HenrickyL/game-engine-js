import {InputKeys } from './enums'
import { Position } from './middleware/Position';

//singleton
export class Input{
    private static _instance: Input | null = null
    private static _keys: {[key in InputKeys]: boolean };
    private static _ctrl: {[key in InputKeys]: boolean };
    private static _canvas: HTMLCanvasElement
    private static _offsetX: number =0
    private static _offsetY: number =0

    private static _onMouseClick : boolean = false
    private static _mousePosition: Position = Position.Default
    private static _mouseClickPosition: Position = Position.Default
    private static _mouseWheel: number = 0
    private static _lastMouseWheelTime: number = 0
    private static _mouseWheelResetDelay: number = 500
    private static _onPositiveWheel : boolean = false


    private constructor(){
        Input._keys = Object.keys(InputKeys).reduce((acc, key) => {
            acc[key as InputKeys] = false;
            return acc;
          }, {} as { [key in InputKeys]: boolean });

        Input._ctrl = Object.keys(InputKeys).reduce((acc, key) => {
            acc[key as InputKeys] = false;
            return acc;
         }, {} as { [key in InputKeys]: boolean });

        this.eventHandle()
    }

    private eventHandle(): void{
        document.addEventListener('keydown', this.onKeyDown.bind(this))
        document.addEventListener('keyup', this.onKeyUp.bind(this))
        Input._canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        Input._canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        Input._canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
        document.addEventListener('wheel', this.onMouseWheel.bind(this))
    }
    private onKeyDown(event: KeyboardEvent):void{
        const key = event.code as InputKeys;
        Input._keys[key] = true
    }

    private onMouseMove(event: MouseEvent){
        const mouseX = event.clientX - Input._offsetX
        const mouseY = event.clientY - Input._offsetY
        Input._mousePosition.x = mouseX
        Input._mousePosition.y = mouseY
    }

    private onMouseDown(event : MouseEvent){
        const mouseX = event.clientX - Input._offsetX
        const mouseY = event.clientY - Input._offsetY
        Input._mouseClickPosition.x = mouseX
        Input._mouseClickPosition.y = mouseY
        Input._onMouseClick = true
    }

    private onMouseUp(event : MouseEvent){
        const mouseX = -1
        const mouseY = -1
        Input._mouseClickPosition.x = mouseX
        Input._mouseClickPosition.y = mouseY
        Input._onMouseClick = false
    }

    private onMouseWheel(event: WheelEvent){
        const currentTime = performance.now() 
        const elapsed = currentTime - Input._lastMouseWheelTime

        if(elapsed > Input._mouseWheelResetDelay){
            Input._mouseWheel = 0
        }else{
            const mouseWheel = event.deltaY
            Input._onPositiveWheel = mouseWheel>0
            Input._mouseWheel += Math.round(mouseWheel/150)
        }
        Input._lastMouseWheelTime = currentTime
    }

    private onKeyUp(event: KeyboardEvent){
        const key = event.code as InputKeys;
        Input._keys[key] = false
        Input._ctrl[key] = false
    }

//--------------------------------
    static keyDown(keyCode: InputKeys): boolean{
        return Input._keys[keyCode]
    }   

    static keyUp(keyCode: InputKeys) : boolean{
        return !Input._keys[keyCode]
    }  

    static keyPress(keyCode: InputKeys): boolean{
        if(Input._ctrl[keyCode]){
            if(Input.keyDown(keyCode)){
                Input._ctrl[keyCode] = false
                return true
            }
        }else if(Input.keyUp(keyCode)){
            Input._ctrl[keyCode] = true
        }
        return false
    }  


    static generate(canvas: HTMLCanvasElement): void{
        this._canvas = canvas
        const rect = this._canvas.getBoundingClientRect()
        Input._offsetX= rect.left 
        Input._offsetY= rect.top
        if(Input._instance == null){
            Input._instance = new Input()
        }
    }


    static getMouse():Position{
        return Input._mousePosition
    }

    static getMouseClick(): Position | null{
        return Input._mouseClickPosition.x === -1 ? null : Input._mouseClickPosition.copy()
    }

    static getOnWheelPositiveDirection():boolean{
        return Input._onPositiveWheel
    }

    static getMouseWheel():number{
        return Input._mouseWheel
    }

    static getOnMouseClick():boolean{
        return this._onMouseClick
    }
}