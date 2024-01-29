export abstract class MathMiddleware{
    static randInt(ini:number, final: number): number{
        return Math.floor(MathMiddleware.randFloat(ini, final))
    }

    static randFloat(ini:number, final: number): number{
        return Math.random() * (final- ini) + ini
    }

    static clamp(value:number, min:number, max:number):number {
        return Math.max(min, Math.min(max, value));
    }

    static adjustPrecision(num: number, precision:number):number{
        const multiply = Math.pow(10,precision)
        return Math.round(num * multiply) / multiply
    }
}