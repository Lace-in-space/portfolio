'use client'

import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: position.x - 6,
        top: position.y - 6,
        width: 12,
        height: 12,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        mixBlendMode: 'difference',
        zIndex: 9999,
      }}
    >
      {/* White dot — blended via parent's mix-blend-mode against page content */}
      <div className="w-full h-full rounded-full bg-white" />
    </div>
  )
}
