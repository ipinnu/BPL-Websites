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
  storyP1: "Founded in 2001, Best Practices Limited made Nigeria Brewery our inaugural major client — cementing our role as Nigeria's strategic partner for MiX Telematics (now MiX by Powerfleet) and Elson Truck Technology. We deploy GPS tracking, road speed limiters, and fleet management SaaS across the country's most demanding enterprise fleets.",
  storyP2: 'Today we serve oil & gas, FMCG, construction, and transport — with Shell, TotalEnergies, DHL, Lafarge, and regional installers nationwide among our valued partners.',
  vision:  "To be Nigeria's leading provider of fleet intelligence and value-added safety solutions that deliver strong returns on investment.",
  mission: 'To deliver innovative fleet technologies and services that drive cost reduction, efficiency, and safety for fleet operators.',
  milestones: [
    { year: '2001', event: 'Nigeria Brewery became our inaugural major client, marking the beginning of our fleet intelligence journey.' },
    { year: '2002', event: 'Strategic partnership established with MiX Telematics (now MiX by Powerfleet) — making BPL the authorised dealer in Nigeria.' },
    { year: '2006', event: 'Shell Nigeria and TotalEnergies partnerships formed. Elson Truck Technology partnership began, expanding our hardware footprint.' },
    { year: '2012', event: 'Won the MiX Telematics Dealer Competition — regional recognition for outstanding sales performance and client growth.' },
    { year: '2017', event: 'Lafarge Africa Plc partnership launched, deepening our presence in construction and cement-sector fleets.' },
    { year: '2024', event: "Received PowerFleet's 22-year service partnership recognition certificate — a testament to two decades of excellence." },
  ],
  team: [
    { name: 'Abba Peter, PhD', role: 'Fleet Consulting Director', photo: '/images/gallery/CEOO.png' },
    { name: 'Muyiwa Olalekan Babalola', role: 'Senior Service Delivery Manager', photo: '/images/gallery/Muyiwa-Baba.png' },
    { name: 'Tayo Ojo', role: 'Senior Service Delivery Manager', photo: '/images/gallery/Ojo-Tayo.png' },
    { name: 'Joshua Tobi', role: 'Service Delivery Manager', photo: '/images/gallery/Tobi-Joshua.png' },
    { name: 'Aremu Adeolu', role: 'Service Delivery Manager', photo: '/images/gallery/Aremu-Adeolu.png' },
  ],
  awards: [
    { year: '2012', title: 'Dealer Competition Winner', body: 'MiX Telematics (PowerFleet) — top-performing authorised dealer in the region.' },
    { year: '2024', title: '22-Year Service Partnership Recognition', body: 'PowerFleet — certificate honouring over two decades of sustained excellence.' },
  ],
  values: [
    { letter: 'T', word: 'Truthfulness', desc: 'We operate with full transparency in every client engagement, report, and recommendation.' },
    { letter: 'H', word: 'Honesty', desc: 'Our counsel reflects what is right for the fleet, not what is most convenient for the sale.' },
    { letter: 'I', word: 'Integrity', desc: 'Consistent standards, ethical conduct, and accountability define every project we deliver.' },
    { letter: 'S', word: 'Service', desc: 'Excellence through innovation, collaboration, and a long-term commitment to sustainability.' },
  ],
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
