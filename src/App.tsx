import { useEffect, useRef } from "react"
import { Position } from "./Engine/middleware/Position"
import { Geometry, Point, Rect, Circle, Line } from "./Engine/Geometry"
import { Color } from "./Engine/middleware/Color"
import { Vector } from "./Engine/middleware/Vector"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;


      const A = new Position(200,300)
      const B = new Position(500,200)

      const geo = new Line(A, B, Color.BLUE)
      const pA = new Point(A, false)
      const pB = new Point(B, false)
      const c = new Point(geo.position)

      setInterval(()=>{
        context.clearRect(0,0,800,600)

        // anchor.x += offSetX

        geo.draw(context)
        pA.draw(context)
        pB.draw(context)
        c.draw(context)
      }, 50)


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
