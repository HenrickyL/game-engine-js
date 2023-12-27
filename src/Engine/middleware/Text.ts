import { Color } from "./Color";
import { Movable } from "./Movable";
import { Position } from "./Position";

export interface ITextProp{
    color?: Color
    size?: number
    font?: string
}

export class Text extends Movable{
    private _text : string
    private _font : string
    private _size : number
    private _color : Color
    private _width : number = 0;
    private _height: number = 0;
    static _canvas : HTMLCanvasElement

    constructor(text: string, position: Position, props: ITextProp = {}){
        super(position)
        this._text = text
        this._font = props.font || 'Arial'
        this._size = props.size || 16
        this._color = props.color || Color.BLACK
        this.calculateTextDimensions()
    }

    static get canvas(): HTMLCanvasElement{
        if(!Text._canvas){
            this._canvas = document.createElement('canvas')
        }
        return this._canvas;
    }
    private calculateTextDimensions(){
        const tempCanvas = Text.canvas
        const context = tempCanvas.getContext('2d')
        if(context){
            context.save()
            context.font = `${this._size}px ${this._font}`
            const textMetric = context.measureText(this._text)
            this._width = textMetric.width
            this._height = this._size
            context.restore()
        }
    }

    public draw(context: CanvasRenderingContext2D){
        context.save()
        context.font = `${this._size}px ${this._font}`
        context.fillStyle = this._color.RGBA
        context.translate(this.anchor.x, this.anchor.y);
        context.rotate(this._rotateRad);
        context.translate(-this.anchor.x, -this.anchor.y);
        context.fillText(this._text, this.x - this.width/2, this.y - this.height/2)
        context.restore()
    }


    get width() : number{
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get text(): string {
        return this._text;
    }

    set text(text) {
        this._text = text;
        this.calculateTextDimensions();
    }

    get font() {
        return this._font;
    }

    set font(font: string) {
        this._font = font;
        this.calculateTextDimensions();
    }

    set size(sizePx: number){
        this._size = sizePx;
        this.calculateTextDimensions();
    }

    get color() {
        return this._color;
    }

    set color(color: Color) {
        this._color = color;
    }


}