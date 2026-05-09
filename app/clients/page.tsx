import Image from 'next/image'
import { FadeIn } from '@/components/ui/FadeIn'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CtaBand } from '@/components/home/CtaBand'
import { CLIENTS_TRACK_1, CLIENTS_TRACK_2, TESTIMONIALS } from '@/lib/content'

const ALL_CLIENTS = [...CLIENTS_TRACK_1, ...CLIENTS_TRACK_2]

export default function ClientsPage() {
  return (
    <div style={{ background: '#040C18' }}>

      {/* ── Hero ── */}
      <section
        className="relative px-8 md:px-14 xl:px-20 py-28 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #040C18 0%, #071526 60%, #040F1E 100%)' }}
      >
        <div className="absolute -top-24 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.12) 0%, transparent 70%)' }} />

        <div className="max-w-site mx-auto relative">
          <FadeIn delay={0.1}>
            <SectionLabel light>Our Clients</SectionLabel>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mt-3 max-w-[680px]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 62px)' }}
            >
              Trusted by{' '}
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>
                150+ enterprise fleets
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.32}>
            <p
              className="text-[16px] leading-[1.78] max-w-[520px] mt-6"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              From oil majors and FMCG giants to logistics companies — Nigeria&apos;s most demanding fleets run on BPL.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Logo grid ── */}
      <section className="px-8 md:px-14 xl:px-20 py-20" style={{ background: '#040C18' }}>
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>Who We Work With</SectionLabel>
            <h2 className="font-display font-bold text-white text-[24px] tracking-tight mt-2 mb-12">
              Industry leaders who trust BPL
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ALL_CLIENTS.map((client, i) => (
              <RevealWrapper key={client.name} delay={i * 0.05}>
                <div
                  className="client-card group flex flex-col items-center justify-center gap-3 rounded-2xl p-6"
                  style={{ minHeight: 110 }}
                >
                  {client.logo ? (
                    <div style={{ width: '100%', height: 48, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-[13px] font-extrabold flex-shrink-0"
                      style={{ backgroundColor: client.color, color: client.textColor ?? '#fff' }}
                    >
                      {client.initials}
                    </span>
                  )}
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'var(--font-inter)', textAlign: 'center', lineHeight: 1.3,
                  }}>
                    {client.name}
                  </span>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="px-8 md:px-14 xl:px-20 py-20" style={{ background: '#040C18' }}>
        <div className="max-w-[760px] mx-auto">
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 56 }} />
          {TESTIMONIALS.map((t) => (
            <RevealWrapper key={t.name}>
              <blockquote
                className="font-display font-light italic text-white leading-[1.7] mb-8"
                style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: 'rgba(255,255,255,0.85)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3399E0', marginBottom: 4, fontFamily: 'var(--font-inter)' }}>
                — {t.name}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>{t.role}</div>
            </RevealWrapper>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
