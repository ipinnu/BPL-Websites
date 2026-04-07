'use client'
import { CLIENTS_TRACK_1, CLIENTS_TRACK_2 } from '@/lib/content'
import type { Client } from '@/lib/types'

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex items-center gap-3 px-7 py-[14px] bg-bpl-off-white border-[1.5px] border-bpl-light-gray rounded-[10px] whitespace-nowrap group hover:border-bpl-blue hover:bg-bpl-blue-pale hover:-translate-y-[3px] hover:shadow-[0_6px_18px_rgba(0,120,212,0.10)] transition-all duration-200 cursor-default">
      <span
        className="w-8 h-8 rounded-[6px] flex items-center justify-center text-[11px] font-extrabold flex-shrink-0"
        style={{
          backgroundColor: client.color,
          color: client.textColor ?? '#fff',
        }}
      >
        {client.initials}
      </span>
      <span className="text-[13px] font-medium text-bpl-body group-hover:text-bpl-blue transition-colors">
        {client.name}
      </span>
    </div>
  )
}

function Track({ clients, direction }: { clients: Client[]; direction: 'left' | 'right' }) {
  const doubled = [...clients, ...clients]
  const anim = direction === 'left'
    ? 'slide-left 28s linear infinite'
    : 'slide-right 32s linear infinite'

  return (
    <div
      className="flex gap-5 w-max"
      style={{ animation: anim }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
    >
      {doubled.map((client, i) => (
        <ClientCard key={`${client.name}-${i}`} client={client} />
      ))}
    </div>
  )
}

export function ClientsCarousel() {
  return (
    <section className="bg-white py-[72px] overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-bpl-mid-gray">
          Trusted by Nigeria&apos;s most demanding enterprise fleets
        </p>
      </div>

      <div className="space-y-5">
        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
          }}
        >
          <Track clients={CLIENTS_TRACK_1} direction="left" />
        </div>

        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
          }}
        >
          <Track clients={CLIENTS_TRACK_2} direction="right" />
        </div>
      </div>
    </section>
  )
}
