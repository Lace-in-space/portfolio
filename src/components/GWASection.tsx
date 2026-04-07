'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const steps = [
  {
    de: '1. Recherche & Konzept',
    en: '1. Research & Concept',
    descriptionDe: 'Umfassende Analyse und strategische Planung',
    descriptionEn: 'Comprehensive analysis and strategic planning',
  },
  {
    de: '2. Design & Prototyping',
    en: '2. Design & Prototyping',
    descriptionDe: 'Visuelle Gestaltung und interaktive Mockups',
    descriptionEn: 'Visual design and interactive mockups',
  },
  {
    de: '3. Umsetzung',
    en: '3. Implementation',
    descriptionDe: 'Pixel-perfekte Realisierung mit moderner Technologie',
    descriptionEn: 'Pixel-perfect realization with modern technology',
  },
  {
    de: '4. Einreichung',
    en: '4. Submission',
    descriptionDe: 'Präsentation und Einreichung bei Wettbewerben',
    descriptionEn: 'Presentation and submission to competitions',
  },
]

const awards = [
  { year: '2022', titleDe: 'GWA Junior Award', titleEn: 'GWA Junior Award', categoryDe: 'Kommunikationsdesign', categoryEn: 'Communication Design', medal: '🥇' },
  { year: '2022', titleDe: 'ADC Nachwuchs', titleEn: 'ADC Newcomer', categoryDe: 'Digital Design', categoryEn: 'Digital Design', medal: '🥈' },
  { year: '2021', titleDe: 'Designpreis', titleEn: 'Design Award', categoryDe: 'Kategorie Print', categoryEn: 'Print Category', medal: '🏅' },
]

export default function GWASection() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const trophyY = useTransform(scrollYProgress, [0.1, 0.5], [50, 0])
  const trophyScale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1])

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tighter">
            {t('GWA & Auszeichnungen', 'GWA & Awards')}
          </h2>
        </motion.div>

        {/* Trophy placeholder */}
        <div className="flex justify-center mb-16 md:mb-24">
          <motion.div
            style={{ y: trophyY, scale: trophyScale }}
            className="text-center"
          >
            <motion.div
              animate={{ rotateY: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl md:text-8xl mb-4"
            >
              🏆
            </motion.div>
            <p className="text-[#0a0a0a]/40 text-sm">{t('Preisgekröntes Design', 'Award-winning design')}</p>
          </motion.div>
        </div>

        {/* Awards list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {awards.map((award, index) => {
            const title = lang === 'de' ? award.titleDe : award.titleEn
            const category = lang === 'de' ? award.categoryDe : award.categoryEn

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="p-6 border border-[#0a0a0a]/10 hover:border-[#5bffc2] transition-colors duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{award.medal}</span>
                  <span className="text-sm text-[#5bffc2] font-mono">{award.year}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0a0a0a]">{title}</h3>
                <p className="text-[#0a0a0a]/40 mt-1 text-sm">{category}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Process steps */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight">
              {t('Mein Prozess', 'My Process')}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const title = lang === 'de' ? step.de : step.en
              const description = lang === 'de' ? step.descriptionDe : step.descriptionEn

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="text-6xl md:text-7xl font-black text-[#0a0a0a]/[0.03] absolute -top-4 -left-2 pointer-events-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#5bffc2] flex items-center justify-center text-white text-xs font-bold mb-4">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-bold text-[#0a0a0a] mb-2">{title}</h4>
                    <p className="text-[#0a0a0a]/50 text-sm leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
