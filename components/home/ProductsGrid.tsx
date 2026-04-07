'use client'
import Image from 'next/image'
import { TiltCard } from '@/components/ui/TiltCard'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PRODUCTS } from '@/lib/content'
import Link from 'next/link'

// DROP YOUR 4K PRODUCT IMAGES HERE:
// public/images/products/mix-vision.jpg     → MiX Vision dashcam/truck
// public/images/products/mix-rovi.jpg       → in-cab display tablet
// public/images/products/fuel-monitor.jpg   → tanker / fuel system
// public/images/products/mix4000.jpg        → GPS hardware device
// public/images/products/speed-limiter.jpg  → speed limiter device / truck cab
// public/images/products/axle-sensor.jpg    → truck axle / wheels
// Recommended: 1200×630px minimum, 16:9, compressed JPG

function ProductPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-bpl-navy-mid">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={0.3}>
        <rect x="4" y="18" width="44" height="24" rx="4" stroke="white" strokeWidth="2"/>
        <circle cx="14" cy="42" r="5" stroke="white" strokeWidth="2"/>
        <circle cx="38" cy="42" r="5" stroke="white" strokeWidth="2"/>
        <path d="M4 30h8M32 22l4-8h8l4 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function ProductsGrid() {
  return (
    <section className="bg-bpl-off-white px-14 py-[96px]">
      <div className="max-w-site mx-auto">
        <RevealWrapper className="text-center mb-12">
          <SectionLabel>Our Products</SectionLabel>
          <h2 className="font-display text-[38px] font-bold text-bpl-navy tracking-[-0.025em] leading-[1.15]">
            Technology that moves Nigeria
          </h2>
          <p className="text-[15px] text-bpl-body mt-3 max-w-[500px] mx-auto">
            Hardware and software solutions for real-time fleet intelligence and safety.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <RevealWrapper key={product.slug} delay={i * 0.08}>
              <TiltCard className="bg-white border border-bpl-light-gray rounded-xl overflow-hidden group hover:border-bpl-blue hover:-translate-y-[5px] hover:shadow-[0_12px_36px_rgba(0,120,212,0.10)] transition-all duration-300">
                {/* Image area */}
                <div className="h-[180px] relative overflow-hidden bg-bpl-navy-mid">
                  <Image
                    src={`/images/products/${product.slug}.jpg`}
                    alt={product.name}
                    fill
                    className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Hide broken image
                      const target = e.currentTarget as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <ProductPlaceholder />
                  {/* Tag overlay */}
                  <div className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.1em] uppercase text-white bg-bpl-blue/85 px-2.5 py-1 rounded backdrop-blur-sm z-10">
                    {product.tag}
                  </div>
                </div>

                {/* Body */}
                <div className="p-[22px]">
                  <h3 className="font-display text-[15px] font-semibold text-bpl-navy mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-[13px] text-bpl-body leading-[1.6]">
                    {product.description}
                  </p>
                  {/* Enquire now — reveal on hover */}
                  <div className="overflow-hidden h-0 group-hover:h-7 transition-all duration-200 mt-1">
                    <Link
                      href="/contact"
                      className="text-[12.5px] font-semibold text-bpl-blue flex items-center gap-1 mt-2"
                    >
                      Enquire now →
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
