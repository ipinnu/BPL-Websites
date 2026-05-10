'use client'
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { NIGERIA_STATES } from '@/lib/nigeria-paths'

// ── Constants ──────────────────────────────────────────────────────
const SVG_W  = 744.24182
const SVG_H  = 599.92847
const SCALE  = 140 / SVG_W   // map ≈ 140 world-units wide

/** SVG pixel → 3-D world vector */
function sv(x: number, y: number, z = 9): THREE.Vector3 {
  return new THREE.Vector3(
    (x - SVG_W / 2) * SCALE,
    -(y - SVG_H / 2) * SCALE,
    z,
  )
}

// ── Route waypoints ────────────────────────────────────────────────
const R_LA_AB = [[44,459],[80,420],[145,378],[195,342],[245,306],[278,308],[299,301]].map(([x,y])=>sv(x,y))
const R_AB_KN = [[299,301],[312,268],[332,222],[347,174],[357,143],[362,118]].map(([x,y])=>sv(x,y))
const R_PH_AB = [[269,566],[273,522],[280,472],[283,432],[287,392],[293,344],[299,301]].map(([x,y])=>sv(x,y))
const R_LA_IB = [[44,459],[52,441],[63,424],[79,406]].map(([x,y])=>sv(x,y))

// ── Cities ─────────────────────────────────────────────────────────
const CITIES = [
  { label: 'Lagos',  pos: sv(44,459),  color: '#3399E0', r: 0.9 },
  { label: 'Abuja',  pos: sv(299,301), color: '#3399E0', r: 0.9 },
  { label: 'Kano',   pos: sv(362,118), color: '#3399E0', r: 0.9 },
  { label: 'P.H.',   pos: sv(269,566), color: '#EF4444', r: 0.9 },
  { label: 'Ibadan', pos: sv(79,406),  color: '#60A5FA', r: 0.9 },
  { label: 'Kaduna', pos: sv(296,211), color: '#60A5FA', r: 0.9 },
]

const HIGHLIGHT = new Set([
  'NG-LA','NG-FC','NG-KN','NG-RI','NG-OY','NG-KD','NG-DE','NG-IM','NG-AN',
])

// ══════════════════════════════════════════════════════════════════

/** Extruded + edge-lit Nigeria map */
function NigeriaMap() {
  const data = useMemo(() => {
    const loader = new SVGLoader()
    const markup = `<svg viewBox="0 0 ${SVG_W} ${SVG_H}" xmlns="http://www.w3.org/2000/svg">
      ${NIGERIA_STATES.map(st => `<path id="${st.id}" d="${st.d}"/>`).join('')}
    </svg>`
    const parsed = loader.parse(markup)

    return parsed.paths.flatMap((path, i) => {
      const lit = HIGHLIGHT.has(NIGERIA_STATES[i]?.id ?? '')
      return SVGLoader.createShapes(path).map(shape => {
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: 7, bevelEnabled: true,
          bevelThickness: 0.8, bevelSize: 0.4, bevelSegments: 1,
        })
        geo.scale(SCALE, -SCALE, SCALE)
        geo.translate(-(SVG_W / 2) * SCALE, (SVG_H / 2) * SCALE, 0)
        const edges = new THREE.EdgesGeometry(geo, 28)
        return { geo, edges, lit }
      })
    })
  }, [])

  return (
    <>
      {/* Solid state faces */}
      {data.map(({ geo, lit }, i) => (
        <mesh key={i} geometry={geo}>
          <meshStandardMaterial
            color    ={lit ? '#0C3A6A' : '#071626'}
            emissive ={lit ? '#00368A' : '#001640'}
            emissiveIntensity={lit ? 0.6 : 0.22}
            roughness={0.78} metalness={0.15}
          />
        </mesh>
      ))}

      {/* Glowing border edges — the "map boundary" look */}
      {data.map(({ edges, lit }, i) => (
        <lineSegments key={`e-${i}`} geometry={edges}>
          <lineBasicMaterial
            color={lit ? '#3399E0' : '#2A6AAA'}
            transparent
            opacity={lit ? 0.85 : 0.55}
          />
        </lineSegments>
      ))}
    </>
  )
}

/** Subtle coordinate-grid plane sitting under the map */
function GridPlane() {
  const geo = useMemo(() => new THREE.PlaneGeometry(420, 340, 42, 34), [])
  return (
    <mesh geometry={geo} position={[0, 0, -3]}>
      <meshBasicMaterial color="#0B2040" wireframe transparent opacity={0.18} />
    </mesh>
  )
}

/** Glowing route tube */
function RouteTube({
  pts, color, opacity = 0.72, r = 0.7,
}: { pts: THREE.Vector3[]; color: string; opacity?: number; r?: number }) {
  const geo = useMemo(() => {
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 50, r, 6, false)
  }, [pts, r])

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        color={color} emissive={color} emissiveIntensity={2.8}
        transparent opacity={opacity} roughness={0.08} metalness={0.5}
        depthWrite={false}
      />
    </mesh>
  )
}

const TRAIL_COUNT = 10

/** Moving vehicle with comet-tail trail */
function Vehicle({
  pts, color, speed, offset = 0,
}: { pts: THREE.Vector3[]; color: string; speed: number; offset?: number }) {
  const headRef   = useRef<THREE.Mesh>(null)
  const trailRefs = useRef<(THREE.Mesh | null)[]>([])
  const t         = useRef(offset)
  const curve     = useMemo(() => new THREE.CatmullRomCurve3(pts), [pts])

  useFrame((_, dt) => {
    t.current = (t.current + dt * speed) % 1
    // Head
    headRef.current?.position.copy(curve.getPoint(t.current))
    // Trail spheres — each one slightly behind on the curve
    trailRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const trailT = ((t.current - (i + 1) * 0.014) + 1) % 1
      mesh.position.copy(curve.getPoint(trailT))
    })
  })

  return (
    <group>
      {/* Fading trail spheres */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => {
        const fade = 1 - i / TRAIL_COUNT
        return (
          <mesh key={i} ref={el => { trailRefs.current[i] = el }}>
            <sphereGeometry args={[Math.max(0.3, 1.6 * fade), 6, 6]} />
            <meshStandardMaterial
              color={color} emissive={color}
              emissiveIntensity={5 * fade}
              roughness={0} transparent opacity={fade * 0.9}
              depthWrite={false}
            />
          </mesh>
        )
      })}
      {/* Bright head */}
      <mesh ref={headRef}>
        <sphereGeometry args={[1.1, 10, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={9} roughness={0} />
      </mesh>
    </group>
  )
}

/** Double-ring pulsing city node */
function CityNode({ pos, color, r }: { pos: THREE.Vector3; color: string; r: number }) {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t1 = (clock.elapsedTime * 1.3)       % 1
    const t2 = (clock.elapsedTime * 1.3 + 0.5) % 1
    if (ring1.current) {
      ring1.current.scale.setScalar(1 + t1 * 1.4)
      ;(ring1.current.material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - t1)
    }
    if (ring2.current) {
      ring2.current.scale.setScalar(1 + t2 * 1.4)
      ;(ring2.current.material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - t2)
    }
  })

  return (
    <group position={pos}>
      <mesh ref={ring1}>
        <ringGeometry args={[r * 1.2, r * 1.7, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={ring2}>
        <ringGeometry args={[r * 1.2, r * 1.7, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[r, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} roughness={0} />
      </mesh>
      <pointLight color={color} intensity={5} distance={45} decay={2} />
    </group>
  )
}

/**
 * Builds hex grid geometry + a centres array for the activation animation.
 * R = circumradius, COLS/ROWS = grid dimensions.
 */
function buildHexGrid(R: number, COLS: number, ROWS: number) {
  const W = R * Math.sqrt(3)
  const H = R * 1.5
  const verts: number[] = []
  const centres: [number, number][] = []

  const corner = (cx: number, cy: number, i: number) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return [cx + R * Math.cos(a), cy + R * Math.sin(a), 0] as const
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cx = col * W + (row % 2 === 1 ? W / 2 : 0) - (COLS * W) / 2
      const cy = row * H - (ROWS * H) / 2
      centres.push([cx, cy])
      for (let i = 0; i < 6; i++) {
        const [ax, ay, az] = corner(cx, cy, i)
        const [bx, by, bz] = corner(cx, cy, (i + 1) % 6)
        verts.push(ax, ay, az, bx, by, bz)
      }
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3))
  return { geo, centres }
}

/**
 * Two-layer parallax hex grid with random hex activation.
 *
 * Layer A — further back (z=-22), larger hexes, moves less with mouse → feels distant.
 * Layer B — closer (z=-10), smaller hexes, moves more with mouse → feels near.
 * Each layer has independently animating hexes that pulse on and off.
 */
function HexGrid() {
  const layerA = useMemo(() => buildHexGrid(10, 30, 28), [])
  const layerB = useMemo(() => buildHexGrid(6,  48, 44), [])

  const refA = useRef<THREE.Group>(null)
  const refB = useRef<THREE.Group>(null)

  const mouse   = useRef({ x: 0, y: 0 })
  const smoothA = useRef({ x: 0, y: 0 })
  const smoothB = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useFrame(() => {
    smoothA.current.x += (mouse.current.x * 6  - smoothA.current.x) * 0.04
    smoothA.current.y += (mouse.current.y * 4  - smoothA.current.y) * 0.04
    smoothB.current.x += (mouse.current.x * 14 - smoothB.current.x) * 0.04
    smoothB.current.y += (mouse.current.y * 9  - smoothB.current.y) * 0.04

    if (refA.current) {
      refA.current.position.x = smoothA.current.x
      refA.current.position.y = smoothA.current.y
    }
    if (refB.current) {
      refB.current.position.x = smoothB.current.x
      refB.current.position.y = smoothB.current.y
    }
  })

  return (
    <>
      <group ref={refA} position={[0, 0, -22]}>
        <lineSegments geometry={layerA.geo}>
          <lineBasicMaterial color="#2A6AAA" transparent opacity={0.55} />
        </lineSegments>
      </group>
      <group ref={refB} position={[0, 0, -10]}>
        <lineSegments geometry={layerB.geo}>
          <lineBasicMaterial color="#1A4A80" transparent opacity={0.42} />
        </lineSegments>
      </group>
    </>
  )
}

/**
 * Soft radial glow disc behind the map — the "spotlight" that makes
 * the map feel like it's the intentional focal point of the scene.
 */
function MapGlow() {
  return (
    <group position={[0, 0, -8]}>
      {/* Outer soft bloom — very large, very faint */}
      {[160, 120, 85, 55, 30].map((r, i) => (
        <mesh key={i}>
          <circleGeometry args={[r, 64]} />
          <meshBasicMaterial
            color="#0044AA"
            transparent
            opacity={0.015 + i * 0.008}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Pulsing concentric radar rings — outward ripple from the map centre.
 * 4 rings staggered in phase so there's always one expanding.
 */
function RadarRings() {
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ]

  useFrame(({ clock }) => {
    refs.forEach((ref, i) => {
      if (!ref.current) return
      const t = ((clock.elapsedTime * 0.28 + i * 0.25) % 1)
      ref.current.scale.setScalar(0.6 + t * 0.55)
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.13 * (1 - t)
    })
  })

  return (
    <group position={[0, 0, -4]}>
      {refs.map((ref, i) => (
        <mesh key={i} ref={ref}>
          <ringGeometry args={[46, 47.2, 80]} />
          <meshBasicMaterial
            color="#2A7FD4"
            transparent
            opacity={0.13}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Sparse star field — just for depth, kept subtle */
function Particles() {
  const count = 220
  const pos = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 480
      arr[i*3+1] = (Math.random() - 0.5) * 400
      arr[i*3+2] = (Math.random() - 0.5) * 160 - 80
    }
    return arr
  }, [])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.9} color="#3A6898" transparent opacity={0.22} sizeAttenuation />
    </points>
  )
}

/** City name label floating above a node */
function CityLabel({ pos, name, color }: { pos: THREE.Vector3; name: string; color: string }) {
  return (
    <Html position={[pos.x, pos.y + 7, pos.z + 3]} center distanceFactor={170} zIndexRange={[8, 9]}>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.78)',
        textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {name}
      </div>
    </Html>
  )
}

/**
 * Camera sits above-right at ~28° pitch — the "logistics map" angle.
 * Mouse adds subtle parallax. A gentle slow drift keeps it alive.
 */
function CameraRig() {
  const { camera } = useThree()
  const mouse  = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })

  // Camera fits the smaller map
  const BASE = useMemo(() => ({ x: -5, y: 62, z: 207 }), [])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useFrame(({ clock }) => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.035
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.035
    const breathX = Math.sin(clock.elapsedTime * 0.09) * 4
    const breathY = Math.cos(clock.elapsedTime * 0.06) * 2.5
    camera.position.set(
      BASE.x + smooth.current.x * 14 + breathX,
      BASE.y + smooth.current.y * 9  + breathY,
      BASE.z,
    )
    camera.lookAt(40, -10, 0)
  })

  return null
}

/** Full R3F scene */
function Scene() {
  return (
    <>
      <CameraRig />
      <color attach="background" args={['#030D1A']} />
      <fog attach="fog" args={['#030D1A', 340, 580]} />

      {/* Lighting */}
      <ambientLight intensity={0.25} />
      {/* Key light — warm blue-white from above-front */}
      <directionalLight position={[80, 160, 140]} intensity={0.8} color="#B8CCFF" />
      {/* Fill light — blue from left */}
      <pointLight position={[-120, 60, 100]} intensity={4} color="#0050CC" distance={400} decay={2} />
      {/* Rim light — deep navy from below */}
      <pointLight position={[100, -100, 40]} intensity={2} color="#001233" distance={320} decay={2} />

      {/* Centered on the active Lagos–Abuja–PH corridor */}
      <group position={[55, 0, 0]}>
        <HexGrid />
        <RadarRings />
        <NigeriaMap />

        {/* Routes */}
        <RouteTube pts={R_LA_AB} color="#3399E0" />
        <RouteTube pts={R_AB_KN} color="#3399E0" opacity={0.45} r={0.5} />
        <RouteTube pts={R_PH_AB} color="#EF4444" opacity={0.55} r={0.55} />
        <RouteTube pts={R_LA_IB} color="#60A5FA" opacity={0.38} r={0.4} />

        {/* Vehicles */}
        <Vehicle pts={R_LA_AB} color="#3399E0" speed={0.10} offset={0.0}  />
        <Vehicle pts={R_LA_AB} color="#60A5FA" speed={0.08} offset={0.52} />
        <Vehicle pts={R_AB_KN} color="#3399E0" speed={0.13} offset={0.2}  />
        <Vehicle pts={R_PH_AB} color="#EF4444" speed={0.09} offset={0.7}  />
        <Vehicle pts={R_LA_IB} color="#60A5FA" speed={0.17} offset={0.4}  />

        {/* City nodes + labels */}
        {CITIES.map(c => (
          <group key={c.label}>
            <CityNode pos={c.pos} color={c.color} r={c.r} />
            <CityLabel pos={c.pos} name={c.label} color={c.color} />
          </group>
        ))}

      </group>
    </>
  )
}

export default function FleetScene() {
  return (
    <Canvas
      camera={{ position: [-5, 62, 207], fov: 52 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Scene />
    </Canvas>
  )
}
