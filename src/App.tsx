import { useEffect, useRef } from "react"
import { Position } from "./Engine/middleware/Position"
import { Geometry, Point, Rect } from "./Engine/Geometry"
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


      const pos = new Position(400,300)
      const anchor = new Position(400,300)

      const geo = new Rect(pos, 50, 50, Color.GREEN)
      const p = new Point(anchor, false)
      p.position = anchor
      
      geo.anchor = anchor

      const offSetX = 5
      const offsetAngle = 5
      anchor.x += 50

      setInterval(()=>{
        context.clearRect(0,0,800,600)

        geo.rotateAngle += offsetAngle
        // anchor.x += offSetX

        geo.draw(context)
        p.draw(context)
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
