import { ObjLoaderPerformanceError } from "../Errors";
import { Vector } from "../middleware/Vector";
import { Mesh } from "./Mesh";
import { Triangle } from "./Triangle";
import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';


export class Test3d {
    constructor() {}

    async getObj(path: string): Promise<Mesh> {
        try {
            const object = await this.loadObject(path);
            const mesh = this.extractMeshFromObject(object);
            return mesh;
        } catch (error) {
            console.error('Error loading object:', error);
            throw error;
        }
    }

    private async loadObject(path: string): Promise<THREE.Group> {
        const loader = new OBJLoader();
        return new Promise<THREE.Group>((resolve, reject) => {
            loader.load(
                path,
                resolve,
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                reject
            );
        });
    }

    private extractMeshFromObject(object: THREE.Group): Mesh {
        const loadedMesh: THREE.Mesh[] = [];

        object.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
                loadedMesh.push(child);
            }
        });

        const mesh: Mesh = { triangles: [] };
        loadedMesh.forEach(obj => {
            const geometry = obj.geometry as THREE.BufferGeometry;
            if (geometry) {
                const positions = geometry.attributes.position.array;
                console.log(positions.length / 3);
                if (positions.length / 3 > 150000) {
                    throw new ObjLoaderPerformanceError();
                }
                this.extractTrianglesFromGeometry(mesh, positions);
            }
        });

        return mesh;
    }

    private extractTrianglesFromGeometry(mesh: Mesh, positions: THREE.TypedArray): void {
        for (let i = 0; i < positions.length; i += 9) {
            const p1: Vector = new Vector(positions[i], positions[i + 1], positions[i + 2]);
            const p2: Vector = new Vector(positions[i + 3], positions[i + 4], positions[i + 5]);
            const p3: Vector = new Vector(positions[i + 6], positions[i + 7], positions[i + 8]);
            const triangle = new Triangle([p1, p2, p3]);
            mesh.triangles.push(triangle);
        }
    }
    

    getCube(): Mesh {
        const p000: Vector = new Vector(0, 0, 0);
        const p100: Vector = new Vector(1, 0, 0);
        const p110: Vector = new Vector(1, 1, 0);
        const p010: Vector = new Vector(0, 1, 0);
        const p011: Vector = new Vector(0, 1, 1);
        const p111: Vector = new Vector(1, 1, 1);
        const p001: Vector = new Vector(0, 0, 1);
        const p101: Vector = new Vector(1, 0, 1);
    
        const triangles: Triangle[] = [
            new Triangle([p000, p010, p110]),
            new Triangle([p000, p110, p100]),
            new Triangle([p100, p110, p111]),
            new Triangle([p100, p111, p101]),
            new Triangle([p101, p111, p011]),
            new Triangle([p101, p011, p001]),
            new Triangle([p001, p011, p010]),
            new Triangle([p001, p010, p000]),
            new Triangle([p010, p011, p111]),
            new Triangle([p010, p111, p110]),
            new Triangle([p101, p001, p000]),
            new Triangle([p101, p000, p100]),
        ];
    
        return { triangles };
    }

    getHexagonalPrism(): Mesh {
        const vertices: Vector[] = [];
        const sides: number = 6; // Número de lados do hexágono
    
        // Criando os vértices do hexágono central
        vertices.push(new Vector(0, 0, 0)); // Ponto central
    
        // Gerando os vértices do hexágono em torno do ponto central
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle);
            const z = Math.sin(angle);
    
            vertices.push(new Vector(x, 0, z)); // Adiciona os pontos do hexágono
        }
        vertices.push(new Vector(1, 1, 0));
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle);
            const z = Math.sin(angle);
    
            vertices.push(new Vector(x, 1, z)); // Adiciona os pontos do hexágono
        }
    
        // Criando os triângulos para conectar cada par de pontos do hexágono central ao ponto central
        const triangles: Triangle[] = [];
        for (let i = 1; i <= sides; i++) {
            const nextI = i === sides ? 1 : i + 1;
            const triangle = new Triangle([vertices[0], vertices[i], vertices[nextI]]);
            triangles.push(triangle);
        }
    
        return { triangles };
    }

    getPyramid(): Mesh {
        const p000: Vector = new Vector(0, 0, 0);
        const p100: Vector = new Vector(1, 0, 0);
        const p010: Vector = new Vector(0.5, Math.sqrt(3) / 2, 0); // Altura da pirâmide é raiz de 3 / 2
        const p001: Vector = new Vector(0.5, Math.sqrt(3) / 6, Math.sqrt(6) / 3); // Altura da pirâmide na altura 1
    
        const triangles: Triangle[] = [
            new Triangle([p000, p100, p010]),
            new Triangle([p000, p010, p001]),
            new Triangle([p100, p001, p010]),
            new Triangle([p100, p000, p001]),
            new Triangle([p000, p010, p100]),
            new Triangle([p010, p001, p100]),
        ];
    
        return { triangles };
    }
    
}
