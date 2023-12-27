import { useEffect, useRef } from "react"
import { Position } from "./Engine/middleware/Position"
import { Geometry, Point, Rect, Circle, Line, Polygon } from "./Engine/Geometry"
import { Color } from "./Engine/middleware/Color"
import { Vector } from "./Engine/middleware/Vector"
import { Input } from "./Engine/Input"
import { InputKeys } from "./Engine/enums"
import { Graphics } from "./Engine/Graphics"
import { Engine } from "./Engine/Engine"
import { GameTest } from "./Game/GameTest"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;
      const game = new GameTest()
      const engine = new Engine()
      engine.start(game)

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
