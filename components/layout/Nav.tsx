'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'About',      href: '/about' },
  { label: 'Solutions',  href: '/solutions' },
  { label: 'Products',   href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Clients',    href: '/clients' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] bg-white/97 backdrop-blur-md border-b border-black/[0.07] flex items-center justify-between px-14 transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : ''}`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline group">
        <div className="w-[38px] h-[38px] bg-bpl-navy rounded-[7px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19C4 19 6.5 7 12 7C17.5 7 18.5 12 13 14C7.5 16 10 21 15 21"
              stroke="#0078D4" strokeWidth={2.2} strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-display font-bold text-[17px] text-bpl-navy tracking-[-0.02em]">
          Best Practices <span className="text-bpl-blue">Limited</span>
        </span>
      </Link>

      {/* Nav links */}
      <ul className="flex items-center gap-1 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[13.5px] font-medium text-bpl-body hover:text-bpl-navy hover:bg-bpl-off-white px-3.5 py-1.5 rounded-md transition-all duration-150"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className="bg-bpl-blue text-white text-[13.5px] font-semibold px-5 py-2 rounded-md hover:bg-bpl-blue-light hover:-translate-y-px transition-all duration-150"
      >
        Get a Quote
      </Link>
    </nav>
  )
}
