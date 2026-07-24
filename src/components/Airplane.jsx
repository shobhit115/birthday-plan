import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Airplane({ scrollProgress }) {
  const { scene } = useGLTF("/plane.glb");
  const planeRef = useRef();

  useFrame(() => {
    if (!planeRef.current) return;

    const plane = planeRef.current;
    const t = scrollProgress.get();

    // -----------------------------
    // Phase 1 : Hidden
    // -----------------------------
    if (t < 0.45) {
      plane.visible = false;
      return;
    }

    plane.visible = true;

    // -----------------------------
    // Phase 2 : Fly towards camera
    // -----------------------------
    if (t < 0.70) {
      const p = (t - 0.45) / 0.25;

      plane.position.x = -10 + p * 10;
      plane.position.y = -6 + p * 6;
      plane.position.z = 35 - p * 35;

      const s = 0.15 + p * 4;
      plane.scale.set(s, s, s);

      plane.rotation.x = 0.3;
      plane.rotation.y = Math.PI - 0.3;
      plane.rotation.z = -0.15;
    }

    // -----------------------------
    // Phase 3 : Pull up & bank right
    // -----------------------------
    else if (t < 0.85) {
      const p = (t - 0.70) / 0.15;

      plane.position.x = p * 10;
      plane.position.y = p * 10;
      plane.position.z = -p * 20;

      const s = 4 - p * 2.8;
      plane.scale.set(s, s, s);

      plane.rotation.x = 0.3;
      plane.rotation.y = Math.PI - 0.3;
      plane.rotation.z = -0.15;
    }

    // -----------------------------
    // Phase 4 : Fly away
    // -----------------------------
    else {
      const p = (t - 0.85) / 0.15;

      plane.position.x = 10 + p * 15;
      plane.position.y = 10 + p * 20;
      plane.position.z = -20 - p * 60;

      const s = 1.2 - p * 1.1;
      plane.scale.set(Math.max(s, 0.05), Math.max(s, 0.05), Math.max(s, 0.05));

      plane.rotation.x = 0.3;
      plane.rotation.y = Math.PI - 0.3;
      plane.rotation.z = -0.15;
    }
  });

  return <primitive ref={planeRef} object={scene} />;
}

useGLTF.preload("/plane.glb");