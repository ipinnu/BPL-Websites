import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { Button } from '@/components/ui/Button'
import { SERVICES } from '@/lib/content'
import { MapPin, Wrench, Users, Gauge, BarChart3, Package, LucideIcon } from 'lucide-react'

export const metadata = {
  title: 'Solutions — Best Practices Limited',
  description: 'Fleet management, vehicle tracking, driver training and speed limiting solutions across Nigeria.',
}

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin, Wrench, Users, Gauge, BarChart3, Package,
}

export default function SolutionsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <SectionLabel light>What We Do</SectionLabel>
          <h1 className="font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mt-3">
            Complete fleet solutions for Nigeria&apos;s enterprise fleets
          </h1>
          <p className="text-[16px] text-white/60 mt-5 max-w-[520px]">
            From real-time GPS tracking to driver training — every service built around Cost Reduction, Efficiency and Safety.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="px-14 py-[96px]">
        <div className="max-w-site mx-auto space-y-16">
          {SERVICES.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? MapPin
            return (
              <RevealWrapper key={svc.title} delay={i * 0.05}>
                <div id={svc.href.split('#')[1]} className="grid grid-cols-[80px_1fr] gap-10 items-start pb-16 border-b border-bpl-light-gray last:border-b-0">
                  <div className="w-[60px] h-[60px] bg-bpl-blue-pale rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Icon size={26} className="text-bpl-blue" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h2 className="font-display text-[24px] font-bold text-bpl-navy tracking-[-0.02em] mb-3">{svc.title}</h2>
                    <p className="text-[15px] text-bpl-body leading-[1.7] max-w-[600px]">{svc.description}</p>
                    <Button href="/contact" variant="outline" className="mt-5">Enquire about this service</Button>
                  </div>
                </div>
              </RevealWrapper>
            )
          })}
        </div>
      </section>
    </div>
  )
}
