'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrambleText from './ScrambleText'

interface Project {
  id: number
  titleDe: string
  titleEn: string
  categoryDe: string
  categoryEn: string
  year: string
  color: string
  image: string
}

const projects: Project[] = [
  { id: 1, titleDe: 'Brand Neustart', titleEn: 'Brand Restart', categoryDe: 'Branding', categoryEn: 'Branding', year: '2024', color: '#E31E24', image: 'https://picsum.photos/seed/brand-restart/600/400' },
  { id: 2, titleDe: 'Digitaler Wandel', titleEn: 'Digital Shift', categoryDe: 'Webdesign', categoryEn: 'Web Design', year: '2024', color: '#1a1a2e', image: 'https://picsum.photos/seed/digital-shift/600/400' },
  { id: 3, titleDe: 'Visuelle Identität', titleEn: 'Visual Identity', categoryDe: 'Identität', categoryEn: 'Identity', year: '2023', color: '#16213e', image: 'https://picsum.photos/seed/visual-id/600/400' },
  { id: 4, titleDe: 'Motion Graphics', titleEn: 'Motion Graphics', categoryDe: 'Animation', categoryEn: 'Animation', year: '2023', color: '#0f3460', image: 'https://picsum.photos/seed/motion-gfx/600/400' },
  { id: 5, titleDe: 'App Interface', titleEn: 'App Interface', categoryDe: 'UI/UX', categoryEn: 'UI/UX', year: '2023', color: '#E31E24', image: 'https://picsum.photos/seed/app-interface/600/400' },
  { id: 6, titleDe: 'Kampagne', titleEn: 'Campaign', categoryDe: 'Kampagne', categoryEn: 'Campaign', year: '2023', color: '#533483', image: 'https://picsum.photos/seed/campaign-01/600/400' },
  { id: 7, titleDe: 'Editorial Design', titleEn: 'Editorial Design', categoryDe: 'Print', categoryEn: 'Print', year: '2022', color: '#2b2d42', image: 'https://picsum.photos/seed/editorial-01/600/400' },
  { id: 8, titleDe: 'Fotografie', titleEn: 'Photography', categoryDe: 'Foto', categoryEn: 'Photo', year: '2022', color: '#8d99ae', image: 'https://picsum.photos/seed/photography-01/600/400' },
  { id: 9, titleDe: 'Social Media', titleEn: 'Social Media', categoryDe: 'Social', categoryEn: 'Social', year: '2022', color: '#E31E24', image: 'https://picsum.photos/seed/social-media-01/600/400' },
  { id: 10, titleDe: 'Verpackung', titleEn: 'Packaging', categoryDe: 'Packaging', categoryEn: 'Packaging', year: '2021', color: '#3a0ca3', image: 'https://picsum.photos/seed/packaging-01/600/400' },
  { id: 11, titleDe: 'Typography', titleEn: 'Typography', categoryDe: 'Typografie', categoryEn: 'Typography', year: '2021', color: '#1a1a2e', image: 'https://picsum.photos/seed/typography-01/600/400' },
  { id: 12, titleDe: '3D Visualisierung', titleEn: '3D Visualization', categoryDe: '3D', categoryEn: '3D', year: '2021', color: '#0f3460', image: 'https://picsum.photos/seed/3d-viz-01/600/400' },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang, t } = useLanguage()
  const [hovered, setHovered] = useState(false)
  const title = lang === 'de' ? project.titleDe : project.titleEn
  const category = lang === 'de' ? project.categoryDe : project.categoryEn

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative aspect-[4/3] overflow-hidden cursor-pointer rounded-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          filter: hovered ? 'grayscale(0%) brightness(0.7)' : 'grayscale(100%) brightness(0.8)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <img
          src={project.image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Color overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundColor: project.color,
          opacity: hovered ? 0.3 : 0,
        }}
      />

      {/* Content overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 20,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col justify-end p-6 text-white"
      >
        <span className="text-xs tracking-widest uppercase text-white/60 mb-2">
          {category} — {project.year}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h3>

        <motion.div
          initial={false}
          animate={{ width: hovered ? 48 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="h-0.5 bg-[#E31E24] mt-3"
        />

        {/* Arrow navigation */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <motion.div
            animate={{ x: hovered ? 0 : -10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-sm text-white/60"
          >
            {String(project.id).padStart(2, '0')}
          </motion.div>
          <motion.div
            animate={{ rotate: hovered ? 0 : -45, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/0 group-hover:bg-[#E31E24] transition-colors duration-300" />
    </motion.div>
  )
}

export default function ProjectsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={sectionRef} className="bg-white py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm tracking-widest uppercase text-[#0a0a0a]/40 mb-4 block">
            {t('Ausgewählte Arbeiten', 'Selected Work')}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tighter">
            {isInView ? (
              <ScrambleText text={t('Projekte', 'Projects')} trigger={true} />
            ) : (
              t('Projekte', 'Projects')
            )}
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
