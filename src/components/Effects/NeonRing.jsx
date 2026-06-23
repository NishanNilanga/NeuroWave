import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


export default function NeonRing({ analyser }) {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame(() => {

  let intensity = 1;

  if (analyser) {
    const data = new Uint8Array(
      analyser.frequencyBinCount
    );

    analyser.getByteFrequencyData(data);

    const bass =
      data.slice(0, 20).reduce((a, b) => a + b, 0) / 20;

    intensity = 1 + bass / 800;
  }

  ring1.current.rotation.z += 0.01;
  ring2.current.rotation.x += 0.02;
  ring3.current.rotation.y += 0.03;

  ring1.current.scale.setScalar(intensity);
  ring2.current.scale.setScalar(intensity);
  ring3.current.scale.setScalar(intensity);

});

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[1.7, 0.03, 16, 800]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>

      <mesh ref={ring2}>
        <torusGeometry args={[2.1, 0.02, 16, 500]} />
        <meshBasicMaterial color="#2edd1f" />
      </mesh>

      <mesh ref={ring3}>
        <torusGeometry args={[2.5, 0.015, 35, 500]} />
        <meshBasicMaterial color="#e0b311" />
      </mesh>
    </>
  );
}