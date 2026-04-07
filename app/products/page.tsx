import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { Button } from '@/components/ui/Button'
import { PRODUCTS } from '@/lib/content'

export const metadata = {
  title: 'Products — Best Practices Limited',
  description: 'MiX by Powerfleet hardware, speed limiters, fuel monitoring, and telematics products.',
}

export default function ProductsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <SectionLabel light>Our Products</SectionLabel>
          <h1 className="font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mt-3">
            Technology that moves Nigeria
          </h1>
          <p className="text-[16px] text-white/60 mt-5 max-w-[520px]">
            Hardware and software built for real-world conditions — from Lagos to Kano and everywhere in between.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="px-14 py-[96px] bg-bpl-off-white">
        <div className="max-w-site mx-auto grid grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <RevealWrapper key={product.slug} delay={i * 0.07}>
              <div id={product.slug} className="bg-white border border-bpl-light-gray rounded-xl overflow-hidden group hover:border-bpl-blue hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,120,212,0.10)] transition-all duration-300">
                <div className="h-[200px] relative overflow-hidden bg-bpl-navy-mid">
                  <Image
                    src={`/images/products/${product.slug}.jpg`}
                    alt={product.name}
                    fill
                    className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.1em] uppercase text-white bg-bpl-blue/85 px-2.5 py-1 rounded backdrop-blur-sm">
                    {product.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[17px] font-semibold text-bpl-navy mb-2">{product.name}</h3>
                  <p className="text-[13.5px] text-bpl-body leading-[1.65] mb-5">{product.description}</p>
                  <Button href="/contact" variant="outline" className="text-xs py-2 px-4">Enquire now →</Button>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </section>
    </div>
  )
}
