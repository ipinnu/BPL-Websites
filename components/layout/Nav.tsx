'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Solutions',  href: '/solutions' },
  { label: 'Products',   href: '/products' },
  { label: 'Industries', href: '/industries' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav className={`fixed top-9 left-0 right-0 z-50 h-[68px] bg-white border-b transition-all duration-200 ${scrolled ? 'border-[#E8ECF2] shadow-sm' : 'border-transparent'}`}>
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 md:px-10">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#E8ECF2] flex-shrink-0">
              <Image src="/images/logo/BPL_LOGO.png" alt="BPL" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-[15px] text-bpl-navy tracking-tight">
                Best Practices <span className="text-bpl-blue">Limited</span>
              </div>
              <div className="text-[10px] font-medium text-bpl-mid-gray tracking-widest uppercase">
                Est. 2001
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center list-none">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[13.5px] font-medium px-4 py-2 rounded-lg block transition-colors duration-150 ${
                      active ? 'text-bpl-blue bg-bpl-blue-pale' : 'text-bpl-body hover:text-bpl-navy hover:bg-bpl-off-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/careers"
              className="hidden md:block text-[13px] font-medium text-bpl-mid-gray hover:text-bpl-body transition-colors"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="bg-bpl-blue text-white text-[13.5px] font-semibold px-5 py-2 rounded-lg hover:bg-[#005BB5] transition-colors duration-150"
            >
              Get a Quote
            </Link>

            {/* Mobile burger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span className={`block w-5 h-px bg-bpl-navy transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block w-5 h-px bg-bpl-navy transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-bpl-navy transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[104px] left-0 right-0 z-40 bg-white border-b border-[#E8ECF2] shadow-lg md:hidden">
          <div className="px-5 py-3 space-y-1">
            {[...NAV_LINKS, { label: 'Careers', href: '/careers' }, { label: 'Contact', href: '/contact' }].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-[15px] font-medium text-bpl-body hover:text-bpl-blue px-3 py-2.5 rounded-lg hover:bg-bpl-blue-pale transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
