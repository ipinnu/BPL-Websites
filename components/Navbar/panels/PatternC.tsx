'use client'

import Link from 'next/link'
import type { PatternCConfig } from '../navbar.config'

interface Props {
  config: PatternCConfig
}

export function PatternC({ config }: Props) {
  return (
    <div style={{ display: 'flex', minHeight: 340 }}>
      {/* Left — links grid */}
      <div style={{ flex: 1, padding: '32px 40px' }}>
        {/* Eyebrow */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(51,153,224,0.6)',
            fontWeight: 600,
            marginBottom: 16,
            fontFamily: 'var(--font-inter)',
          }}
        >
          Knowledge Hub
        </p>

        {/* 2-column grid of links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px 16px',
          }}
        >
          {config.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                padding: '10px 12px',
                borderRadius: 8,
                fontFamily: 'var(--font-inter)',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {/* Blue dot */}
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#3399E0',
                  flexShrink: 0,
                  opacity: 0.7,
                }}
              />
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Vertical divider */}
      <div
        style={{
          width: 1,
          background: 'rgba(255,255,255,0.06)',
          margin: '24px 0',
          flexShrink: 0,
        }}
      />

      {/* Right panel */}
      <div
        style={{
          width: 300,
          flexShrink: 0,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Video thumbnail block */}
        <Link
          href={config.videoHref}
          className="group"
          style={{
            display: 'block',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              height: 120,
              position: 'relative',
              background: 'linear-gradient(135deg, #040C18 0%, #081E36 60%, #0D2847 100%)',
            }}
          >
            <video
              src={config.videoSrc}
              muted
              loop
              playsInline
              preload="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(4,12,24,0.45)',
                transition: 'background 0.2s',
              }}
            />

            {/* Centered play button */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(0,102,204,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s',
                }}
                className="group-hover:scale-110"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="white" aria-hidden="true">
                  <path d="M3 2l9 5-9 5V2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p
            style={{
              marginTop: 8,
              fontSize: 12,
              color: '#3399E0',
              fontFamily: 'var(--font-inter)',
              transition: 'color 0.15s',
            }}
            className="group-hover:text-[#66B3EB]"
          >
            {config.videoLabel} →
          </p>
        </Link>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
          {/* Editorial cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {config.editorialCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.4,
                    marginBottom: 4,
                    fontFamily: 'var(--font-inter)',
                    transition: 'color 0.15s',
                  }}
                  className="group-hover:text-white"
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.35)',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {card.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
