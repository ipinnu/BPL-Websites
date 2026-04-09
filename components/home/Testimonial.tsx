import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { TESTIMONIALS } from '@/lib/content'

export function Testimonial() {
  const t = TESTIMONIALS[0]
  return (
    <section className="bg-bpl-navy py-20 md:py-28">
      <div className="max-w-[860px] mx-auto px-6 md:px-10 text-center">
        <RevealWrapper>
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="#F59E0B">
                <path d="M9 1.5L11 6.5H16.5L12 9.5L13.5 14.5L9 11.5L4.5 14.5L6 9.5L1.5 6.5H7L9 1.5Z" />
              </svg>
            ))}
          </div>

          <blockquote className="font-display font-light text-[20px] md:text-[26px] text-white/85 leading-[1.6] italic mb-10">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-px bg-white/20 mb-4" />
            <p className="text-[13.5px] font-semibold text-white">{t.name}</p>
            <p className="text-[12.5px] text-white/45">{t.role}</p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
