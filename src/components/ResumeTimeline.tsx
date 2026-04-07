'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface TimelineEntry {
  year: string
  titleDe: string
  titleEn: string
  companyDe: string
  companyEn: string
  descriptionDe: string
  descriptionEn: string
  logo: string
}

const timeline: TimelineEntry[] = [
  {
    year: '2023–2025',
    titleDe: 'Gestaltungstechnischer Assistent',
    titleEn: 'Design Technical Assistant',
    companyDe: 'Ausbildung',
    companyEn: 'Apprenticeship',
    descriptionDe: 'Ausbildung zum Gestaltungstechnischen Assistenten',
    descriptionEn: 'Apprenticeship as Design Technical Assistant',
    logo: 'GTA',
  },
  {
    year: '2023–2027',
    titleDe: 'Integrated Media & Communications',
    titleEn: 'Integrated Media & Communications',
    companyDe: 'Hochschule Hannover',
    companyEn: 'Hochschule Hannover',
    descriptionDe: 'Bachelorstudium Integrated Media & Communications',
    descriptionEn: 'Bachelor studies Integrated Media & Communications',
    logo: 'HsH',
  },
  {
    year: '2023',
    titleDe: 'Intern Social Media',
    titleEn: 'Intern Social Media',
    companyDe: 'Bremen NEXT',
    companyEn: 'Bremen NEXT',
    descriptionDe: 'Praktikum im Bereich Social Media',
    descriptionEn: 'Internship in Social Media',
    logo: 'BN',
  },
  {
    year: '2024',
    titleDe: 'Intern Strategie/Kreation',
    titleEn: 'Intern Strategy/Creation',
    companyDe: 'Creativteam (Hannover)',
    companyEn: 'Creativteam (Hannover)',
    descriptionDe: 'Praktikum im Bereich Strategie und Kreation',
    descriptionEn: 'Internship in Strategy and Creation',
    logo: 'CT',
  },
  {
    year: '2025',
    titleDe: 'Intern Grafik Design',
    titleEn: 'Intern Graphic Design',
    companyDe: 'AANDRS (Wien)',
    companyEn: 'AANDRS (Vienna)',
    descriptionDe: 'Praktikum im Bereich Grafik Design',
    descriptionEn: 'Internship in Graphic Design',
    logo: 'AA',
  },
  {
    year: '2025',
    titleDe: 'Intern Kreation',
    titleEn: 'Intern Creation',
    companyDe: 'Heimat/TBWA (Berlin)',
    companyEn: 'Heimat/TBWA (Berlin)',
    descriptionDe: 'Praktikum im Bereich Kreation',
    descriptionEn: 'Internship in Creation',
    logo: 'HT',
  },
]

/*
 * Calculate how far the carousel must travel so the LAST entry is centered.
 * We need to scroll: (n-1) * itemWidth + halfItemWidth - halfViewportWidth
 * As a fraction of the total carousel width (n * itemWidth + (n-1) * gap + padding),
 * this is approximately: (1 - 1.5 / n) for evenly-spaced items with padding.
 * For 6 items → ~75%
 */
const numEntries = timeline.length
const maxTravel = Math.max(0, (1 - 1.5 / numEntries) * 100)

export default function ResumeTimeline() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /*
   * Section is tall enough so the viewport stays pinned while the carousel
   * scrolls all the way until the last entry is centered.
   * Then a small buffer allows the viewport to release and continue to next section.
   */
  const translateX = useTransform(scrollYProgress, [0.04, 0.88], ['0%', `-${maxTravel}%`])
  const scrollHintOpacity = useTransform(scrollYProgress, [0.04, 0.14], [1, 0])
  const progressScale = useTransform(scrollYProgress, [0.04, 0.88], [0, 1])

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="bg-[#0a0a0a] relative"
      style={{ height: '500vh' }}
    >
      {/* Sticky viewport — pins at top while the section scrolls past */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
              {t('Lebenslauf', 'Resume')}
            </h2>
          </motion.div>
        </div>

        {/* Scroll hint — fades out once carousel starts moving */}
        <motion.div
          className="px-6 md:px-12 mb-8 flex items-center gap-2 text-white/30"
          style={{ opacity: scrollHintOpacity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-xs tracking-widest uppercase">{t('Scrollen für mehr', 'Scroll for more')}</span>
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div className="overflow-hidden">
          <motion.div
            style={{ x: translateX }}
            className="flex gap-8 md:gap-12 pl-6 md:pl-12 pr-[40vw]"
          >
            {timeline.map((entry, index) => {
              const title = lang === 'de' ? entry.titleDe : entry.titleEn
              const company = lang === 'de' ? entry.companyDe : entry.companyEn
              const description = lang === 'de' ? entry.descriptionDe : entry.descriptionEn

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="min-w-[70vw] md:min-w-[30vw] flex-shrink-0 relative"
                >
                  {/* Timeline line */}
                  <div className="absolute top-0 left-0 w-px h-full bg-white/10">
                    <div className="w-3 h-3 rounded-full -ml-[5px] mt-0 bg-[#5bffc2]" />
                  </div>

                  <div className="ml-8 pt-2">
                    {/* Logo */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <span className="text-sm md:text-base font-bold text-white/60 tracking-tight">
                        {entry.logo}
                      </span>
                    </div>

                    <span className="text-sm text-[#5bffc2] font-mono">{entry.year}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 tracking-tight">{title}</h3>
                    <p className="text-white/40 mt-1">{company}</p>
                    <p className="text-white/60 mt-3 text-sm max-w-sm">{description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <div className="mt-12 mx-6 md:mx-12">
          <div className="w-full h-px bg-white/10">
            <motion.div
              className="h-full bg-[#5bffc2]"
              style={{
                scaleX: progressScale,
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
