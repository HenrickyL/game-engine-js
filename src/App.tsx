import { useEffect, useRef } from "react"
import { Engine } from "./Engine/Engine"
import { GameTest } from "./Game/GameTest"
import { Test3d } from "./Engine/3D/Test3d"
import { Render3d } from "./Engine/3D/Render3d"
import { Graphics } from "./Engine/Graphics"
import { InputKeys } from "./Engine/enums"
import { Input } from "./Engine/Input"
import { Color } from "./Engine/middleware/Color"
import { Point } from "./Engine/Geometry"


let start = false


const EngineStart= async()=>{

  if(!start){
    start = true
    // const game = new GameTest()
    // const engine = new Engine(true)
    // engine.start(game)
    const graphics = new Graphics()
    const test = new Test3d()
    const graph = new Render3d(graphics)
    const obj = await test.getObj('src\\public\\tree.obj')

    const forms = [
      test.getCube(),
      obj,
      test.getHexagonalPrism(),
      test.getPyramid(),
      test.getSphere()
    ]

    let index = 0
    let mesh = forms[index]
    Input.generate(graphics.canvas)
    let angleX = 0
    let angleZ = 0
    let angleY = 0
    let theta = 90


    let isColor = false
    let isPoint = false
    let z = 1
    let tick = 0.2
    setInterval(()=>{
        
      if(Input.keyPress(InputKeys.A)){
        isPoint = !isPoint
      }

      if(Input.keyPress(InputKeys.Space)){
        index = (index + 1) % forms.length
        mesh = forms[index]
      }

      if(Input.keyDown(InputKeys.W)){
        z+=tick
        graph.z = z
      }

      if(Input.keyDown(InputKeys.S)){
        z-=tick
        graph.z = z
      }


      if(Input.keyPress(InputKeys.D)){
        isColor = !isColor
      }

      if(Input.onDragY()){
        angleX = Input.dragY
      }
      if(Input.onDragX()){
        angleY = Input.dragX
      }

      if(Input.getMouseWheel() != 0){
        const value = Input.getMouseWheel()
        angleZ = value*20
      }
    }, 100)
    setInterval(()=>{
        graph.update({angleX, angleZ, angleY})
        graph.render(mesh, {isPoint, isColor})
    }, 1000/45)
  }
}


const testInput = ()=>{
  const graphics = new Graphics()
  Input.generate(graphics.canvas)
  const p = Input.getMouse()
  if(!start){
    start = true
    setInterval(()=>{
      console.log(Input.onDrag(), Input.dragX, Input.dragY)
    },100)
  }
}



function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  //main - Engine
  useEffect(()=>{
    if(!canvasRef.current) return 
      // const canvas = canvasRef.current
      // const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
      // if (!context) return;

      const asyncFunc = async()=>{
        try {
          await EngineStart()
          // testInput()
        } catch (error) {
          console.error(error)
        }
      }
      asyncFunc()
  },[])


  return (
    <>
      <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        style={{border: "1px solid white"}}
      />
    </>
  )
}
export default App
