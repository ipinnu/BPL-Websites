'use client'
import { motion } from 'framer-motion'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/home/CtaBand'
import { Flame, Truck, HardHat, Navigation } from 'lucide-react'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const INDUSTRIES = [
  {
    Icon: Flame,
    name: 'Oil & Gas',
    tagline: 'Keeping energy moving safely',
    description: "From offshore logistics to onshore distribution, we keep Nigeria's energy sector moving safely and efficiently. Real-time tracking, driver compliance, and speed management for high-stakes environments.",
    clients: ['Shell Nigeria', 'TotalEnergies', 'Baker Hughes', 'Weatherford', 'Chevron', 'Schlumberger'],
    color: '#F59E0B',
    stats: [{ value: '6+', label: 'Major clients' }, { value: '24/7', label: 'Monitoring' }],
  },
  {
    Icon: Truck,
    name: 'FMCG & Logistics',
    tagline: 'Last-mile efficiency at scale',
    description: 'Nationwide distribution fleet management and route optimisation for consumer goods and logistics companies. Cut delivery costs and get real-time visibility across every vehicle in your network.',
    clients: ['DHL Logistics', 'OVH Energy', 'TravelBeta'],
    color: '#3399E0',
    stats: [{ value: '150+', label: 'Fleet clients' }, { value: '14K+', label: 'Daily km tracked' }],
  },
  {
    Icon: HardHat,
    name: 'Construction & Mining',
    tagline: 'Heavy equipment, light footprint',
    description: 'Heavy equipment tracking, overload prevention with wireless axle sensors, and site-to-site transport management. Keep your plant running, compliant, and on budget.',
    clients: ['Lafarge Africa', 'Julius Berger'],
    color: '#4ADE80',
    stats: [{ value: '1K+', label: 'Speed limiters' }, { value: '99%', label: 'Uptime' }],
  },
  {
    Icon: Navigation,
    name: 'Transport & Haulage',
    tagline: 'Driver safety from depot to delivery',
    description: 'End-to-end driver safety, speed compliance, and fleet performance for commercial transport operators. Reduce incidents, lower insurance costs, and keep every vehicle accountable.',
    clients: ['TravelBeta', 'JMG Limited', 'Elson Tech'],
    color: '#A78BFA',
    stats: [{ value: '5K+', label: 'Drivers trained' }, { value: '↓40%', label: 'Incident rate' }],
  },
]

export default function IndustriesPage() {
  return (
    <div style={{ background: '#040C18' }}>

      {/* ── Hero ── */}
      <section
        className="relative px-6 md:px-14 xl:px-20 py-24 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #040C18 0%, #071526 55%, #040F1E 100%)' }}
      >
        <div className="absolute -top-24 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.13) 0%, transparent 70%)' }} />

        <div className="max-w-site mx-auto relative">
          <motion.div {...fade(0.1)}>
            <SectionLabel light>Industries Served</SectionLabel>
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mt-3 max-w-[700px]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 62px)' }}
          >
            Built for Nigeria&apos;s{' '}
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              most demanding sectors
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.32)}
            className="text-[15px] md:text-[16px] leading-[1.78] max-w-[520px] mt-5"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            From oil fields to construction sites — BPL fleet solutions are deployed across Nigeria&apos;s toughest operating environments.
          </motion.p>

          {/* Industry pills */}
          <motion.div {...fade(0.44)} className="flex flex-wrap gap-2.5 mt-8">
            {INDUSTRIES.map(ind => (
              <span
                key={ind.name}
                className="text-[11.5px] font-semibold px-4 py-1.5 rounded-full"
                style={{
                  color: ind.color,
                  background: `${ind.color}15`,
                  border: `1px solid ${ind.color}30`,
                }}
              >
                {ind.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Industry cards ── */}
      <section className="px-6 md:px-14 xl:px-20 py-20 md:py-28" style={{ background: '#040C18' }}>
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <RevealWrapper key={ind.name} delay={i * 0.1}>
                <div
                  className="group relative rounded-2xl p-7 md:p-9 h-full flex flex-col overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${ind.color}10 0%, transparent 70%)` }}
                  />

                  {/* Icon + name */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${ind.color}18`, border: `1px solid ${ind.color}30` }}
                    >
                      <ind.Icon size={22} style={{ color: ind.color }} strokeWidth={1.6} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-white text-[20px] md:text-[22px] tracking-[-0.02em] leading-tight">
                        {ind.name}
                      </h2>
                      <p className="text-[12px] font-medium mt-0.5" style={{ color: ind.color }}>
                        {ind.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] md:text-[14.5px] leading-[1.72] flex-1"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {ind.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-6 mt-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {ind.stats.map(s => (
                      <div key={s.label}>
                        <div
                          className="font-display font-extrabold text-[20px] tracking-[-0.02em] leading-none"
                          style={{ color: ind.color }}
                        >
                          {s.value}
                        </div>
                        <div className="text-[11px] font-medium tracking-[0.06em] uppercase mt-1"
                          style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Clients */}
                  <div className="mt-5">
                    <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase mb-2.5"
                      style={{ color: 'rgba(255,255,255,0.25)' }}>
                      Clients include
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ind.clients.map(c => (
                        <span
                          key={c}
                          className="text-[12px] font-medium px-2.5 py-1 rounded-md"
                          style={{
                            color: 'rgba(255,255,255,0.55)',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>

          {/* CTA */}
          <RevealWrapper delay={0.2}>
            <div className="mt-12 text-center">
              <Button href="/contact" variant="primary">Discuss your industry needs →</Button>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Proof strip ── */}
      <section
        className="px-6 md:px-14 xl:px-20 py-16 md:py-20"
        style={{
          background: 'linear-gradient(180deg, #040C18 0%, #071526 50%, #040C18 100%)',
          borderTop: '1px solid rgba(51,153,224,0.1)',
          borderBottom: '1px solid rgba(51,153,224,0.08)',
        }}
      >
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '4',      label: 'Major sectors' },
                { value: '150+',   label: 'Enterprise clients' },
                { value: '24 yrs', label: 'Industry experience' },
                { value: '36+',    label: 'States covered' },
              ].map(s => (
                <div key={s.label}>
                  <div
                    className="font-display font-extrabold text-[32px] md:text-[38px] tracking-[-0.03em] leading-none mb-1.5"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #3399E0 60%, #60A5FA 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] font-medium tracking-[0.08em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
