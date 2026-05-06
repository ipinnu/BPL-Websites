'use client'

import Link from 'next/link'
import type { PatternBConfig, ProductColumn } from '../navbar.config'

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function PlatformIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#3399E0" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#3399E0" opacity="0.6" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#3399E0" opacity="0.6" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#3399E0" opacity="0.4" />
    </svg>
  )
}

function SafetyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2L3 5v5c0 4.1 2.93 7.93 7 9 4.07-1.07 7-4.9 7-9V5L10 2z"
        fill="none"
        stroke="#3399E0"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 10l2 2 4-4"
        stroke="#3399E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1" y="5" width="13" height="10" rx="2" fill="none" stroke="#3399E0" strokeWidth="1.5" />
      <path d="M14 8.5l4-2.5v7l-4-2.5V8.5z" fill="#3399E0" opacity="0.7" />
      <circle cx="7" cy="10" r="2.5" fill="#3399E0" opacity="0.4" />
    </svg>
  )
}

function FuelIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3C10 3 5 9.5 5 13a5 5 0 0010 0c0-3.5-5-10-5-10z"
        fill="none"
        stroke="#3399E0"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 14a2.5 2.5 0 005 0"
        stroke="#3399E0"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
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
  config: PatternBConfig
}

export function PatternB({ config }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Columns */}
      <div style={{ display: 'flex', padding: '32px 24px', gap: 0 }}>
        {config.columns.map((col, i) => (
          <div
            key={col.iconKey}
            style={{
              flex: 1,
              padding: '0 16px',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            {/* Column header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'rgba(0,102,204,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {getIcon(col.iconKey)}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {col.title}
              </span>
            </div>

            {/* Divider */}
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                margin: '0 0 10px',
              }}
            />

            {/* Links */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      padding: '6px 8px',
                      borderRadius: 6,
                      fontFamily: 'var(--font-inter)',
                      transition: 'color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                      e.currentTarget.style.background = 'transparent'
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

      {/* Footer CTA */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-inter)' }}>
          {config.footerCta.text}
        </span>
        <Link
          href={config.footerCta.href}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#3399E0',
            textDecoration: 'none',
            fontFamily: 'var(--font-inter)',
            transition: 'color 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#66B3EB' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#3399E0' }}
        >
          {config.footerCta.label}
        </Link>
      </div>
    </div>
  )
}
