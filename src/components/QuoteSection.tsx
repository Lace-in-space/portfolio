'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrambleText from './ScrambleText'

const words = [
  { de: 'GEFALLEN', en: 'FALLEN' },
  { de: 'LERNEN', en: 'LEARN' },
  { de: 'AUFSTEHEN', en: 'RISE' },
  { de: 'WIEDERHOLEN', en: 'REPEAT' },
]

function AnimatedWord({ text, index }: { text: string; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px -20% 0px' })

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <div className="flex">
        {text.split('').map((char, charIndex) => (
          <motion.span
            key={charIndex}
            initial={{ y: '120%', opacity: 0, rotateX: -80 }}
            animate={isInView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: charIndex * 0.04 + index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter"
            style={{
              color: index % 2 === 0 ? '#0a0a0a' : '#E31E24',
              perspective: '500px',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default function QuoteSection() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rotation = useTransform(scrollYProgress, [0.1, 0.9], [0, 360])

  return (
    <section ref={sectionRef} className="bg-white py-32 md:py-48 px-6 md:px-12 relative overflow-hidden">
      {/* Yin-yang rotation element */}
      <motion.div
        style={{ rotate: rotation }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-[0.03] pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="100" fill="#0a0a0a" />
          <circle cx="100" cy="50" r="50" fill="white" />
          <circle cx="100" cy="150" r="50" fill="#0a0a0a" />
          <circle cx="100" cy="50" r="15" fill="#0a0a0a" />
          <circle cx="100" cy="150" r="15" fill="white" />
        </svg>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="text-sm tracking-widest uppercase text-[#0a0a0a]/40 mb-4 block">
            {t('Philosophie', 'Philosophy')}
          </span>
        </motion.div>

        <div className="flex flex-col gap-2 md:gap-4">
          {words.map((word, index) => (
            <AnimatedWord
              key={index}
              text={lang === 'de' ? word.de : word.en}
              index={index}
            />
          ))}
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 h-px bg-[#0a0a0a] origin-left"
        />
      </div>
    </section>
  )
}
