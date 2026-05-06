'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { PatternDConfig, ProductColumn } from '../navbar.config'

// ─── Icon colours ─────────────────────────────────────────────────────────────

const ICON_COLORS: Record<ProductColumn['iconKey'], { stroke: string; fill: string; bg: string }> = {
  platform: { stroke: '#3399E0', fill: '#3399E0', bg: 'rgba(51,153,224,0.12)'  }, // blue
  safety:   { stroke: '#34D399', fill: '#34D399', bg: 'rgba(52,211,153,0.12)'  }, // emerald
  camera:   { stroke: '#F97316', fill: '#F97316', bg: 'rgba(249,115,22,0.12)'  }, // orange
  fuel:     { stroke: '#A78BFA', fill: '#A78BFA', bg: 'rgba(167,139,250,0.12)' }, // purple
}

// ─── Animated product icons ────────────────────────────────────────────────────

function PlatformIcon() {
  const c = ICON_COLORS.platform
  const tiles = [
    { x: 2,  y: 2,  delay: 0,   opacity: 1   },
    { x: 11, y: 2,  delay: 0.3, opacity: 0.6 },
    { x: 2,  y: 11, delay: 0.6, opacity: 0.6 },
    { x: 11, y: 11, delay: 0.9, opacity: 0.4 },
  ]
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {tiles.map((t, i) => (
        <motion.rect
          key={i}
          x={t.x} y={t.y} width="7" height="7" rx="1.5"
          fill={c.fill}
          animate={{ opacity: [t.opacity, 1, t.opacity], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, delay: t.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${t.x + 3.5}px ${t.y + 3.5}px` }}
        />
      ))}
    </svg>
  )
}

function SafetyIcon() {
  const c = ICON_COLORS.safety
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <motion.path
        d="M10 2L3 5v5c0 4.1 2.93 7.93 7 9 4.07-1.07 7-4.9 7-9V5L10 2z"
        fill="none" stroke={c.stroke} strokeWidth="1.5" strokeLinejoin="round"
        animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '10px 10px' }}
      />
      <motion.path
        d="M7 10l2 2 4-4" stroke={c.stroke} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="10"
        animate={{ strokeDashoffset: [10, 0, 0, 10] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.75, 1] }}
      />
    </svg>
  )
}

function CameraIcon() {
  const c = ICON_COLORS.camera
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1" y="5" width="13" height="10" rx="2" fill="none" stroke={c.stroke} strokeWidth="1.5" />
      <motion.path
        d="M14 8.5l4-2.5v7l-4-2.5V8.5z" fill={c.fill}
        animate={{ opacity: [0.7, 1, 0.7], x: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="7" cy="10" r="2.5" fill={c.fill}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '7px 10px' }}
      />
    </svg>
  )
}

function FuelIcon() {
  const c = ICON_COLORS.fuel
  return (
    <motion.svg
      width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M10 3C10 3 5 9.5 5 13a5 5 0 0010 0c0-3.5-5-10-5-10z"
        fill="none" stroke={c.stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <motion.path
        d="M7.5 14a2.5 2.5 0 005 0" stroke={c.stroke} strokeWidth="1.2" strokeLinecap="round"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

function getIcon(key: ProductColumn['iconKey']) {
  switch (key) {
    case 'platform': return <PlatformIcon />
    case 'safety':   return <SafetyIcon />
    case 'camera':   return <CameraIcon />
    case 'fuel':     return <FuelIcon />
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  config: PatternDConfig
  isOpen: boolean
  onClose: () => void
}

export function PatternD({ config, isOpen, onClose }: Props) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isOpen) {
      video.currentTime = 2
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 2
    }
  }, [isOpen])

  useEffect(() => {
    const video = videoRef.current
    const bar   = progressRef.current
    if (!video || !bar) return
    const update = () => {
      if (video.duration) bar.style.width = `${(video.currentTime / video.duration) * 100}%`
    }
    video.addEventListener('timeupdate', update)
    return () => video.removeEventListener('timeupdate', update)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>

        {/* ── Left: Solutions ───────────────────────────────────────── */}
        <div style={{ width: 220, flexShrink: 0, padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
          <p style={{
            fontSize: 8, letterSpacing: '0.13em', textTransform: 'uppercase',
            color: 'rgba(51,153,224,0.5)', fontWeight: 700, marginBottom: 10,
            fontFamily: 'var(--font-inter)',
          }}>
            {config.eyebrow}
          </p>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {config.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '6px 8px', borderRadius: 6,
                    fontSize: 12, fontWeight: 500,
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    transition: 'color 0.15s, background 0.15s',
                    fontFamily: 'var(--font-inter)',
                  }}
                  onClick={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(51,153,224,0.15)'
                    el.style.color = '#fff'
                    setTimeout(onClose, 120)
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#fff'
                    el.style.background = 'rgba(255,255,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgba(255,255,255,0.55)'
                    el.style.background = 'transparent'
                  }}
                >
                  <span style={{
                    width: 3, height: 3, borderRadius: '50%',
                    background: 'rgba(51,153,224,0.5)', flexShrink: 0,
                  }} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Divider ───────────────────────────────────────────────── */}
        <div style={{ width: 1, background: 'rgba(255,255,255,0.06)', margin: '16px 0', flexShrink: 0 }} />

        {/* ── Centre: Products 2×2 ──────────────────────────────────── */}
        <div style={{ flex: 1, padding: '20px 18px' }}>
          <p style={{
            fontSize: 8, letterSpacing: '0.13em', textTransform: 'uppercase',
            color: 'rgba(51,153,224,0.5)', fontWeight: 700, marginBottom: 10,
            fontFamily: 'var(--font-inter)',
          }}>
            Our Products
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 8px' }}>
            {config.columns.map((col) => (
              <div key={col.iconKey} style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 5,
                    background: ICON_COLORS[col.iconKey].bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {getIcon(col.iconKey)}
                  </div>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.07em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
                    fontFamily: 'var(--font-inter)',
                  }}>
                    {col.title}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          display: 'block', fontSize: 11,
                          color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                          padding: '3px 5px', borderRadius: 4,
                          fontFamily: 'var(--font-inter)',
                          transition: 'color 0.15s, background 0.15s',
                        }}
                        onClick={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.background = ICON_COLORS[col.iconKey].bg
                          el.style.color = ICON_COLORS[col.iconKey].stroke
                          setTimeout(onClose, 120)
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = '#fff'
                          el.style.background = 'rgba(255,255,255,0.05)'
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = 'rgba(255,255,255,0.4)'
                          el.style.background = 'transparent'
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────── */}
        <div style={{ width: 1, background: 'rgba(255,255,255,0.06)', margin: '16px 0', flexShrink: 0 }} />

        {/* ── Right: Video ──────────────────────────────────────────── */}
        {config.videoSrc && (
          <div style={{ width: 180, flexShrink: 0, padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              borderRadius: 10, overflow: 'hidden', position: 'relative',
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #040C18 0%, #081E36 100%)',
            }}>
              <video
                ref={videoRef}
                src={config.videoSrc}
                muted loop playsInline preload="none"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
                background: 'linear-gradient(to top, rgba(4,12,24,0.7) 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', top: 6, right: 7, zIndex: 2,
                width: 18, height: 18, borderRadius: 4, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)',
              }}>
                <Image src="/images/logo/BPL_LOGO.png" alt="BPL" width={18} height={18}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                background: 'rgba(255,255,255,0.1)', zIndex: 3,
              }}>
                <div ref={progressRef} style={{
                  height: '100%', width: '0%', background: '#3399E0',
                  boxShadow: '0 0 4px rgba(51,153,224,0.8)',
                  transition: 'width 0.25s linear',
                }} />
              </div>
            </div>
            <p style={{ marginTop: 8, fontSize: 10, color: 'rgba(255,255,255,0.25)', lineHeight: 1.5, fontFamily: 'var(--font-inter)' }}>
              Precision fleet intelligence — deployed across Nigeria
            </p>
          </div>
        )}
      </div>

      {/* ── Footer CTA ────────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '9px 24px',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
          {config.footerCta.text}
        </span>
        <Link
          href={config.footerCta.href}
          style={{
            fontSize: 11, fontWeight: 600, color: '#3399E0',
            textDecoration: 'none', fontFamily: 'var(--font-inter)',
            transition: 'color 0.15s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#66B3EB' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#3399E0' }}
        >
          {config.footerCta.label}
        </Link>
      </div>
    </div>
  )
}
