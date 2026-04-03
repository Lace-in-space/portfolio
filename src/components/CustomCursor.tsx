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
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Solid dot — grayscale via mix-blend-mode: difference + gray base */}
      <div
        className="absolute w-3 h-3 rounded-full"
        style={{
          backgroundColor: 'rgb(128, 128, 128)',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
