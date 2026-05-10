'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: 'Solutions',
    videoSrc: '/videos/mix-vision.mp4',
    links: [
      { label: 'Fleet Management & Tracking',   href: '/solutions#tracking' },
      { label: 'Speed Limiting Devices',         href: '/solutions#speed' },
      { label: 'Driver & Manager Training',      href: '/solutions#training' },
      { label: 'Fleet Consulting & Outsourcing', href: '/solutions#consulting' },
      { label: 'Fuel Monitoring',                href: '/solutions#fuel' },
      { label: 'Supply Chain Management',        href: '/solutions#supply-chain' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    links: null,
  },
  {
    label: 'Industries',
    links: [
      { label: 'Oil & Gas',                  href: '/industries#oil-gas' },
      { label: 'FMCG & Distribution',        href: '/industries#fmcg' },
      { label: 'Construction & Mining',      href: '/industries#construction' },
      { label: 'Transport & Logistics',      href: '/industries#transport' },
      { label: 'Energy & Utilities',         href: '/industries#energy' },
      { label: 'Government & Public Sector', href: '/industries#government' },
    ],
  },
  {
    label: 'About',
    links: [
      { label: 'Who We Are',        href: '/about' },
      { label: 'Our Story',         href: '/about#journey' },
      { label: 'Blog & Insights',   href: '/resources/blog' },
      { label: 'Careers at BPL',    href: '/careers' },
    ],
  },
  {
    label: 'Clients',
    href: '/clients',
    links: null,
  },
]

// ─── Chevron ──────────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
    >
      <path d="M1.5 3.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const [openItem, setOpenItem]     = useState<string | null>(null)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pathname   = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpenItem(null)
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenItem(null); setMobileOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const open  = (label: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setOpenItem(label)
    if (label === 'Solutions') videoRef.current?.play().catch(() => {})
  }
  const close = () => {
    closeTimer.current = setTimeout(() => {
      setOpenItem(null)
      if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
    }, 80)
  }
  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }

  const showBorder = scrolled || openItem !== null

  return (
    <>
      {/* ── Fixed band ── */}
      <div
        style={{ position: 'fixed', top: 36, left: 0, right: 0, zIndex: 50 }}
        onMouseLeave={close}
        onMouseEnter={cancelClose}
      >
        {/* ── Bar ── */}
        <nav
          style={{
            height: 68,
            background: '#fff',
            borderBottom: `1px solid ${showBorder ? '#E8ECF2' : 'transparent'}`,
            boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, overflow: 'hidden', border: '1px solid #E8ECF2', flexShrink: 0 }}>
                <Image src="/images/logo/BPL_LOGO.png" alt="BPL" width={36} height={36} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ lineHeight: 1.25 }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, color: '#0B1929', letterSpacing: '-0.02em' }}>
                  Best Practices <span style={{ color: '#0066CC' }}>Limited</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 500, color: '#8A9BB0', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)' }}>
                  Est. 2001
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 2 }}>
              {NAV_ITEMS.map((item) => {
                const isActive = openItem === item.label
                const hasDropdown = item.links !== null

                return (
                  <li key={item.label}>
                    {hasDropdown ? (
                      <button
                        aria-expanded={isActive}
                        onMouseEnter={() => open(item.label)}
                        onClick={() => isActive ? setOpenItem(null) : open(item.label)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          padding: '6px 12px', borderRadius: 8,
                          fontSize: 13.5, fontWeight: 500, fontFamily: 'var(--font-inter)',
                          color: isActive ? '#0066CC' : '#3D5166',
                          background: isActive ? '#EEF4FF' : 'transparent',
                          border: 'none', cursor: 'pointer',
                          transition: 'color 0.15s, background 0.15s',
                        }}
                      >
                        {item.label}
                        <Chevron open={isActive} />
                      </button>
                    ) : (
                      <Link
                        href={(item as { href: string }).href}
                        onMouseEnter={() => setOpenItem(null)}
                        style={{
                          display: 'block', padding: '6px 12px', borderRadius: 8,
                          fontSize: 13.5, fontWeight: 500, fontFamily: 'var(--font-inter)',
                          color: '#3D5166', textDecoration: 'none',
                          transition: 'color 0.15s, background 0.15s',
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link
                href="/careers"
                className="hidden md:block"
                style={{ fontSize: 13, fontWeight: 500, color: '#8A9BB0', textDecoration: 'none', fontFamily: 'var(--font-inter)', transition: 'color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#3D5166' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#8A9BB0' }}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                style={{
                  background: '#0066CC', color: '#fff', fontSize: 13.5, fontWeight: 600,
                  padding: '8px 20px', borderRadius: 8, textDecoration: 'none',
                  fontFamily: 'var(--font-inter)', transition: 'background 0.15s', flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#005BB5' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0066CC' }}
              >
                Get a Quote
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden"
                onClick={() => setMobileOpen(v => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                style={{ width: 36, height: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {[
                  mobileOpen ? 'rotate(45deg) translate(0, 4.5px)' : 'none',
                  undefined,
                  mobileOpen ? 'rotate(-45deg) translate(0, -4.5px)' : 'none',
                ].map((transform, i) => (
                  <span key={i} style={{ display: 'block', width: 20, height: 1.5, background: '#0B1929', borderRadius: 1, transition: 'all 0.22s ease', transform: transform ?? 'none', opacity: i === 1 && mobileOpen ? 0 : 1 }} />
                ))}
              </button>
            </div>
          </div>
        </nav>

        {/* ── Dropdown panel (desktop) ── */}
        <div className="hidden md:block">
          {NAV_ITEMS.filter(i => i.links).map((item) => {
            const isOpen = openItem === item.label
            const hasVideo = 'videoSrc' in item && Boolean(item.videoSrc)
            const cols = !hasVideo && (item.links?.length ?? 0) > 4 ? 2 : 1

            return (
              <div
                key={item.label}
                style={{
                  position: 'absolute', top: '100%', left: 0, right: 0,
                  background: '#08172A',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
                  pointerEvents: isOpen ? 'auto' : 'none',
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                  zIndex: 10,
                }}
              >
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 40px 24px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                  {/* Links */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(51,153,224,0.5)', marginBottom: 14, fontFamily: 'var(--font-inter)' }}>
                      {item.label}
                    </p>
                    <ul
                      style={{
                        listStyle: 'none', margin: 0, padding: 0,
                        display: 'grid',
                        gridTemplateColumns: cols === 2 ? '1fr 1fr' : '280px',
                        gap: '2px 40px',
                      }}
                    >
                      {item.links!.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setOpenItem(null)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 8,
                              padding: '7px 10px', borderRadius: 6,
                              fontSize: 13.5, fontWeight: 500,
                              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                              fontFamily: 'var(--font-inter)',
                              transition: 'color 0.12s, background 0.12s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent' }}
                          >
                            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#3399E0', flexShrink: 0, opacity: 0.6 }} />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Video (Solutions only) */}
                  {hasVideo && (
                    <div style={{ width: 280, flexShrink: 0, borderRadius: 10, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: '#040C18' }}>
                      <video
                        ref={videoRef}
                        src={(item as { videoSrc: string }).videoSrc}
                        muted loop playsInline preload="none"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      {/* BPL logo watermark */}
                      <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: 5, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)' }}>
                        <Image src="/images/logo/BPL_LOGO.png" alt="BPL" width={24} height={24} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Mobile overlay ── */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed', top: 104, left: 0, right: 0, bottom: 0,
          background: '#08172A', zIndex: 45,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto', padding: '16px 20px 40px',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map((item) => {
            const hasLinks = item.links !== null
            const isExpanded = mobileExpanded === item.label

            if (!hasLinks) {
              return (
                <li key={item.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <Link
                    href={(item as { href: string }).href}
                    style={{ display: 'block', padding: '14px 4px', fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontFamily: 'var(--font-inter)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }

            return (
              <li key={item.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '14px 4px', background: 'transparent', border: 'none',
                    cursor: 'pointer', fontSize: 15, fontWeight: 500,
                    color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)', textAlign: 'left',
                  }}
                >
                  {item.label}
                  <Chevron open={isExpanded} />
                </button>
                <div style={{ maxHeight: isExpanded ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: '0 0 12px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {item.links!.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          style={{ display: 'block', padding: '8px', fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'var(--font-inter)', borderRadius: 6 }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/careers" style={{ display: 'block', padding: '12px 16px', fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'var(--font-inter)', textAlign: 'center' }}>
            Careers
          </Link>
          <Link href="/contact" style={{ display: 'block', padding: '14px 20px', background: '#0066CC', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', borderRadius: 10, fontFamily: 'var(--font-inter)', textAlign: 'center' }}>
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  )
}
