'use client'
import { useRef, MouseEvent, ReactNode } from 'react'

interface Props { children: ReactNode; className?: string; maxTilt?: number }

export function TiltCard({ children, className, maxTilt = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    ref.current.style.transform = `perspective(600px) rotateY(${x * maxTilt}deg) rotateX(${-y * (maxTilt * 0.7)}deg) translateZ(4px)`
    ref.current.style.transition = 'transform 0.1s ease-out'
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    ref.current.style.transition = 'transform 0.5s ease'
  }
  return <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
}
