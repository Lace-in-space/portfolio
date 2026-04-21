'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useLanguage } from '@/contexts/LanguageContext'

/* ─── 3D Trophy Component ─── */
function TrophyModel({ scrollProgress, mouseX, mouseY }: { scrollProgress: number; mouseX: number; mouseY: number }) {
  const { scene } = useGLTF('/figur01.glb')
  return (
    <primitive
      object={scene}
      rotation={[mouseY * 0.3, scrollProgress * Math.PI * 0.3 + mouseX * 0.3, 0]}
      scale={1.8}
      position={[0, 0, 0]}
    />
  )
}

/* ─── 3D Canvas Wrapper ─── */
function TrophyCanvas({ scrollProgress, mouseX, mouseY }: { scrollProgress: number; mouseX: number; mouseY: number }) {
  return (
    <Canvas camera={{ position: [0, 0.8, 5], fov: 45 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 3, 2]} intensity={0.4} />
      <Suspense fallback={null}>
        <TrophyModel scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  )
}

/* ─── Award Data ─── */
const awards = [
  { title: 'Bronze', subtitle: 'Jurypreis', icon: '/gwa/pokal-bronze.png' },
  { title: 'Publikumspreis', subtitle: '', icon: '/gwa/pokal-publikum.png' },
  { title: 'Making-of-Preis', subtitle: '', icon: '/gwa/pokal-making-of.png' },
]

/* ─── Single Award Box ─── */
function AwardBox({ award, index }: { award: typeof awards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-visible group"
    >
      {/* Accent line on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5bffc2] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

      <div className="flex items-center gap-5 px-6 py-5 bg-[#f8f8f8] border border-[#0a0a0a]/5 rounded-r-sm">
        {/* Trophy icon — large */}
        <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
          <img src={award.icon} alt={award.title} className="w-full h-full object-contain" />
        </div>
        {/* Text — uses heading font */}
        <div>
          <h4 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight" style={{ fontFamily: "'StretchPro', sans-serif" }}>{award.title}</h4>
          {award.subtitle && (
            <p className="text-[#0a0a0a]/40 text-base mt-1">{award.subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Section ─── */
export default function GWASection() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const trophyRotation = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])
  const [trophyScroll, setTrophyScroll] = useState(0)
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const unsubscribe = trophyRotation.on('change', (v) => setTrophyScroll(v))
    return () => unsubscribe()
  }, [trophyRotation])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      setMouseNorm({ x, y })
    }
    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-32 px-6 md:px-12" style={{ overflow: 'visible' }}>
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 md:mb-24"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tighter">
          GWA Junior Agency Award
        </h2>
      </motion.div>

      {/* ── Top Part: Awards left, 3D Trophy right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-20 md:mb-32" style={{ overflow: 'visible' }}>
        {/* Left: 3 Award Boxes */}
        <div className="flex flex-col gap-6">
          {awards.map((award, index) => (
            <AwardBox key={index} award={award} index={index} />
          ))}
        </div>

        {/* Right: 3D Trophy + Logo behind */}
        <div className="relative overflow-visible min-h-[500px] -mt-32 lg:-mt-48" style={{ overflow: 'visible' }}>
          {/* Logo behind trophy */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <img
              src="/gwa/logo.png"
              alt="Logo"
              className="w-2/3 h-auto object-contain opacity-1000"
            />
          </div>
          {/* Subtle glow behind trophy */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#5bffc2]/10 blur-3xl z-0" />
          {/* 3D Trophy — absolute positioned so it can overflow the container */}
          <div className="absolute inset-0 z-10" style={{ clipPath: 'none', overflow: 'visible' }}>
               <TrophyCanvas scrollProgress={trophyScroll} mouseX={mouseNorm.x} mouseY={mouseNorm.y} />
          </div>
        </div>
      </div>

      {/* ── Bottom Part: Info Box ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="bg-[#5bffc2] p-8 md:p-12 lg:p-16 rounded-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-[#0a0a0a]/80 text-lg md:text-xl leading-relaxed">
              Beim GWA Junior Agency Award 2026 belegte unser Team Hannover den dritten Platz – und holte gleich zwei weitere Auszeichnungen: den Making-Off Award für die beste Behind-the-Scenes-Dokumentation und den Publikumspreis.
            </p>
            <p className="text-[#0a0a0a]/80 text-lg md:text-xl leading-relaxed mt-8">
              Unser Kunde war HateAid, unsere Partneragentur Creative Team. Die Aufgabe: Hass im Netz sichtbar machen und Awareness für HateAid schaffen. Unser Claim – „Einer für alle, alle gegen Hass" – stellte den Teamgedanken ins Zentrum der Kampagne und mobilisierte das Publikum.
            </p>
          </div>
          {/* Right: Video */}
          <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-sm shadow-2xl"
              src="/gwa/video.mp4"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}