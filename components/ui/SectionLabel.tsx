interface Props {
  children: string
  light?: boolean
}

export function SectionLabel({ children, light = false }: Props) {
  return (
    <div className={`inline-flex items-center gap-2 mb-3 text-[11px] font-bold tracking-[0.12em] uppercase ${light ? 'text-bpl-blue-light' : 'text-bpl-blue'}`}>
      <span className={`w-4 h-[2px] rounded-full ${light ? 'bg-bpl-blue-light' : 'bg-bpl-blue'}`} />
      {children}
    </div>
  )
}
