import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { ABOUT, STATS } from '@/lib/content'

export const metadata = {
  title: 'Who We Are — Best Practices Limited',
  description: "Nigeria's leading fleet management support services company since 2001.",
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <SectionLabel light>Who We Are</SectionLabel>
          <h1 className="font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mt-3">
            Nigeria&apos;s Fleet Intelligence Pioneer Since {ABOUT.year}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="px-14 py-[96px] max-w-site mx-auto">
        <RevealWrapper>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="font-display text-[32px] font-bold text-bpl-navy tracking-[-0.025em] mb-5">
                Two decades shaping Nigerian fleet safety
              </h2>
              <p className="text-[15px] text-bpl-body leading-[1.7] mb-4">{ABOUT.storyP1}</p>
              <p className="text-[15px] text-bpl-body leading-[1.7]">{ABOUT.storyP2}</p>
            </div>
            <div className="space-y-8">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-blue mb-2">Our Vision</div>
                <p className="text-[16px] text-bpl-body leading-[1.7]">{ABOUT.vision}</p>
              </div>
              <div className="h-px bg-bpl-light-gray" />
              <div>
                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-red mb-2">Our Mission</div>
                <p className="text-[16px] text-bpl-body leading-[1.7]">{ABOUT.mission}</p>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* Stats */}
      <section className="bg-bpl-navy-mid px-14 py-[72px]">
        <div className="max-w-site mx-auto grid grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-[44px] font-extrabold text-white tracking-[-0.03em]">
                {stat.number.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-[12px] font-medium tracking-[0.07em] uppercase text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
