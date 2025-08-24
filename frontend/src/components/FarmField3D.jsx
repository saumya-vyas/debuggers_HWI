import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useTexture, Html, useGLTF } from '@react-three/drei'
import { Grid } from '@react-three/drei' /* Added Grid import */
import { easing } from 'maath' /* Corrected import for easing */
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MeshStandardMaterial } from 'three' // Keep MeshStandardMaterial for default assignments
import './FarmField3D.css'
import * as THREE from 'three' /* Corrected import for THREE */

// Individual farm field component - custom rounded rectangular cube
const FarmField = ({ farm, position, onClick, isHovered, setIsHovered, rotation = [0, 0, 0] }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const farmTexture = useTexture('/farm.jpg')

  // Rotate the texture by 90 degrees on the Y-axis
  farmTexture.rotation = Math.PI / 2
  farmTexture.center.set(0.5, 0.5)

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
    // Make all farms square for a consistent look
    const size = 3.5 // Increased uniform size for square fields
    return [size, 0.4, size] // [width, height, depth] - height remains constant
  }

  const fieldSize = getFieldSize(farm.cropType)
  const fieldColor = getFieldColor(farm.nutrientHealth)

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Farm field - rounded rectangular cube with thickness */}
      <mesh
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

      {/* Top surface with texture */}
      <mesh position={[0, fieldSize[1] / 2 + 0.01, 0]}>
        <boxGeometry args={[fieldSize[0], 0.02, fieldSize[2]]} />
        <meshStandardMaterial map={farmTexture} />
      </mesh>

      {/* Rounded edges effect using smaller cubes at corners */}
    </group>
  )
}

const FarmCardLabel = ({ farmName, cropType, position }) => {
  return (
    <Html position={position} center>
      <div style={{
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '5px 10px',
        borderRadius: '5px',
        color: '#333',
        fontSize: '12px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        pointerEvents: 'none', // Allow interaction with the 3D scene below
        backdropFilter: 'blur(3px)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        <strong>{farmName}</strong><br />
        <em>{cropType}</em>
      </div>
    </Html>
  )
}

const Tree = ({ model, position, scale = 0.05 }) => {
  return (
    <primitive object={model.clone()} position={position} scale={[scale, scale, scale]} />
  )
}

const Windmill = ({ model, position, scale = 1, rotation = [0, 0, 0] }) => {
  return (
    <primitive object={model.scene.clone()} position={position} rotation={rotation} scale={[scale, scale, scale]} />
  )
}

const Fence = ({ model, position, rotation = [0, Math.PI/2, 0], scale = 1 }) => {
  return (
    <primitive object={model.scene.clone()} position={position} rotation={rotation} scale={[scale, scale, scale]} />
  )
}

// Main 3D scene component
const FarmFieldScene = ({ farms, onFarmClick }) => {
  const [hoveredFarm, setHoveredFarm] = useState(null)
  const groupRef = useRef() /* Added ref for main group */

  // Calculate 3x3 grid positions for farms
  const getFarmPositions = (farms) => {
    const positions = []
    const gridSize = 3
    const spacing = 7 // Increased spacing between farms
    
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

  // Load materials first, then the OBJ model
  const materials = useLoader(MTLLoader, '/Lowpoly_tree_sample.mtl')
  const treeModel = useLoader(OBJLoader, '/Lowpoly_tree_sample.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  const fenceModel = useGLTF('/fence.glb')
  const windmillModel = useGLTF('/windmill.glb') /* Load the windmill GLTF model */
  const landTexture = useTexture('/land2.jpg') /* Load the land texture */
  const planeFieldTexture = useTexture('/planeField.png') /* Load the planeField texture for background */

  // Configure land texture for repetition
  useEffect(() => {
    if (landTexture) {
      landTexture.wrapS = landTexture.wrapT = THREE.RepeatWrapping
      landTexture.repeat.set(10, 10) // Repeat 10 times in both directions
      landTexture.needsUpdate = true
    }
  }, [landTexture])

  // Ensure materials are updated and shadows are cast/received for the tree model
  useEffect(() => {
    if (treeModel) {
      treeModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [treeModel])

  // Ensure materials are updated and shadows are cast/received for the fence model
  useEffect(() => {
    if (fenceModel.scene) {
      fenceModel.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          // Explicitly assign a neutral MeshStandardMaterial to ensure consistent color
          child.material = new MeshStandardMaterial({ color: 0xcccccc }) // Light grey color for fence
          child.material.needsUpdate = true
          console.log('Assigned light grey MeshStandardMaterial to fence part.')
        }
      })
    }
  }, [fenceModel])

  // Apply easing for scene rotation based on pointer movement
  useFrame((state, delta) => {
    if (groupRef.current) {
      easing.dampE(
        groupRef.current.rotation,
        [-state.pointer.y / 20, -state.pointer.x / 20, 0],
        0.4,
        delta
      )
    }
  })

  return (
    <group ref={groupRef}> {/* Added ref to main group */}
      {/* Replaced Ground plane with Infinite Grid */}
      <Grid
        renderOrder={-1} /* Render behind other objects */
        position={[0, -0.01, 0]} /* Position slightly below other objects */
        infiniteGrid
        fadeDistance={100} /* Fade out distance */
        fadeStrength={1} /* Fade strength */
        sectionSize={4} /* Size of each section */
        sectionColor={'#90EE90'} /* Light green color */
        sectionThickness={1} /* Thickness of section lines */
        cellColor={'#B0E0E6'} /* Lighter color for grid cells */
        cellThickness={0.5} /* Thickness of cell lines */
        followCamera={false}
      />

      {/* Background Plane with Image below the grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} renderOrder={-2}>
        <planeGeometry args={[200, 200]} /> {/* Large plane to cover the background */}
        <meshStandardMaterial 
          map={planeFieldTexture}
          transparent={true} /* Enable transparency */
          opacity={0.6} /* Set opacity to 0.6 */
        />
      </mesh>

      {/* Roads */}
      {/* Horizontal road */}
      <mesh position={[-16, 0, -25]}> {/* Moved to the negative X side */}
        <boxGeometry args={[10, 0.01, 150]} /> {/* Adjusted for vertical road */}
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {/* Road strips */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={`road-strip-${i}`} position={[-16, 0.02, -25 + i * 14 - 63]}> {/* Adjust position for vertical road */}
          <boxGeometry args={[0.5, 0.01, 8]} /> {/* Small, thin white strips */}
          <meshStandardMaterial color="white" />
        </mesh>
      ))}

      {/* Trees along the road */}
      <Tree 
        key="tree-1" /* Added key prop */
        model={treeModel}
        position={[-16 - 6, 0, 6]} /* First tree position */
        scale={0.3}
      />
      <Tree 
        key="tree-2" /* Added key prop */
        model={treeModel}
        position={[-16 - 6, 0,  13]} /* Second tree position, side by side */
        scale={0.4}
      />

      {/* Windmill beside the trees */}
      <Windmill
        model={windmillModel}
        position={[-16 - 10, 0, -6]} /* Position next to the trees */
        rotation={[0, Math.PI / 2 + 0.5, 0]} /* Rotated 45 degrees on Y-axis */
        scale={0.15} /* Adjusted scale for windmill model */
      />

      {/* Fences around the grid */}
      {/* Front fence */}
      <Fence 
        key="fence-front" /* Added key prop */
        model={fenceModel} 
        position={[0, 1, 13]} 
        scale={1.0} 
        rotation={[0, Math.PI / 2, 0]} /* Rotate 90 degrees */
      />
      {/* Back fence */}
      <Fence 
        key="fence-back" /* Added key prop */
        model={fenceModel} 
        position={[0, 1, -13]} 
        scale={1.0} 
        rotation={[0, Math.PI / 2, 0]} /* Rotate 90 degrees */
      />
      {/* Left fence */}
      <Fence 
        key="fence-left" /* Added key prop */
        model={fenceModel} 
        position={[-11, 1, 0]} 
        scale={1.0} 
        rotation={[0, 0, 0]} /* Rotate 90 degrees */
      />
      {/* Right fence */}
      <Fence 
        key="fence-right" /* Added key prop */
        model={fenceModel} 
        position={[13, 1, 0]} 
        scale={1.0} 
        rotation={[0, 0, 0]} /* Rotate 90 degrees */
      />

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
            <>
            <FarmField
              key={farm.id}
              farm={farm}
              position={farmPositions[index]}
              onClick={() => onFarmClick(farm.id)}
              isHovered={hoveredFarm === farm.id}
              setIsHovered={setHoveredFarm}
              rotation={[0, Math.PI / 2, 0]} /* Rotate 90 degrees around Y-axis */
            />
            {hoveredFarm === farm.id && (
              <FarmCardLabel 
                farmName={farm.name} 
                cropType={farm.cropType}
                position={[farmPositions[index][0], farmPositions[index][1] + 2.5, farmPositions[index][2]]} /* Position above the farm */
              />
            )}
          </>
          )
        }
        return null
      })}

      {/* Grid lines for visual reference */}
      <GridLines  /* Move grid lines away from the road */ />
    </group>
  )
}

// Grid lines component for 3x3 layout
const GridLines = () => {
  const gridSize = 10 // Increased size for the grid lines
  const gridSpacing = 8 // Increased spacing for the grid lines

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
            <lineBasicMaterial color="#000000" linewidth={6} opacity={1.0} transparent />
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
            <lineBasicMaterial color="#000000" linewidth={6} opacity={1.0} transparent />
          </line>
        )
      })}
    </group>
  )
}

// Main component
const FarmField3D = ({ farms, onFarmClick, scale = 1 }) => {
  return (
    <div className="farm-field-3d">
      <Canvas
        camera={{ position: [15, 15, 15], fov: 60 }}
        shadows
        style={{ background: 'transparent' }} /* Changed Canvas background to transparent for image background */
        scale={[scale, scale, scale]} /* Apply scale transform */
      >
        <FarmFieldScene farms={farms} onFarmClick={onFarmClick} />
        <OrbitControls/>
      </Canvas>
    </div>
  )
}

export default FarmField3D
