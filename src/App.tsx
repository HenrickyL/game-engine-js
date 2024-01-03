import { useEffect, useRef } from "react"
import { Engine } from "./Engine/Engine"
import { GameTest } from "./Game/GameTest"
import { Test3d } from "./Engine/3D/Test3d"
import { Render3d } from "./Engine/3D/Render3d"
import { Graphics } from "./Engine/Graphics"
import { InputKeys } from "./Engine/enums"
import { Input } from "./Engine/Input"
import { Color } from "./Engine/middleware/Color"


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
    // const obj = await test.getObj('./public/tree.obj')
    const forms = [
        // obj,
        test.getCube(),
        test.getHexagonalPrism(),
        test.getPyramid(),
        test.getSphere()
    ]

    let index = 0
    let mesh = forms[index]
    console.log("start")

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
        if(Input.keyDown(InputKeys.ArrowLeft)){
            angleX += 1
        }else if(Input.keyDown(InputKeys.ArrowRight)) {
            angleX -= 1
        }
        if(Input.keyPress(InputKeys.A)){
            isPoint = !isPoint
        }

        if(Input.keyPress(InputKeys.Backspace)){
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

        if(Input.keyDown(InputKeys.ArrowDown)){
            angleZ += 1
        }else if(Input.keyDown(InputKeys.ArrowUp)) {
            angleZ -= 1
        }

        if(Input.getMouseWheel() != 0){
            const value = Input.getMouseWheel()
            angleY = value*0.7
        }
    }, 100)
    setInterval(()=>{
        graph.update({angleX, angleZ, angleY})
        graph.render(mesh, {isPoint, isColor})
    }, 1000/45)
    
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
      EngineStart()
  },[])


  return (
    <>
      <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        style={{border: "1px solid black", backgroundColor: "white"}}
      />
    </>
  )
}
export default App
