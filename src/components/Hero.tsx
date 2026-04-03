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
        style={{
          transform: `scale(${scaleValue}) translateY(${scrollY * 0.3}px)`,
          filter: `blur(${blurValue}px)`,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
          }}
        />
      </div>

      {/* Overlay grain */}
      <div className="absolute inset-0 z-[1] opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div
        className="relative z-10 text-center px-4"
        style={{ opacity: opacityValue }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter leading-none mb-4">
            LASSE
            <br />
            MÜLLER
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-white/60 tracking-widest uppercase mt-6"
        >
          {t('Kreativ Direktor & Designer', 'Creative Director & Designer')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </div>
          <span className="text-white/30 text-xs tracking-widest uppercase">
            {t('Scrollen', 'Scroll')}
          </span>
        </motion.div>
      </div>

      {/* Red accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-[#E31E24] origin-left"
      />
    </section>
  )
}
