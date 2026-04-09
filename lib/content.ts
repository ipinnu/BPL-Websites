import type { Service, Product, Client, Stat, Testimonial, TickerItem } from './types'

export const SITE = {
  name:     'Best Practices Limited',
  tagline:  "Nigeria's Fleet Intelligence Leader",
  founded:  2001,
  phone1:   '08030762820',
  phone2:   '09054129056',
  email:    'marketing@bestpracticesltd.ng',
  address:  '15th Floor Eleganza House, 15B Joseph Wesley Street, Off Broad Street, Lagos',
  facebook: 'https://web.facebook.com/FleetMgtLimited/',
}

export const HERO = {
  eyebrow:  "Nigeria's Fleet Intelligence Leader · Est. 2001",
  h1:       ["Nigeria's Fleet.", 'Tracked in Real\u2011Time.', 'Built for Safety.'],
  h1Accent: 'Real\u2011Time.',
  sub:      'Best Practices Limited delivers fleet management, real-time vehicle tracking, and driver safety solutions for enterprise fleets across Nigeria — powered by MiX by Powerfleet technology.',
  cta1:     'Explore Solutions',
  cta2:     'Our Track Record',
}

export const ABOUT = {
  year: '2001',
  storyP1: "Founded in 2001, Best Practices Limited became Nigeria's strategic partner for MiX Telematics South Africa and Elson Truck Technology — deploying GPS tracking, road speed limiters, and fleet management SaaS across the country's most demanding enterprise fleets.",
  storyP2: 'Today we serve oil & gas, FMCG, construction, and transport — with Shell, TotalEnergies, DHL, and Lafarge among our valued clients.',
  vision:  'To be the Fleet Solutions & Value Added Services provider of choice — with good returns on investment for fleet owners and operators.',
  mission: 'To provide innovative fleet solutions and services with focus on Cost Reduction, Efficiency and Safety — the CES principle.',
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'The number of incidents and reckless driving has reduced to the barest minimum. BG Nigeria Management is really impressed with the performance of the BPL team.',
    name:  'Mike Akeh',
    role:  'Security & Transport Coordinator, BG Nigeria',
  },
]

export const STATS: Stat[] = [
  { number: 5032, suffix: '+', label: 'Drivers & Managers Trained' },
  { number: 6000, suffix: '+', label: 'IVMS Devices Installed' },
  { number: 1000, suffix: '+', label: 'Speed Limiters Deployed' },
  { number: 150,  suffix: '+', label: 'Enterprise Clients' },
]

export const SERVICES: Service[] = [
  {
    icon: 'MapPin',
    title: 'Vehicle Tracking & Fleet Management',
    description: 'Real-time GPS tracking and fleet management SaaS that removes operational waste and drives measurable productivity gains across your fleet.',
    href: '/solutions#tracking',
  },
  {
    icon: 'Wrench',
    title: 'Fleet Maintenance Application',
    description: 'Fully integrated maintenance management to keep every vehicle roadworthy, compliant, and on schedule.',
    href: '/solutions#maintenance',
  },
  {
    icon: 'Users',
    title: 'Driver & Manager Training',
    description: 'Skills improvement seminars, workshops, and ongoing progress monitoring for drivers and managers across Nigeria.',
    href: '/solutions#training',
  },
  {
    icon: 'Gauge',
    title: 'Speed Limiting Devices',
    description: 'Sales, installation, and maintenance of tamper-resistant speed limiters for safety and regulatory compliance.',
    href: '/solutions#speed',
  },
  {
    icon: 'BarChart3',
    title: 'Fleet Consulting & Outsourcing',
    description: "A center of excellence across the entire fleet management value chain — from audits to outsourced fleet operations.",
    href: '/solutions#consulting',
  },
  {
    icon: 'Package',
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain planning, procurement services, and supplier evaluation to optimize your logistics network.',
    href: '/solutions#supply-chain',
  },
]

export const PRODUCTS: Product[] = [
  {
    slug: 'mix-vision',
    tag: 'Video Telematics',
    name: 'MiX Vision',
    description: '72-hour rolling video capture — in-cab and forward-facing — for incident context and accountability.',
  },
  {
    slug: 'mix-rovi',
    tag: 'In-Cab Display',
    name: 'MiX Rovi II',
    description: 'Android-powered 7" programmable display with navigation, job dispatching, and real-time alerts.',
  },
  {
    slug: 'fuel-monitor',
    tag: 'Fuel Management',
    name: 'Fuel Monitoring System',
    description: 'Detect anomalies, prevent theft, and identify inefficient driving practices before they become costly.',
  },
  {
    slug: 'mix4000',
    tag: 'Fleet Hardware',
    name: 'MiX4000 Onboard Computer',
    description: 'GPS + GSM onboard computer enabling the full MiX Fleet Manager Premium platform on any vehicle.',
  },
  {
    slug: 'speed-limiter',
    tag: 'Safety Hardware',
    name: 'Tamper-Resistant Speed Limiter',
    description: 'Electronic speed control with data logging, tamper-proof design, and automatic activation.',
  },
  {
    slug: 'axle-sensor',
    tag: 'Telematics',
    name: 'Wireless Axle Load Sensor',
    description: 'GNOM DDE S7 pressure sensor for axle load monitoring and overload prevention on air suspension vehicles.',
  },
]

export const CLIENTS_TRACK_1: Client[] = [
  { initials: 'SH', name: 'Shell Nigeria',   color: '#CC0000', logo: '/images/clients/shell.svg' },
  { initials: 'TE', name: 'TotalEnergies',   color: '#E4002B', logo: '/images/clients/totalenergies.svg' },
  { initials: 'DH', name: 'DHL Logistics',   color: '#FFCC00', textColor: '#333', logo: '/images/clients/dhl.svg' },
  { initials: 'LA', name: 'Lafarge Africa',  color: '#005CA9', logo: '/images/clients/lafarge.svg' },
  { initials: 'BH', name: 'Baker Hughes',    color: '#007AC9', logo: '/images/clients/baker-hughes.svg' },
  { initials: 'WF', name: 'Weatherford',     color: '#0054A0', logo: '/images/clients/weatherford.svg' },
  { initials: 'NV', name: 'NOV',             color: '#003087', logo: '/images/clients/nov.svg' },
  { initials: 'OV', name: 'OVH Energy',      color: '#F47920' },
  { initials: 'BG', name: 'BG Nigeria',      color: '#00A550', logo: '/images/clients/bg-nigeria.svg' },
]

export const CLIENTS_TRACK_2: Client[] = [
  { initials: 'TB', name: 'TravelBeta',      color: '#6B21A8', logo: '/images/clients/travelbeta.png' },
  { initials: 'CH', name: 'Chevron Nigeria', color: '#1D4ED8', logo: '/images/clients/chevron.svg' },
  { initials: 'JM', name: 'JMG Limited',     color: '#059669' },
  { initials: 'EL', name: 'Elson Tech',      color: '#B45309' },
  { initials: 'MX', name: 'MiX Powerfleet',  color: '#0078D4' },
  { initials: 'SB', name: 'Schlumberger',    color: '#7C3AED', logo: '/images/clients/schlumberger.svg' },
  { initials: 'HL', name: 'Halliburton',     color: '#DC2626', logo: '/images/clients/halliburton.svg' },
  { initials: 'AG', name: 'Agip Energy',     color: '#16A34A', logo: '/images/clients/agip.svg' },
]

export const TICKER_ITEMS: TickerItem[] = [
  { text: 'Fleet Management Solutions',               color: 'blue' },
  { text: '6,000+ IVMS Devices Deployed Nationwide',  color: 'green' },
  { text: 'MiX by Powerfleet Strategic Partner — Nigeria', color: 'blue' },
  { text: '5,032+ Drivers & Transport Managers Trained',   color: 'blue' },
  { text: 'Speed Limiting · Safety · Real-Time Tracking',  color: 'red' },
  { text: 'Shell · DHL · TotalEnergies · Lafarge · Baker Hughes', color: 'green' },
  { text: 'Established 2001 · Lagos, Nigeria',        color: 'blue' },
  { text: 'Cost Reduction · Efficiency · Safety',     color: 'blue' },
]
