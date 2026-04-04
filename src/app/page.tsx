'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import CustomCursor from '@/components/CustomCursor'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StorytellingSection from '@/components/StorytellingSection'
import InteractiveDots from '@/components/InteractiveDots'
import ResumeTimeline from '@/components/ResumeTimeline'
import AISection from '@/components/AISection'
import GWASection from '@/components/GWASection'
import ContactSection from '@/components/ContactSection'

/* ─── Project Data ─── */
const projects = [
  {
    id: 1,
    title: 'Recruiting Kampagne',
    client: 'VW Nutzfahrzeuge',
    cover: '/portfolio/page_2.jpg',
    images: ['/portfolio/page_2.jpg', '/portfolio/page_3.jpg'],
    description:
      'VW Nutzfahrzeuge unterstützt mit der Kampagne „Finde deinen Weg" Autohäuser bei der Suche nach Nachwuchstalenten. Es werden interessante, zielgruppenspezifische Social-Media-Anzeigen auf verschiedenen Plattformen geschaltet. Das Look and Feel der Kampagne wird auch auf der hauseigenen Recruiting-Website übernommen. Meine Aufgaben bei diesem Projekt umfassten die strategische Planung, Ideenentwicklung und Kreation der Kampagne.',
  },
  {
    id: 2,
    title: 'Web Design',
    client: 'Bäckerei',
    cover: '/portfolio/page_4.jpg',
    images: ['/portfolio/page_4.jpg', '/portfolio/page_5.jpg'],
    description:
      'Bei diesem Berufsschulprojekt erhielten wir den Auftrag, eine One-Page-Website für eine junge und moderne Bäckerei zu gestalten und diese mit den Programmiersprachen HTML und CSS umzusetzen.',
  },
  {
    id: 3,
    title: 'Lidl Money Campaign',
    client: 'Lidl',
    cover: '/portfolio/page_6.jpg',
    images: ['/portfolio/page_6.jpg', '/portfolio/page_7.jpg', '/portfolio/page_8.jpg'],
    description:
      'Lidl Money ist ein Rebranding des bestehenden Rabattsystems der Lidl App. Rabatte werden zu einer emotional aufgeladenen, digitalen Markswährung mit dem Ziel, Teil der Popkultur zu werden. Während Lidl Money hauptsächlich digital existiert, wird es für Marketingmaßnahmen gezielt physisch inszeniert. Die Idee eröffnet neue kreative Spielräume für Kampagnen, Influencer- und Guerilla-Aktionen. Konzept und Ideation wurden von mir entwickelt. Freie Konzeptidee.',
    additionalText:
      'SSIO x LIDL MONEY: Discounts, go viral. SSIO flexxt Lidl Money im Musikvideo und auf der Straße. Rabatt wird Popkultur. Social Media Schatzsuche: Find it. Own it. Spend it. Influencer droppen Hinweise. Die Community jagt Lidl Money. Festival Activation: Auf die Plätze, Fertig, Los! Lidl macht Challenges auf Festivals mit Lidl Money Preisgeld. Direkt einlösbar im Lidl Festival Pop-up.',
  },
  {
    id: 4,
    title: 'Social Media Bremen NEXT',
    client: 'Bremen NEXT',
    cover: '/portfolio/page_9.jpg',
    images: ['/portfolio/page_9.jpg', '/portfolio/page_10.jpg'],
    description:
      'Für den Instagram-Account des Radiosenders Bremen NEXT habe ich Bewegtbildbeiträge erstellt. Konkret umfasste meine Arbeit: Konzeption der Videobeiträge, Aufnehmen der Inhalte, Videobearbeitung und -schnitt. 80,3K Aufrufe und 2,2M weitere Reels.',
  },
  {
    id: 5,
    title: 'Landtagswahlen FDP Rheinland-Pfalz',
    client: 'FDP Rheinland-Pfalz',
    cover: '/portfolio/page_11.jpg',
    images: ['/portfolio/page_11.jpg', '/portfolio/page_12.jpg'],
    description:
      'Kreative Mitwirkung an der Landtagswahlkampagne 2026 der FDP Rheinland-Pfalz für Daniela Schmitt. Unterstützung in der konzeptionellen und gestalterischen Ausarbeitung der Kampagne über verschiedene Kommunikationsmittel hinweg.',
  },
  {
    id: 6,
    title: 'Landtagswahlen FDP Baden-Württemberg',
    client: 'FDP Baden-Württemberg',
    cover: '/portfolio/page_11.jpg',
    images: ['/portfolio/page_11.jpg', '/portfolio/page_13.jpg'],
    description:
      'Kreative Mitarbeit an der Landtagswahlkampagne 2026 der FDP Baden-Württemberg für Hans-Ulrich Rülke. Gestaltung und Ausarbeitung von Mock-ups sowie textliche Unterstützung der Kampagne.',
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
}: {
  project: (typeof projects)[number]
  index: number
  onClick: () => void
}) {
  const { setRef, isVisible } = useReveal(0.1)

  return (
    <motion.div
      ref={setRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden bg-[#f5f5f5]"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/3]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${project.cover}')` }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      {/* Text overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-16 sm:p-6 sm:pt-24">
        <p className="text-xs font-medium tracking-widest text-white/70 uppercase">
          {project.client}
        </p>
        <h3 className="mt-1 text-lg font-bold leading-tight text-white sm:text-xl">
          {project.title}
        </h3>
      </div>


    </motion.div>
  )
}

/* ─── Project Modal ─── */
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number]
  onClose: () => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(1)

  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))
  }, [project.images.length])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))
  }, [project.images.length])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, goToPrev, goToNext])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 mx-4 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-md transition-colors hover:bg-[#5bffc2] hover:text-white md:top-6 md:right-6"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left: Image — full bleed to top, left, bottom edges */}
          <div className="relative flex min-h-[300px] flex-1 items-stretch bg-[#f5f5f5] md:min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} — Bild ${currentImageIndex + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute top-1/2 left-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#1a1a1a] shadow transition-colors hover:bg-[#5bffc2] hover:text-white md:left-4"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#1a1a1a] shadow transition-colors hover:bg-[#5bffc2] hover:text-white md:right-4"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:bottom-6">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'w-6 bg-[#5bffc2]'
                          : 'w-1.5 bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex max-h-[40vh] flex-col justify-center overflow-y-auto p-6 md:max-h-[90vh] md:w-[420px] md:p-10">
            <p className="text-xs font-medium tracking-[0.2em] text-[#5bffc2] uppercase">
              {project.client}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-[#1a1a1a] sm:text-3xl">
              {project.title}
            </h2>
            <div className="mt-6 h-px w-12 bg-[#5bffc2]" />
            <p className="mt-6 text-[15px] leading-relaxed text-[#555]">
              {project.description}
            </p>
            {project.additionalText && (
              <>
                <div className="mt-6 h-px w-full bg-[#eee]" />
                <p className="mt-4 text-[14px] leading-relaxed text-[#777]">
                  {project.additionalText}
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Projects Section ─── */
function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  const { setRef, isVisible } = useReveal(0.05)

  return (
    <section id="projects" className="bg-white py-24 px-6 md:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div ref={setRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="text-sm tracking-widest uppercase text-[#0a0a0a]/40 mb-4 block">
              Ausgewählte Arbeiten
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tighter">
              PROJEKTE
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#5bffc2]" />
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
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
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <StorytellingSection />
        <ProjectsSection />
        <ResumeTimeline />
        <GWASection />
        <AISection />
        <InteractiveDots />
        <ContactSection />
      </main>
    </LanguageProvider>
  )
}
