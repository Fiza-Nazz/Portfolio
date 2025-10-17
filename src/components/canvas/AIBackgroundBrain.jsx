"use client";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

const AIBrainBackground = () => {
  const brainRef = useRef(null);
  const nodesRef = useRef(null);
  const connectionsRef = useRef(null);
  const particlesRef = useRef(null);

  const nodeCount = 50;
  const particleCount = 200;

  // 🔹 Generate nodes (neurons)
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 0.5;
      return {
        id: i,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      };
    });
  }, []);

  // 🔹 Synaptic connections
  const connections = useMemo(() => {
    return nodes.flatMap((a, i) =>
      nodes
        .slice(i + 1)
        .filter(() => Math.random() > 0.92)
        .map((b) => ({ start: a, end: b }))
    );
  }, [nodes]);

  // 🔹 Particle positions
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 3 + Math.random() * 1;
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  // 🔹 Animation loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (brainRef.current) {
      brainRef.current.rotation.y = t * 0.2;
      brainRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    }

    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        const scale = 0.1 + Math.sin(t * 2 + i) * 0.05;
        node.scale.setScalar(Math.max(scale, 0.05));
      });
    }

    if (connectionsRef.current) {
      connectionsRef.current.children.forEach((line, i) => {
        const material = line.material;
        if (!Array.isArray(material)) {
          material.opacity = 0.15 + Math.sin(t * 3 + i) * 0.1;
        }
      });
    }

    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += Math.sin(t + i) * 0.002; // floating motion
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0, 7], fov: 60 }}
    >
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#915EFF" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#00D1FF" />

      {/* Brain Core */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.6}>
        <group ref={brainRef}>
          <mesh>
            <icosahedronGeometry args={[2, 2]} />
            <MeshDistortMaterial
              color="#915EFF"
              distort={0.4}
              speed={2}
              emissive="#915EFF"
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      </Float>

      {/* Neural Nodes */}
      <group ref={nodesRef}>
        {nodes.map((node) => (
          <mesh key={node.id} position={[node.x, node.y, node.z]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial
              color={node.id % 2 === 0 ? "#915EFF" : "#00D1FF"}
              emissive={node.id % 2 === 0 ? "#915EFF" : "#00D1FF"}
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Synaptic Connections */}
      <group ref={connectionsRef}>
        {connections.map((conn, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  conn.start.x,
                  conn.start.y,
                  conn.start.z,
                  conn.end.x,
                  conn.end.y,
                  conn.end.z,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
          </line>
        ))}
      </group>

      {/* Data Flow Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFFFFF"
          size={0.04}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </Canvas>
  );
};

export default AIBrainBackground;
