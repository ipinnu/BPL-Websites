import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'white' | 'outline-white' | 'ghost'

interface Props {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  onClick?: () => void
}

const variants: Record<Variant, string> = {
  primary:        'bg-bpl-blue text-white hover:bg-[#005BB5] hover:-translate-y-px hover:shadow-lg',
  outline:        'bg-transparent text-bpl-navy border border-bpl-light-gray hover:border-bpl-blue hover:text-bpl-blue hover:bg-bpl-blue-pale',
  white:          'bg-white text-bpl-blue font-bold hover:bg-bpl-off-white hover:-translate-y-px hover:shadow-md',
  'outline-white':'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10',
  ghost:          'bg-white/[0.06] text-white/80 border border-white/12 hover:bg-white/10 hover:text-white hover:border-white/25',
}

export function Button({ children, href, variant = 'primary', className, onClick }: Props) {
  const cls = cn(
    'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-150 cursor-pointer',
    variants[variant], className
  )
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls} onClick={onClick}>{children}</button>
}
