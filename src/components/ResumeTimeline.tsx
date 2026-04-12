'use client'

import { useRef, useState, useEffect } from 'react'
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
    descriptionDe: 'Ausbildung integriert im Bachelor',
    descriptionEn: 'Apprenticeship integrated in the bachelor',
    logo: '/logos/mmbbs.jpg',
  },
  {
    year: '2023–2027',
    titleDe: 'Integrated Media & Communications',
    titleEn: 'Integrated Media & Communications',
    companyDe: 'Hochschule Hannover',
    companyEn: 'Hochschule Hannover',
    descriptionDe: 'duales Bachelorstudium mit Praxisphasen',
    descriptionEn: 'dual bachelor program with internships',
    logo: '/logos/hsh_logo.jpg',
  },
  {
    year: '2023',
    titleDe: 'Intern Social Media',
    titleEn: 'Intern Social Media',
    companyDe: 'Bremen NEXT',
    companyEn: 'Bremen NEXT',
    descriptionDe: '2 wöchiges freiwilliges Praktikum',
    descriptionEn: '2 week Internship',
    logo: '/logos/Bremen_Next_logo_t:w.jpg',
  },
  {
    year: '2024',
    titleDe: 'Intern Strategie/Kreation',
    titleEn: 'Intern Strategy/Creation',
    companyDe: 'Creativteam (Hannover)',
    companyEn: 'Creativteam (Hannover)',
    descriptionDe: '5 monatiges Pflichtpraktikum',
    descriptionEn: '5 month long internship',
    logo: '/logos/CC_logo.jpg',
  },
  {
    year: '2025',
    titleDe: 'Intern Grafik Design',
    titleEn: 'Intern Graphic Design',
    companyDe: 'AANDRS (Wien)',
    companyEn: 'AANDRS (Vienna)',
    descriptionDe: '2 monatiges Pflichtpraktikum',
    descriptionEn: '2 month long internship',
    logo: '/logos/AANDRS_logo_b:w.jpg',
  },
  {
    year: '2025',
    titleDe: 'Intern Kreation',
    titleEn: 'Intern Creation',
    companyDe: 'Heimat/TBWA (Berlin)',
    companyEn: 'Heimat/TBWA (Berlin)',
    descriptionDe: '3 monatiges Pflichtpraktikum',
    descriptionEn: '3 month long internship',
    logo: '/logos/HeimatTBWA_b:w.jpg',
  },
]

export default function ResumeTimeline() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [maxOffset, setMaxOffset] = useState(0)

  /* Measure the carousel after mount + on resize so the last entry
     is exactly centered in the viewport at the end of the scroll. */
  useEffect(() => {
    const measure = () => {
      if (!carouselRef.current) return
      const container = carouselRef.current.parentElement // overflow-hidden wrapper
      if (!container) return
      const viewportWidth = container.offsetWidth
      /* Find the last visible entry element inside the carousel */
      const items = carouselRef.current.querySelectorAll('[data-entry]')
      const lastItem = items[items.length - 1] as HTMLElement | undefined
      if (!lastItem) return
      const lastItemCenter = lastItem.offsetLeft + lastItem.offsetWidth / 2
      setMaxOffset(Math.max(0, lastItemCenter - viewportWidth / 2))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /*
   * Scroll range breakdown (out of total scrollYProgress 0→1):
   *   0.00–0.04  : nothing (section entering viewport)
   *   0.04–0.88  : carousel scrolls horizontally, last entry reaches center
   *   0.88–1.00  : carousel stays, viewport releases to next section
   */
  const carouselStart = 0.04
  const carouselEnd = 0.88

  const translateX = useTransform(scrollYProgress, [carouselStart, carouselEnd], [0, -maxOffset])
  const scrollHintOpacity = useTransform(scrollYProgress, [carouselStart, carouselStart + 0.10], [1, 0])
  const progressScale = useTransform(scrollYProgress, [carouselStart, carouselEnd], [0, 1])

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="bg-[#0a0a0a] relative"
      style={{ height: '700vh' }}
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
            ref={carouselRef}
            style={{ x: translateX }}
            className="flex gap-8 md:gap-12 pl-6 md:pl-12 pr-[45vw]"
          >
            {timeline.map((entry, index) => {
              const title = lang === 'de' ? entry.titleDe : entry.titleEn
              const company = lang === 'de' ? entry.companyDe : entry.companyEn
              const description = lang === 'de' ? entry.descriptionDe : entry.descriptionEn

              return (
                <motion.div
                  key={index}
                  data-entry
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
