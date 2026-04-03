'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ChevronDown, ArrowUpRight } from 'lucide-react'

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

/* ─── Scroll-to Section Helper ─── */
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─── Header ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-sm font-semibold tracking-widest uppercase text-[#1a1a1a] transition-colors hover:text-[#E31E24]"
        >
          Lasse Müller
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {['Projekte', 'Über mich', 'Kontakt'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="text-sm font-medium tracking-wide text-[#1a1a1a] transition-colors hover:text-[#E31E24]"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

/* ─── Hero Section ─── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden"
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/portfolio/page_1.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-7xl lg:text-8xl xl:text-9xl">
            LASSE MÜLLER
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 flex items-center justify-center gap-3 text-lg font-light tracking-[0.25em] text-[#666] sm:text-xl"
        >
          <span>Kreativ</span>
          <span className="h-px w-8 bg-[#E31E24]" />
          <span>Design</span>
          <span className="h-px w-8 bg-[#E31E24]" />
          <span>Kommunikation</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-sm tracking-widest text-[#999] uppercase"
        >
          Portfolio 2025
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('projekte')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#999] transition-colors hover:text-[#E31E24]"
      >
        <span className="text-xs tracking-widest uppercase">Scrollen</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  )
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

      {/* Arrow indicator */}
      <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/0 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
        <ArrowUpRight className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-[#E31E24]" />
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
  const [currentImageIndex, setCurrentImageIndex] = useState(1) // Start with first detail image

  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))
  }, [project.images.length])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))
  }, [project.images.length])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Close on Escape
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
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal content */}
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
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-md transition-colors hover:bg-[#E31E24] hover:text-white md:top-6 md:right-6"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left: Image */}
          <div className="relative flex min-h-[300px] flex-1 items-center justify-center bg-[#f5f5f5] md:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} — Bild ${currentImageIndex + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full max-h-[50vh] w-full object-contain p-4 md:max-h-none md:p-8"
              />
            </AnimatePresence>

            {/* Image navigation arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute top-1/2 left-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#1a1a1a] shadow transition-colors hover:bg-[#E31E24] hover:text-white md:left-4"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#1a1a1a] shadow transition-colors hover:bg-[#E31E24] hover:text-white md:right-4"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:bottom-6">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'w-6 bg-[#E31E24]'
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
            <p className="text-xs font-medium tracking-[0.2em] text-[#E31E24] uppercase">
              {project.client}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-[#1a1a1a] sm:text-3xl">
              {project.title}
            </h2>
            <div className="mt-6 h-px w-12 bg-[#E31E24]" />
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
    <section id="projekte" className="bg-white px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div ref={setRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-xs font-medium tracking-[0.25em] text-[#E31E24] uppercase">
              Ausgewählte Arbeiten
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-6xl">
              PROJEKTE
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#E31E24]" />
          </motion.div>
        </div>

        {/* Projects grid */}
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

      {/* Project Modal */}
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

/* ─── About Section ─── */
function AboutSection() {
  const { setRef, isVisible } = useReveal(0.15)

  return (
    <section id="über-mich" className="bg-[#f8f8f8] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Left: Image */}
          <motion.div
            ref={setRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: "url('/portfolio/page_1.jpg')" }}
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <p className="text-xs font-medium tracking-[0.25em] text-[#E31E24] uppercase">
              Über mich
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
              ÜBER MICH
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#E31E24]" />
            <p className="mt-8 text-base leading-relaxed text-[#555]">
              Hallo, ich bin Lasse Müller — ein kreativer Kopf mit Leidenschaft für Design,
              Kommunikation und visuelle Storytelling. Mein Fokus liegt auf der Entwicklung
              von Kampagnen, die nicht nur auffallen, sondern auch bewegen.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Von strategischer Planung über konzeptionelle Ideenentwicklung bis hin zur
              gestalterischen Umsetzung — ich begleite Projekte von der ersten Skizze bis
              zum finalen Resultat. Meine Arbeit umfasst Webdesign, Social-Media-Konzepte,
              Markenkommunikation und politische Kampagnen.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Ich bin davon überzeugt, dass gutes Design dann entsteht, wenn Kreativität
              auf Strategie trifft. Jedes Projekt ist eine neue Chance, etwas
              Besonderes zu schaffen.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer / Contact Section ─── */
function FooterSection() {
  const { setRef, isVisible } = useReveal(0.15)

  return (
    <footer id="kontakt" className="bg-[#1a1a1a] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div ref={setRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-[#E31E24] uppercase">
              Kontakt
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              LET&apos;S WORK
              <br />
              <span className="text-[#E31E24]">TOGETHER</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60">
              Interesse an einer Zusammenarbeit? Ich freue mich auf Ihre Nachricht.
            </p>
            <motion.a
              href="mailto:hello@lassemueller.de"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-medium tracking-wide text-white transition-all hover:border-[#E31E24] hover:text-[#E31E24]"
            >
              E-Mail schreiben
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-white/40">
            © {new Date().getFullYear()} Lasse Müller. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs tracking-wide text-white/40">
            Kreativ · Design · Kommunikation
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <FooterSection />
      </main>
    </>
  )
}
