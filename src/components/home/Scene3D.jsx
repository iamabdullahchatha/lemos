import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// Steel material preset
const steel = { color: '#9aa4b4', metalness: 0.92, roughness: 0.34 }

function Pipe({ length = 3, radius = 0.16, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[radius, radius, length, 24]} />
      <meshStandardMaterial {...steel} />
    </mesh>
  )
}

function Flange({ position = [0, 0, 0], rotation = [0, 0, 0], radius = 0.24 }) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, 0.08, 24]} />
      <meshStandardMaterial color="#7d8696" metalness={0.9} roughness={0.4} />
    </mesh>
  )
}

function Elbow({ position = [0, 0, 0], rotation = [0, 0, 0], radius = 0.16 }) {
  return (
    <mesh position={position} rotation={rotation}>
      <torusGeometry args={[0.28, radius, 16, 32, Math.PI / 2]} />
      <meshStandardMaterial {...steel} />
    </mesh>
  )
}

function Assembly({ progress }) {
  const group = useRef(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const p = progress ? progress.get() : 0
    // Auto-rotate + scroll influence
    group.current.rotation.y += delta * 0.18
    group.current.rotation.y += 0 // base spin
    group.current.rotation.x = -0.15 + p * 0.5
    group.current.position.y = p * 0.4
    // Subtle camera dolly on scroll
    state.camera.position.z = 7 - p * 1.6
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      {/* Pressure vessel */}
      <mesh position={[-1.7, 0, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 2.2, 32]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      <mesh position={[-1.7, 1.3, 0]}>
        <sphereGeometry args={[0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      <mesh position={[-1.7, -1.3, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...steel} />
      </mesh>

      {/* Horizontal pipe run */}
      <Pipe length={2.6} position={[0.3, 0.9, 0]} rotation={[0, 0, Math.PI / 2]} />
      <Flange position={[-1, 0.9, 0]} rotation={[0, 0, Math.PI / 2]} />
      <Flange position={[1.6, 0.9, 0]} rotation={[0, 0, Math.PI / 2]} />

      {/* Vertical drop with elbow */}
      <Elbow position={[1.6, 0.62, 0]} rotation={[0, 0, Math.PI]} />
      <Pipe length={1.4} position={[1.88, -0.1, 0]} />

      {/* Secondary pipe */}
      <Pipe length={2.2} radius={0.12} position={[0.3, -0.7, 0.5]} rotation={[0, 0, Math.PI / 2]} />

      {/* Valve wheel (brand accent) */}
      <mesh position={[0.3, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.05, 12, 32]} />
        <meshStandardMaterial color="#f26522" metalness={0.5} roughness={0.35} emissive="#f26522" emissiveIntensity={0.15} />
      </mesh>
      <Pipe length={0.5} radius={0.05} position={[0.3, 1.1, 0]} />

      {/* Skid base frame */}
      {[-0.95, 0.95].map((z) => (
        <mesh key={z} position={[0, -1.5, z]}>
          <boxGeometry args={[4.2, 0.14, 0.14]} />
          <meshStandardMaterial color="#464f5e" metalness={0.8} roughness={0.5} />
        </mesh>
      ))}
      {[-1.9, 1.9].map((x) => (
        <mesh key={x} position={[x, -1.5, 0]}>
          <boxGeometry args={[0.14, 0.14, 2]} />
          <meshStandardMaterial color="#464f5e" metalness={0.8} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

export default function Scene3D({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} />
      <pointLight position={[-6, 2, 3]} intensity={40} color="#4a63c4" distance={20} />
      <pointLight position={[4, -3, 2]} intensity={30} color="#ffa430" distance={20} />
      <Assembly progress={progress} />
    </Canvas>
  )
}
