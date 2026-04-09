import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/content'

const LINKS_SOLUTIONS = [
  { label: 'Vehicle Tracking',  href: '/solutions#tracking' },
  { label: 'Fleet Maintenance', href: '/solutions#maintenance' },
  { label: 'Driver Training',   href: '/solutions#training' },
  { label: 'Speed Limiting',    href: '/solutions#speed' },
  { label: 'Fleet Consulting',  href: '/solutions#consulting' },
  { label: 'Supply Chain',      href: '/solutions#supply-chain' },
]

const LINKS_PRODUCTS = [
  { label: 'MiX Vision',       href: '/products#mix-vision' },
  { label: 'MiX Rovi II',      href: '/products#mix-rovi' },
  { label: 'Fuel Monitoring',  href: '/products#fuel-monitor' },
  { label: 'Speed Limiters',   href: '/products#speed-limiter' },
  { label: 'MiX4000',         href: '/products#mix4000' },
  { label: 'Axle Load Sensor', href: '/products#axle-sensor' },
]

const LINKS_COMPANY = [
  { label: 'Who We Are', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Careers',    href: '/careers' },
  { label: 'Contact',    href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-bpl-navy border-t border-white/[0.06]">
      <div className="max-w-site mx-auto px-6 md:px-10 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                <Image src="/images/logo/BPL_LOGO.png" alt="BPL" width={36} height={36} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display font-bold text-[15px] text-white tracking-tight">
                  Best Practices <span className="text-bpl-blue-light">Limited</span>
                </div>
                <div className="text-[10px] text-white/30 tracking-widest uppercase mt-0.5">Fleet Intelligence</div>
              </div>
            </Link>

            <p className="text-[13px] text-white/40 leading-relaxed mb-5 max-w-[240px]">
              {SITE.tagline} — fleet management, tracking, and safety solutions since {SITE.founded}.
            </p>

            <div className="space-y-2 text-[12.5px] text-white/35">
              <p>
                <a href={`tel:${SITE.phone1}`} className="hover:text-white/70 transition-colors">{SITE.phone1}</a>
                {' · '}
                <a href={`tel:${SITE.phone2}`} className="hover:text-white/70 transition-colors">{SITE.phone2}</a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-white/70 transition-colors">{SITE.email}</a>
              </p>
              <p className="leading-relaxed">{SITE.address}</p>
            </div>

            {/* Social */}
            <div className="flex gap-2 mt-5">
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.12] hover:text-white/80 transition-all"
                aria-label="Facebook">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/best-practices-limited" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.12] hover:text-white/80 transition-all"
                aria-label="LinkedIn">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-white/25 mb-5">Solutions</h4>
            <ul className="space-y-3">
              {LINKS_SOLUTIONS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-white/25 mb-5">Products</h4>
            <ul className="space-y-3">
              {LINKS_PRODUCTS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-white/25 mb-5">Company</h4>
            <ul className="space-y-3">
              {LINKS_COMPANY.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <span className="inline-block bg-bpl-blue/15 border border-bpl-blue/20 text-bpl-blue-light text-[10.5px] font-semibold tracking-[0.07em] uppercase px-3 py-1.5 rounded-lg">
                MiX Authorized Partner
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[12px] text-white/25">
            © {new Date().getFullYear()} Best Practices Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[12px] text-white/25">
            <Link href="/about" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white/50 transition-colors">Terms of Use</Link>
            <span className="text-white/15">Est. 2001</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
