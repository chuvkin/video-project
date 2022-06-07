import { useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import img from '../public/dieHard.jpg'

// function Shelf(props) {
//   const gltf = useLoader(GLTFLoader, '/scene.gltf')
//   return (
//     <Suspense fallback={null}>
//       <primitive object={gltf.scene} />
//     </Suspense>
//   )
// }

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (hover) {
      ref.current.rotation.y += 0.01
      ref.current.rotation.x -= 0.0
    }
  })

  const texture = useLoader(THREE.TextureLoader, img)

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1.5, 0.25]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'blue'} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 0, 0]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
