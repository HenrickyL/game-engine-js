import { useEffect, useRef } from "react"
import { Geometry, Point, Rect, Circle, Line, Polygon } from "./Engine/Geometry"
import { Vector } from "./Engine/middleware/Vector"
import { Input } from "./Engine/Input"
import { InputKeys } from "./Engine/enums"
import { Engine } from "./Engine/Engine"
import { GameTest } from "./Game/GameTest"
import { Position } from "./Engine/middleware/Position"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;
      // const game = new GameTest()
      // const engine = new Engine(true)
      // engine.frameRate = 120
      // engine.start(game)

      Input.generate(canvas)
      const mouse = new Point(Position.Default)
      mouse.position = Input.getMouse()

      setInterval(()=>{
        context.clearRect(0,0,800,600)
        mouse.draw(context)
      },50)


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
