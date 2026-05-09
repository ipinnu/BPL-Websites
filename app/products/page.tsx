'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/home/CtaBand'
import { PRODUCTS } from '@/lib/content'
import { ProductModal } from '@/components/products/ProductModal'
import { HOTSPOT_PRODUCTS } from '@/lib/hotspot-products'
import type { ModalProduct } from '@/components/products/ProductModal'

// Dynamic import — no SSR for WebGL
const TruckHotspotViewer = dynamic(
  () => import('@/components/products/TruckHotspotViewer').then(m => ({ default: m.TruckHotspotViewer })),
  { ssr: false, loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        style={{ width: 36, height: 36, border: '2px solid rgba(0,120,212,0.2)', borderTop: '2px solid #0078D4', borderRadius: '50%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )}
)

const TAG_COLORS: Record<string, string> = {
  'Video Telematics':  '#3399E0',
  'In-Cab Display':    '#60A5FA',
  'Fuel Management':   '#4ADE80',
  'Fleet Hardware':    '#A78BFA',
  'Safety Hardware':   '#F59E0B',
  'Telematics':        '#EF4444',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState<ModalProduct | null>(null)
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleSelectProduct = (product: ModalProduct) => setActiveProduct(product)
  const handleClose = () => setActiveProduct(null)

  // Map PRODUCTS slugs to hotspot modal data for card clicks
  const getModalProduct = (slug: string): ModalProduct | undefined =>
    HOTSPOT_PRODUCTS.find(p => p.slug === slug)

  return (
    <div style={{ background: '#040C18' }}>

      {/* ══════════════════════════════════════════════
          SECTION 1 — Truck Viewer (full viewport)
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(160deg, #040C18 0%, #071526 55%, #040F1E 100%)',
        }} />
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(0,80,200,0.14) 0%, transparent 70%)',
        }} />

        <div className="relative w-full py-24 md:py-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0" style={{ minHeight: '80vh' }}>

            {/* ── Left: intro text ── */}
            <div className="lg:w-[42%] lg:max-w-[580px] flex flex-col justify-center px-6 md:px-14 xl:px-20 lg:pl-[max(24px,calc((100vw-1200px)/2+80px))]">
              <motion.div {...fade(0.1)}>
                <SectionLabel light>Our Products</SectionLabel>
              </motion.div>

              <motion.h1
                {...fade(0.2)}
                className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mt-3"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
              >
                Technology Built for{' '}
                <span style={{
                  backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                }}>
                  Real Fleets
                </span>
              </motion.h1>

              <motion.p
                {...fade(0.32)}
                style={{ fontSize: 16, lineHeight: 1.78, color: 'rgba(255,255,255,0.5)', marginTop: 16, maxWidth: 420, fontFamily: 'var(--font-inter)' }}
              >
                Every device. Every vehicle. Click the markers to explore each product.
              </motion.p>

              {/* Product slug chips */}
              <motion.div {...fade(0.45)} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
                {HOTSPOT_PRODUCTS.map(p => {
                  const color = TAG_COLORS[p.tag] ?? '#3399E0'
                  return (
                    <button
                      key={p.slug}
                      onClick={() => handleSelectProduct(p)}
                      onMouseEnter={() => setHoveredSlug(p.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      style={{
                        fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-inter)',
                        padding: '5px 12px', borderRadius: 20,
                        color: hoveredSlug === p.slug ? '#fff' : color,
                        background: hoveredSlug === p.slug ? `${color}30` : `${color}12`,
                        border: `1px solid ${color}35`,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {p.name}
                    </button>
                  )
                })}
              </motion.div>

              {/* Mobile hint */}
              <motion.p
                {...fade(0.55)}
                className="lg:hidden"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 24, fontFamily: 'var(--font-inter)' }}
              >
                Scroll down to explore the full product range ↓
              </motion.p>
            </div>

            {/* ── Right: 3D truck — extends to viewport right edge ── */}
            <div
              className="hidden lg:block lg:flex-1"
              style={{ height: '75vh', position: 'relative' }}
            >
              {isDesktop && (
                <TruckHotspotViewer
                  onSelectProduct={handleSelectProduct}
                  activeSlug={hoveredSlug ?? activeProduct?.slug ?? null}
                />
              )}

              {/* Scroll hint */}
              <motion.div
                style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Scroll
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — Product grid
      ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-14 xl:px-20 py-20 md:py-28" style={{ background: '#040C18' }}>
        {/* Separator */}
        <div className="max-w-site mx-auto">
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 56 }} />

          <RevealWrapper>
            <SectionLabel light>Our Products</SectionLabel>
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
              const modalProduct = getModalProduct(product.slug)
              return (
                <RevealWrapper key={product.slug} delay={i * 0.07}>
                  <div
                    id={product.slug}
                    className="group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      cursor: modalProduct ? 'pointer' : 'default',
                    }}
                    onClick={() => modalProduct && handleSelectProduct(modalProduct)}
                    onMouseEnter={e => {
                      if (modalProduct) setHoveredSlug(product.slug)
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = `${tagColor}35`
                    }}
                    onMouseLeave={e => {
                      setHoveredSlug(null)
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(255,255,255,0.07)'
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[200px] overflow-hidden flex-shrink-0" style={{ background: '#071526' }}>
                      <Image
                        src={`/images/products/${product.slug}.jpg`}
                        alt={product.name}
                        fill
                        className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,12,24,0.7) 0%, transparent 60%)' }} />
                      <span
                        className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-md"
                        style={{ color: tagColor, background: `${tagColor}22`, border: `1px solid ${tagColor}40`, backdropFilter: 'blur(6px)' }}
                      >
                        {product.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-white text-[17px] tracking-[-0.02em] mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[13.5px] leading-[1.68] flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {product.description}
                      </p>
                      <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {modalProduct ? (
                          <span style={{
                            fontSize: 12.5, fontWeight: 600, color: tagColor,
                            fontFamily: 'var(--font-inter)', display: 'inline-flex', alignItems: 'center', gap: 5,
                          }}>
                            View product details →
                          </span>
                        ) : (
                          <Button href="/contact" variant="ghost" className="text-[12.5px] px-4 py-2">
                            Enquire now →
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partners strip */}
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
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
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
                    style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}28` }}
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

      {/* Modal */}
      <ProductModal product={activeProduct} onClose={handleClose} />
    </div>
  )
}
