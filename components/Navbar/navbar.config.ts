// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
}

export interface CarouselSlide {
  src: string
  alt: string
}

export interface PatternAConfig {
  pattern: 'A'
  label: string
  eyebrow: string
  links: NavLink[]
  videoSrc?: string
  videoLabel?: string
  carousel?: CarouselSlide[]
}

export interface ProductColumn {
  iconKey: 'platform' | 'safety' | 'camera' | 'fuel'
  title: string
  links: NavLink[]
}

export interface PatternBConfig {
  pattern: 'B'
  label: string
  columns: ProductColumn[]
  footerCta: {
    text: string
    label: string
    href: string
  }
}

export interface EditorialCard {
  title: string
  summary: string
  href: string
}

export interface PatternCConfig {
  pattern: 'C'
  label: string
  links: NavLink[]
  videoSrc: string // stock footage path
  videoLabel: string
  videoHref: string
  editorialCards: EditorialCard[]
}

export type NavItemConfig = PatternAConfig | PatternBConfig | PatternCConfig

export interface PlainNavItem {
  label: string
  href: string
  config: null
}

export interface DropdownNavItem {
  label: string
  href?: string
  config: NavItemConfig
}

export type NavItem = PlainNavItem | DropdownNavItem

// ─── Data ─────────────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Solutions',
    config: {
      pattern: 'A',
      label: 'Solutions',
      eyebrow: 'Fleet Intelligence Services',
      links: [
        { label: 'Fleet Management & Tracking',   href: '/solutions#tracking' },
        { label: 'Speed Limiting Devices',          href: '/solutions#speed' },
        { label: 'Driver Training & Development',   href: '/solutions#training' },
        { label: 'Fleet Consulting & Outsourcing',  href: '/solutions#consulting' },
        { label: 'Fuel Monitoring',                 href: '/solutions#fuel' },
        { label: 'Supply Chain Management',         href: '/solutions#supply-chain' },
      ],
      // stock footage — trucks on highway, wide aerial
      videoSrc: '/videos/MiX%20Telematics%20_%20Hardware%20_%20MiX%20Vision.mp4',
      videoLabel: 'Precision fleet intelligence — deployed across Nigeria',
    },
  },
  {
    label: 'Products',
    config: {
      pattern: 'B',
      label: 'Products',
      columns: [
        {
          iconKey: 'platform',
          title: 'Fleet Platform',
          links: [
            { label: 'MiX Fleet Manager Premium', href: '/products#mix-fleet' },
            { label: 'Real-Time GPS Tracking',     href: '/products#gps' },
            { label: 'Route Optimisation',         href: '/products#routing' },
            { label: 'Fleet Analytics & Reports',  href: '/products#analytics' },
          ],
        },
        {
          iconKey: 'safety',
          title: 'Safety Hardware',
          links: [
            { label: 'Tamper-Proof Speed Limiter', href: '/products#speed-limiter' },
            { label: 'IVMS Onboard Device',        href: '/products#ivms' },
            { label: 'Driver ID & Scoring',        href: '/products#driver-id' },
            { label: 'Panic / Duress Button',      href: '/products#panic' },
          ],
        },
        {
          iconKey: 'camera',
          title: 'Video Telematics',
          links: [
            { label: 'MiX Vision Cameras',         href: '/products#mix-vision' },
            { label: 'Forward-Facing Camera',       href: '/products#forward-cam' },
            { label: 'In-Cab Driver Camera',        href: '/products#incab-cam' },
            { label: 'Event-Triggered Recording',   href: '/products#event-rec' },
          ],
        },
        {
          iconKey: 'fuel',
          title: 'Fuel & Compliance',
          links: [
            { label: 'Fuel Monitoring System',   href: '/products#fuel-monitor' },
            { label: 'Fleet Maintenance App',    href: '/products#maintenance' },
            { label: 'Compliance Reporting',     href: '/products#compliance' },
            { label: 'Axle Load Sensor',         href: '/products#axle' },
          ],
        },
      ],
      footerCta: {
        text: 'Not sure which product fits your fleet?',
        label: 'Talk to a fleet expert →',
        href: '/contact',
      },
    },
  },
  {
    label: 'Industries',
    config: {
      pattern: 'A',
      label: 'Industries',
      eyebrow: 'Sectors We Serve',
      links: [
        { label: 'Oil & Gas',                  href: '/industries#oil-gas' },
        { label: 'FMCG & Distribution',        href: '/industries#fmcg' },
        { label: 'Construction & Mining',      href: '/industries#construction' },
        { label: 'Transport & Logistics',      href: '/industries#transport' },
        { label: 'Energy & Utilities',         href: '/industries#energy' },
        { label: 'Government & Public Sector', href: '/industries#government' },
      ],
    },
  },
  {
    label: 'About',
    config: {
      pattern: 'A',
      label: 'About',
      eyebrow: 'Best Practices Limited',
      links: [
        { label: 'Who We Are',                  href: '/about' },
        { label: 'Our Story & Journey',         href: '/about#journey' },
        { label: 'Our Team',                    href: '/about#team' },
        { label: 'Awards & Recognition',        href: '/about#awards' },
        { label: 'Our Values — THIS Principle', href: '/about#values' },
        { label: 'Careers at BPL',              href: '/careers' },
      ],
      carousel: [
        { src: '/images/gallery/Group%20Photo%201.jpg', alt: 'BPL team group photo' },
        { src: '/images/gallery/Group%20photo%202.jpg', alt: 'BPL team group photo 2' },
        { src: '/images/gallery/group%20photo.jpg',     alt: 'BPL team group photo 3' },
      ],
    },
  },
  {
    label: 'Resources',
    config: {
      pattern: 'C',
      label: 'Resources',
      links: [
        { label: 'Case Studies',          href: '/resources/case-studies' },
        { label: 'Blog & Insights',       href: '/resources/blog' },
        { label: 'White Papers',          href: '/resources/white-papers' },
        { label: 'Downloads & Brochures', href: '/resources/downloads' },
        { label: 'Webinars',              href: '/resources/webinars' },
        { label: 'FAQs',                  href: '/resources/faqs' },
        { label: 'Help Center',           href: '/resources/help' },
        { label: 'Contact Support',       href: '/contact' },
      ],
      // stock footage — data dashboard screens, analytics displays
      videoSrc: '/videos/MiX%20Telematics%20_%20Hardware%20_%20MiX%20Vision.mp4',
      videoLabel: 'Fleet intelligence insights & knowledge hub',
      videoHref: '/resources',
      editorialCards: [
        {
          title: 'How Speed Limiters Reduce Road Fatalities in Nigeria',
          summary: 'Data-backed look at how electronic speed control saves lives on Nigerian roads.',
          href: '/resources/speed-limiters-safety',
        },
        {
          title: 'Fleet ROI: What Your Vehicles Are Really Costing You',
          summary: 'Hidden costs in fuel, maintenance, and downtime — and how telematics closes the gap.',
          href: '/resources/fleet-roi',
        },
        {
          title: 'Telematics in Nigeria: From Reactive to Predictive Fleet Ops',
          summary: 'How real-time vehicle data transforms fleet management for enterprise operators.',
          href: '/resources/telematics-nigeria',
        },
      ],
    },
  },
  {
    label: 'Clients',
    href: '/clients',
    config: null,
  },
]
