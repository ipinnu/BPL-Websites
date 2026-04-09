'use client'
import Image from 'next/image'
import { CLIENTS_TRACK_1, CLIENTS_TRACK_2 } from '@/lib/content'
import type { Client } from '@/lib/types'

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white border border-bpl-light-gray rounded-xl whitespace-nowrap flex-shrink-0 hover:border-bpl-blue/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[140px]">
      {client.logo ? (
        <div className="h-7 w-20 relative flex-shrink-0">
          <Image
            src={client.logo}
            alt={client.name}
            fill
            className="object-contain object-left"
            sizes="80px"
          />
        </div>
      ) : (
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[10.5px] font-bold flex-shrink-0"
          style={{ backgroundColor: client.color, color: client.textColor ?? '#fff' }}
        >
          {client.initials}
        </span>
      )}
      <span className="text-[13px] font-medium text-bpl-body">{client.name}</span>
    </div>
  )
}

function Track({ clients, direction }: { clients: Client[]; direction: 'left' | 'right' }) {
  const doubled = [...clients, ...clients]
  return (
    <div
      className="flex gap-3 w-max"
      style={{ animation: `${direction === 'left' ? 'slide-left' : 'slide-right'} ${direction === 'left' ? 28 : 34}s linear infinite` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
    >
      {doubled.map((c, i) => <ClientCard key={`${c.name}-${i}`} client={c} />)}
    </div>
  )
}

export function ClientsCarousel() {
  return (
    <section className="bg-white py-14 overflow-hidden">
      <div className="text-center mb-8 px-6">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-mid-gray">
          Trusted by 150+ enterprise clients across every major industry
        </p>
      </div>

      <div className="space-y-3">
        {([
          { clients: CLIENTS_TRACK_1, direction: 'left' as const },
          { clients: CLIENTS_TRACK_2, direction: 'right' as const },
        ]).map(({ clients, direction }, i) => (
          <div
            key={i}
            className="overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <Track clients={clients} direction={direction} />
          </div>
        ))}
      </div>
    </section>
  )
}
