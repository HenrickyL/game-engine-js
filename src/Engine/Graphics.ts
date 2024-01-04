import { CanvasContextError, CanvasHTMLElementNotFoundError } from "./Errors"
import { Position } from "./middleware/Position"

export class Graphics{
    private _canvas: HTMLCanvasElement
    private _context: CanvasRenderingContext2D
    private _width: number 
    private _height: number


    private _topLeft: Position = Position.Default
    private _topCenter: Position = Position.Default
    private _topRight: Position = Position.Default
    private _middleLeft: Position = Position.Default
    private _middleCenter: Position = Position.Default
    private _middleRight: Position = Position.Default
    private _bottomLeft: Position = Position.Default
    private _bottomCenter: Position = Position.Default
    private _bottomRight: Position = Position.Default

    constructor(width: number = 800, height: number =600){
        this._width = width
        this._height = height
        const canvas = document.querySelector("canvas")
        if(canvas){
            this._canvas = canvas
            const context = this._canvas.getContext('2d')
            if(context){
                this._context = context
            }else{
                throw new CanvasContextError()
            }
            this.resize()
        }else{
            throw new CanvasHTMLElementNotFoundError()
        }
        
    }

    get canvas():HTMLCanvasElement {
        return this._canvas
    }
    get context():CanvasRenderingContext2D{
        return this._context
    }
    
    get width(): number{
        return this._width
    }
    get height(): number{
        return this._height
    }

    setScreen(width: number, height: number){
        this._width = width
        this._height = height
        this.resize();
    }
    private resize():void{
        if(this._canvas){
            this._canvas.width = this._width
            this._canvas.height = this._height
            this.calculateCornersAndCenters()
        }
    }

    public clear(): void{
        if(this._context){
            this._context.fillStyle = "gray"
            this._context.clearRect(0,0, this.width, this.height)
            this._context.fillRect(0,0, this.width, this.height)
        }
    }

    private calculateCornersAndCenters() {
        this._topLeft = new Position(0, 0);
        this._topCenter = new Position(this.width / 2, 0);
        this._topRight = new Position(this.width, 0);
        this._middleLeft = new Position(0, this.height / 2);
        this._middleCenter = new Position(this.width / 2, this.height / 2);
        this._middleRight = new Position(this.width, this.height / 2);
        this._bottomLeft = new Position(0, this.height);
        this._bottomCenter = new Position(this.width / 2, this.height);
        this._bottomRight = new Position(this.width, this.height);
    }


    get topLeft(): Position {
        return this._topLeft;
    }

    get topCenter(): Position {
        return this._topCenter;
    }

    get topRight(): Position {
        return this._topRight;
    }

    get middleLeft() {
        return this._middleLeft;
    }

    get middleCenter(): Position {
        return this._middleCenter;
    }

    get middleRight(): Position {
        return this._middleRight;
    }

    get bottomLeft(): Position {
        return this._bottomLeft;
    }

    get bottomCenter(): Position {
        return this._bottomCenter;
    }

    get bottomRight(): Position {
        return this._bottomRight;
    }
}