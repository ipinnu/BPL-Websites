import type { ModalProduct } from '@/components/products/ProductModal'

export type HotspotProduct = ModalProduct & {
  position: [number, number, number]
  anchorBottom?: boolean
  partner?: { slug: string; name: string; tag: string }
}

export const HOTSPOT_PRODUCTS: HotspotProduct[] = [
  {
    slug: 'mix-vision',
    name: 'MiX Vision',
    tag: 'Video Telematics',
    description: '72-hour rolling video capture — in-cab and forward-facing — for incident context and full driver accountability.',
    specs: ['72-hour rolling video buffer', 'Forward-facing + in-cab cameras', 'AI-powered event detection & alerts'],
    position: [0.5, 1.41, 6.42],
    anchorBottom: true,
  },
  {
    slug: 'mix-rovi',
    name: 'MiX Rovi II',
    tag: 'In-Cab Display',
    description: 'Android-powered 7" programmable display with navigation, job dispatching, and real-time driver alerts.',
    specs: ['7" Android touchscreen display', 'Real-time job dispatch & navigation', 'Live driver scoring & safety alerts'],
    position: [0.5, 0.2, 6.42],
  },
  {
    slug: 'mix4000',
    name: 'MiX4000 Onboard Computer',
    tag: 'Fleet Hardware',
    description: 'GPS + GSM onboard computer enabling the full MiX Fleet Manager Premium platform on any vehicle.',
    specs: ['GPS + GSM dual connectivity', 'Full MiX Fleet Manager integration', 'Compatible with any vehicle type'],
    position: [0.5, -0.85, 6.42],
    partner: { slug: 'speed-limiter', name: 'Tamper-Resistant Speed Limiter', tag: 'Safety Hardware' },
  },
  {
    slug: 'fuel-monitor',
    name: 'Fuel Monitoring System',
    tag: 'Fuel Management',
    description: 'Detect anomalies, prevent theft, and identify inefficient driving practices before they become costly.',
    specs: ['Real-time fuel consumption data', 'Theft & siphoning anomaly detection', 'Fleet-wide efficiency reporting'],
    position: [0.1, -1.25, 1.34],
  },
  {
    slug: 'axle-sensor',
    name: 'Wireless Axle Load Sensor',
    tag: 'Telematics',
    description: 'GNOM DDE S7 pressure sensor for axle load monitoring and overload prevention on air suspension vehicles.',
    specs: ['GNOM DDE S7 wireless sensor', 'Air suspension compatible', 'Real-time overload prevention'],
    position: [-0.8, -1.02, -2.17],
  },
]
