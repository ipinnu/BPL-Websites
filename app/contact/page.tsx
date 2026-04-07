import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { ContactForm } from '@/components/home/ContactForm'
import { SITE } from '@/lib/content'

export const metadata = {
  title: 'Contact — Best Practices Limited',
  description: 'Get in touch with Best Practices Limited for fleet management solutions in Nigeria.',
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <SectionLabel light>Contact Us</SectionLabel>
          <h1 className="font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mt-3">
            Let&apos;s talk fleet
          </h1>
          <p className="text-[16px] text-white/60 mt-5 max-w-[520px]">
            Ready to optimise your fleet? Our specialists are standing by.
          </p>
        </div>
      </section>

      <section className="px-14 py-[96px]">
        <div className="max-w-site mx-auto grid grid-cols-2 gap-16">
          {/* Contact info */}
          <RevealWrapper>
            <h2 className="font-display text-[28px] font-bold text-bpl-navy mb-8">Get in touch</h2>
            <div className="space-y-6">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-bpl-blue mb-1.5">Office</div>
                <p className="text-[14.5px] text-bpl-body leading-[1.7]">{SITE.address}</p>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-bpl-blue mb-1.5">Email</div>
                <a href={`mailto:${SITE.email}`} className="text-[14.5px] text-bpl-body hover:text-bpl-blue transition-colors">
                  {SITE.email}
                </a>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-bpl-blue mb-1.5">Phone</div>
                <div className="space-y-1">
                  <a href={`tel:${SITE.phone1}`} className="block text-[14.5px] text-bpl-body hover:text-bpl-blue transition-colors">
                    {SITE.phone1}
                  </a>
                  <a href={`tel:${SITE.phone2}`} className="block text-[14.5px] text-bpl-body hover:text-bpl-blue transition-colors">
                    {SITE.phone2}
                  </a>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-bpl-blue mb-1.5">Social</div>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-[14.5px] text-bpl-body hover:text-bpl-blue transition-colors">
                  Facebook — FleetMgtLimited
                </a>
              </div>
            </div>
          </RevealWrapper>

          {/* Contact form */}
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
