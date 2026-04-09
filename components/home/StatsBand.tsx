'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { STATS } from '@/lib/content'

function StatCell({ number, suffix, label, active, index }: {
  number: number; suffix: string; label: string; active: boolean; index: number
}) {
  const count = useCountUp(number, 1600, active)

  return (
    <div className="relative flex flex-col items-center text-center px-6 py-14 border-r border-white/[0.07] last:border-r-0 overflow-hidden">
      {/* Per-cell radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(0,80,200,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Number */}
      <div
        className="relative font-display font-extrabold tracking-tight leading-none mb-2"
        style={{
          fontSize: 'clamp(38px, 4.5vw, 56px)',
          backgroundImage: `linear-gradient(135deg, #ffffff 0%, #3399E0 60%, #60A5FA 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          // stagger the gradient angle slightly per cell
          filter: 'drop-shadow(0 0 18px rgba(51,153,224,0.35))',
        }}
      >
        {count.toLocaleString()}
        <span
          className="ml-0.5"
          style={{ fontSize: '58%', backgroundImage: 'linear-gradient(135deg, #3399E0, #60A5FA)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <div className="relative text-[11.5px] font-medium tracking-[0.08em] uppercase text-white/38 mt-1">
        {label}
      </div>
    </div>
  )
}

export function StatsBand() {
  const { ref, visible } = useScrollReveal(0.3)

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-2 md:grid-cols-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #030D1A 0%, #071526 50%, #030D1A 100%)',
        borderTop: '1px solid rgba(51,153,224,0.12)',
        borderBottom: '1px solid rgba(51,153,224,0.08)',
      }}
    >
      {/* Top gradient stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(51,153,224,0.5) 30%, rgba(96,165,250,0.5) 70%, transparent 100%)' }}
      />

      {STATS.map((s, i) => (
        <StatCell key={s.label} {...s} active={visible} index={i} />
      ))}

      {/* Bottom gradient stripe */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(51,153,224,0.3) 50%, transparent 100%)' }}
      />
    </div>
  )
}
