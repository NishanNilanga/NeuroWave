import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useContext } from "react";

import {
  AudioContextState,
} from "../Audio/AudioContext";

export default function CameraController() {
  const { camera } = useThree();

  const { zoomLevel } =
    useContext(AudioContextState);

  useFrame(() => {
    camera.position.z +=
      (zoomLevel - camera.position.z) * 0.1;
  });

  return null;
}