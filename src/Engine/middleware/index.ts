export function randInt(ini:number, final: number): number{
    return Math.floor(randFloat(ini, final))
}


export function randFloat(ini:number, final: number): number{
    return Math.random() * (final- ini) + ini
}