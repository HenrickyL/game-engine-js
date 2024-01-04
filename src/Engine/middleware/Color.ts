import { MathMiddleware } from ".";

export class Color {
    private static _black: Color;
    private static _red: Color;
    private static _blue: Color;
    private static _green: Color;
    private static _yellow: Color;
    private static _white: Color;
    private static _transparent: Color;


    constructor(
        private _r: number,
        private _g: number,
        private _b: number,
        private _a: number = 1
    ) {}
    //

    modifyColor(luminosity: number): Color {
        const modifiedR = Math.round(this._r * luminosity);
        const modifiedG = Math.round(this._g * luminosity);
        const modifiedB = Math.round(this._b * luminosity);

        return new Color(modifiedR, modifiedG, modifiedB, this._a);
    }

    //

    get r(): number {
        return this._r;
    }
    get g(): number {
        return this._g;
    }
    get b(): number {
        return this._b;
    }
    get alpha(): number {
        return this._a;
    }
    set alpha(value: number) {
        this._a = value;
    }

    get RGBA(): string {
        return `rgba(${this.r},${this.g},${this.b},${this.alpha})`;
    }

    get RGB(): string {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    static getRandom():Color{
        const rand = MathMiddleware.randInt
        return new Color(rand(0,255), rand(0,255), rand(0,255))
    }

    static get BLACK(): Color {
        if (!Color._black) {
            Color._black = new Color(0, 0, 0);
        }
        return Color._black;
    }

    static get RED(): Color {
        if (!Color._red) {
            Color._red = new Color(255, 0, 0);
        }
        return Color._red;
    }

    static get BLUE(): Color {
        if (!Color._blue) {
            Color._blue = new Color(0, 0, 255);
        }
        return Color._blue;
    }

    static get GREEN(): Color {
        if (!Color._green) {
            Color._green = new Color(0, 255, 0);
        }
        return Color._green;
    }

    static get YELLOW(): Color {
        if (!Color._yellow) {
            Color._yellow = new Color(255, 255, 0);
        }
        return Color._yellow;
    }

    static get WHITE(): Color {
        if (!Color._white) {
            Color._white = new Color(255, 255, 255);
        }
        return Color._white;
    }

    static get TRANSPARENT(): Color {
        if (!Color._transparent) {
            Color._transparent = new Color(255, 255, 255, 0);
        }
        return Color._transparent;
    }
}
