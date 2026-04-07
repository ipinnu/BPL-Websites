import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { CLIENTS_TRACK_1, CLIENTS_TRACK_2, TESTIMONIALS } from '@/lib/content'

export const metadata = {
  title: 'Clients — Best Practices Limited',
  description: 'Trusted by Shell, TotalEnergies, DHL, Lafarge, Baker Hughes and 150+ enterprise fleets in Nigeria.',
}

export default function ClientsPage() {
  const allClients = [...CLIENTS_TRACK_1, ...CLIENTS_TRACK_2]

  return (
    <div className="bg-white">
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <SectionLabel light>Our Clients</SectionLabel>
          <h1 className="font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mt-3">
            Trusted by 150+ enterprise fleets
          </h1>
          <p className="text-[16px] text-white/60 mt-5 max-w-[520px]">
            From oil majors to logistics companies — Nigeria&apos;s most demanding fleets run on BPL.
          </p>
        </div>
      </section>

      {/* Client grid */}
      <section className="px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {allClients.map((client, i) => (
              <RevealWrapper key={client.name} delay={i * 0.04}>
                <div className="flex items-center gap-3 px-5 py-4 bg-bpl-off-white border border-bpl-light-gray rounded-xl group hover:border-bpl-blue hover:bg-bpl-blue-pale transition-all duration-200">
                  <span
                    className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[13px] font-extrabold flex-shrink-0"
                    style={{ backgroundColor: client.color, color: client.textColor ?? '#fff' }}
                  >
                    {client.initials}
                  </span>
                  <span className="text-[14px] font-medium text-bpl-body group-hover:text-bpl-blue transition-colors">
                    {client.name}
                  </span>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto max-w-[760px]">
          {TESTIMONIALS.map((t) => (
            <RevealWrapper key={t.name}>
              <blockquote className="text-[22px] font-light italic text-white/88 leading-[1.68] mb-7">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-bpl-blue-light mb-1">
                — {t.name}
              </div>
              <div className="text-[13px] text-white/50">{t.role}</div>
            </RevealWrapper>
          ))}
        </div>
      </section>
    </div>
  )
}
