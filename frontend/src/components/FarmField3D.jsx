import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './FarmField3D.css'

// Individual farm field component - custom rounded rectangular cube
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
      case 'wheat': return [2.5, 0.4, 1.8]
      case 'corn': return [3.0, 0.4, 2.2]
      case 'soybeans': return [2.8, 0.4, 2.0]
      case 'rice': return [2.2, 0.4, 1.5]
      case 'potatoes': return [2.9, 0.4, 2.1]
      default: return [2.5, 0.4, 1.8]
    }
  }

  const fieldSize = getFieldSize(farm.cropType)
  const fieldColor = getFieldColor(farm.nutrientHealth)

  return (
    <group position={position}>
      {/* Farm field - rounded rectangular cube with thickness */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={fieldSize} />
        <meshStandardMaterial 
          color={fieldColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Rounded edges effect using smaller cubes at corners */}
      <mesh position={[fieldSize[0]/2 - 0.1, 0, fieldSize[2]/2 - 0.1]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial 
          color={fieldColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-fieldSize[0]/2 + 0.1, 0, fieldSize[2]/2 - 0.1]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial 
          color={fieldColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[fieldSize[0]/2 - 0.1, 0, -fieldSize[2]/2 + 0.1]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial 
          color={fieldColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-fieldSize[0]/2 + 0.1, 0, -fieldSize[2]/2 + 0.1]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial 
          color={fieldColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Farm name label */}
      <mesh position={[0, fieldSize[1] + 0.2, 0]}>
        <boxGeometry args={[fieldSize[0] + 0.3, 0.1, 0.6]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}

// Main 3D scene component
const FarmFieldScene = ({ farms, onFarmClick }) => {
  const [hoveredFarm, setHoveredFarm] = useState(null)

  // Calculate 3x3 grid positions for farms
  const getFarmPositions = (farms) => {
    const positions = []
    const gridSize = 3
    const spacing = 5 // Space between farms
    
    // Create a 3x3 grid
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col
        
        // Center the grid around origin (0, 0, 0)
        const x = (col - 1) * spacing // -1, 0, 1 for columns
        const z = (row - 1) * spacing // -1, 0, 1 for rows
        
        if (index < farms.length) {
          positions.push([x, 0, z])
        } else {
          // If no farm for this position, add empty space
          positions.push([x, 0, z])
        }
      }
    }
    
    return positions
  }

  const farmPositions = getFarmPositions(farms)

  return (
    <>
      {/* Enhanced lighting for farm fields */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} />
      <pointLight position={[10, -10, 10]} intensity={0.2} />

      {/* Farm fields in 3x3 grid */}
      {farms.map((farm, index) => {
        if (index < 9) { // Only show first 9 farms in 3x3 grid
          return (
            <FarmField
              key={farm.id}
              farm={farm}
              position={farmPositions[index]}
              onClick={() => onFarmClick(farm.id)}
              isHovered={hoveredFarm === farm.id}
              setIsHovered={setHoveredFarm}
            />
          )
        }
        return null
      })}

      {/* Grid lines for visual reference */}
      <GridLines />
    </>
  )
}

// Grid lines component for 3x3 layout
const GridLines = () => {
  const gridSize = 8 // Covers the 3x3 farm area
  const gridSpacing = 5

  return (
    <group>
      {/* Vertical lines */}
      {Array.from({ length: 4 }, (_, i) => {
        const pos = (i - 1.5) * gridSpacing
        return (
          <line key={`v-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([pos, 0.01, -gridSize/2, pos, 0.01, gridSize/2])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#333333" opacity={0.3} transparent />
          </line>
        )
      })}
      
      {/* Horizontal lines */}
      {Array.from({ length: 4 }, (_, i) => {
        const pos = (i - 1.5) * gridSpacing
        return (
          <line key={`h-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([-gridSize/2, 0.01, pos, gridSize/2, 0.01, pos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#333333" opacity={0.3} transparent />
          </line>
        )
      })}
    </group>
  )
}

// Main component
const FarmField3D = ({ farms, onFarmClick }) => {
  return (
    <div className="farm-field-3d">
      <Canvas
        camera={{ position: [15, 15, 15], fov: 60 }}
        shadows
        style={{ background: '#ffffff' }}
      >
        <FarmFieldScene farms={farms} onFarmClick={onFarmClick} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={8}
          maxDistance={50}
        />
      </Canvas>
    </div>
  )
}

export default FarmField3D
