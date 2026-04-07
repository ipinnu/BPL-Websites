import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/content'

export const metadata = {
  title: 'Careers — Best Practices Limited',
  description: 'Join Nigeria\'s leading fleet management company. Build your career at Best Practices Limited.',
}

export default function CareersPage() {
  return (
    <div className="bg-white">
      <section className="bg-bpl-navy px-14 py-[96px]">
        <div className="max-w-site mx-auto">
          <SectionLabel light>Careers</SectionLabel>
          <h1 className="font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mt-3">
            Build Nigeria&apos;s fleet future with us
          </h1>
          <p className="text-[16px] text-white/60 mt-5 max-w-[520px]">
            We&apos;re growing. If you&apos;re passionate about technology, logistics, and making Nigeria&apos;s roads safer, we want to hear from you.
          </p>
        </div>
      </section>

      <section className="px-14 py-[96px]">
        <div className="max-w-site mx-auto max-w-[720px]">
          <RevealWrapper>
            <h2 className="font-display text-[30px] font-bold text-bpl-navy mb-5">Why BPL?</h2>
            <div className="grid grid-cols-2 gap-5 mb-12">
              {[
                { title: '20+ Years of Leadership', body: 'Join a company that has been shaping Nigerian fleet management since 2001.' },
                { title: 'Enterprise Clients', body: 'Work with Shell, TotalEnergies, DHL, and Nigeria\'s top enterprises.' },
                { title: 'Cutting-Edge Technology', body: 'Powered by MiX by Powerfleet — world-class telematics and fleet SaaS.' },
                { title: 'Make an Impact', body: 'Help reduce road accidents and improve safety for thousands of drivers.' },
              ].map((item) => (
                <div key={item.title} className="bg-bpl-off-white border border-bpl-light-gray rounded-xl p-6">
                  <h3 className="font-display text-[16px] font-semibold text-bpl-navy mb-2">{item.title}</h3>
                  <p className="text-[13.5px] text-bpl-body leading-[1.6]">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="bg-bpl-blue-pale border border-bpl-blue/20 rounded-xl p-8 text-center">
              <h3 className="font-display text-[22px] font-bold text-bpl-navy mb-3">Ready to apply?</h3>
              <p className="text-[14.5px] text-bpl-body mb-6">
                Send your CV and cover letter to{' '}
                <a href={`mailto:${SITE.email}`} className="text-bpl-blue font-semibold hover:underline">{SITE.email}</a>
              </p>
              <Button href={`mailto:${SITE.email}`} variant="primary">Send Application</Button>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </div>
  )
}
