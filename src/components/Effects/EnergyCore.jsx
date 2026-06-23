import { useRef, useContext } from "react";
import { useFrame } from "@react-three/fiber";

import {
AudioContextState,
} from "../Audio/AudioContext";

export default function EnergyCore({
analyser,
}) {
const meshRef = useRef();

const { theme } =
useContext(AudioContextState);

useFrame(() => {
if (!meshRef.current) return;

let scale = 1;

if (analyser) {
  const dataArray = new Uint8Array(
    analyser.frequencyBinCount
  );

  analyser.getByteFrequencyData(
    dataArray
  );

  const bass =
    dataArray
      .slice(0, 20)
      .reduce((a, b) => a + b, 0) / 20;

  scale = 1 + bass / 400;
}

meshRef.current.scale.set(
  scale,
  scale,
  scale
);

meshRef.current.rotation.y += 0.01;

});

const color =
theme === "fire"
? "#ff6600"
: "#00ffff";

return (
<mesh ref={meshRef}>
<sphereGeometry
args={[1, 128, 128]}
/>

  <meshStandardMaterial
    color={color}
    emissive={color}
    emissiveIntensity={5}
  />
</mesh>

);
}