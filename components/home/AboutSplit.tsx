import Image from 'next/image'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ABOUT } from '@/lib/content'

export function AboutSplit() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left: Story ── */}
      <div className="bg-bpl-off-white px-8 md:px-14 xl:px-20 py-20 md:py-28">
        <RevealWrapper>
          <SectionLabel>Our Story</SectionLabel>

          <div className="font-display font-extrabold text-bpl-blue/10 leading-none tracking-tight select-none text-[72px] md:text-[88px] -ml-1 mt-2">
            {ABOUT.year}
          </div>

          <h2 className="font-display font-bold text-bpl-navy text-[26px] md:text-[30px] tracking-tight leading-[1.25] mt-2 mb-6">
            Two decades shaping Nigerian fleet safety
          </h2>

          <div className="h-px bg-bpl-light-gray mb-7" />

          <p className="text-[14.5px] text-bpl-body leading-relaxed mb-4">
            {ABOUT.storyP1}
          </p>
          <p className="text-[14.5px] text-bpl-body leading-relaxed">
            {ABOUT.storyP2}
          </p>

          {/* Real photos */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="relative h-36 rounded-xl overflow-hidden">
              <Image src="/images/gallery/gallery-01.jpg" alt="BPL partnership meeting" fill className="object-cover" />
            </div>
            <div className="relative h-36 rounded-xl overflow-hidden">
              <Image src="/images/gallery/gallery-09.jpg" alt="BPL MiX training session" fill className="object-cover" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-7">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-bpl-body bg-white border border-bpl-light-gray px-4 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-bpl-blue" />
              MiX by Powerfleet Partner
            </span>
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-bpl-body bg-white border border-bpl-light-gray px-4 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-bpl-tan" />
              Elson Truck Technology
            </span>
          </div>
        </RevealWrapper>
      </div>

      {/* ── Right: Vision & Mission ── */}
      <div
        className="relative px-8 md:px-14 xl:px-20 py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #030D1A 0%, #071526 60%, #040F1E 100%)' }}
      >
        {/* Radial blue glow — top right corner, like a map light source */}
        <div
          className="absolute -top-20 -right-20 w-[420px] h-[420px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.18) 0%, transparent 70%)' }}
        />
        {/* Bottom left counter-glow */}
        <div
          className="absolute bottom-0 left-0 w-[280px] h-[280px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,40,120,0.14) 0%, transparent 70%)' }}
        />
        <RevealWrapper delay={0.12}>

          {/* Vision */}
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-blue-light mb-3">
              Our Vision
            </p>
            <p className="text-[17px] font-light text-white/75 leading-relaxed">
              {ABOUT.vision}
            </p>
          </div>

          <div className="h-px bg-white/[0.08] mb-10" />

          {/* Mission */}
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-red/60 mb-3">
              Our Mission
            </p>
            <p className="text-[17px] font-light text-white/75 leading-relaxed">
              {ABOUT.mission}
            </p>
          </div>

          <div className="h-px bg-white/[0.08] mb-10" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-6">
            {[
              { value: '150+',   label: 'Enterprise Clients' },
              { value: '24 yrs', label: 'Industry Experience' },
              { value: '6,000+', label: 'Devices Installed' },
              { value: '2001',   label: 'Year Founded' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display font-extrabold text-white text-[28px] tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="text-[11px] font-medium tracking-[0.07em] uppercase text-white/35 mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
