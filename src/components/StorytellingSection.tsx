'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StorytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black">
      {/* Background Video at 80% opacity */}
      <div className="absolute inset-0 z-0 opacity-70">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/storytelling-video.mp4"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16 md:pt-24 px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
            {t('Storytelling', 'Storytelling')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            {t(
              'Hier kommt dein Text über Storytelling rein. Beschreibe, was Storytelling für dich bedeutet und wie du es in deinen Projekten einsetzt.',
              'Your storytelling text goes here. Describe what storytelling means to you and how you use it in your projects.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  )
}