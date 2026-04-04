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
    year: '2024',
    titleDe: 'Kreativ Direktor',
    titleEn: 'Creative Director',
    companyDe: 'Freelance',
    companyEn: 'Freelance',
    descriptionDe: 'Leitung kreativer Projekte für internationale Kunden',
    descriptionEn: 'Leading creative projects for international clients',
    logo: 'F',
  },
  {
    year: '2023',
    titleDe: 'Senior Designer',
    titleEn: 'Senior Designer',
    companyDe: 'Agentur X',
    companyEn: 'Agency X',
    descriptionDe: 'UI/UX Design und Branding für Startups',
    descriptionEn: 'UI/UX Design and branding for startups',
    logo: 'AX',
  },
  {
    year: '2022',
    titleDe: 'Motion Designer',
    titleEn: 'Motion Designer',
    companyDe: 'Studio Berlin',
    companyEn: 'Studio Berlin',
    descriptionDe: 'Animation und Video-Produktion',
    descriptionEn: 'Animation and video production',
    logo: 'SB',
  },
  {
    year: '2022',
    titleDe: 'GWA Junior Award',
    titleEn: 'GWA Junior Award',
    companyDe: 'GWA',
    companyEn: 'GWA',
    descriptionDe: 'Auszeichnung für herausragendes Kommunikationsdesign',
    descriptionEn: 'Award for outstanding communication design',
    logo: 'GWA',
  },
  {
    year: '2021',
    titleDe: 'Werkstudent',
    titleEn: 'Working Student',
    companyDe: 'Digitalagentur',
    companyEn: 'Digital Agency',
    descriptionDe: 'Webentwicklung und Designunterstützung',
    descriptionEn: 'Web development and design support',
    logo: 'DA',
  },
  {
    year: '2020',
    titleDe: 'Studium',
    titleEn: 'Studies',
    companyDe: 'Hochschule',
    companyEn: 'University',
    descriptionDe: 'Kommunikationsdesign Bachelor',
    descriptionEn: 'Communication Design Bachelor',
    logo: 'HS',
  },
  {
    year: '2019',
    titleDe: 'Abitur',
    titleEn: 'High School',
    companyDe: 'Gymnasium',
    companyEn: 'High School',
    descriptionDe: 'Allgemeine Hochschulreife',
    descriptionEn: 'General higher education entrance qualification',
    logo: 'GY',
  },
]

/* How far the carousel needs to travel (percentage of its own width) */
const maxTravel = (1 - 1 / timeline.length) * 100

export default function ResumeTimeline() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /*
   * Section is 350vh tall.
   * Sticky inner = 100vh → pins at top-0 while the parent scrolls.
   * The user gets ~250vh of scroll while the viewport is "stuck" on this section.
   *
   * Carousel movement:
   *   scrollYProgress  0.00 → 0.05  : section just arrived, nothing moves yet
   *   scrollYProgress  0.05 → 0.85  : carousel scrolls through all entries
   *   scrollYProgress  0.85 → 1.00  : carousel done, viewport begins to leave
   */
  const translateX = useTransform(scrollYProgress, [0.05, 0.85], ['0%', `-${maxTravel}%`])
  const scrollHintOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0])
  const progressScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="bg-[#0a0a0a] relative overflow-hidden"
      style={{ height: '350vh' }}
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
            <span className="text-sm tracking-widest uppercase text-white/40 mb-4 block">
              {t('Werdegang', 'Background')}
            </span>
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
