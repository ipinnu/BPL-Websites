'use client'
import { useState } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { TESTIMONIALS } from '@/lib/content'

export function Testimonial() {
  const [hovered, setHovered] = useState(false)
  const t = TESTIMONIALS[0]

  return (
    <section
      className="bg-bpl-navy"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-site mx-auto grid grid-cols-[1fr_2fr] gap-20 items-center px-20 py-24">
        {/* Giant quote mark */}
        <RevealWrapper direction="left">
          <div
            className="font-display text-[130px] font-extrabold leading-none select-none transition-colors duration-500"
            style={{ color: hovered ? 'rgba(51,153,224,0.30)' : 'rgba(51,153,224,0.18)' }}
          >
            &ldquo;
          </div>
        </RevealWrapper>

        {/* Quote */}
        <RevealWrapper delay={0.15}>
          <blockquote className="text-[22px] font-light italic text-white/88 leading-[1.68] mb-7">
            {t.quote}
          </blockquote>
          <div>
            <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-bpl-blue-light mb-1">
              — {t.name}
            </div>
            <div className="text-[13px] text-white/50">{t.role}</div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
