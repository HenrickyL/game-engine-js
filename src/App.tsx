import { useEffect, useRef } from "react"
import { Position } from "./Engine/middleware/Position"
import { Geometry, Point, Rect, Circle, Line, Polygon } from "./Engine/Geometry"
import { Color } from "./Engine/middleware/Color"
import { Vector } from "./Engine/middleware/Vector"
import { Input } from "./Engine/Input"
import { InputKeys } from "./Engine/enums"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;

      Input.generate()
      const A = new Position(200,150)
      const B = new Position(300,450)
      const C = new Position(150,500)
      const center = new Position(400,300)

      const geo = new Polygon(center, [A,B, C], Color.BLUE)
      const pA = new Point(A, false)
      const pB = new Point(B, false)
      const pC = new Point(C, false)
      const pCenter = new Point(center, false, Color.GREEN)
      pCenter.position = geo.position

      let angle = 0
      // const c = new Point(geo.position)

      setInterval(()=>{
        context.clearRect(0,0,800,600)
        geo.rotateAngle = angle
        angle++
        handleInput(geo)
        geo.draw(context)
        pA.draw(context)
        pB.draw(context)
        pC.draw(context)
        pCenter.draw(context)
      }, 50)


  },[])


  const handleInput = (pos: Geometry)=>{
    if(Input.keyDown(InputKeys.ArrowUp)){
      pos.translateTo(Vector.Up)
    }else if(Input.keyDown(InputKeys.ArrowDown)){
      pos.translateTo(Vector.Down)
    }

    if(Input.keyDown(InputKeys.ArrowLeft)){
      pos.translateTo(Vector.Left)
    }else if(Input.keyDown(InputKeys.ArrowRight)){
      pos.translateTo(Vector.Right)
    }
  }

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
