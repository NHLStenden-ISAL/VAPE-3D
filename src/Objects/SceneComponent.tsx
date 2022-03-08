import { Engine, Scene } from "@babylonjs/core";
import { useEffect, useRef } from "react";

export default function CreateCanvas(props: any) {
    const rectCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;

    useEffect(() => {
        if (rectCanvas.current) {
            const engine = new Engine(rectCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            if (scene.isReady()) {
                props.onSceneReady(scene);
            } else {
                scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === "function") {
                    onRender(scene);
                }

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

    return <canvas ref={rectCanvas} {...rest} />;
};
