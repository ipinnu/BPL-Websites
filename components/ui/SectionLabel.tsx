interface Props {
  children: string
  light?: boolean
}

export function SectionLabel({ children, light = false }: Props) {
  return (
    <div className={`inline-flex items-center gap-2.5 mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase ${light ? 'text-bpl-blue-light' : 'text-bpl-blue'}`}>
      <span className={`w-[18px] h-[2px] rounded-full ${light ? 'bg-bpl-blue-light' : 'bg-bpl-blue'}`} />
      {children}
    </div>
  )
}
