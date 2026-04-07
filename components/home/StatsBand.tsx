'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { STATS } from '@/lib/content'

function StatCell({ number, suffix, label, active }: { number: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(number, 1400, active)

  return (
    <div className="px-11 py-[52px] border-r border-white/[0.06] last:border-r-0 relative group overflow-hidden">
      {/* Blue top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{
          background: 'linear-gradient(90deg, #0078D4, #3399E0)',
          transform: 'scaleX(0)',
          transition: 'transform 0.35s ease',
        }}
        ref={(el) => {
          if (el) {
            const parent = el.parentElement
            if (parent) {
              parent.addEventListener('mouseenter', () => { el.style.transform = 'scaleX(1)' })
              parent.addEventListener('mouseleave', () => { el.style.transform = 'scaleX(0)' })
            }
          }
        }}
      />
      <div className="font-display text-[44px] font-extrabold text-white tracking-[-0.03em] leading-none mb-2">
        {count.toLocaleString()}
        <sup className="text-bpl-blue-light text-[24px] ml-0.5">{suffix}</sup>
      </div>
      <div className="text-[12px] font-medium tracking-[0.07em] uppercase text-white/40">
        {label}
      </div>
    </div>
  )
}

export function StatsBand() {
  const { ref, visible } = useScrollReveal(0.3)

  return (
    <div ref={ref} className="bg-bpl-navy-mid grid grid-cols-4">
      {STATS.map((stat) => (
        <StatCell key={stat.label} {...stat} active={visible} />
      ))}
    </div>
  )
}
