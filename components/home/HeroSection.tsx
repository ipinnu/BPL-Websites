'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { HERO } from '@/lib/content'

const FleetScene = dynamic(() => import('@/components/3d/FleetScene'), { ssr: false })

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-104px)]">

      {/* ── Left: Copy ── */}
      <div
        className="flex flex-col justify-center px-8 md:px-14 xl:px-20 py-24 md:py-32 order-2 lg:order-1"
        style={{ background: '#040C18' }}
      >
        {/* Eyebrow */}
        <motion.div {...fade(0.1)} className="flex items-center gap-2.5 mb-8">
          <span className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }} />
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3399E0]">
            {HERO.eyebrow}
          </p>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fade(0.2)}
          className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mb-8"
          style={{ fontSize: 'clamp(38px, 4.2vw, 60px)' }}
        >
          {HERO.h1[0]}
          <br />
          Tracked in{' '}
          <span style={{
            backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            Real‑Time.
          </span>
          <br />
          {HERO.h1[2]}
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fade(0.32)}
          className="text-[15.5px] leading-[1.78] max-w-[430px] mb-11"
          style={{ color: 'rgba(255,255,255,0.58)' }}
        >
          {HERO.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.44)} className="flex flex-wrap items-center gap-3.5 mb-14">
          <Button href="/solutions" variant="primary">{HERO.cta1} →</Button>
          <Button href="/about"     variant="ghost"  >{HERO.cta2}</Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div {...fade(0.56)}>
          <p className="text-[10.5px] font-semibold tracking-[0.12em] uppercase mb-3"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            Trusted by Nigeria's leading enterprises
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {['Shell Nigeria','TotalEnergies','DHL','Lafarge','Baker Hughes','Chevron'].map(n => (
              <span key={n} className="text-[12.5px] font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>{n}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right: 3D Map panel ── */}
      <div
        className="relative min-h-[520px] order-1 lg:order-2 overflow-hidden"
        style={{ background: '#030D1A' }}
      >
        <FleetScene />

        {/* Left seam — matches dark left panel */}
        <div
          className="absolute inset-y-0 left-0 w-[50%] pointer-events-none z-10 hidden lg:block"
          style={{ background: 'linear-gradient(to right, #040C18 0%, rgba(4,12,24,0.45) 8%, rgba(4,12,24,0.2) 25%, rgba(4,12,24,0.08) 60%, transparent 100%)' }}
        />

        {/* Right edge — very thin, just a clean finish */}
        <div
          className="absolute inset-y-0 right-0 w-6 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #030D1A 0%, transparent 100%)' }}
        />

        {/* Bottom — map sinks into darkness */}
        <div
          className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #030D1A 0%, transparent 100%)' }}
        />

        {/* Top vignette */}
        <div
          className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(3,13,26,0.5) 0%, transparent 100%)' }}
        />
      </div>
    </section>
  )
}
