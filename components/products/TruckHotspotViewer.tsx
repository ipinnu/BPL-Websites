'use client'

import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
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
    position: [5.67, 1.34, 4.3],
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
    position: [0.1, -1.25, 1.34],
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

const TAG_COLORS_HOTSPOT: Record<string, string> = {
  'Video Telematics': '#3399E0',
  'In-Cab Display':   '#60A5FA',
  'Fuel Management':  '#4ADE80',
  'Fleet Hardware':   '#A78BFA',
  'Safety Hardware':  '#F59E0B',
  'Telematics':       '#EF4444',
}

// ─── Hotspot marker — diagram line style ──────────────────────────────────────

function HotspotMarker({
  product, isActive, isAnyActive, onClick,
}: {
  product: typeof HOTSPOT_PRODUCTS[number]
  isActive: boolean
  isAnyActive: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const lit = isActive || hovered
  const color = TAG_COLORS_HOTSPOT[product.tag] ?? '#3399E0'
  // Label extends right if hotspot x >= 0, left otherwise
  const goRight = product.position[0] >= 0

  return (
    <div
      onClick={e => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: goRight ? 'row' : 'row-reverse',
        cursor: 'pointer',
        userSelect: 'none',
        opacity: isAnyActive && !isActive ? 0.18 : 1,
        transition: 'opacity 0.35s',
        // Translate so the dot sits exactly on the 3D anchor point
        transform: goRight ? 'translateY(-50%)' : 'translate(-100%, -50%)',
      }}
    >
      {/* Anchor dot */}
      <div style={{
        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
        background: lit ? '#fff' : color,
        border: `1.5px solid ${lit ? color : 'rgba(255,255,255,0.25)'}`,
        boxShadow: `0 0 ${lit ? 12 : 6}px ${color}`,
        transition: 'all 0.2s',
      }} />

      {/* Line */}
      <div style={{
        width: 40, height: 1, flexShrink: 0,
        background: `linear-gradient(${goRight ? 'to right' : 'to left'}, ${color}${lit ? 'cc' : '66'}, ${color}11)`,
        transition: 'background 0.2s',
      }} />

      {/* Label */}
      <div style={{
        padding: '5px 9px',
        background: lit ? `${color}18` : 'rgba(4,12,24,0.78)',
        border: `1px solid ${color}${lit ? '44' : '18'}`,
        borderRadius: 5,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.2s',
      }}>
        <div style={{
          fontSize: 10.5, fontWeight: 700, color: lit ? '#fff' : 'rgba(255,255,255,0.8)',
          fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap', lineHeight: 1.3,
          transition: 'color 0.2s',
        }}>
          {product.name}
        </div>
        <div style={{
          fontSize: 8.5, fontWeight: 600, color,
          fontFamily: 'var(--font-inter)', letterSpacing: '0.09em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
          lineHeight: 1.3, marginTop: 2,
        }}>
          {product.tag}
        </div>
      </div>
    </div>
  )
}

// ─── Truck model + scene ──────────────────────────────────────────────────────

function TruckScene({
  onSelect, activeSlug, onDebugClick,
}: {
  onSelect: (p: ModalProduct) => void
  activeSlug: string | null
  onDebugClick?: (pos: [number, number, number]) => void
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
        <primitive
          object={scene}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation()
            if (onDebugClick && e.point) {
              const p = e.point
              onDebugClick([
                Math.round(p.x * 100) / 100,
                Math.round(p.y * 100) / 100,
                Math.round(p.z * 100) / 100,
              ])
            }
          }}
        />

        {HOTSPOT_PRODUCTS.map(product => (
          <Html
            key={product.slug}
            position={product.position}
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
  const [debugPos, setDebugPos] = useState<[number, number, number] | null>(null)
  const [debugMode, setDebugMode] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Debug toggle */}
      <button
        onClick={() => { setDebugMode(d => !d); setDebugPos(null) }}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 20,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          padding: '4px 10px', borderRadius: 6,
          background: debugMode ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${debugMode ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`,
          color: debugMode ? '#EF4444' : 'rgba(255,255,255,0.3)',
          cursor: 'pointer', fontFamily: 'var(--font-inter)',
        }}
      >
        {debugMode ? 'DEBUG ON' : 'DEBUG'}
      </button>

      {/* Coordinate readout */}
      {debugMode && (
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, background: 'rgba(4,12,24,0.92)',
          border: '1px solid rgba(51,153,224,0.4)', borderRadius: 8,
          padding: '8px 16px', fontFamily: 'monospace', fontSize: 13,
          color: '#60A5FA', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)',
        }}>
          {debugPos
            ? `position: [${debugPos[0]}, ${debugPos[1]}, ${debugPos[2]}]`
            : 'Click any part of the truck to get its coordinates'}
        </div>
      )}

      <Canvas
        camera={{ position: [14, 6, 22], fov: 32 }}
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
          <TruckScene
            onSelect={onSelectProduct}
            activeSlug={activeSlug}
            onDebugClick={debugMode ? setDebugPos : undefined}
          />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.4}
            scale={12}
            blur={2}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
