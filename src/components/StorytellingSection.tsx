'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrambleText from './ScrambleText'

export default function StorytellingSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const frameScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 0.5, 1, 1])
  const frameBorderRadius = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [16, 16, 0, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -100])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="relative" style={{ height: '450vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
        {/* Expanding video frame */}
        <motion.div
          style={{ scale: frameScale, borderRadius: frameBorderRadius }}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
        >
          {/* Placeholder for video content - gradient animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(45deg, #0a0a0a, #1a1a2e, #E31E24, #0a0a0a)',
                  backgroundSize: '400% 400%',
                  animation: 'gradientShift 8s ease infinite',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white/60 border-b-[12px] border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text overlay that fades */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 text-center px-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter">
            {inView ? (
              <ScrambleText
                text={t('Geschichte erzählen', 'Telling Stories')}
                trigger={true}
                speed={25}
              />
            ) : (
              t('Geschichte erzählen', 'Telling Stories')
            )}
          </h2>
          <p className="mt-4 text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            {t(
              'Jedes Projekt hat eine Geschichte. Ich helfe, sie zu erzählen.',
              'Every project has a story. I help tell it.'
            )}
          </p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: textOpacity }}
        >
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#E31E24] rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
