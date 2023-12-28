import { useEffect, useRef } from "react"
import { Engine } from "./Engine/Engine"
import { GameTest } from "./Game/GameTest"


let start = false


const EngineStart= ()=>{
  if(!start){
    start = true
    const game = new GameTest()
    const engine = new Engine(true)
    engine.start(game)
  }
}


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      // const canvas = canvasRef.current
      // const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      // if (!context) return;
      EngineStart()
  },[])


  return (
    <>
      <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        style={{border: "1px solid black"}}
      />
    </>
  )
}
export default App
