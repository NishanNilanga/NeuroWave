import { useRef, useMemo, useContext } from "react";
import { useFrame } from "@react-three/fiber";

import {
  AudioContextState,
} from "../Audio/AudioContext";

export default function ParticleGalaxy({
  analyser,
}) {
  const pointsRef = useRef();

  const { theme } =
    useContext(AudioContextState);

  const particleCount = 5000;

  const positions = useMemo(() => {
    const arr = new Float32Array(
      particleCount * 3
    );

    for (
      let i = 0;
      i < particleCount * 3;
      i++
    ) {
      arr[i] =
        (Math.random() - 0.5) * 40;
    }

    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    let intensity = 1;

    if (analyser) {
      const data =
        new Uint8Array(
          analyser.frequencyBinCount
        );

      analyser.getByteFrequencyData(
        data
      );

      const bass =
        data
          .slice(0, 20)
          .reduce(
            (a, b) => a + b,
            0
          ) / 20;

      intensity =
        1 + bass / 250;
    }

    pointsRef.current.rotation.y +=
      0.0005;

    pointsRef.current.rotation.x =
      Math.sin(
        clock.elapsedTime * 0.1
      ) * 0.05;

    pointsRef.current.scale.set(
      intensity,
      intensity,
      intensity
    );
  });

  const color =
    theme === "fire"
      ? "#ff7b00"
      : theme === "galaxy"
      ? "#8a2be2"
      : theme === "cyberpunk"
      ? "#ff00ff"
      : "#00ffff";

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        color={color}
        transparent
        opacity={0.9}
      />
    </points>
  );
}