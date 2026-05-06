'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PatternAConfig } from '../navbar.config'

interface Props {
  config: PatternAConfig
  isOpen: boolean
}

// ── Auto-cycling carousel ─────────────────────────────────────────────────────
function PhotoCarousel({ slides }: { slides: NonNullable<PatternAConfig['carousel']> }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % slides.length)
    }, 3500)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden', position: 'relative',
      aspectRatio: '16/9',
      background: '#040C18',
    }}>
      {/* Stacked images — fade between them */}
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        />
      ))}

      {/* Subtle bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(to top, rgba(4,12,24,0.65) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* BPL logo — top right */}
      <div style={{
        position: 'absolute', top: 10, right: 12, zIndex: 2,
        width: 28, height: 28, borderRadius: 6, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(6px)',
      }}>
        <Image src="/images/logo/BPL_LOGO.png" alt="BPL" width={28} height={28}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Dot indicators — bottom centre */}
      <div style={{
        position: 'absolute', bottom: 10, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 5, zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === active ? 18 : 5,
              height: 5,
              borderRadius: 3,
              background: i === active ? '#3399E0' : 'rgba(255,255,255,0.35)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function PatternA({ config, isOpen }: Props) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isOpen) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
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

  const hasVideo    = Boolean(config.videoSrc)
  const hasCarousel = Boolean(config.carousel?.length)
  const hasRight    = hasVideo || hasCarousel

  return (
    <div style={{ display: 'flex', minHeight: 280 }}>

      {/* ── Links ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '32px 40px' }}>
        <p style={{
          fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(51,153,224,0.5)', fontWeight: 600, marginBottom: 16,
          fontFamily: 'var(--font-inter)',
        }}>
          {config.eyebrow}
        </p>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {config.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  display: 'block', padding: '9px 12px', borderRadius: 8,
                  fontSize: 14, fontWeight: 500,
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                  transition: 'color 0.15s ease', fontFamily: 'var(--font-inter)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Right panel ───────────────────────────────────────────── */}
      {hasRight && (
        <>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.06)', margin: '24px 0', flexShrink: 0 }} />

          <div style={{ width: 400, flexShrink: 0, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Carousel */}
            {hasCarousel && <PhotoCarousel slides={config.carousel!} />}

            {/* Video */}
            {hasVideo && (
              <div style={{
                borderRadius: 12, overflow: 'hidden', position: 'relative',
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #040C18 0%, #081E36 60%, #0D2847 100%)',
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
                  position: 'absolute', top: 10, right: 12, zIndex: 2,
                  width: 28, height: 28, borderRadius: 6, overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(6px)',
                }}>
                  <Image src="/images/logo/BPL_LOGO.png" alt="BPL" width={28} height={28}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: 'rgba(255,255,255,0.1)', zIndex: 3,
                }}>
                  <div ref={progressRef} style={{
                    height: '100%', width: '0%', background: '#3399E0',
                    boxShadow: '0 0 6px rgba(51,153,224,0.8)',
                    transition: 'width 0.25s linear',
                  }} />
                </div>
              </div>
            )}

            {config.videoLabel && (
              <p style={{ marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, fontFamily: 'var(--font-inter)' }}>
                {config.videoLabel}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
