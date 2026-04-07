import { Button } from '@/components/ui/Button'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export function CtaBand() {
  return (
    <section className="bg-bpl-blue px-20 py-20 flex items-center justify-between gap-10 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.05] pointer-events-none" />
      <div className="absolute right-[80px] top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-white/[0.04] pointer-events-none" />

      <RevealWrapper className="relative z-10">
        <h2 className="font-display text-[32px] font-bold text-white tracking-[-0.02em] mb-2">
          Ready to transform your fleet operations?
        </h2>
        <p className="text-[15px] text-white/70">
          Talk to Nigeria&apos;s leading fleet management specialists today.
        </p>
      </RevealWrapper>

      <RevealWrapper delay={0.2} className="flex items-center gap-3 flex-shrink-0 relative z-10">
        <Button href="/contact" variant="white">Get a Quote</Button>
        <Button href="/solutions" variant="outline-white">Explore Solutions</Button>
      </RevealWrapper>
    </section>
  )
}
