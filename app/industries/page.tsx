import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Industries — Best Practices Limited',
  description: 'Fleet management solutions for oil & gas, FMCG, construction, and transport industries in Nigeria.',
}

const INDUSTRIES = [
  {
    name: 'Oil & Gas',
    description: 'From offshore logistics to onshore distribution, we keep Nigeria\'s energy sector moving safely and efficiently.',
    clients: 'Shell, TotalEnergies, Baker Hughes, Weatherford, Chevron, Schlumberger',
  },
  {
    name: 'FMCG & Logistics',
    description: 'Nationwide distribution fleet management and route optimization for consumer goods and logistics companies.',
    clients: 'DHL Logistics, OVH Energy',
  },
  {
    name: 'Construction & Mining',
    description: 'Heavy equipment tracking, overload prevention, and site-to-site transport management.',
    clients: 'Lafarge Africa',
  },
  {
    name: 'Transport & Haulage',
    description: 'End-to-end driver safety, speed compliance, and fleet performance for commercial transport operators.',
    clients: 'TravelBeta, JMG Limited',
  },
]

export default function IndustriesPage() {
  return (
    <div className="bg-white">
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <SectionLabel light>Industries Served</SectionLabel>
          <h1 className="font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mt-3">
            Built for Nigeria&apos;s most demanding sectors
          </h1>
        </div>
      </section>

      <section className="px-14 py-[96px]">
        <div className="max-w-site mx-auto grid grid-cols-2 gap-8">
          {INDUSTRIES.map((ind, i) => (
            <RevealWrapper key={ind.name} delay={i * 0.1}>
              <div className="bg-bpl-off-white border border-bpl-light-gray rounded-xl p-9 h-full">
                <h2 className="font-display text-[22px] font-bold text-bpl-navy mb-3">{ind.name}</h2>
                <p className="text-[14.5px] text-bpl-body leading-[1.7] mb-5">{ind.description}</p>
                <div className="text-[12px] font-medium text-bpl-mid-gray">
                  <span className="text-bpl-blue font-semibold">Clients include: </span>
                  {ind.clients}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button href="/contact" variant="primary">Discuss your industry needs →</Button>
        </div>
      </section>
    </div>
  )
}
