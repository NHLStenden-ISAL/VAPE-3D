import { Engine, Mesh, MeshBuilder, Scene, SceneLoader, TransformNode, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { SetSelectedObject } from "../Helpers/AppManager";
import "@babylonjs/loaders";

type CanvasProps = {
  antialias: boolean,
  onSceneReady: any,
  id: string,
  setSelectedObject: SetSelectedObject,
}

type modelRecord = Record<string, Mesh>;
export const models3D: modelRecord = {};

async function loadMesh(name: string, scale: number, position: Vector3, scene: Scene, onReady: () => void) {
    const { meshes } = await SceneLoader.ImportMeshAsync('', '3D-Objects/', name, scene);
    const root = MeshBuilder.CreateBox(name, { size: 1 }, scene);
    root.isVisible = false;
    root.setEnabled(false);
    //var root = new TransformNode(name);
    //root.setEnabled(false);
    for (let mesh of meshes) {
        mesh.parent = root;
        mesh.scaling = new Vector3(scale, scale, scale);
        mesh.position = position;
    }
    root.position = new Vector3(0.5, 0, 0.5);
    //root.rotation = new Vector3(-Math.PI / 2, 0, Math.PI);
    
    models3D[name] = root;
    onReady();
}

export function SceneComponent({ antialias, onSceneReady, id, setSelectedObject }: CanvasProps) {
  const rectCanvas = useRef(null);
    
  useEffect(() => {
    if (rectCanvas.current) {
      const engine = new Engine(rectCanvas.current, antialias);
        const scene = new Scene(engine);

        const adjustedPos = new Vector3(0, -0.5, 0);
        const planePos = new Vector3(0, -0.25, 0);

        loadMesh('Print-Object.obj', 0.015, adjustedPos, scene, () => {
            loadMesh('Decision-Object.obj', 0.015, adjustedPos, scene, () => {
                loadMesh('Eval-Object.obj', 0.015, adjustedPos, scene, () => {
                    loadMesh('Variable-Object.obj', 0.015, adjustedPos, scene, () => {
                        loadMesh('Robot-Object.obj', 0.015, planePos, scene, () => {
                            loadMesh('Direction-Object.obj', 0.015, adjustedPos, scene, () => {
                                if (scene.isReady()) {
                                    onSceneReady(scene, setSelectedObject);
                                } else {
                                    scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, setSelectedObject));
                                }

                                engine.runRenderLoop(() => {
                                    scene.render();
                                });
                            });
                        });
                    });
                });
            });
        });

        //if (scene.isReady()) {
        //    onSceneReady(scene, setSelectedObject);
        //} else {
        //    scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        //}

      //engine.runRenderLoop(() => {
      //  scene.render();
      //});

      const resize = () => {
        scene.getEngine().resize();
      }

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [rectCanvas]);

  return <canvas ref={rectCanvas} id={id} />;
};
