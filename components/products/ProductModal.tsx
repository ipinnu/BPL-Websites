'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIDEO_SRC = '/videos/MiX%20Telematics%20_%20Hardware%20_%20MiX%20Vision.mp4'

const TAG_COLORS: Record<string, string> = {
  'Video Telematics':  '#3399E0',
  'In-Cab Display':    '#60A5FA',
  'Fuel Management':   '#4ADE80',
  'Fleet Hardware':    '#A78BFA',
  'Safety Hardware':   '#F59E0B',
  'Telematics':        '#EF4444',
}

export interface ModalProduct {
  slug: string
  name: string
  tag: string
  description: string
  specs: string[]
}

interface Props {
  product: ModalProduct | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play/pause video with modal
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (product) {
      v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [product])

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const tagColor = product ? (TAG_COLORS[product.tag] ?? '#3399E0') : '#3399E0'

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', zIndex: 101,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw', maxWidth: 680,
              maxHeight: '90vh', overflowY: 'auto',
              background: '#0a0a0a',
              border: '1px solid #1a1a1a',
              borderRadius: 20,
              boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                zIndex: 2, transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Video */}
            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#040C18', borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, #0a0a0a 0%, transparent 50%)',
              }} />
            </div>

            {/* Content */}
            <div style={{ padding: '28px 32px 32px' }}>
              {/* Category */}
              <span style={{
                display: 'inline-block',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: tagColor,
                background: `${tagColor}18`, border: `1px solid ${tagColor}35`,
                borderRadius: 6, padding: '3px 9px', marginBottom: 12,
                fontFamily: 'var(--font-inter)',
              }}>
                {product.tag}
              </span>

              {/* Name */}
              <h2 className="font-display font-bold text-white tracking-tight" style={{ fontSize: 'clamp(22px, 3vw, 30px)', marginBottom: 12, lineHeight: 1.15 }}>
                {product.name}
              </h2>

              {/* Description */}
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)', marginBottom: 24 }}>
                {product.description}
              </p>

              {/* Specs */}
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)', marginBottom: 12 }}>
                  Key Features
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {product.specs.map((spec, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: tagColor, flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)' }}>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #0066CC 0%, #3399E0 100%)',
                  color: '#fff', border: 'none', borderRadius: 10,
                  padding: '12px 24px', fontSize: 13.5, fontWeight: 600,
                  fontFamily: 'var(--font-inter)', textDecoration: 'none',
                  letterSpacing: '0.02em', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                Enquire About This Product
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
