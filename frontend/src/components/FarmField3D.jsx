import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './FarmField3D.css'

// Individual farm field component - simplified to just rectangular tiles
const FarmField = ({ farm, position, onClick, isHovered, setIsHovered }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Hover animation - move upwards when hovered
  useFrame(() => {
    if (meshRef.current) {
      const targetY = hovered ? position[1] + 0.5 : position[1]
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    setIsHovered(farm.id)
  }

  const handlePointerOut = () => {
    setHovered(false)
    setIsHovered(null)
  }

  // Determine field color based on crop health
  const getFieldColor = (health) => {
    switch (health.toLowerCase()) {
      case 'excellent': return '#4ade80' // Green
      case 'good': return '#22c55e'      // Darker green
      case 'fair': return '#eab308'      // Yellow
      case 'poor': return '#ef4444'      // Red
      default: return '#22c55e'
    }
  }

  // Determine field size based on crop type
  const getFieldSize = (cropType) => {
    switch (cropType.toLowerCase()) {
      case 'wheat': return [2, 0.3, 1.5]
      case 'corn': return [2.5, 0.3, 2]
      case 'rice': return [1.8, 0.3, 1.2]
      case 'potatoes': return [2.2, 0.3, 1.8]
      default: return [2, 0.3, 1.5]
    }
  }

  const fieldSize = getFieldSize(farm.cropType)
  const fieldColor = getFieldColor(farm.nutrientHealth)

  return (
    <group position={position}>
      {/* Farm field - rectangular tile with thickness */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={fieldSize} />
        <meshStandardMaterial 
          color={fieldColor}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Farm name label */}
      <mesh position={[0, fieldSize[1] + 0.1, 0]}>
        <boxGeometry args={[fieldSize[0] + 0.2, 0.1, 0.1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}

// Main 3D scene component
const FarmFieldScene = ({ farms, onFarmClick }) => {
  const [hoveredFarm, setHoveredFarm] = useState(null)

  // Calculate grid positions for farms
  const getFarmPositions = (farms) => {
    const positions = []
    const farmsPerRow = Math.ceil(Math.sqrt(farms.length))
    const spacing = 4

    farms.forEach((farm, index) => {
      const row = Math.floor(index / farmsPerRow)
      const col = index % farmsPerRow
      const x = (col - farmsPerRow / 2) * spacing
      const z = (row - farmsPerRow / 2) * spacing
      positions.push([x, 0, z])
    })

    return positions
  }

  const farmPositions = getFarmPositions(farms)

  return (
    <>
      {/* Simple lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} />

      {/* Farm fields */}
      {farms.map((farm, index) => (
        <FarmField
          key={farm.id}
          farm={farm}
          position={farmPositions[index]}
          onClick={() => onFarmClick(farm.id)}
          isHovered={hoveredFarm === farm.id}
          setIsHovered={setHoveredFarm}
        />
      ))}
    </>
  )
}

// Main component
const FarmField3D = ({ farms, onFarmClick }) => {
  return (
    <div className="farm-field-3d">
      <Canvas
        camera={{ position: [15, 15, 15], fov: 60 }}
        shadows
        style={{ background: '#000000' }}
      >
        <FarmFieldScene farms={farms} onFarmClick={onFarmClick} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
    </div>
  )
}

export default FarmField3D
