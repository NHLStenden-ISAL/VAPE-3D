import { GridMaterial } from "@babylonjs/materials";
import { MeshBuilder, Scene, Mesh, Color3, StandardMaterial, ArcRotateCamera, Vector3, Space, DynamicTexture } from "@babylonjs/core";
import { config } from "../memoryConfig";

export function createCamera(scene: Scene, canvas: any): ArcRotateCamera {
  const camera: ArcRotateCamera = new ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    3,
    Vector3.Zero(),
    scene
  );

  camera.attachControl(canvas, true);
  camera.setPosition(new Vector3(50, 40, 20));
  camera.panningSensibility = 200;

  return camera;
}

export function createGrid(scene: Scene, planeSize: number, gridRatio: number): Mesh {
  const gridMaterial = new GridMaterial('grid', scene);
  gridMaterial.gridRatio = gridRatio;
  gridMaterial.lineColor = Color3.Teal();
  gridMaterial.mainColor = new Color3(0.2, 0.2, 0.25);

  const gridObject: Mesh = createGround(scene, planeSize, 0);
  gridObject.material = gridMaterial;

  return gridObject;
}

export function createStackFrame(size: number, layer: number, scene: Scene){
  const width = config.bytesPerLine!;
  const height = size/width;
  const stackframe = MeshBuilder.CreatePlane("stackframe",{width,height},scene);
  const stackframeMaterial = new GridMaterial('stackframeGrid',scene);
  stackframe.rotation.x = Math.PI / 2;
  stackframe.position.x = 31+stackframe.getBoundingInfo().boundingBox.extendSize.x;
  stackframe.position.y = layer*5;
  if(height%2===1) stackframeMaterial.gridOffset.y = 0.5;
  stackframeMaterial.gridRatio = 1;
  stackframeMaterial.lineColor = Color3.Teal();
  stackframeMaterial.mainColor = new Color3(0.2, 0.2, 0.25);
  stackframe.material = stackframeMaterial;
  return stackframe;
}

export function createHeap(scene: Scene){
  const width = config.bytesPerLine!;
  const height = config.maxMemory!/width;
  const heap = MeshBuilder.CreatePlane("heap",{width,height},scene);
  const heapMaterial = new GridMaterial('heapGrid',scene);
  heap.rotation.x = Math.PI / 2;
  // console.log('heap dimensions are', heap.getBoundingInfo().boundingBox.extendSize);
  heap.position.z = 31+heap.getBoundingInfo().boundingBox.extendSize.y;
  heapMaterial.gridRatio = 1;
  heapMaterial.lineColor = Color3.Teal();
  heapMaterial.mainColor = new Color3(0.2, 0.2, 0.25);
  heap.material = heapMaterial;
  return heap;
}

export function createVariableField(scene: Scene, width: number, layer: number){
  const plane = MeshBuilder.CreatePlane("variableField",{width,height:1}, scene);
  const planeMaterial = new StandardMaterial("flat",scene);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = (layer*5)+0.01;
  const canvasRatio = 200;
  const cHeight = 1*canvasRatio;
  const cWidth = width*canvasRatio;
  const planeTexture = new DynamicTexture("planeTexture",{height:cHeight, width:cWidth},scene, false);
  planeMaterial.diffuseTexture = planeTexture;
  plane.material = planeMaterial;
  return plane;
}

export function createLayer(scene: Scene, planeSize: number, gridRatio: number, layer: number): Mesh {
  const gridMaterial = new GridMaterial('grid', scene);
  gridMaterial.gridRatio = gridRatio;
  gridMaterial.lineColor = Color3.Teal();
  gridMaterial.mainColor = new Color3(0.2, 0.2, 0.25);

  const gridObject: Mesh = createGround(scene, planeSize, layer);
  gridObject.material = gridMaterial;

  return gridObject;
}

function createGround(scene: Scene, size: number, layer: number): Mesh {
  const plane = MeshBuilder.CreatePlane("plane", {height: size, width: size, sideOrientation: Mesh.DOUBLESIDE});
  plane.rotation.x = Math.PI / 2;
  plane.position.y = layer;
  return plane;
  // return MeshBuilder.CreateGround('ground', { width: size, height: size }, scene);
}

export function createBox(scene: Scene, name: string, color: Color3 = Color3.White(), size: number = 1): Mesh {
  const box = MeshBuilder.CreateBox(name, { size: size }, scene);
  const boxMaterial = new StandardMaterial('color', scene);
  boxMaterial.diffuseColor = color;

  box.material = boxMaterial;

  // box.position.y = 1;

  return box;
}

export function createReturn(scene: Scene, name: string, color: Color3, size: number = 1): Mesh {
  const sphere = createBox(scene, name, color, size);
  sphere.position = new Vector3(sphere.position.x, 0, sphere.position.z);

  const dot = MeshBuilder.CreateDisc('dot', {radius: 0.3, tessellation: 64, sideOrientation: Mesh.DOUBLESIDE }, scene);
  dot.position = new Vector3(sphere.position.x, 0.5, sphere.position.z);
  dot.rotate(Vector3.Right(), Math.PI / 2, Space.LOCAL);
  dot.rotate(Vector3.Forward(), Math.PI / 2, Space.LOCAL);

  sphere.addChild(dot);

  return sphere;

}

export function createDirection(scene: Scene, name: string, color: Color3, size: number = 1): Mesh {
  const sphere = createBox(scene, name, color, size);
  sphere.position = new Vector3(sphere.position.x, 0, sphere.position.z);

  const triangle = MeshBuilder.CreateDisc('arrow', { tessellation: 3, sideOrientation: Mesh.DOUBLESIDE }, scene);
  triangle.position = new Vector3(sphere.position.x, 0.5, sphere.position.z);
  triangle.rotate(Vector3.Right(), Math.PI / 2, Space.LOCAL);
  triangle.rotate(Vector3.Forward(), Math.PI / 2, Space.LOCAL);

  sphere.addChild(triangle);

  return sphere;

}

export function createCustomMesh(scene: Scene, name: string, color: Color3, objAddress: string): Mesh {

  return createBox(scene, name, color);
  //https://www.babylonjs-playground.com/#0SHBCK#13
  //alert("Missing functionality, can't create custom mesh");
}