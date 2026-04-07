'use client'
import { TICKER_ITEMS } from '@/lib/content'

const pipColor: Record<string, string> = {
  blue:  'bg-bpl-blue-light',
  green: 'bg-green-400',
  red:   'bg-bpl-red',
}

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="bg-bpl-navy py-[11px] overflow-hidden">
      <div
        className="flex w-max"
        style={{ animation: 'slide-left 38s linear infinite' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-11 text-[11.5px] font-medium tracking-[0.07em] uppercase text-white/45"
          >
            <span className={`w-1 h-1 rounded-full flex-shrink-0 ${pipColor[item.color]}`} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
