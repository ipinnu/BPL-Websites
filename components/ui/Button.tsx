import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'white' | 'outline-white'

interface Props {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  onClick?: () => void
}

const variants: Record<Variant, string> = {
  primary:        'bg-bpl-blue text-white hover:bg-bpl-blue-light hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,120,212,0.3)]',
  outline:        'bg-transparent text-bpl-navy border-[1.5px] border-[#CBD5E1] hover:border-bpl-blue hover:text-bpl-blue hover:bg-bpl-blue-pale hover:-translate-y-px',
  white:          'bg-white text-bpl-blue font-bold hover:bg-bpl-off-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]',
  'outline-white':'bg-transparent text-white border-2 border-white/35 hover:border-white hover:bg-white/[0.08] hover:-translate-y-px',
}

export function Button({ children, href, variant = 'primary', className, onClick }: Props) {
  const cls = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-[180ms] cursor-pointer',
    variants[variant], className
  )
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls} onClick={onClick}>{children}</button>
}
