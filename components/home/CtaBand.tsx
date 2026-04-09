import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SITE } from '@/lib/content'

export function CtaBand() {
  return (
    <section className="bg-bpl-blue py-20 md:py-24">
      <div className="max-w-site mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          <RevealWrapper className="max-w-xl">
            <h2 className="font-display font-bold text-white text-[28px] md:text-[36px] tracking-tight leading-[1.2] mb-3">
              Ready to transform your fleet operations?
            </h2>
            <p className="text-[15px] text-white/70">
              Talk to Nigeria&rsquo;s leading fleet management specialists today.
            </p>
          </RevealWrapper>

          <RevealWrapper delay={0.15} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
            <Button href="/contact" variant="white">
              Get a Free Quote
            </Button>
            <Button href="/solutions" variant="outline-white">
              Explore Solutions
            </Button>
          </RevealWrapper>
        </div>

        {/* Contact row */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row gap-6">
          <a href={`tel:${SITE.phone1}`} className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            {SITE.phone1}
          </a>
          <a href={`mailto:${SITE.email}`} className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" />
            </svg>
            {SITE.email}
          </a>
          <span className="text-[13px] text-white/40 sm:ml-auto">{SITE.address}</span>
        </div>
      </div>
    </section>
  )
}
