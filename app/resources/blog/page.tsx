'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CtaBand } from '@/components/home/CtaBand'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})


const POSTS = [
  {
    slug:     'why-dashcams-are-essential',
    category: 'Fleet Safety',
    date:     'June 26, 2025',
    title:    'Why Dashcams Are Essential for Modern Fleet Management',
    excerpt:  'Managing a fleet comes with many moving parts. Between monitoring driver behaviour, handling claims, and maintaining road safety, dashcams have evolved from simple recorders into strategic AI-powered tools that enable proactive intervention — before dangerous situations escalate.',
    featured: true,
  },
  {
    slug:     'smart-fleet-telematics-features',
    category: 'Technology',
    date:     'April 22, 2026',
    title:    'Smart Fleet Management: Top Telematics Features You Shouldn\'t Ignore',
    excerpt:  'Fleet telematics is no longer a luxury — it\'s a necessity. From real-time GPS tracking and fuel monitoring to AI dashcams and predictive maintenance, the right system transforms your fleet into a safer, more cost-efficient operation.',
  },
  {
    slug:     'why-asset-protection-matters',
    category: 'Operations',
    date:     'April 22, 2026',
    title:    'Why Asset Protection Is Essential for Operational Efficiency',
    excerpt:  'Asset protection extends far beyond theft prevention. Unaddressed vulnerabilities cascade into downtime, unexpected costs, and workflow disruptions. Modern AI-powered monitoring and geofencing change the equation entirely.',
  },
  {
    slug:     'hours-of-service-fleet-compliance',
    category: 'Compliance',
    date:     'April 22, 2026',
    title:    'Understanding Hours of Service: Why It\'s Essential for a Safe and Efficient Fleet',
    excerpt:  'Hours of Service regulations exist to reduce fatigue-related incidents on the road. Understanding how to track, manage, and automate HOS compliance is critical for any enterprise fleet operating in today\'s regulatory environment.',
  },
  {
    slug:     'green-fleet-co2-emissions',
    category: 'Sustainability',
    date:     'April 8, 2025',
    title:    'Driving Towards a Greener Future: How Smart Fleet Management Slashes CO₂ Emissions',
    excerpt:  'Transportation is one of the largest contributors to carbon emissions. With the right strategies — real-time fuel monitoring, route optimisation, and driver behaviour analysis — fleet management can shift from environmental challenge to sustainability champion.',
  },
  {
    slug:     'bpl-leading-digital-fleet-nigeria',
    category: 'Company',
    date:     'October 29, 2024',
    title:    'Best Practices Limited: Leading the Way in Digital Fleet Solutions in Nigeria',
    excerpt:  'Since 2001, Best Practices Limited has built Nigeria\'s most comprehensive fleet intelligence offering — GPS tracking, driver training, telematics, and consulting — guided by the THIS principle: Truthfulness, Honesty, Integrity, and Service.',
  },
  {
    slug:     'digital-fleet-solution-transformation',
    category: 'Innovation',
    date:     'April 20, 2023',
    title:    'Digital Fleet Solution: The Tool for Fleet Business Transformation',
    excerpt:  'The shift from manual fleet oversight to fully digital operations isn\'t just an upgrade — it\'s a transformation. Data analytics, integrated platforms, and real-time insights are redefining what enterprise fleet management looks like in Africa.',
  },
]

const featured = POSTS.find(p => p.featured)!
const rest     = POSTS.filter(p => !p.featured)

function CategoryPill({ category }: { category: string }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
      fontFamily: 'var(--font-inter)',
    }}>
      {category}
    </span>
  )
}

function ReadMore({ href }: { href: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 12, fontWeight: 600, color: '#3399E0',
        textDecoration: 'none', letterSpacing: '0.04em',
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#60A5FA' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#3399E0' }}
    >
      Read article
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  )
}

export default function BlogPage() {
  return (
    <div style={{ background: '#040C18' }}>

      {/* ── Hero ── */}
      <section
        className="relative px-8 md:px-14 xl:px-20 py-28 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #040C18 0%, #071526 60%, #040F1E 100%)' }}
      >
        <div className="absolute -top-24 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.13) 0%, transparent 70%)' }} />

        <div className="max-w-site mx-auto relative">
          <motion.div {...fade(0.1)}>
            <SectionLabel light>Insights & Resources</SectionLabel>
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-white mt-3 max-w-[680px]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 62px)' }}
          >
            Fleet intelligence,{' '}
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #0066CC 0%, #3399E0 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>
              straight from the field
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.32)}
            className="text-[16px] leading-[1.78] max-w-[520px] mt-6"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Practical guides, industry insights, and expert perspectives on fleet management, telematics, safety, and sustainability — from the team at BPL.
          </motion.p>
        </div>
      </section>

      {/* ── Featured post ── */}
      <section className="px-8 md:px-14 xl:px-20 py-16" style={{ background: '#040C18' }}>
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <Link
              href={`/resources/blog/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: content */}
                <div className="px-10 py-12 flex flex-col justify-center" style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <div className="flex items-center gap-4 mb-5">
                    <CategoryPill category={featured.category} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>{featured.date}</span>
                  </div>
                  <h2
                    className="font-display font-bold text-white leading-[1.2] tracking-[-0.02em] mb-4 group-hover:text-blue-300 transition-colors duration-200"
                    style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[14.5px] leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480 }}>
                    {featured.excerpt}
                  </p>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 600, color: '#3399E0',
                    letterSpacing: '0.04em',
                  }}>
                    Read article
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </div>

                {/* Right: featured image */}
                <div className="relative hidden lg:block" style={{ minHeight: 320 }}>
                  <Image
                    src="/images/gallery/Dash Cam blog.jpg"
                    alt="Dashcam for fleet management"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(4,12,24,0.35) 0%, transparent 40%)' }} />
                </div>
              </div>
            </Link>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="px-8 md:px-14 xl:px-20 pb-24" style={{ background: '#040C18' }}>
        <div className="max-w-site mx-auto">
          <RevealWrapper>
            <SectionLabel light>All Articles</SectionLabel>
            <h2 className="font-display font-bold text-white text-[24px] tracking-tight mt-2 mb-10">
              More from the BPL blog
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => {
              return (
                <RevealWrapper key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/resources/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(51,153,224,0.25)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                  >
                    <div className="flex flex-col flex-1 p-7">
                      <div className="flex items-center gap-3 mb-4">
                        <CategoryPill category={post.category} />
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)' }}>·</span>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-inter)' }}>{post.date}</span>
                      </div>

                      <h3
                        className="font-display font-bold text-white leading-[1.25] tracking-[-0.02em] mb-3 group-hover:text-blue-300 transition-colors duration-150"
                        style={{ fontSize: 16 }}
                      >
                        {post.title}
                      </h3>

                      <p className="text-[13px] leading-relaxed flex-1 mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {post.excerpt}
                      </p>

                      <ReadMore href={`/resources/blog/${post.slug}`} />
                    </div>
                  </Link>
                </RevealWrapper>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
