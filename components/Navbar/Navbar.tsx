'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from './navbar.config'
import type { NavItem, PatternAConfig, PatternBConfig, PatternCConfig, PatternDConfig } from './navbar.config'

const PatternA = dynamic(() => import('./panels/PatternA').then(m => ({ default: m.PatternA })), { ssr: false })
const PatternB = dynamic(() => import('./panels/PatternB').then(m => ({ default: m.PatternB })), { ssr: false })
const PatternC = dynamic(() => import('./panels/PatternC').then(m => ({ default: m.PatternC })), { ssr: false })
const PatternD = dynamic(() => import('./panels/PatternD').then(m => ({ default: m.PatternD })), { ssr: false })

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPatternA(config: NonNullable<NavItem['config']>): config is PatternAConfig {
  return config.pattern === 'A'
}
function isPatternB(config: NonNullable<NavItem['config']>): config is PatternBConfig {
  return config.pattern === 'B'
}
function isPatternC(config: NonNullable<NavItem['config']>): config is PatternCConfig {
  return config.pattern === 'C'
}
function isPatternD(config: NonNullable<NavItem['config']>): config is PatternDConfig {
  return config.pattern === 'D'
}

/** Extract a flat link list from any config for mobile accordions */
function getMobileLinks(config: NonNullable<NavItem['config']>): { label: string; href: string }[] {
  if (isPatternA(config)) return config.links
  if (isPatternB(config)) return config.columns.flatMap((c) => c.links)
  if (isPatternC(config)) return config.links
  if (isPatternD(config)) return [
    ...config.links,
    ...config.columns.flatMap((c) => c.links),
  ]
  return []
}

// ─── Chevron SVG ─────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Navbar() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [mountedPanels, setMountedPanels] = useState<Set<string>>(new Set())
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // Scroll listener
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Preload panel chunks in the background after hydration so they're ready on first hover
  useEffect(() => {
    import('./panels/PatternA')
    import('./panels/PatternB')
    import('./panels/PatternC')
    import('./panels/PatternD')
  }, [])

  // Close everything on route change
  useEffect(() => {
    setOpenItem(null)
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenItem(null)
        setMobileOpen(false)
        setMobileExpanded(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Mouse handlers
  const handleItemEnter = (label: string, hasDropdown: boolean) => {
    if (!hasDropdown) {
      setOpenItem(null)
      return
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setMountedPanels(prev => prev.has(label) ? prev : new Set([...prev, label]))
    setOpenItem(label)
  }

  const handleWrapperLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenItem(null)
    }, 80)
  }

  const handleWrapperEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const anyPanelOpen = openItem !== null
  const showBorder = scrolled || anyPanelOpen

  return (
    <>
      {/* ── Wrapper (fixed band, handles mouse leave/enter) ── */}
      <div
        style={{
          position: 'fixed',
          top: 36,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
        onMouseLeave={handleWrapperLeave}
        onMouseEnter={handleWrapperEnter}
      >
        {/* ── Nav bar ── */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{
            height: 68,
            background: '#fff',
            borderBottom: `1px solid ${showBorder ? '#E8ECF2' : 'transparent'}`,
            boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 40px',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid #E8ECF2',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/logo/BPL_LOGO.png"
                  alt="BPL"
                  width={36}
                  height={36}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ lineHeight: 1.25 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: 15,
                    color: '#0B1929',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Best Practices{' '}
                  <span style={{ color: '#0066CC' }}>Limited</span>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#8A9BB0',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Est. 2001
                </div>
              </div>
            </Link>

            {/* ── Desktop nav items ── */}
            <div className="hidden md:flex items-center">
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = openItem === item.label
                  const hasDropdown = item.config !== null

                  return (
                    <li key={item.label} style={{ position: 'relative' }}>
                      {hasDropdown ? (
                        <button
                          aria-expanded={isActive}
                          aria-haspopup="true"
                          onMouseEnter={() => handleItemEnter(item.label, true)}
                          onClick={() => {
                            setMountedPanels(prev => prev.has(item.label) ? prev : new Set([...prev, item.label]))
                            setOpenItem(isActive ? null : item.label)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '6px 12px',
                            borderRadius: 8,
                            fontSize: 13.5,
                            fontWeight: 500,
                            fontFamily: 'var(--font-inter)',
                            color: isActive ? '#0066CC' : '#3D5166',
                            background: isActive ? '#EEF4FF' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'color 0.15s, background 0.15s',
                            position: 'relative',
                          }}
                        >
                          {item.label}
                          <Chevron open={isActive} />
                          {/* Active indicator bar */}
                          {isActive && (
                            <span
                              style={{
                                position: 'absolute',
                                bottom: -1,
                                left: 8,
                                right: 8,
                                height: 2,
                                background: '#0066CC',
                                borderRadius: 1,
                              }}
                            />
                          )}
                        </button>
                      ) : (
                        <Link
                          href={(item as { label: string; href: string; config: null }).href}
                          onMouseEnter={() => handleItemEnter(item.label, false)}
                          style={{
                            display: 'block',
                            padding: '6px 12px',
                            borderRadius: 8,
                            fontSize: 13.5,
                            fontWeight: 500,
                            fontFamily: 'var(--font-inter)',
                            color: '#3D5166',
                            textDecoration: 'none',
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
            </div>

            {/* ── Right side ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link
                href="/careers"
                className="hidden md:block"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#8A9BB0',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter)',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#3D5166' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#8A9BB0' }}
              >
                Careers
              </Link>

              <Link
                href="/contact"
                style={{
                  background: '#0066CC',
                  color: '#fff',
                  fontSize: 13.5,
                  fontWeight: 600,
                  padding: '8px 20px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter)',
                  transition: 'background 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#005BB5' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#0066CC' }}
              >
                Get a Quote
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col items-center justify-center"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                style={{
                  width: 36,
                  height: 36,
                  gap: 5,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: 20,
                    height: 1.5,
                    background: '#0B1929',
                    borderRadius: 1,
                    transition: 'all 0.22s ease',
                    transform: mobileOpen ? 'rotate(45deg) translate(0, 4.5px)' : 'none',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: 20,
                    height: 1.5,
                    background: '#0B1929',
                    borderRadius: 1,
                    transition: 'all 0.22s ease',
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: 20,
                    height: 1.5,
                    background: '#0B1929',
                    borderRadius: 1,
                    transition: 'all 0.22s ease',
                    transform: mobileOpen ? 'rotate(-45deg) translate(0, -4.5px)' : 'none',
                  }}
                />
              </button>
            </div>
          </div>
        </nav>

        {/* ── Dropdown panels (desktop only) ── */}
        <div className="hidden md:block">
          {NAV_ITEMS.map((item) => {
            if (!item.config) return null
            const isOpen = openItem === item.label

            return (
              <div
                key={item.label}
                role="region"
                aria-label={`${item.label} menu`}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#08172A',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                  pointerEvents: isOpen ? 'auto' : 'none',
                  transition: 'opacity 0.18s ease, transform 0.18s ease',
                  zIndex: 10,
                }}
              >
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                  {mountedPanels.has(item.label) && isPatternA(item.config) && (
                    <div onClick={() => setOpenItem(null)}>
                      <PatternA config={item.config} isOpen={isOpen} />
                    </div>
                  )}
                  {mountedPanels.has(item.label) && isPatternB(item.config) && (
                    <div onClick={() => setOpenItem(null)}>
                      <PatternB config={item.config} />
                    </div>
                  )}
                  {mountedPanels.has(item.label) && isPatternC(item.config) && (
                    <div onClick={() => setOpenItem(null)}>
                      <PatternC config={item.config} />
                    </div>
                  )}
                  {mountedPanels.has(item.label) && isPatternD(item.config) && (
                    <PatternD config={item.config} isOpen={isOpen} onClose={() => setOpenItem(null)} />
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
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed',
          top: 104,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#08172A',
          zIndex: 45,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto',
          padding: '16px 20px 40px',
        }}
      >
        {/* Nav items */}
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map((item) => {
            const hasDropdown = item.config !== null
            const isExpanded = mobileExpanded === item.label

            if (!hasDropdown) {
              const plainItem = item as { label: string; href: string; config: null }
              return (
                <li key={item.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <Link
                    href={plainItem.href}
                    style={{
                      display: 'block',
                      padding: '14px 4px',
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }

            const mobileLinks = getMobileLinks(item.config!)

            return (
              <li key={item.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {/* Accordion button */}
                <button
                  onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '14px 4px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: 'var(--font-inter)',
                    textAlign: 'left',
                  }}
                >
                  {item.label}
                  <Chevron open={isExpanded} />
                </button>

                {/* Collapsible link list */}
                <div
                  style={{
                    maxHeight: isExpanded ? 1000 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: '0 0 12px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    {mobileLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          style={{
                            display: 'block',
                            padding: '8px 8px',
                            fontSize: 14,
                            color: 'rgba(255,255,255,0.5)',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-inter)',
                            borderRadius: 6,
                            transition: 'color 0.15s',
                          }}
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

        {/* Bottom actions */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link
            href="/careers"
            style={{
              display: 'block',
              padding: '12px 16px',
              fontSize: 15,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter)',
              textAlign: 'center',
            }}
          >
            Careers
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'block',
              padding: '14px 20px',
              background: '#0066CC',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: 10,
              fontFamily: 'var(--font-inter)',
              textAlign: 'center',
            }}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  )
}
