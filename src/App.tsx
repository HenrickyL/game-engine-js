import { useEffect, useRef } from "react"
import { Position } from "./Engine/middleware/Position"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;
      const pos = new Position()

      console.log(pos.info)

      
  },[])

  return (
    <>
      <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        style={{border: "1px solid red"}}
      />
    </>
  )
}
export default App
