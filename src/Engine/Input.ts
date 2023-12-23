//singleton
import {InputKeys } from './enums'


export class Input{
    private static instance: Input | null = null
    private static  keys: {[key in InputKeys]: boolean };
    private static  ctrl: {[key in InputKeys]: boolean };

    private constructor(){
        Input.keys = Object.keys(InputKeys).reduce((acc, key) => {
            acc[key as InputKeys] = false;
            return acc;
          }, {} as { [key in InputKeys]: boolean });

        Input.ctrl = Object.keys(InputKeys).reduce((acc, key) => {
        acc[key as InputKeys] = false;
        return acc;
        }, {} as { [key in InputKeys]: boolean });

        this.eventHandle()
    }

    private eventHandle(): void{
        document.addEventListener('keydown', this.onKeyDown.bind(this))
        document.addEventListener('keyup', this.onKeyUp.bind(this))

    }
    private onKeyDown(event: KeyboardEvent):void{
        const key = event.code as InputKeys;
        Input.keys[key] = true
    }

    private onKeyUp(event: KeyboardEvent){
        const key = event.code as InputKeys;
        Input.keys[key] = false
        Input.ctrl[key] = false
    }


    static keyDown(keyCode: InputKeys): boolean{
        return Input.keys[keyCode]
    }   

    static keyUp(keyCode: InputKeys) : boolean{
        return !Input.keys[keyCode]
    }  

    static keyPress(keyCode: InputKeys): boolean{
        if(Input.ctrl[keyCode]){
            if(Input.keyDown(keyCode)){
                Input.ctrl[keyCode] = false
                return true
            }
        }else if(Input.keyUp(keyCode)){
            Input.ctrl[keyCode] = true
        }
        return false
    }  


    static generate(): void{
        if(Input.instance == null){
            Input.instance = new Input()
        }
    }

}