export class Color{

    constructor( 
        private _r:number, 
        private _g: number, 
        private _b:number,
        private _a:number = 1){
    }


    get r():number{
        return this._r
    }
    get g():number{
        return this._g
    }
    get b():number{
        return this._b
    }
    get alpha():number{
        return this._a
    }
    set alpha(value: number){
        this._a = value
    }

    get RGBA(): string{
        return `rgba(${this.r},${this.g},${this.b},${this.alpha})`;
    }

    get RGB(): string{
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    //atributos Staticos
    static get RED() {
        return new Color(255, 0, 0);
    }

    static get BLUE() {
        return new Color(0, 0, 255);
    }

    static get GREEN() {
        return new Color(0, 255, 0);
    }

    static get YELLOW() {
        return new Color(255, 255, 0);
    }

    static get BLACK() {
        return new Color(0, 0, 0);
    }

    static get WHITE() {
        return new Color(255, 255, 255);
    }
    

}