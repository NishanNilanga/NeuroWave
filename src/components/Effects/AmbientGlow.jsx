export default function AmbientGlow() {
  return (
    <mesh position={[0, 0, -3]}>
      <sphereGeometry args={[8, 64, 64]} />

      <meshBasicMaterial
        color="#00ffff"
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}