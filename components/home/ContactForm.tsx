'use client'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export function ContactForm() {
  return (
    <RevealWrapper delay={0.15}>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-bpl-navy mb-1.5 tracking-[0.04em]">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-bpl-light-gray text-[14px] text-bpl-navy focus:outline-none focus:border-bpl-blue focus:ring-2 focus:ring-bpl-blue/10 transition-all"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-bpl-navy mb-1.5 tracking-[0.04em]">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-bpl-light-gray text-[14px] text-bpl-navy focus:outline-none focus:border-bpl-blue focus:ring-2 focus:ring-bpl-blue/10 transition-all"
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-bpl-navy mb-1.5 tracking-[0.04em]">Company</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-bpl-light-gray text-[14px] text-bpl-navy focus:outline-none focus:border-bpl-blue focus:ring-2 focus:ring-bpl-blue/10 transition-all"
            placeholder="Your Company Ltd"
          />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-bpl-navy mb-1.5 tracking-[0.04em]">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-bpl-light-gray text-[14px] text-bpl-navy focus:outline-none focus:border-bpl-blue focus:ring-2 focus:ring-bpl-blue/10 transition-all"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-bpl-navy mb-1.5 tracking-[0.04em]">Fleet Size</label>
          <select className="w-full px-4 py-3 rounded-lg border border-bpl-light-gray text-[14px] text-bpl-body focus:outline-none focus:border-bpl-blue focus:ring-2 focus:ring-bpl-blue/10 transition-all bg-white">
            <option>Select fleet size</option>
            <option>1–10 vehicles</option>
            <option>11–50 vehicles</option>
            <option>51–200 vehicles</option>
            <option>200+ vehicles</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-bpl-navy mb-1.5 tracking-[0.04em]">Message</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-bpl-light-gray text-[14px] text-bpl-navy focus:outline-none focus:border-bpl-blue focus:ring-2 focus:ring-bpl-blue/10 transition-all resize-none"
            placeholder="Tell us about your fleet management needs..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-bpl-blue text-white font-semibold py-3.5 rounded-lg hover:bg-bpl-blue-light hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,120,212,0.3)] transition-all duration-[180ms]"
        >
          Send Message →
        </button>
      </form>
    </RevealWrapper>
  )
}
