import { MathMiddleware } from "./middleware"

export class Timer{
    private start: number
    private end: number
    private stopped: boolean

    constructor(){
        this.start = 0
        this.end = 0
        this.stopped = false
    }


    startTimer():void{
        if(this.stopped){
            const elapsed = this.end - this.start
            this.start = performance.now() - elapsed
            this.stopped = false
        }else{
            this.start = performance.now()
        }
    }

    stopTimer():void{
        this.end = performance.now()
        this.stopped = true
    }


    resetTimer(): number{
        let elapsed = 0
        if(this.stopped){
            elapsed = this.end - this.start
            this.start = performance.now()
            this.stopped = false
        }else{
            this.end = performance.now()
            elapsed = this.end - this.start
            this.start = this.end 
        }
        return elapsed
    }


    getElapsedMiliSeconds(): number{
        if(!this.stopped){
            this.end = performance.now()
        }
        const elapsed = this.end - this.start
        return elapsed

    }

    getElapsedSeconds(): number{
        let time = (this.getElapsedMiliSeconds() / 1000)

        
        return MathMiddleware.adjustPrecision(time,3)
    }
}