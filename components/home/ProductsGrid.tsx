import Image from 'next/image'
import Link from 'next/link'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PRODUCTS } from '@/lib/content'

export function ProductsGrid() {
  return (
    <section className="bg-bpl-off-white py-20 md:py-28">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <RevealWrapper className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <SectionLabel>Our Products</SectionLabel>
            <h2 className="font-display font-bold text-bpl-navy text-[32px] md:text-[38px] tracking-tight leading-[1.15] mt-2">
              Technology that moves Nigeria
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[13.5px] font-semibold text-bpl-blue hover:underline flex-shrink-0"
          >
            View all products →
          </Link>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <RevealWrapper key={product.slug} delay={i * 0.06}>
              <Link
                href="/contact"
                className="group block bg-white rounded-2xl overflow-hidden border border-bpl-light-gray hover:border-bpl-blue/30 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] transition-all duration-250"
              >
                {/* Image */}
                <div className="relative h-48 bg-bpl-navy overflow-hidden">
                  <Image
                    src={`/images/products/${product.slug}.jpg`}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 text-[10.5px] font-semibold tracking-[0.08em] uppercase text-white bg-bpl-navy-mid/90 border border-white/10 px-2.5 py-1 rounded-md">
                    {product.tag}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-bpl-navy text-[15px] mb-2 group-hover:text-bpl-blue transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[13px] text-bpl-body leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 text-[12.5px] font-semibold text-bpl-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    Enquire now →
                  </div>
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
