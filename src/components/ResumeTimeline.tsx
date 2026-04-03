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
  color: string
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
    color: '#E31E24',
  },
  {
    year: '2023',
    titleDe: 'Senior Designer',
    titleEn: 'Senior Designer',
    companyDe: 'Agentur X',
    companyEn: 'Agency X',
    descriptionDe: 'UI/UX Design und Branding für Startups',
    descriptionEn: 'UI/UX Design and branding for startups',
    color: '#1a1a2e',
  },
  {
    year: '2022',
    titleDe: 'Motion Designer',
    titleEn: 'Motion Designer',
    companyDe: 'Studio Berlin',
    companyEn: 'Studio Berlin',
    descriptionDe: 'Animation und Video-Produktion',
    descriptionEn: 'Animation and video production',
    color: '#16213e',
  },
  {
    year: '2022',
    titleDe: 'GWA Junior Award',
    titleEn: 'GWA Junior Award',
    companyDe: 'GWA',
    companyEn: 'GWA',
    descriptionDe: 'Auszeichnung für herausragendes Kommunikationsdesign',
    descriptionEn: 'Award for outstanding communication design',
    color: '#0f3460',
  },
  {
    year: '2021',
    titleDe: 'Werkstudent',
    titleEn: 'Working Student',
    companyDe: 'Digitalagentur',
    companyEn: 'Digital Agency',
    descriptionDe: 'Webentwicklung und Designunterstützung',
    descriptionEn: 'Web development and design support',
    color: '#E31E24',
  },
  {
    year: '2020',
    titleDe: 'Studium',
    titleEn: 'Studies',
    companyDe: 'Hochschule',
    companyEn: 'University',
    descriptionDe: 'Kommunikationsdesign Bachelor',
    descriptionEn: 'Communication Design Bachelor',
    color: '#533483',
  },
  {
    year: '2019',
    titleDe: 'Abitur',
    titleEn: 'High School',
    companyDe: 'Gymnasium',
    companyEn: 'High School',
    descriptionDe: 'Allgemeine Hochschulreife',
    descriptionEn: 'General higher education entrance qualification',
    color: '#2b2d42',
  },
]

export default function ResumeTimeline() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const translateX = useTransform(scrollYProgress, [0, 1], ['0%', `-${(1 - 1 / timeline.length) * 100}%`])

  return (
    <section id="resume" ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32 relative overflow-hidden">
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

      {/* Scroll hint */}
      <div className="px-6 md:px-12 mb-8 flex items-center gap-2 text-white/30">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span className="text-xs tracking-widest uppercase">{t('Scrollen für mehr', 'Scroll for more')}</span>
      </div>

      {/* Horizontal scroll timeline */}
      <div className="overflow-hidden">
        <motion.div
          ref={containerRef}
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
                  <div
                    className="w-3 h-3 rounded-full -ml-[5px] mt-0"
                    style={{ backgroundColor: entry.color }}
                  />
                </div>

                <div className="ml-8 pt-2">
                  <span className="text-sm text-[#E31E24] font-mono">{entry.year}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 tracking-tight">{title}</h3>
                  <p className="text-white/40 mt-1">{company}</p>
                  <p className="text-white/60 mt-3 text-sm max-w-sm">{description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Bottom progress */}
      <div className="mt-12 mx-6 md:mx-12">
        <div className="w-full h-px bg-white/10">
          <motion.div
            className="h-full bg-[#E31E24]"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          />
        </div>
      </div>
    </section>
  )
}
