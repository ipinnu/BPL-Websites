'use client'
import { TICKER_ITEMS } from '@/lib/content'

const pipColor: Record<string, string> = {
  blue:  '#3399E0',
  green: '#22c55e',
  red:   '#CC0000',
}

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="bg-bpl-navy-mid border-y border-white/[0.06] overflow-hidden py-2.5">
      <div
        className="flex w-max"
        style={{ animation: 'slide-left 40s linear infinite' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-10 text-[11px] font-semibold tracking-[0.1em] uppercase text-white/40"
          >
            <span
              className="w-[5px] h-[5px] rounded-full flex-shrink-0"
              style={{ backgroundColor: pipColor[item.color] ?? pipColor.blue }}
            />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
