'use client'

import { Component, Suspense, useRef, useCallback, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { ModalProduct } from './ProductModal'
import { HOTSPOT_PRODUCTS } from '@/lib/hotspot-products'

export { HOTSPOT_PRODUCTS }

const TRUCK_PATH = '/truck.glb'

const TAG_COLORS_HOTSPOT: Record<string, string> = {
  'Video Telematics': '#3399E0',
  'In-Cab Display':   '#60A5FA',
  'Fuel Management':  '#4ADE80',
  'Fleet Hardware':   '#A78BFA',
  'Safety Hardware':  '#F59E0B',
  'Telematics':       '#EF4444',
}

// ─── Hotspot marker ───────────────────────────────────────────────────────────

function HotspotMarker({
  product, isActive, isAnyActive, onClick, onClickPartner,
}: {
  product: typeof HOTSPOT_PRODUCTS[number]
  isActive: boolean
  isAnyActive: boolean
  onClick: () => void
  onClickPartner?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const lit = isActive || hovered
  const color = TAG_COLORS_HOTSPOT[product.tag] ?? '#3399E0'
  const partnerColor = product.partner ? (TAG_COLORS_HOTSPOT[product.partner.tag] ?? '#3399E0') : color
  const goRight = product.position[0] >= 0

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: goRight ? 'row' : 'row-reverse',
        userSelect: 'none',
        opacity: isAnyActive && !isActive ? 0.18 : 1,
        transition: 'opacity 0.35s',
        transform: goRight ? 'translateY(-50%)' : 'translate(-100%, -50%)',
      }}
    >
      {/* Anchor dot */}
      <div
        onClick={e => { e.stopPropagation(); onClick() }}
        style={{
          width: 6, height: 6, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
          background: lit ? '#fff' : color,
          border: `1.5px solid ${lit ? color : 'rgba(255,255,255,0.25)'}`,
          boxShadow: `0 0 ${lit ? 12 : 6}px ${color}`,
          transition: 'all 0.2s',
        }}
      />

      {/* Line */}
      <div style={{
        width: 64, height: 1, flexShrink: 0,
        background: `linear-gradient(${goRight ? 'to right' : 'to left'}, ${color}${lit ? 'cc' : '55'}, ${color}11)`,
        transition: 'background 0.2s',
      }} />

      {/* Label card */}
      {product.partner ? (
        <div style={{
          background: 'rgba(4,12,24,0.88)',
          border: `1px solid rgba(255,255,255,0.1)`,
          borderRadius: 6,
          backdropFilter: 'blur(10px)',
          padding: '6px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}>
          <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)', marginBottom: 1 }}>
            Hardware Suite
          </div>
          <div
            onClick={e => { e.stopPropagation(); onClick() }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
          >
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {product.name}
              </div>
              <div style={{ fontSize: 8, fontWeight: 600, color, fontFamily: 'var(--font-inter)', letterSpacing: '0.09em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: 1 }}>
                {product.tag}
              </div>
            </div>
          </div>
          <div
            onClick={e => { e.stopPropagation(); onClickPartner?.() }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
          >
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: partnerColor, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {product.partner.name}
              </div>
              <div style={{ fontSize: 8, fontWeight: 600, color: partnerColor, fontFamily: 'var(--font-inter)', letterSpacing: '0.09em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: 1 }}>
                {product.partner.tag}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={e => { e.stopPropagation(); onClick() }}
          style={{
            padding: '5px 9px', cursor: 'pointer',
            background: lit ? `${color}18` : 'rgba(4,12,24,0.78)',
            border: `1px solid ${color}${lit ? '44' : '18'}`,
            borderRadius: 5,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: 10.5, fontWeight: 700, color: lit ? '#fff' : 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap', lineHeight: 1.3, transition: 'color 0.2s' }}>
            {product.name}
          </div>
          <div style={{ fontSize: 8.5, fontWeight: 600, color, fontFamily: 'var(--font-inter)', letterSpacing: '0.09em', textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1.3, marginTop: 2 }}>
            {product.tag}
          </div>
        </div>
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
        minDistance={12}
        maxDistance={55}
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
            zIndexRange={[10, 20]}
          >
            <HotspotMarker
              product={product}
              isActive={activeSlug === product.slug || activeSlug === product.partner?.slug}
              isAnyActive={activeSlug !== null}
              onClick={() => onSelect(product)}
              onClickPartner={() => {
                if (product.partner) {
                  const p = HOTSPOT_PRODUCTS.find(x => x.slug === product.partner!.slug)
                  if (p) onSelect(p)
                }
              }}
            />
          </Html>
        ))}
      </group>
    </>
  )
}

useGLTF.preload(TRUCK_PATH)

// ─── Loading spinner ──────────────────────────────────────────────────────────

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

// ─── Error boundary — prevents 3D crash from taking down the page ─────────────

class TruckErrorBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface Props {
  onSelectProduct: (product: ModalProduct) => void
  activeSlug: string | null
}

export function TruckHotspotViewer({ onSelectProduct, activeSlug }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <TruckErrorBoundary>
        <Canvas
          camera={{ position: [24, 9, 36], fov: 26 }}
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
      </TruckErrorBoundary>
    </div>
  )
}
