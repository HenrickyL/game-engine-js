import { useEffect, useRef } from "react"
import { Engine } from "./Engine/Engine"
import { GameTest } from "./Game/GameTest"
import { Test3d } from "./Engine/3D/Test3d"
import { Render3d } from "./Engine/3D/Render3d"
import { Graphics } from "./Engine/Graphics"
import { InputKeys } from "./Engine/enums"
import { Input } from "./Engine/Input"
import { Color } from "./Engine/middleware/Color"
import { Point, Polygon } from "./Engine/Geometry"
import { Vector3d } from "./Engine/3D/Vector3d"


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
    const tree = await test.getObj('src\\public\\tree.obj')
    const sphere = await test.getObj('src\\public\\sphere.obj')
    const object = await test.getObj('src\\public\\Jeep.obj')


    const forms = [
      test.getCube(),
      test.getHexagonalPrism(),
      test.getPyramid(),
      tree,
      sphere,
      object,
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
        let mult = 1
        if(Input.keyDown(InputKeys.ShiftLeft)){
          mult = 5
        }
        z+=tick*mult
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

  if(!start){
    start = true
    const a1:Vector3d = {x:10,y:100,z:100}
    const a2:Vector3d = {x:70,y:40,z:0}
    const a3:Vector3d = {x:20,y:200,z:0}

    const b1:Vector3d = {x:40,y:50,z:0}
    const b2:Vector3d = {x:70,y:40,z:40}
    const b3:Vector3d = {x:20,y:200,z:0}

    const color = new Color(0, 255, 0)

    Polygon.draw(graphics.context,[a1, a2,a3],{fillColor:Color.RED})
    Polygon.draw(graphics.context,[b1, b2,b3],{fillColor: color})

    Point.draw(graphics.context,[a1,a2,a3],{color: Color.BLACK, size:5})
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
