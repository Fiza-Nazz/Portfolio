"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Particle System
function Particles({ count = 2000 }) {
  const points = useRef<THREE.Points>(null);

  // Generate random positions
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20; // spread
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: new THREE.Color("#60a5fa"), // blue-400
    transparent: true,
    opacity: 0.8,
  });

  // Animate rotation
  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.0009;
      points.current.rotation.x += 0.0004;
    }
  });

  return <points ref={points} args={[geometry, material]} />;
}

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <Particles count={1500} />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground;
