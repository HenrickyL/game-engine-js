import { useEffect, useRef } from "react"
import { Timer } from "./Engine/Timer"


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;
      const timer = new Timer()

      setTimeout(()=>{
        timer.stopTimer()
      },2000)

      setTimeout(()=>{
        timer.startTimer()
      },5000)

      setTimeout(()=>{
        timer.resetTimer()
      },8000)

      setInterval(()=>{
          console.log(timer.getElapsedSeconds())
      },500)
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
