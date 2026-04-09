import { MapPin, Wrench, Users, Gauge, BarChart3, Package, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SERVICES } from '@/lib/content'

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin, Wrench, Users, Gauge, BarChart3, Package,
}

export function ServicesGrid() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <RevealWrapper className="max-w-xl mb-14">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-display font-bold text-bpl-navy text-[32px] md:text-[38px] tracking-tight leading-[1.15] mt-2">
            End-to-end fleet solutions
          </h2>
          <p className="text-[15px] text-bpl-body leading-relaxed mt-4">
            Every service is built around our CES principle — Cost Reduction, Efficiency, and Safety.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? MapPin
            return (
              <RevealWrapper key={svc.title} delay={i * 0.05}>
                <Link
                  href={svc.href}
                  className="group block bg-bpl-off-white rounded-2xl p-8 hover:bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-250 border border-transparent hover:border-bpl-light-gray"
                >
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-bpl-blue-pale flex items-center justify-center mb-6 group-hover:bg-bpl-blue transition-colors duration-250">
                    <Icon size={19} strokeWidth={1.8}
                      className="text-bpl-blue group-hover:text-white transition-colors duration-250" />
                  </div>

                  <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-bpl-mid-gray mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <h3 className="font-display font-semibold text-bpl-navy text-[16px] leading-snug mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-[13.5px] text-bpl-body leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="mt-5 text-[13px] font-semibold text-bpl-blue flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more
                    <span aria-hidden>→</span>
                  </div>
                </Link>
              </RevealWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
