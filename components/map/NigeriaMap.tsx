'use client'
import { useState } from 'react'
import { NIGERIA_STATES } from '@/lib/nigeria-paths'

interface TooltipState {
  visible: boolean
  name: string
  x: number
  y: number
}

export function NigeriaMap() {
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, name: '', x: 0, y: 0 })

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none bg-[rgba(13,27,42,0.95)] text-white text-xs px-3 py-1.5 rounded-md border border-[rgba(51,153,224,0.3)] whitespace-nowrap"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          {tooltip.name}
        </div>
      )}

      <svg
        viewBox="0 0 744.24182 599.92847"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[520px]"
        style={{ filter: 'drop-shadow(0 0 40px rgba(0,120,212,0.15))' }}
      >
        {/* State paths */}
        <g id="nigeria-states">
          {NIGERIA_STATES.map((state) => (
            <path
              key={state.id}
              d={state.d}
              id={state.id}
              style={{
                fill: 'rgba(255,255,255,0.055)',
                stroke: 'rgba(255,255,255,0.14)',
                strokeWidth: 0.8,
                transition: 'fill 0.2s, stroke 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as SVGPathElement
                el.style.fill = 'rgba(0,120,212,0.3)'
                el.style.stroke = 'rgba(51,153,224,0.7)'
                el.style.strokeWidth = '1.2'
                setTooltip({ visible: true, name: state.title, x: e.clientX, y: e.clientY })
              }}
              onMouseMove={(e) => {
                setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as SVGPathElement
                el.style.fill = 'rgba(255,255,255,0.055)'
                el.style.stroke = 'rgba(255,255,255,0.14)'
                el.style.strokeWidth = '0.8'
                setTooltip({ visible: false, name: '', x: 0, y: 0 })
              }}
            />
          ))}
        </g>

        {/* Route lines */}
        {/* Lagos → Abuja */}
        <path
          d="M 44,459 C 80,420 145,378 195,342 C 245,306 278,308 299,301"
          fill="none"
          stroke="#3399E0"
          strokeWidth={2}
          style={{
            strokeDasharray: 900,
            strokeDashoffset: 900,
            animation: 'draw-route 2.4s ease-out 0.8s forwards',
          }}
        />
        {/* Abuja → Kano */}
        <path
          d="M 299,301 C 312,268 332,222 347,174 C 357,143 360,130 362,118"
          fill="none"
          stroke="rgba(51,153,224,0.5)"
          strokeWidth={1.4}
          strokeDasharray="6 4"
          style={{
            strokeDasharray: '700',
            strokeDashoffset: 700,
            animation: 'draw-route 2s ease-out 1.2s forwards',
          }}
        />
        {/* PH → Abuja */}
        <path
          d="M 269,566 C 273,522 280,472 283,432 C 287,392 293,344 299,301"
          fill="none"
          stroke="rgba(204,0,0,0.55)"
          strokeWidth={1.4}
          style={{
            strokeDasharray: 700,
            strokeDashoffset: 700,
            animation: 'draw-route 2s ease-out 1.5s forwards',
          }}
        />
        {/* Lagos → Ibadan */}
        <path
          d="M 44,459 C 52,441 63,424 79,406"
          fill="none"
          stroke="rgba(51,153,224,0.35)"
          strokeWidth={1}
          strokeDasharray="4 4"
          style={{
            strokeDasharray: '300',
            strokeDashoffset: 300,
            animation: 'draw-route 1.5s ease-out 1s forwards',
          }}
        />

        {/* Moving truck dots */}
        {/* Truck 1: Lagos → Abuja */}
        <circle r={4} fill="#3399E0">
          <animateMotion
            dur="7s"
            begin="3s"
            repeatCount="indefinite"
            path="M 44,459 C 80,420 145,378 195,342 C 245,306 278,308 299,301"
          />
        </circle>
        {/* Truck 2: Abuja → Kano */}
        <circle r={3.5} fill="#3399E0">
          <animateMotion
            dur="6s"
            begin="5s"
            repeatCount="indefinite"
            path="M 299,301 C 312,268 332,222 347,174 C 357,143 360,130 362,118"
          />
        </circle>
        {/* Truck 3: PH → Abuja */}
        <circle r={3.5} fill="#CC0000">
          <animateMotion
            dur="8s"
            begin="4s"
            repeatCount="indefinite"
            path="M 269,566 C 273,522 280,472 283,432 C 287,392 293,344 299,301"
          />
        </circle>

        {/* City dots with pulse rings */}
        {/* Lagos */}
        <circle cx={44} cy={459} r={18} fill="none" stroke="#3399E0" strokeWidth={1}
          style={{ animation: 'ring-out 2s ease-out 1s infinite' }} />
        <circle cx={44} cy={459} r={5} fill="#3399E0" />

        {/* Abuja */}
        <circle cx={299} cy={301} r={18} fill="none" stroke="#3399E0" strokeWidth={1}
          style={{ animation: 'ring-out 2s ease-out 1.3s infinite' }} />
        <circle cx={299} cy={301} r={5} fill="#3399E0" />

        {/* Kano */}
        <circle cx={362} cy={118} r={14} fill="none" stroke="#3399E0" strokeWidth={1}
          style={{ animation: 'ring-out 2s ease-out 1.6s infinite' }} />
        <circle cx={362} cy={118} r={4} fill="#3399E0" />

        {/* Port Harcourt */}
        <circle cx={269} cy={566} r={14} fill="none" stroke="#CC0000" strokeWidth={1}
          style={{ animation: 'ring-out 2s ease-out 1.9s infinite' }} />
        <circle cx={269} cy={566} r={4} fill="#CC0000" />

        {/* Ibadan */}
        <circle cx={79} cy={406} r={3.5} fill="rgba(51,153,224,0.65)" />

        {/* Kaduna */}
        <circle cx={296} cy={211} r={3} fill="rgba(51,153,224,0.55)" />

        {/* City labels */}
        <text x={52} y={463} fill="rgba(255,255,255,0.7)" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500}>Lagos</text>
        <text x={307} y={298} fill="rgba(255,255,255,0.7)" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500}>Abuja</text>
        <text x={370} y={115} fill="rgba(255,255,255,0.7)" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500}>Kano</text>
        <text x={277} y={580} fill="rgba(255,255,255,0.7)" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500}>P.H.</text>

        {/* Live tracking chip */}
        <rect x={520} y={530} width={110} height={28} rx={6}
          fill="rgba(13,27,42,0.92)" stroke="rgba(51,153,224,0.3)" strokeWidth={1} />
        <circle cx={533} cy={544} r={4} fill="#4ADE80">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <text x={542} y={548} fill="white" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={600} letterSpacing={1}>
          LIVE TRACKING
        </text>
      </svg>
    </div>
  )
}
