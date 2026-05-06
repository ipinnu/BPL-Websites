'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StatsBand } from '@/components/home/StatsBand'
import { CtaBand } from '@/components/home/CtaBand'
import { Button } from '@/components/ui/Button'
import { ABOUT, STATS } from '@/lib/content'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function AboutPage() {
  return (
    <div style={{ background: '#040C18' }}>

      {/* ── Hero ── */}
      <section
        className="relative px-8 md:px-14 xl:px-20 py-28 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #040C18 0%, #071526 60%, #040F1E 100%)' }}
      >
        {/* Radial glow */}
        <div className="absolute -top-24 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.14) 0%, transparent 70%)' }} />

        <div className="max-w-site mx-auto relative">
          <motion.div {...fade(0.1)}>
            <SectionLabel light>Who We Are</SectionLabel>
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mt-3 max-w-[720px]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 62px)' }}
          >
            Nigeria&apos;s Fleet Intelligence{' '}
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              Pioneer Since {ABOUT.year}
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.32)}
            className="text-[16px] leading-[1.78] max-w-[560px] mt-6"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            From Lagos to every state in Nigeria — Best Practices Limited has spent over two decades building safer, smarter, more efficient fleets for the country&apos;s most demanding enterprises.
          </motion.p>

          <motion.div {...fade(0.44)} className="mt-8 flex gap-3">
            <Button href="/solutions" variant="primary">Our Solutions</Button>
            <Button href="/contact" variant="ghost">Get in Touch</Button>
          </motion.div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: Story text */}
        <div className="px-8 md:px-14 xl:px-20 py-20 md:py-28" style={{ background: '#F5F7FA' }}>
          <RevealWrapper>
            <SectionLabel>Our Story</SectionLabel>

            <div className="font-display font-extrabold text-bpl-blue/10 leading-none tracking-tight select-none text-[72px] md:text-[88px] -ml-1 mt-2">
              {ABOUT.year}
            </div>

            <h2 className="font-display font-bold text-bpl-navy text-[26px] md:text-[30px] tracking-tight leading-[1.25] mt-2 mb-6">
              Two decades shaping Nigerian fleet safety
            </h2>

            <div className="h-px bg-bpl-light-gray mb-7" />

            <p className="text-[14.5px] text-bpl-body leading-relaxed mb-4">{ABOUT.storyP1}</p>
            <p className="text-[14.5px] text-bpl-body leading-relaxed">{ABOUT.storyP2}</p>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <div className="relative h-36 rounded-xl overflow-hidden">
                <Image src="/images/gallery/gallery-01.jpg" alt="BPL partnership" fill className="object-cover" />
              </div>
              <div className="relative h-36 rounded-xl overflow-hidden">
                <Image src="/images/gallery/gallery-09.jpg" alt="BPL training session" fill className="object-cover" />
              </div>
            </div>

            {/* Partner badges */}
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

        {/* Right: Vision, Mission, quick stats */}
        <div
          className="relative px-8 md:px-14 xl:px-20 py-20 md:py-28 overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #030D1A 0%, #071526 60%, #040F1E 100%)' }}
        >
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.18) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,40,120,0.14) 0%, transparent 70%)' }} />

          <RevealWrapper delay={0.12}>
            <div className="mb-10">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-blue-light mb-3">Our Vision</p>
              <p className="text-[17px] font-light text-white/75 leading-relaxed">{ABOUT.vision}</p>
            </div>

            <div className="h-px bg-white/[0.08] mb-10" />

            <div className="mb-10">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-red/60 mb-3">Our Mission</p>
              <p className="text-[17px] font-light text-white/75 leading-relaxed">{ABOUT.mission}</p>
            </div>

            <div className="h-px bg-white/[0.08] mb-10" />

            <div className="grid grid-cols-2 gap-y-8 gap-x-6">
              {[
                { value: '150+',   label: 'Enterprise Clients' },
                { value: '24 yrs', label: 'Industry Experience' },
                { value: '6,000+', label: 'Devices Installed' },
                { value: '2001',   label: 'Year Founded' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-extrabold text-white text-[28px] tracking-tight leading-none">{s.value}</div>
                  <div className="text-[11px] font-medium tracking-[0.07em] uppercase text-white/35 mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Journey Timeline ── */}
      <section
        className="px-8 md:px-14 xl:px-20 py-24 md:py-32"
        style={{ background: 'linear-gradient(180deg, #071526 0%, #040C18 100%)' }}
      >
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>Our Journey</SectionLabel>
            <h2
              className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.1] mt-3 mb-4"
              style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
            >
              Milestones that shaped us
            </h2>
            <p className="text-[15px] max-w-[480px] mb-16" style={{ color: 'rgba(255,255,255,0.5)' }}>
              From Nigeria Brewery&apos;s inaugural fleet to a nationwide network of enterprise clients — the key moments in BPL&apos;s story.
            </p>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ABOUT.milestones.map((m, i) => (
              <RevealWrapper key={m.year} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="font-display font-extrabold text-[44px] leading-none tracking-[-0.04em] mb-4"
                    style={{ color: 'rgba(0,102,204,0.28)' }}
                  >
                    {m.year}
                  </div>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {m.event}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <StatsBand />

      {/* ── The CES Principle ── */}
      <section
        className="px-8 md:px-14 xl:px-20 py-24 md:py-32"
        style={{ background: 'linear-gradient(180deg, #040C18 0%, #071526 50%, #040C18 100%)' }}
      >
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>Our Philosophy</SectionLabel>
            <h2
              className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.1] mt-3 mb-4 max-w-[560px]"
              style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
            >
              Every decision guided by one principle
            </h2>
            <p className="text-[15px] max-w-[480px] mb-16" style={{ color: 'rgba(255,255,255,0.5)' }}>
              The CES framework underpins every solution, every deployment, and every client relationship at BPL.
            </p>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                letter: 'C',
                title: 'Cost Reduction',
                desc: 'Eliminating fuel waste, reducing maintenance costs, and cutting idle time — we make every naira in your fleet budget work harder.',
                color: '#3399E0',
                glow: 'rgba(0,102,204,0.2)',
              },
              {
                letter: 'E',
                title: 'Efficiency',
                desc: 'Real-time visibility, optimised routes, and data-driven dispatch — we remove friction from every mile your fleet covers.',
                color: '#60A5FA',
                glow: 'rgba(96,165,250,0.2)',
              },
              {
                letter: 'S',
                title: 'Safety',
                desc: 'Speed limiting, driver monitoring, incident alerts, and training — because every driver deserves to come home safely.',
                color: '#4ADE80',
                glow: 'rgba(74,222,128,0.15)',
              },
            ].map((item, i) => (
              <RevealWrapper key={item.letter} delay={i * 0.12}>
                <div
                  className="relative rounded-2xl p-8 overflow-hidden h-full"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 pointer-events-none rounded-full"
                    style={{ background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)` }}
                  />
                  <div
                    className="font-display font-extrabold text-[56px] leading-none tracking-[-0.04em] mb-5"
                    style={{ color: item.color, opacity: 0.18 }}
                  >
                    {item.letter}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: item.color }}>
                    {item.title}
                  </div>
                  <p className="text-[14.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {item.desc}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── THIS Values ── */}
      <section
        className="px-8 md:px-14 xl:px-20 py-24 md:py-32"
        style={{ background: '#F5F7FA' }}
      >
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel>Our Values</SectionLabel>
            <h2
              className="font-display font-bold text-bpl-navy tracking-[-0.03em] leading-[1.2] mt-3 mb-4"
              style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
            >
              The THIS principle
            </h2>
            <p className="text-[15px] text-bpl-body max-w-[480px] mb-14">
              Four values that define how we show up — for clients, for partners, and for each other.
            </p>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT.values.map((v, i) => (
              <RevealWrapper key={v.letter} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-bpl-light-gray h-full">
                  <div
                    className="font-display font-extrabold text-[56px] leading-none tracking-[-0.04em] mb-5"
                    style={{ color: 'rgba(0,102,204,0.1)' }}
                  >
                    {v.letter}
                  </div>
                  <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-bpl-blue mb-2">{v.word}</div>
                  <p className="text-[14px] text-bpl-body leading-relaxed">{v.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery strip ── */}
      <section className="px-8 md:px-14 xl:px-20 pb-24" style={{ background: '#040C18' }}>
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>In the Field</SectionLabel>
            <h2 className="font-display font-bold text-white text-[24px] tracking-tight mb-8 mt-2">
              BPL at work across Nigeria
            </h2>
          </RevealWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
            { f: 'gallery-02.jpg' }, { f: 'gallery-03.jpg' }, { f: 'gallery-04.jpg' }, { f: 'gallery-05.jpg' },
            { f: 'gallery-06.jpg' }, { f: 'gallery-07.jpg' }, { f: 'gallery-08.jpg' }, { f: 'gallery-10.jpeg' },
          ].map(({ f }, i) => (
              <RevealWrapper key={f} delay={i * 0.05}>
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={`/images/gallery/${f}`}
                    alt="BPL field operations"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,13,26,0.5) 0%, transparent 60%)' }} />
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="px-8 md:px-14 xl:px-20 py-24 md:py-32"
        style={{ background: 'linear-gradient(180deg, #040C18 0%, #071526 100%)' }}
      >
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>Our Team</SectionLabel>
            <h2
              className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.1] mt-3 mb-14"
              style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
            >
              The people behind BPL
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ABOUT.team.map((member, i) => (
              <RevealWrapper key={member.name} delay={i * 0.1}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Photo */}
                  <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(7,21,38,0.7) 0%, transparent 55%)' }}
                    />
                  </div>
                  {/* Info */}
                  <div className="px-6 py-5">
                    <div className="text-[16px] font-semibold text-white leading-snug mb-1">{member.name}</div>
                    <div className="text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'rgba(51,153,224,0.7)' }}>
                      {member.role}
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section
        className="px-8 md:px-14 xl:px-20 pb-24 pt-0"
        style={{ background: '#071526' }}
      >
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>Recognition</SectionLabel>
            <h2
              className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.1] mt-3 mb-10"
              style={{ fontSize: 'clamp(24px, 2.5vw, 36px)' }}
            >
              Awards &amp; industry recognition
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ABOUT.awards.map((award, i) => (
              <RevealWrapper key={award.year + award.title} delay={i * 0.12}>
                <div
                  className="rounded-2xl p-7 flex gap-6 items-start"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="font-display font-extrabold text-[32px] leading-none tracking-[-0.04em] flex-shrink-0 pt-0.5"
                    style={{ color: 'rgba(0,153,224,0.45)' }}
                  >
                    {award.year}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-white mb-1.5">{award.title}</div>
                    <div className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{award.body}</div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
