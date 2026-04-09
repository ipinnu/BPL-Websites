import { SITE } from '@/lib/content'

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-bpl-navy border-b border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 md:px-10">

        {/* Left: contact */}
        <div className="flex items-center gap-4 text-[11px] text-white/35">
          <a
            href={`tel:${SITE.phone1}`}
            className="flex items-center gap-1.5 hover:text-white/65 transition-colors duration-150"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.56 12 19.79 19.79 0 0 1 1.52 3.5 2 2 0 0 1 3.5 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15z" />
            </svg>
            {SITE.phone1}
          </a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <a
            href={`mailto:${SITE.email}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-white/65 transition-colors duration-150"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {SITE.email}
          </a>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-white/20 mr-2 hidden sm:inline">
            Follow
          </span>

          {/* Facebook */}
          <a
            href={SITE.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-[26px] h-[26px] rounded flex items-center justify-center text-white/30 hover:text-white/65 hover:bg-white/[0.07] transition-all duration-150"
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/company/best-practices-limited"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-[26px] h-[26px] rounded flex items-center justify-center text-white/30 hover:text-white/65 hover:bg-white/[0.07] transition-all duration-150"
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* Twitter/X */}
          <a
            href="https://twitter.com/BPLFleet"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="w-[26px] h-[26px] rounded flex items-center justify-center text-white/30 hover:text-white/65 hover:bg-white/[0.07] transition-all duration-150"
          >
            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
