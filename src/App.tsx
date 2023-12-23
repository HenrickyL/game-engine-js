import { useEffect, useRef } from "react"
import { Position } from "./Engine/middleware/Position"
import { Geometry, Rect } from "./Engine/Geometry"
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


      const pos = new Position(40,20)
      const pos2 = new Position(40,100)
      const pos3 = new Position(40,200)

      const geo = new Rect(pos, 20, 30, Color.GREEN)
      const geo2 = new Rect(pos2, 20, 20, Color.RED)
      const geo3 = new Rect(pos3, 20, 20, Color.BLACK)



      const delta = Vector.Right


      setInterval(()=>{
        geo.translateTo(delta.prod(5))
        geo2.translateTo(delta.prod(2))
        geo3.translateTo(delta.prod(10))

        context.clearRect(0,0, 800,600)
        geo.draw(context)
        geo2.draw(context)
        geo3.draw(context)

      }, 500)
      
      
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
