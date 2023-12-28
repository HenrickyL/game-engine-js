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


export class PolygonEdgesError extends ThrowError{
    constructor(){
        super("The polygon must have at least 3 edges.")
    }
}

export class GameNotDefinedInEngineError extends ThrowError{
    constructor(){
        super("No game provided. Please provide a valid game object to Engine.")
    }
}

export class GeometryParamInvalidError extends ThrowError{
    constructor(){
        super("this Geometry Param is invalid.")
    }
}