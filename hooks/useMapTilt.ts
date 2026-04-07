import { useRef, useCallback } from 'react'

export function useMapTilt() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
    const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
    wrapperRef.current.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 8}deg) scale(1.02)`
    wrapperRef.current.style.transition = 'transform 0.1s ease-out'
  }, [])
  const onMouseLeave = useCallback(() => {
    if (!wrapperRef.current) return
    wrapperRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    wrapperRef.current.style.transition = 'transform 0.6s ease'
  }, [])
  return { wrapperRef, onMouseMove, onMouseLeave }
}
