import { ObjLoaderPerformanceError } from "../Errors";
import { Color } from "../middleware/Color";
import { Mesh } from "./Mesh";
import { Triangle, TriangleMiddleware } from "./Triangle";
import {Vector3d} from './Vector3d'
import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';


export class Test3d {
    constructor() {}

    async getObj(path: string): Promise<Mesh> {
        try {
            const loader = new OBJLoader();
            const object = await new Promise((resolve, reject) => {
                loader.load(
                    path,
                    resolve,
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    reject
                );
            }) as THREE.Group;
            let loadedMesh: THREE.Mesh[] = [];

            // Encontra um mesh entre as crianças do objeto carregado
            object.children.forEach((child) => {
                if (child instanceof THREE.Mesh) {
                    loadedMesh.push(child);
                }
            });
            const mesh: Mesh = { triangles:[] };
            loadedMesh.forEach(obj=>{
                const geometry = obj.geometry as THREE.BufferGeometry;
                if (geometry) {
                    const positions = geometry.attributes.position.array;
                    console.log(positions.length/3)
                    // if(positions.length/3 > 150000){
                    //     throw new ObjLoaderPerformanceError()
                    // }
                    for (let i = 0; i < positions.length; i += 9) {
                        const p1: Vector3d = { x: positions[i], y: positions[i + 1], z: positions[i + 2] };
                        const p2: Vector3d = { x: positions[i + 3], y: positions[i + 4], z: positions[i + 5] };
                        const p3: Vector3d = { x: positions[i + 6], y: positions[i + 7], z: positions[i + 8] };
                        const triangle = TriangleMiddleware.generate([p1,p2,p3])
                        mesh.triangles.push(triangle)
                    }
                }
            })
            return mesh
            
            throw new Error('Object is not an instance of THREE.Mesh');
        } catch (error) {
            console.error('Error loading object:', error);
            throw error;
        }
    }
    

    

    getCube(): Mesh {
        const p000: Vector3d = { x: 0, y: 0, z: 0 };
        const p100: Vector3d = { x: 1, y: 0, z: 0 };
        const p110: Vector3d = { x: 1, y: 1, z: 0 };
        const p010: Vector3d = { x: 0, y: 1, z: 0 };
        const p011: Vector3d = { x: 0, y: 1, z: 1 };
        const p111: Vector3d = { x: 1, y: 1, z: 1 };
        const p001: Vector3d = { x: 0, y: 0, z: 1 };
        const p101: Vector3d = { x: 1, y: 0, z: 1 };
    
        const triangles: Triangle[] = [
            TriangleMiddleware.generate([p000, p010, p110]),
            TriangleMiddleware.generate([p000, p110, p100]),
            TriangleMiddleware.generate([p100, p110, p111]),
            TriangleMiddleware.generate([p100, p111, p101]),
            TriangleMiddleware.generate([p101, p111, p011]),
            TriangleMiddleware.generate([p101, p011, p001]),
            TriangleMiddleware.generate([p001, p011, p010]),
            TriangleMiddleware.generate([p001, p010, p000]),
            TriangleMiddleware.generate([p010, p011, p111]),
            TriangleMiddleware.generate([p010, p111, p110]),
            TriangleMiddleware.generate([p101, p001, p000]),
            TriangleMiddleware.generate([p101, p000, p100]),
        ];
    
        return { triangles };
    }

    getHexagonalPrism(): Mesh {
        const vertices: Vector3d[] = [];
        const sides: number = 6; // Número de lados do hexágono
    
        // Criando os vértices do hexágono central
        vertices.push({ x: 0, y: 0, z: 0 }); // Ponto central
    
        // Gerando os vértices do hexágono em torno do ponto central
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle);
            const z = Math.sin(angle);
    
            vertices.push({ x, y: 0, z }); // Adiciona os pontos do hexágono
        }
        vertices.push({ x: 1, y: 1, z: 0 });
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle);
            const z = Math.sin(angle);
    
            vertices.push({ x, y: 1, z }); // Adiciona os pontos do hexágono
        }
    
        // Criando os triângulos para conectar cada par de pontos do hexágono central ao ponto central
        const triangles: Triangle[] = [];
        for (let i = 1; i <= sides; i++) {
            const nextI = i === sides ? 1 : i + 1;
            const triangle = TriangleMiddleware.generate([vertices[0], vertices[i], vertices[nextI]])
            triangles.push(triangle);
        }
    
        return { triangles };
    }

    getPyramid(): Mesh {
        const p000: Vector3d = { x: 0, y: 0, z: 0 };
        const p100: Vector3d = { x: 1, y: 0, z: 0 };
        const p010: Vector3d = { x: 0.5, y: Math.sqrt(3) / 2, z: 0 }; // Altura da pirâmide é raiz de 3 / 2
        const p001: Vector3d = { x: 0.5, y: Math.sqrt(3) / 6, z: Math.sqrt(6) / 3 }; // Altura da pirâmide na altura 1
    
        const triangles: Triangle[] = [
            TriangleMiddleware.generate([p000, p100, p010]),
            TriangleMiddleware.generate([p000, p010, p001]),
            TriangleMiddleware.generate([p100, p001, p010]),
            TriangleMiddleware.generate([p100, p000, p001]),
            TriangleMiddleware.generate([p000, p010, p100]),
            TriangleMiddleware.generate([p010, p001, p100]),
        ];
    
        return { triangles };
    }
    

    getSphere(subdivisions: number = 4): Mesh {
        const vertices: Vector3d[] = [];
        const sides: number = 12; // Número de lados do polígono (dodecágono)
        const radius: number = 1; // Raio da esfera
    
        // Criação dos vértices em uma esfera
        for (let i = 0; i < sides; i++) {
            const lat = (-Math.PI / 2) + (Math.PI / sides) * i;
            const z = Math.sin(lat) * radius;
    
            const cosLat = Math.cos(lat);
            for (let j = 0; j < sides; j++) {
                const lon = (Math.PI * 2 / sides) * j;
                const x = Math.cos(lon) * cosLat * radius;
                const y = Math.sin(lon) * cosLat * radius;
                vertices.push({ x, y, z });
            }
        }
    
        // Criação dos triângulos para formar os dodecágonos (polígonos de 12 lados)
        const triangles: Triangle[] = [];
        for (let i = 0; i < vertices.length; i++) {
            const v1 = vertices[i];
            const v2 = vertices[(i + 1) % vertices.length];
            const v3 = vertices[(i + sides) % vertices.length];
            const v4 = vertices[(i + sides + 1) % vertices.length];
            const t1 = TriangleMiddleware.generate([v1, v3, v2])
            const t2 = TriangleMiddleware.generate([v2, v3, v4])

            triangles.push(t1);
            triangles.push(t2);
        }
    
        return { triangles };
    }
    
    

}
