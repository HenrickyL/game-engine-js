import { useEffect, useRef } from "react"
import { Engine } from "./Engine/Engine"
import { GameTest } from "./Game/GameTest"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      // const canvas = canvasRef.current
      // const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      // if (!context) return;
      const game = new GameTest()
      const engine = new Engine(true)
      engine.frameRate = 120
      engine.start(game)

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
