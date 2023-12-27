import { Position } from "./middleware/Position"

export class Graphics{
    private _canvas: HTMLCanvasElement| null
    private _context: CanvasRenderingContext2D | null | undefined
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
        this._canvas = document.querySelector("canvas")
        this._context = this._canvas?.getContext('2d')
        this.resize()
        this.calculateCornersAndCenters()
    }

    get canvas():HTMLCanvasElement | null {
        return this._canvas
    }
    get context():CanvasRenderingContext2D | null{
        return this._context || null
    }
    
    get width(): number{
        return this._width
    }
    get height(): number{
        return this._height
    }
    private resize():void{
        if(this._canvas){
            this._canvas.width = this._width
            this._canvas.height = this._height
        }
    }

    public clear(): void{
        if(this._context)
            this._context.clearRect(0,0, this.width, this.height)
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