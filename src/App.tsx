import { useEffect, useRef } from "react"

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      const canvas = canvasRef.current
      const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      if (!context) return;

  },[])

  return (
    <>
      <canvas></canvas>
    </>
  )
}
export default App
