import { Engine, Scene } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { SetSelectedObject } from "../Helpers/AppManager";

type CanvasProps = {
  antialias: boolean,
  onSceneReady: any,
  id: string,
  setSelectedObject: SetSelectedObject,
}

export default function CreateCanvas({ antialias, onSceneReady, id, setSelectedObject }: CanvasProps) {
  const rectCanvas = useRef(null);

  useEffect(() => {
    if (rectCanvas.current) {
      const engine = new Engine(rectCanvas.current, antialias);
      const scene = new Scene(engine);
      if (scene.isReady()) {
        onSceneReady(scene, setSelectedObject);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        scene.render();
      });

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
