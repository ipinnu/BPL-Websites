'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/home/CtaBand'
import { PRODUCTS } from '@/lib/content'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const TAG_COLORS: Record<string, string> = {
  'Video Telematics':  '#3399E0',
  'In-Cab Display':    '#60A5FA',
  'Fuel Management':   '#4ADE80',
  'Fleet Hardware':    '#A78BFA',
  'Safety Hardware':   '#F59E0B',
  'Telematics':        '#EF4444',
}

export default function ProductsPage() {
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
            <SectionLabel light>Our Products</SectionLabel>
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mt-3 max-w-[680px]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 62px)' }}
          >
            Technology that{' '}
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              moves Nigeria
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.32)}
            className="text-[15px] md:text-[16px] leading-[1.78] max-w-[520px] mt-5"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Hardware and software built for real-world conditions — from Lagos to Kano and everywhere in between.
          </motion.p>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section className="px-6 md:px-14 xl:px-20 py-20 md:py-28" style={{ background: '#040C18' }}>
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>Hardware &amp; Software</SectionLabel>
            <h2
              className="font-display font-bold text-white tracking-[-0.025em] leading-[1.15] mt-2 mb-12 max-w-[440px]"
              style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}
            >
              MiX by Powerfleet — built for Africa
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((product, i) => {
              const tagColor = TAG_COLORS[product.tag] ?? '#3399E0'
              return (
                <RevealWrapper key={product.slug} delay={i * 0.07}>
                  <div
                    id={product.slug}
                    className="group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[200px] overflow-hidden flex-shrink-0"
                      style={{ background: '#071526' }}>
                      <Image
                        src={`/images/products/${product.slug}.jpg`}
                        alt={product.name}
                        fill
                        className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(4,12,24,0.7) 0%, transparent 60%)' }} />
                      {/* Tag */}
                      <span
                        className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-md"
                        style={{
                          color: tagColor,
                          background: `${tagColor}22`,
                          border: `1px solid ${tagColor}40`,
                          backdropFilter: 'blur(6px)',
                        }}
                      >
                        {product.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-white text-[17px] tracking-[-0.02em] mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[13.5px] leading-[1.68] flex-1"
                        style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {product.description}
                      </p>
                      <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <Button href="/contact" variant="ghost" className="text-[12.5px] px-4 py-2">
                          Enquire now →
                        </Button>
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Partners strip ── */}
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
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <div className="flex-shrink-0">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-1"
                  style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Technology Partners
                </p>
                <p className="text-[22px] md:text-[26px] font-display font-bold text-white tracking-tight">
                  Powered by world-class platforms
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'MiX by Powerfleet', color: '#3399E0' },
                  { name: 'Elson Truck Technology', color: '#60A5FA' },
                  { name: 'GNOM DDE', color: '#4ADE80' },
                ].map(p => (
                  <span
                    key={p.name}
                    className="text-[13px] font-semibold px-4 py-2 rounded-lg"
                    style={{
                      color: p.color,
                      background: `${p.color}12`,
                      border: `1px solid ${p.color}28`,
                    }}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
