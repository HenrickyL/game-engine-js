export class Matrix4x4{
    private _matrix:Array<Array<number>>

    constructor(){
        this._matrix = new Array<Array<number>>(4)
        for(let i=0; i< 4; i++){
            this._matrix[i] = new Array<number>(4).fill(0)
        }
    }
   

    public get(i:number,j:number): number{
        return this._matrix[i][j]
    }

    set(i:number, j:number, value: number):void{
        this._matrix[i][j] = value
    }

    get matrix(): Array<Array<number>>{
        return this._matrix
    }
}