'use client'
import { motion } from 'framer-motion'
import { NigeriaMap } from '@/components/map/NigeriaMap'
import { Button } from '@/components/ui/Button'
import { useMapTilt } from '@/hooks/useMapTilt'
import { HERO } from '@/lib/content'

export function HeroSection() {
  const { wrapperRef, onMouseMove, onMouseLeave } = useMapTilt()

  return (
    <section className="min-h-[calc(100vh-68px)] grid grid-cols-2">
      {/* Left: Copy */}
      <div className="bg-white px-20 py-[88px] flex flex-col justify-center relative overflow-hidden">
        {/* Subtle radial gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(0,120,212,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 mb-[22px] text-[11.5px] font-semibold tracking-[0.1em] uppercase text-bpl-blue"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span
            className="w-[7px] h-[7px] bg-bpl-blue rounded-full flex-shrink-0"
            style={{ animation: 'dot-pulse 2s ease-in-out infinite' }}
          />
          {HERO.eyebrow}
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-display text-[54px] font-extrabold leading-[1.05] tracking-[-0.035em] text-bpl-navy mb-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {HERO.h1[0]}<br />
          Tracked in <span className="text-bpl-blue">Real‑Time.</span><br />
          {HERO.h1[2]}
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-[16px] text-bpl-body leading-[1.65] max-w-[440px] mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {HERO.sub}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <Button href="/solutions" variant="primary">
            {HERO.cta1} →
          </Button>
          <Button href="/clients" variant="outline">
            {HERO.cta2}
          </Button>
        </motion.div>
      </div>

      {/* Right: Nigeria Map */}
      <div
        className="bg-bpl-navy relative overflow-hidden flex items-center justify-center p-12"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Left edge fade */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[60px] z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, white, transparent)' }}
        />

        {/* Map wrapper with 3D tilt */}
        <div
          ref={wrapperRef}
          className="relative w-full max-w-[560px] z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <NigeriaMap />
        </div>
      </div>
    </section>
  )
}
