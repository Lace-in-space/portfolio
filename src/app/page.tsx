'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { useLanguage } from '@/contexts/LanguageContext'
import CustomCursor from '@/components/CustomCursor'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import StorytellingSection from '@/components/StorytellingSection'
import InteractiveDots from '@/components/InteractiveDots'
import ResumeTimeline from '@/components/ResumeTimeline'
import AISection from '@/components/AISection'
import GWASection from '@/components/GWASection'
import ContactSection from '@/components/ContactSection'
import PasswordGate from '@/components/PasswordGate'

/* ─── Project Data ─── */
interface Project {
  id: number
  titleDe: string
  titleEn: string
  cover: string
  pagesDe: string[]
  pagesEn: string[]
}

const projects: Project[] = [
  {
    id: 1,
    titleDe: 'Recruiting Kampagne',
    titleEn: 'Recruiting Campaign',
    cover: '/portfolio/page_2.jpg',
    pagesDe: ['/portfolio/page_2.jpg', '/portfolio/page_3.jpg'],
    pagesEn: ['/portfolio/page_2_en.jpg', '/portfolio/page_3_en.jpg'],
  },
  {
    id: 2,
    titleDe: 'Web Design',
    titleEn: 'Web Design',
    cover: '/portfolio/page_4.jpg',
    pagesDe: ['/portfolio/page_4.jpg', '/portfolio/page_5.jpg'],
    pagesEn: ['/portfolio/page_4_en.jpg', '/portfolio/page_5_en.jpg'],
  },
  {
    id: 3,
    titleDe: 'Lidl Money Campaign',
    titleEn: 'Lidl Money Campaign',
    cover: '/portfolio/page_6.jpg',
    pagesDe: ['/portfolio/page_6.jpg', '/portfolio/page_7.jpg', '/portfolio/page_8.jpg'],
    pagesEn: ['/portfolio/page_6_en.jpg', '/portfolio/page_7_en.jpg', '/portfolio/page_8_en.jpg'],
  },
  {
    id: 4,
    titleDe: 'Social Media Bremen NEXT',
    titleEn: 'Social Media Bremen NEXT',
    cover: '/portfolio/page_9.jpg',
    pagesDe: ['/portfolio/page_9.jpg', '/portfolio/page_10.jpg'],
    pagesEn: ['/portfolio/page_9_en.jpg', '/portfolio/page_10_en.jpg'],
  },
  {
    id: 5,
    titleDe: 'Landtagswahlen FDP Rheinland-Pfalz',
    titleEn: 'State Elections FDP Rhineland-Palatinate',
    cover: '/portfolio/page_11.jpg',
    pagesDe: ['/portfolio/page_11.jpg', '/portfolio/page_12.jpg'],
    pagesEn: ['/portfolio/page_11_en.jpg', '/portfolio/page_12_en.jpg'],
  },
  {
    id: 6,
    titleDe: 'Landtagswahlen FDP Baden-Württemberg',
    titleEn: 'State Elections FDP Baden-Württemberg',
    cover: '/portfolio/page_11.jpg',
    pagesDe: ['/portfolio/page_11.jpg', '/portfolio/page_13.jpg'],
    pagesEn: ['/portfolio/page_11_en.jpg', '/portfolio/page_13_en.jpg'],
  },
]

/* ─── Hook: Intersection Observer for reveal ─── */
function useReveal(threshold = 0.15) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(ref)
        }
      },
      { threshold }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return { setRef, isVisible }
}

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
  onClick,
  title,
}: {
  project: Project
  index: number
  onClick: () => void
  title: string
}) {
  const { setRef, isVisible } = useReveal(0.1)

  return (
    <motion.div
      ref={setRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden"
    >
      {/* Image — natural proportions drive the card size */}
      <div className="overflow-hidden">
        <img
          src={project.cover}
          alt={title}
          className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>
    </motion.div>
  )
}

/* ─── Fullscreen Project Modal (Document Viewer) ─── */
function ProjectModal({
  project,
  title,
  pages,
  onClose,
}: {
  project: Project
  title: string
  pages: string[]
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Close button — fixed top right */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-lg transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Project title — fixed top left */}
      <div className="absolute top-5 left-5 z-30">
        <h2 className="text-lg font-bold text-white/90 sm:text-xl">{title}</h2>
      </div>

      {/* Scrollable pages area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-20 sm:px-8 md:px-16"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:gap-8">
          {pages.map((page, idx) => (
            <motion.img
              key={`${project.id}-${idx}`}
              src={page}
              alt={`${title} — Seite ${idx + 1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
              className="w-full rounded-sm shadow-2xl"
            />
          ))}
        </div>

        {/* Bottom spacer so last page isn't cut off */}
        <div className="h-8" />
      </motion.div>
    </motion.div>
  )
}

/* ─── Projects Section ─── */
function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { lang } = useLanguage()
  const { setRef, isVisible } = useReveal(0.05)

  const selectedTitle = selectedProject
    ? lang === 'de'
      ? selectedProject.titleDe
      : selectedProject.titleEn
    : ''

  const selectedPages = selectedProject
    ? lang === 'de'
      ? selectedProject.pagesDe
      : selectedProject.pagesEn
    : []

  return (
    <section id="projects" className="bg-white py-24 px-6 md:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div ref={setRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tighter">
              {lang === 'de' ? 'PROJEKTE' : 'PROJECTS'}
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#5bffc2]" />
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {projects.map((project, index) => {
            const title = lang === 'de' ? project.titleDe : project.titleEn
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                title={title}
                onClick={() => setSelectedProject(project)}
              />
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            title={selectedTitle}
            pages={selectedPages}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <LanguageProvider>
      <PasswordGate>
        <CustomCursor />
        <Header />
        <main>
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <ResumeTimeline />
          {/* <GWASection /> */}
          {/* <StorytellingSection /> */}
          {/* <AISection /> */}
          {/* <InteractiveDots /> */}
          <ContactSection />
        </main>
      </PasswordGate>
    </LanguageProvider>
  )
}