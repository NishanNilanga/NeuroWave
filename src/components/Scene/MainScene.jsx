import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useContext } from "react";
import CameraController from "./CameraController";
import NeuralNetwork from "../Particles/NeuralNetwork";

import ParticleGalaxy from "../Particles/ParticleGalaxy";
import EnergyCore from "../Effects/EnergyCore";
import NeonRing from "../Effects/NeonRing";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import {
  AudioContextState,
} from "../Audio/AudioContext";

export default function MainScene({
  analyser,
}) {
  const { zoomLevel } =
    useContext(AudioContextState);

  return (
    <Canvas
      camera={{
        position: [0, 0, zoomLevel],
      }}

    >
      <ambientLight intensity={1} />

      <CameraController />

      <ParticleGalaxy analyser={analyser} />

      

      <EnergyCore analyser={analyser} />

      <NeonRing analyser={analyser} />

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}