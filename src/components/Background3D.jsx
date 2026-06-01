import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Starfield({ count = 300, color = "#00f5ff", speedMultiplier = 1 }) {
  const pointsRef = useRef();

  // Initialize random positions, velocities, and initial alpha offsets
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
      sp[i] = (Math.random() * 0.03 + 0.01) * speedMultiplier;
    }
    return [pos, sp];
  }, [count, speedMultiplier]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array;
    const { x, y } = state.mouse;

    // Parallax movement based on mouse coordinates
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      x * 0.8,
      0.05
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      y * 0.8,
      0.05
    );

    // Drifting down, resetting if out of bounds
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1; // Y coordinate
      posArray[idx] -= speeds[i] * 0.15;
      if (posArray[idx] < -10) {
        posArray[idx] = 10;
        posArray[i * 3] = (Math.random() - 0.5) * 20; // randomize X on reset
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow continuous rotation
    pointsRef.current.rotation.z = time * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        backgroundColor: "#05070f",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        
        {/* Layer 1: Electric Cyan Starfield (Drifting slowly) */}
        <Starfield count={250} color="#00f5ff" speedMultiplier={0.7} />
        
        {/* Layer 2: Violet Starfield (Drifting slightly faster) */}
        <Starfield count={250} color="#7c3aed" speedMultiplier={1.2} />
      </Canvas>
    </div>
  );
}
