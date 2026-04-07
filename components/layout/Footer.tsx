import Link from 'next/link'
import { SITE } from '@/lib/content'

const LINKS_SOLUTIONS = [
  { label: 'Vehicle Tracking',   href: '/solutions#tracking' },
  { label: 'Fleet Maintenance',  href: '/solutions#maintenance' },
  { label: 'Driver Training',    href: '/solutions#training' },
  { label: 'Speed Limiting',     href: '/solutions#speed' },
  { label: 'Fleet Consulting',   href: '/solutions#consulting' },
]

const LINKS_PRODUCTS = [
  { label: 'MiX Vision',        href: '/products#mix-vision' },
  { label: 'MiX Rovi II',       href: '/products#mix-rovi' },
  { label: 'Fuel Monitoring',   href: '/products#fuel-monitor' },
  { label: 'Speed Limiters',    href: '/products#speed-limiter' },
  { label: 'MiX4000',          href: '/products#mix4000' },
]

const LINKS_COMPANY = [
  { label: 'Who We Are',   href: '/about' },
  { label: 'Clients',      href: '/clients' },
  { label: 'Careers',      href: '/careers' },
  { label: 'Contact',      href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-bpl-navy border-t border-white/[0.05] px-14 pt-[68px] pb-8">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 max-w-site mx-auto mb-14">
        {/* Brand column */}
        <div>
          <div className="font-display font-bold text-[18px] text-white tracking-[-0.02em] mb-3">
            Best Practices <span className="text-bpl-blue-light">Limited</span>
          </div>
          <p className="text-[13px] text-white/45 leading-[1.7] mb-5 max-w-[260px]">
            {SITE.tagline} — fleet management, tracking, and safety solutions since {SITE.founded}.
          </p>
          <div className="space-y-2 text-[12.5px] text-white/40">
            <p>{SITE.address}</p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-bpl-blue-light transition-colors">{SITE.email}</a>
            </p>
            <p>
              <a href={`tel:${SITE.phone1}`} className="hover:text-bpl-blue-light transition-colors">{SITE.phone1}</a>
              {' · '}
              <a href={`tel:${SITE.phone2}`} className="hover:text-bpl-blue-light transition-colors">{SITE.phone2}</a>
            </p>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-4">Solutions</h4>
          <ul className="space-y-2.5">
            {LINKS_SOLUTIONS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-white/55 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-4">Products</h4>
          <ul className="space-y-2.5">
            {LINKS_PRODUCTS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-white/55 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-4">Company</h4>
          <ul className="space-y-2.5">
            {LINKS_COMPANY.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-white/55 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] pt-6 flex justify-between items-center max-w-site mx-auto">
        <p className="text-[12px] text-white/30">
          © {new Date().getFullYear()} Best Practices Limited. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-bpl-blue/14 text-bpl-blue-light text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded">
            MiX Partner
          </span>
          <span className="bg-bpl-blue/14 text-bpl-blue-light text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded">
            Est. 2001
          </span>
        </div>
      </div>
    </footer>
  )
}
