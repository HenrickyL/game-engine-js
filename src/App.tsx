import { useEffect, useRef } from "react"
import { Position } from "./Engine/middleware/Position"
import { Geometry, Rect } from "./Engine/Geometry"
import { Color } from "./Engine/middleware/Color"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;

      try {

        context.clearRect(0,0, 800,600)
        const pos = new Position(40,20)
        const geo = new Rect(pos, 20, 30, Color.GREEN)
        geo.draw(context)
      } catch (error) {
        console.error(error)
      }
      
      
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
