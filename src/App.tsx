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


      const A = new Position(300,300)
      const B = new Position(400,300)

      const geo = new Circle(A, 50, Color.BLUE)
      geo.anchor = B
      const pA = new Point(A, false)
      pA.position = geo.position
      const pB = new Point(B, false)
      let angle = 0
      // const c = new Point(geo.position)

      setInterval(()=>{
        context.clearRect(0,0,800,600)
        geo.rotateAngle = angle
        angle++
        console.log(geo.anchor)

        geo.draw(context)
        pA.draw(context)
        pB.draw(context)
        // c.draw(context)
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
