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

export interface PatternDConfig {
  pattern: 'D'
  label: string
  eyebrow: string
  links: NavLink[]
  videoSrc?: string
  columns: ProductColumn[]
  footerCta: {
    text: string
    label: string
    href: string
  }
}

export type NavItemConfig = PatternAConfig | PatternBConfig | PatternCConfig | PatternDConfig

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
      pattern: 'D',
      label: 'Solutions',
      eyebrow: 'Fleet Intelligence Services',
      links: [
        { label: 'Fleet Management & Tracking',  href: '/solutions#tracking' },
        { label: 'Speed Limiting Devices',        href: '/solutions#speed' },
        { label: 'Driver Training & Development', href: '/solutions#training' },
        { label: 'Fleet Consulting & Outsourcing',href: '/solutions#consulting' },
        { label: 'Fuel Monitoring',               href: '/solutions#fuel' },
        { label: 'Supply Chain Management',       href: '/solutions#supply-chain' },
      ],
      videoSrc: '/videos/mix-vision.mp4',
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
            { label: 'MiX Vision Cameras',       href: '/products#mix-vision' },
            { label: 'Forward-Facing Camera',     href: '/products#forward-cam' },
            { label: 'In-Cab Driver Camera',      href: '/products#incab-cam' },
            { label: 'Event-Triggered Recording', href: '/products#event-rec' },
          ],
        },
        {
          iconKey: 'fuel',
          title: 'Fuel & Compliance',
          links: [
            { label: 'Fuel Monitoring System', href: '/products#fuel-monitor' },
            { label: 'Fleet Maintenance App',  href: '/products#maintenance' },
            { label: 'Compliance Reporting',   href: '/products#compliance' },
            { label: 'Axle Load Sensor',       href: '/products#axle' },
          ],
        },
      ],
      footerCta: {
        text: 'Not sure where to start?',
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
        { label: 'Blog & Insights', href: '/resources/blog' },
        { label: 'Contact Support', href: '/contact' },
      ],
      // stock footage — data dashboard screens, analytics displays
      videoSrc: '/videos/mix-vision.mp4',
      videoLabel: 'Fleet intelligence insights & knowledge hub',
      videoHref: '/resources',
      editorialCards: [
        {
          title: 'Why Dashcams Are Essential for Modern Fleet Management',
          summary: 'How AI-powered dashcams have evolved from simple recorders into proactive safety tools for enterprise fleets.',
          href: '/resources/blog/why-dashcams-are-essential',
        },
        {
          title: 'Driving Towards a Greener Future: How Smart Fleet Management Slashes CO₂ Emissions',
          summary: 'Real-time fuel monitoring, route optimisation, and driver behaviour analysis — making fleets more sustainable.',
          href: '/resources/blog/green-fleet-co2-emissions',
        },
        {
          title: 'Digital Fleet Solution: The Tool for Fleet Business Transformation',
          summary: 'How data analytics and integrated platforms are redefining enterprise fleet management across Africa.',
          href: '/resources/blog/digital-fleet-solution-transformation',
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
