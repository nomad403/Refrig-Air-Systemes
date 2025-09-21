"use client"

import { useRef, useEffect, useState, Suspense, useLayoutEffect } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { Group, Mesh } from "three"

interface Model3DProps {
  modelPath: string
  autoRotate?: boolean
  animationSpeed?: number
  padding?: number // marge écran (1.0 = bord, 1.2 = 20% d'air)
}

function FitOnLoad({ object, padding = 1.25 }: { object: THREE.Object3D; padding?: number }) {
  const { camera, size } = useThree()
  const [isInitialized, setIsInitialized] = useState(false)

  useLayoutEffect(() => {
    if (!object || isInitialized) return // Ne s'exécute qu'une seule fois

    // 1) Centre + rayon du modèle
    const bbox = new THREE.Box3().setFromObject(object)
    const center = bbox.getCenter(new THREE.Vector3())
    const sphere = bbox.getBoundingSphere(new THREE.Sphere())
    const r = Math.max(sphere.radius, 0.001)

    // 2) Calcule la distance caméra pour fit vertical/horizontal
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
    const aspect = size.width / Math.max(size.height, 1)

    // distance min pour couvrir verticalement
    const distV = (r * padding) / Math.tan(fov / 2)
    // fov horizontal depuis le fov vertical
    const fovH = 2 * Math.atan(Math.tan(fov / 2) * aspect)
    const distH = (r * padding) / Math.tan(fovH / 2)
    const dist = Math.max(distV, distH)

    // 3) Place la caméra sur l'axe Z, vise le centre (une seule fois)
    const cam = camera as THREE.PerspectiveCamera
    
    // Positionne la caméra parfaitement centrée et la verrouille
    cam.position.set(0, 0, dist)
    cam.near = Math.max(0.01, dist - r * 2)
    cam.far = dist + r * 4
    cam.updateProjectionMatrix()
    cam.lookAt(0, 0, 0) // Regarde le centre du monde
    
    // Désactive les contrôles automatiques de la caméra
    cam.matrixAutoUpdate = false
    cam.updateMatrix()

    // 4) Centre parfaitement l'objet à l'origine (0,0,0)
    object.position.copy(center.clone().negate())
    
    setIsInitialized(true) // Marque comme initialisé pour éviter les recalculs
  }, [object, camera, size, padding, isInitialized])

  return null
}

function Model({ modelPath, autoRotate = true, animationSpeed = 1 }: Model3DProps) {
  const { scene } = useGLTF(modelPath)
  const meshRef = useRef<Group>(null)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      const t = state.clock.getElapsedTime()
      meshRef.current.rotation.y = t * 0.8 * animationSpeed
    }
  })

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child instanceof Mesh) {
        child.castShadow = false
        child.receiveShadow = false
        if (child.material) {
          // Mode wireframe pour vue tracé simplifiée (vue rayon X)
          child.material.wireframe = true
          child.material.wireframeLinewidth = 2.0
          
          // Couleur technique bleue pour le wireframe
          if ("color" in child.material) {
            child.material.color.setHex(0x537FE7) // Bleu technique
          }
          
          // Transparence pour effet rayon X
          if ("transparent" in child.material && "opacity" in child.material) {
            child.material.transparent = true
            child.material.opacity = 0.9
          }
          
          // allègement matériaux
          if ("envMap" in child.material) child.material.envMap = null
          if ("normalMap" in child.material) child.material.normalMap = null
          if ("aoMap" in child.material) child.material.aoMap = null
          
          child.material.needsUpdate = true
        }
        if (child.geometry && !child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals()
        }
      }
    })
  }, [scene])

  return (
    <group ref={meshRef}>
      <primitive object={scene} />
      {/* Fit caméra avec marge réduite pour zoom optimal */}
      <FitOnLoad object={scene} padding={1.0} />
    </group>
  )
}

export default function Model3D({ modelPath, autoRotate = true, animationSpeed = 1 }: Model3DProps) {
  const [canvasKey, setCanvasKey] = useState(0)
  const [contextLostCount, setContextLostCount] = useState(0)
  const [isContextLostMode, setIsContextLostMode] = useState(false)

  const handleContextLost = (event: Event) => {
    event.preventDefault()
    console.warn(`Context Lost #${contextLostCount + 1} pour ${modelPath}`)
    setContextLostCount(prev => prev + 1)
    
    // Si on perd le contexte 2 fois, on passe en mode fallback
    if (contextLostCount >= 1) {
      setIsContextLostMode(true)
    }
  }

  const handleContextRestored = () => {
    // Remonte complètement le Canvas pour repartir propre
    setCanvasKey((k) => k + 1)
  }

  // Mode fallback : affichage CSS au lieu du Canvas WebGL
  if (isContextLostMode) {
    return (
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[#537FE7]/20 to-[#537FE7]/10 rounded-lg flex items-center justify-center border-2 border-[#537FE7]/30">
            <div className="text-[#537FE7] text-4xl">🏭</div>
          </div>
          <div className="text-[#537FE7]/70 text-sm font-medium">Système HVAC</div>
          <div className="text-[#537FE7]/50 text-xs mt-1">Modèle 3D temporairement indisponible</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        key={canvasKey}
        className="absolute inset-0"
        dpr={[0.75, 1]}
        shadows={false}
        camera={{ fov: 35, near: 0.1, far: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", handleContextLost)
          gl.domElement.addEventListener("webglcontextrestored", handleContextRestored)
        }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          userSelect: "none",
          touchAction: "none",
          position: "absolute",
          isolation: "isolate",
        }}
      >
        <hemisphereLight args={["#ffffff", "#1a1a1a", 0.45]} />
        <directionalLight position={[3, 4, 6]} intensity={0.9} />
        <Suspense fallback={null}>
          {/* PLUS de Bounds/Center ici */}
          <Model modelPath={modelPath} autoRotate={autoRotate} animationSpeed={animationSpeed} />
        </Suspense>
      </Canvas>
    </div>
  )
}
