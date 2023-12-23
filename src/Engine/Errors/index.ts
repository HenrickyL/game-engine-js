export class ThrowError extends Error{
    private _name : string
    constructor(private _message: string) {
        super(_message)
        this._name = this.constructor.name
    }
}


export class NotImplementError extends ThrowError{
    constructor(){
        super("Method not implement")
    }
}