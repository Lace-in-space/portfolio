'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface StatItem {
  value: number
  suffix: string
  labelDe: string
  labelEn: string
}

const stats: StatItem[] = [
  { value: 20, suffix: '+', labelDe: 'Projekte', labelEn: 'Projects' },
  { value: 100, suffix: '%', labelDe: 'Ambition', labelEn: 'Ambition' },
  { value: 6, suffix: '', labelDe: 'Semester', labelEn: 'Semesters' },
]

function AnimatedCounter({ value, suffix, labelDe, labelEn, index }: { value: number; suffix: string; labelDe: string; labelEn: string; index: number }) {
  const { lang } = useLanguage()
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * value)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  const label = lang === 'de' ? labelDe : labelEn

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter">
        {count}
        <span className="text-[#E31E24]">{suffix}</span>
      </div>
      <div className="text-lg md:text-xl text-white/40 mt-2 tracking-widest uppercase">
        {label}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const blurOut = useTransform(scrollYProgress, [0.7, 1], [0, 10])

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-32 md:py-48 px-6 md:px-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(255,255,255,0.03) 50px,
              rgba(255,255,255,0.03) 51px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              rgba(255,255,255,0.03) 50px,
              rgba(255,255,255,0.03) 51px
            )`,
          }}
        />
      </div>

      <motion.div
        style={{ filter: blurOut }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
            {t('Zahlen & Fakten', 'Numbers & Facts')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={stat.labelEn}
              value={stat.value}
              suffix={stat.suffix}
              labelDe={stat.labelDe}
              labelEn={stat.labelEn}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Red line accents */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#E31E24]" />
      <div className="absolute top-0 right-0 w-1 h-full bg-[#E31E24]" />
    </section>
  )
}
