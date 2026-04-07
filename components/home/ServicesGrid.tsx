'use client'
import { MapPin, Wrench, Users, Gauge, BarChart3, Package, LucideIcon } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SERVICES } from '@/lib/content'
import Link from 'next/link'

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin, Wrench, Users, Gauge, BarChart3, Package,
}

export function ServicesGrid() {
  return (
    <section className="bg-white px-14 py-[96px]">
      <div className="max-w-site mx-auto">
        <RevealWrapper className="text-center mb-12">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-display text-[38px] font-bold text-bpl-navy tracking-[-0.025em] leading-[1.15]">
            End-to-end fleet solutions
          </h2>
          <p className="text-[15px] text-bpl-body mt-3 max-w-[500px] mx-auto">
            From real-time tracking to driver training — every service built around the CES principle.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-3 gap-[1px] bg-bpl-light-gray rounded-xl overflow-hidden border border-bpl-light-gray">
          {SERVICES.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? MapPin
            return (
              <TiltCard
                key={svc.title}
                className="bg-white p-9 cursor-pointer relative overflow-hidden group"
              >
                {/* Bottom blue bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: 'linear-gradient(90deg, #0078D4, #3399E0)' }}
                />

                {/* Icon */}
                <div className="w-[46px] h-[46px] bg-bpl-blue-pale rounded-[10px] flex items-center justify-center mb-[18px] transition-all duration-200 group-hover:bg-bpl-blue group-hover:rotate-[-4deg]">
                  <Icon
                    size={20}
                    className="text-bpl-blue group-hover:text-white transition-colors duration-200"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="font-display text-[16px] font-semibold text-bpl-navy mb-2.5">
                  {svc.title}
                </h3>
                <p className="text-[13.5px] text-bpl-body leading-[1.65]">
                  {svc.description}
                </p>

                {/* Learn more — hidden, slide in on hover */}
                <div className="overflow-hidden h-0 group-hover:h-7 transition-all duration-200 mt-1">
                  <Link
                    href={svc.href}
                    className="text-[12.5px] font-semibold text-bpl-blue flex items-center gap-1 mt-2"
                  >
                    Learn more →
                  </Link>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
