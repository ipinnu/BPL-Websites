'use client'
import { motion } from 'framer-motion'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/home/CtaBand'
import { SERVICES } from '@/lib/content'
import { MapPin, Wrench, Users, Gauge, BarChart3, Package, LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin, Wrench, Users, Gauge, BarChart3, Package,
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const ACCENT_COLORS = ['#3399E0', '#60A5FA', '#4ADE80', '#A78BFA', '#F59E0B', '#EF4444']

export default function SolutionsPage() {
  return (
    <div style={{ background: '#040C18' }}>

      {/* ── Hero ── */}
      <section
        className="relative px-8 md:px-14 xl:px-20 py-28 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #040C18 0%, #071526 55%, #040F1E 100%)' }}
      >
        <div className="absolute -top-24 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.13) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,50,160,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-site mx-auto relative">
          <motion.div {...fade(0.1)}>
            <SectionLabel light>What We Do</SectionLabel>
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mt-3 max-w-[700px]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 62px)' }}
          >
            Complete fleet solutions,{' '}
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              built for Nigeria
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.32)}
            className="text-[16px] leading-[1.78] max-w-[520px] mt-6"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            From real-time GPS tracking to driver training — every service built around Cost Reduction, Efficiency and Safety.
          </motion.p>

          {/* CES pills */}
          <motion.div {...fade(0.44)} className="flex flex-wrap gap-2.5 mt-8">
            {['Cost Reduction', 'Efficiency', 'Safety'].map((p, i) => (
              <span
                key={p}
                className="text-[11.5px] font-semibold px-4 py-1.5 rounded-full"
                style={{
                  color: ACCENT_COLORS[i],
                  background: `${ACCENT_COLORS[i]}15`,
                  border: `1px solid ${ACCENT_COLORS[i]}30`,
                }}
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="px-8 md:px-14 xl:px-20 py-24 md:py-32" style={{ background: '#040C18' }}>
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>Our Services</SectionLabel>
            <h2
              className="font-display font-bold text-white tracking-[-0.025em] leading-[1.15] mt-2 mb-16 max-w-[480px]"
              style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}
            >
              Six service pillars — one integrated fleet ecosystem
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((svc, i) => {
              const Icon = ICON_MAP[svc.icon] ?? MapPin
              const color = ACCENT_COLORS[i]
              return (
                <RevealWrapper key={svc.title} delay={i * 0.08}>
                  <div
                    id={svc.href.split('#')[1]}
                    className="group relative rounded-2xl p-8 h-full flex flex-col overflow-hidden transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${color}12 0%, transparent 70%)` }}
                    />

                    {/* Number + Icon row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                      >
                        <Icon size={22} style={{ color }} strokeWidth={1.6} />
                      </div>
                      <span
                        className="font-display font-extrabold text-[42px] leading-none tracking-[-0.04em]"
                        style={{ color, opacity: 0.12 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <h3
                      className="font-display font-bold text-white text-[19px] tracking-[-0.02em] leading-[1.3] mb-3"
                    >
                      {svc.title}
                    </h3>
                    <p className="text-[14px] leading-[1.72] flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {svc.description}
                    </p>

                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <Button href="/contact" variant="ghost" className="text-[13px] px-4 py-2">
                        Enquire →
                      </Button>
                    </div>
                  </div>
                </RevealWrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why BPL ── */}
      <section
        className="px-8 md:px-14 xl:px-20 py-24"
        style={{ background: 'linear-gradient(180deg, #040C18 0%, #071526 50%, #040C18 100%)' }}
      >
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealWrapper>
              <SectionLabel light>Why BPL</SectionLabel>
              <h2
                className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.1] mt-3 mb-6"
                style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
              >
                24 years of boots-on-the-ground expertise
              </h2>
              <p className="text-[15px] leading-[1.78] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                We don&apos;t just sell technology — we embed ourselves in your operations, train your people, and deliver measurable outcomes that go straight to your bottom line.
              </p>
              <Button href="/contact" variant="primary">Start a Conversation →</Button>
            </RevealWrapper>

            <RevealWrapper delay={0.15}>
              <div className="space-y-4">
                {[
                  { stat: '150+',   desc: 'Enterprise clients across oil & gas, FMCG, construction, and transport' },
                  { stat: '6,000+', desc: 'IVMS devices installed and actively monitored nationwide' },
                  { stat: '5,032+', desc: 'Drivers and transport managers trained and certified' },
                  { stat: '1,000+', desc: 'Speed limiting devices deployed for safety compliance' },
                ].map((item, i) => (
                  <div
                    key={item.stat}
                    className="flex items-start gap-5 p-5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="font-display font-extrabold text-[22px] tracking-[-0.02em] flex-shrink-0 min-w-[100px]"
                      style={{
                        backgroundImage: 'linear-gradient(90deg, #3399E0, #60A5FA)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {item.stat}
                    </div>
                    <p className="text-[13.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
