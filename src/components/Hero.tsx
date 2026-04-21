'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollYRef = useRef(0)
  const listenersRef = useRef<Set<() => void>>(new Set())

  const getSnapshot = () => scrollYRef.current
  const getServerSnapshot = () => 0
  const subscribe = (listener: () => void) => {
    listenersRef.current.add(listener)
    return () => listenersRef.current.delete(listener)
  }

  const scrollY = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
      listenersRef.current.forEach(l => l())
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const blurValue = Math.min(scrollY / 20, 15)
  const opacityValue = Math.max(1 - scrollY / 600, 0)
  const scaleValue = 1 + scrollY / 2000

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: 'none' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/hero-video.mp4"
        />
        
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
          }}
        />
      </div>

      

    </section>
  )
}
