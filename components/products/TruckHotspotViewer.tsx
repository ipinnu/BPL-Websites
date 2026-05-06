'use client'

import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { ModalProduct } from './ProductModal'

const TRUCK_PATH = '/truck%20(1).glb'

// ─── Product data with hotspot positions + specs ──────────────────────────────

export const HOTSPOT_PRODUCTS: (ModalProduct & { position: [number, number, number] })[] = [
  {
    slug: 'mix-vision',
    name: 'MiX Vision',
    tag: 'Video Telematics',
    description: '72-hour rolling video capture — in-cab and forward-facing — for incident context and full driver accountability.',
    specs: ['72-hour rolling video buffer', 'Forward-facing + in-cab cameras', 'AI-powered event detection & alerts'],
    position: [0.3, 1.8, 1.2],
  },
  {
    slug: 'mix-rovi',
    name: 'MiX Rovi II',
    tag: 'In-Cab Display',
    description: 'Android-powered 7" programmable display with navigation, job dispatching, and real-time driver alerts.',
    specs: ['7" Android touchscreen display', 'Real-time job dispatch & navigation', 'Live driver scoring & safety alerts'],
    position: [0.0, 1.4, 1.5],
  },
  {
    slug: 'mix4000',
    name: 'MiX4000 Onboard Computer',
    tag: 'Fleet Hardware',
    description: 'GPS + GSM onboard computer enabling the full MiX Fleet Manager Premium platform on any vehicle.',
    specs: ['GPS + GSM dual connectivity', 'Full MiX Fleet Manager integration', 'Compatible with any vehicle type'],
    position: [-0.2, 1.2, 0.8],
  },
  {
    slug: 'speed-limiter',
    name: 'Tamper-Resistant Speed Limiter',
    tag: 'Safety Hardware',
    description: 'Electronic speed control with data logging, tamper-proof design, and automatic activation.',
    specs: ['Tamper-proof sealed housing', 'Automatic speed activation', 'Built-in data logging & reporting'],
    position: [0.4, 0.8, 1.0],
  },
  {
    slug: 'fuel-monitor',
    name: 'Fuel Monitoring System',
    tag: 'Fuel Management',
    description: 'Detect anomalies, prevent theft, and identify inefficient driving practices before they become costly.',
    specs: ['Real-time fuel consumption data', 'Theft & siphoning anomaly detection', 'Fleet-wide efficiency reporting'],
    position: [-0.5, 0.6, -0.5],
  },
  {
    slug: 'axle-sensor',
    name: 'Wireless Axle Load Sensor',
    tag: 'Telematics',
    description: 'GNOM DDE S7 pressure sensor for axle load monitoring and overload prevention on air suspension vehicles.',
    specs: ['GNOM DDE S7 wireless sensor', 'Air suspension compatible', 'Real-time overload prevention'],
    position: [0.0, 0.3, -1.0],
  },
]

// ─── Inject hotspot CSS once ──────────────────────────────────────────────────

function useHotspotStyles() {
  useEffect(() => {
    if (document.getElementById('hotspot-styles')) return
    const style = document.createElement('style')
    style.id = 'hotspot-styles'
    style.textContent = `
      @keyframes ping {
        0%   { transform: scale(1);   opacity: 0.9; }
        70%  { transform: scale(2.2); opacity: 0;   }
        100% { transform: scale(2.2); opacity: 0;   }
      }
      @keyframes ping-fast {
        0%   { transform: scale(1);   opacity: 0.9; }
        70%  { transform: scale(2.4); opacity: 0;   }
        100% { transform: scale(2.4); opacity: 0;   }
      }
      .hotspot-ping       { animation: ping 2s cubic-bezier(0,0,0.2,1) infinite; }
      .hotspot-ping-fast  { animation: ping-fast 0.9s cubic-bezier(0,0,0.2,1) infinite; }
    `
    document.head.appendChild(style)
  }, [])
}

// ─── Hotspot marker (HTML overlay) ───────────────────────────────────────────

function HotspotMarker({
  product, isActive, isAnyActive, onClick,
}: {
  product: typeof HOTSPOT_PRODUCTS[number]
  isActive: boolean
  isAnyActive: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={e => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', position: 'relative', userSelect: 'none' }}
    >
      {/* Ping ring */}
      <div style={{
        position: 'absolute',
        width: 16, height: 16,
        borderRadius: '50%',
        border: '2px solid #0078D4',
        top: -8, left: -8,
        opacity: isAnyActive && !isActive ? 0.3 : 1,
        transition: 'opacity 0.3s',
      }}
        className={isActive || hovered ? 'hotspot-ping-fast' : 'hotspot-ping'}
      />

      {/* Inner dot */}
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: isActive || hovered ? '#60A5FA' : '#0078D4',
        border: '2px solid rgba(255,255,255,0.4)',
        position: 'relative', zIndex: 1,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 8px rgba(0,120,212,0.8)',
        transition: 'background 0.2s, box-shadow 0.2s',
      }} />

      {/* Label tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            bottom: 18, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(4,12,24,0.95)',
            border: '1px solid rgba(51,153,224,0.35)',
            borderRadius: 8, padding: '5px 10px',
            whiteSpace: 'nowrap', zIndex: 10,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{
            fontSize: 11, fontWeight: 600, color: '#fff',
            fontFamily: 'var(--font-inter)', letterSpacing: '0.02em',
          }}>
            {product.name}
          </span>
        </motion.div>
      )}
    </div>
  )
}

// ─── Truck model + scene ──────────────────────────────────────────────────────

function TruckScene({
  onSelect, activeSlug,
}: {
  onSelect: (p: ModalProduct) => void
  activeSlug: string | null
}) {
  const { scene } = useGLTF(TRUCK_PATH)
  const groupRef = useRef<THREE.Group>(null)
  const orbitRef = useRef<OrbitControlsImpl>(null)
  const isInteracting = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Apply materials
  useEffect(() => {
    scene.traverse(obj => {
      if (!(obj instanceof THREE.Mesh)) return
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach(mat => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return
        const n = (mat.name ?? obj.name ?? '').toLowerCase()

        if (n.includes('bodycolour') || n.includes('body_colour') || n.includes('body colour')) {
          mat.color.set('#0078D4')
        } else if (n.includes('head_paint') || n.includes('head paint') || n.includes('headpaint')) {
          mat.color.set('#0D1B2A')
        } else if (n.includes('flat_black') || n.includes('flat black')) {
          mat.color.set('#1a1a1a')
        } else if (n.includes('deep_black') || n.includes('deep black')) {
          mat.color.set('#111111')
        } else if (n.includes('wheel')) {
          mat.color.set('#888888')
          mat.metalness = 0.9
          mat.roughness = 0.1
        } else if (n.includes('tyre') || n.includes('tire')) {
          mat.color.set('#1a1a1a')
        } else if (n.includes('windglass') || n.includes('wind glass')) {
          mat.color.set('#a8d4ff')
          mat.transparent = true
          mat.opacity = 0.25
        } else if (n.includes('glass')) {
          mat.color.set('#a8d4ff')
          mat.transparent = true
          mat.opacity = 0.3
        }
        mat.needsUpdate = true
      })
    })
  }, [scene])

  // Auto-rotate
  useFrame((_, delta) => {
    if (groupRef.current && !isInteracting.current) {
      groupRef.current.rotation.y += delta * 0.18
    }
  })

  const handleOrbitStart = useCallback(() => {
    isInteracting.current = true
    clearTimeout(resumeTimer.current)
  }, [])

  const handleOrbitEnd = useCallback(() => {
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false
    }, 3000)
  }, [])

  return (
    <>
      <OrbitControls
        ref={orbitRef}
        enablePan={false}
        minDistance={8}
        maxDistance={28}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        dampingFactor={0.08}
        enableDamping
        onStart={handleOrbitStart}
        onEnd={handleOrbitEnd}
      />

      <group ref={groupRef}>
        <primitive object={scene} />

        {HOTSPOT_PRODUCTS.map(product => (
          <Html
            key={product.slug}
            position={product.position}
            center
            zIndexRange={[50, 60]}
          >
            <HotspotMarker
              product={product}
              isActive={activeSlug === product.slug}
              isAnyActive={activeSlug !== null}
              onClick={() => onSelect(product)}
            />
          </Html>
        ))}
      </group>
    </>
  )
}

useGLTF.preload('/truck%20(1).glb')

// ─── Loading fallback ─────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <motion.div
        style={{ width: 40, height: 40, border: '2px solid rgba(0,120,212,0.2)', borderTop: '2px solid #0078D4', borderRadius: '50%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)', letterSpacing: '0.08em' }}>
        Loading truck model...
      </span>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

interface Props {
  onSelectProduct: (product: ModalProduct) => void
  activeSlug: string | null
}

export function TruckHotspotViewer({ onSelectProduct, activeSlug }: Props) {
  useHotspotStyles()

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [10, 5, 16], fov: 35 }}
        shadows
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} color="#ffffff" castShadow />
        <pointLight position={[-5, 3, -5]} intensity={3.0} color="#4a9eff" />
        <pointLight position={[0, -2, 4]} intensity={0.4} />

        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <TruckScene onSelect={onSelectProduct} activeSlug={activeSlug} />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.4}
            scale={12}
            blur={2}
            far={4}
          />
        </Suspense>
      </Canvas>

      {/* Loading state while Canvas mounts */}
    </div>
  )
}
