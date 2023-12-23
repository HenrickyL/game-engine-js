import { useEffect, useRef } from "react"
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

      setInterval(()=>{
        if(Input.keyDown(InputKeys.Space)){
          console.log("x")
        }
        if(Input.keyPress(InputKeys.Space)){
          console.log("#")
        }
      },10)
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
