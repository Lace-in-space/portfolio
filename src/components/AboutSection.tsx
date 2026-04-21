'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'


export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t, lang } = useLanguage()

  return (
    <section ref={ref} className="bg-black py-24 px-6 md:py-32 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#ffffff] tracking-tighter">
                {t('ÜBER MICH', 'ABOUT ME')}
            </h2>
            <p className="mt-18 text-[#ffffff]/70 text-base md:text-lg leading-relaxed max-w-xl">
                {lang === 'de' ? (
                    <>
                    Ich bin <span className="font-bold text-[#5bffc2]">Lasse</span>, Student im Studiengang Integrated Media & 
                    Communication der Hochschule Hannover mit einem interdisziplinären Fokus auf Design, Marketing und Strategie. 
                    Mein Ansatz ist es, Projekte ganzheitlich zu denken und kreative Lösungen mit klarer Zielsetzung zu verbinden.
                    <br /><br />
                    Ich lege Wert auf Kommunikation, die nicht nur visuell überzeugt, sondern auch inhaltlich wirkt. 
                    Dabei behalte ich das große Ganze im Blick und arbeite strukturiert sowie teamorientiert.
                    </>
                ) : (
                    <>
                    I am <span className="font-bold text-[#5bffc2]">Lasse</span>, a student of Integrated Media & Communication 
                    at the University of Applied Siences and Arts with an interdisciplinary focus on design, marketing and strategy. 
                    My approach is to think holistically about projects and combine creative solutions with clear objectives.
                    <br /><br />
                    I value communication that is not only visually convincing, but also impactful in content. I keep the big 
                    picture in mind and work in a structured and team-oriented way.
                    </>
                )}
            </p>
        </motion.div>
        <div className="mt-12 md:mt-0">
            <motion.img
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                src="/lasse_mueller.png"
                alt="Lasse Müller"
                className="w-full object-contain"
            />
            </div>
        </div>
    </section>
  )
}