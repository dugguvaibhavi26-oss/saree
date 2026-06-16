"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Multi-frequency wave for organic silk movement
    float elevation = sin(modelPosition.x * 1.2 + uTime * 0.6) * 0.4
                    + sin(modelPosition.y * 1.5 + uTime * 0.4) * 0.3
                    + sin((modelPosition.x + modelPosition.y) * 0.8 + uTime * 0.3) * 0.2;

    modelPosition.z += elevation;
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Soft blend based on elevation to simulate lighting/shadows on silk
    float mixStrength = (vElevation + 0.9) * 0.55;
    vec3 color = mix(uColorA, uColorB, mixStrength);
    
    // Add subtle sheen
    float sheen = smoothstep(0.3, 0.8, vElevation) * 0.15;
    color += sheen;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

function SilkFabric({ 
  colorA = "#050505", // Deep Rich Black
  colorB = "#1f1c1a", // Warm dark tone
  opacity = 1.0 
}) {
  const materialRef = useRef<any>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uOpacity: { value: opacity }
  }), [colorA, colorB, opacity]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.8; // Slow down slightly for elegance
    }
  });

  return (
    <mesh rotation={[-Math.PI * 0.1, 0, 0]} position={[0, 0, -2]}>
      {/* High segment count for smooth curves */}
      <planeGeometry args={[20, 15, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function SilkSimulation({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none bg-rich-black ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <SilkFabric />
      </Canvas>
    </div>
  );
}
