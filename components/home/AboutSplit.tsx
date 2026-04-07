import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ABOUT } from '@/lib/content'

export function AboutSplit() {
  return (
    <section className="grid grid-cols-2">
      {/* Left: Story */}
      <div className="bg-bpl-off-white px-20 py-24 relative overflow-hidden">
        {/* Circle decoration */}
        <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 rounded-full bg-bpl-blue/[0.04] pointer-events-none" />

        <RevealWrapper>
          <SectionLabel>Our Story</SectionLabel>

          {/* Giant year */}
          <div className="font-display text-[90px] font-extrabold text-bpl-blue/10 leading-none tracking-[-0.04em] hover:text-bpl-blue/16 transition-colors duration-300 cursor-default select-none -ml-1">
            {ABOUT.year}
          </div>

          <h2 className="font-display text-[30px] font-bold text-bpl-navy tracking-[-0.02em] leading-[1.2] mt-2 mb-5">
            Two decades shaping Nigerian fleet safety
          </h2>

          <div className="h-px bg-bpl-light-gray my-7" />

          <p className="text-[14.5px] text-bpl-body leading-[1.7] mb-4">
            {ABOUT.storyP1}
          </p>
          <p className="text-[14.5px] text-bpl-body leading-[1.7]">
            {ABOUT.storyP2}
          </p>

          <div className="flex items-center gap-4 mt-7">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-bpl-body bg-white border border-bpl-light-gray px-3.5 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-bpl-blue flex-shrink-0" />
              MiX by Powerfleet
            </span>
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-bpl-body bg-white border border-bpl-light-gray px-3.5 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4A882' }} />
              Elson Truck Technology
            </span>
          </div>
        </RevealWrapper>
      </div>

      {/* Right: Vision & Mission */}
      <div className="bg-bpl-navy px-20 py-24 text-white">
        <RevealWrapper delay={0.15}>
          {/* Vision */}
          <div className="mb-8">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-blue-light mb-3">
              Our Vision
            </div>
            <p className="text-[17px] font-light text-white/80 leading-[1.7]">
              {ABOUT.vision}
            </p>
          </div>

          <div className="h-px bg-white/[0.07] my-8" />

          {/* Mission */}
          <div className="mb-8">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-red/70 mb-3">
              Our Mission
            </div>
            <p className="text-[17px] font-light text-white/80 leading-[1.7]">
              {ABOUT.mission}
            </p>
          </div>

          <div className="h-px bg-white/[0.07] my-8" />

          {/* Mini stat grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '150+',  label: 'Enterprise Clients' },
              { value: '24yr',  label: 'Industry Experience' },
              { value: '6,000+', label: 'Devices Installed' },
              { value: '2001',  label: 'Year Founded' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-[28px] font-extrabold text-white tracking-[-0.03em]">{s.value}</div>
                <div className="text-[11px] font-medium tracking-[0.06em] uppercase text-white/35 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
