import { MeshBuilder, Scene, Mesh, Color3, StandardMaterial, ArcRotateCamera, Vector3, Camera } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";

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
  camera.setPosition(new Vector3(-7, 7, -7));

  return camera;
}

export function createGrid(scene: Scene, planeSize: number, gridRatio: number): Mesh {
  const gridMaterial = new GridMaterial('grid', scene);
  gridMaterial.gridRatio = gridRatio;

  const gridObject: Mesh = createGround(scene, planeSize);
  gridObject.material = gridMaterial;

  return gridObject;
}

function createGround(scene: Scene, size: number): Mesh {
  return MeshBuilder.CreateGround('ground', { width: size, height: size }, scene);
}

export function createBox(scene: Scene, color: Color3 = Color3.White(), size: number = 1): Mesh {
  const box = MeshBuilder.CreateBox('box', { size: size }, scene);
  const boxMaterial = new StandardMaterial('color', scene);
  boxMaterial.diffuseColor = color;

  box.material = boxMaterial;

  return box;
}

export function createSphere(scene: Scene, size: number = 1): Mesh {
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: size }, scene);

  return sphere;
}