'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={sectionRef} className="bg-black py-24 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        {/* Video Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain"
            src="/kontakt-video.mp4"
          />
        </motion.div>

        {/* Contact info nebeneinander */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-center"
        >
          {/* Email */}
          <a
            href="mailto:lasse.mueller24@outlook.de"
            className="group flex items-center justify-center gap-3 transition-all duration-300 hover:gap-4"
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
            <span className="text-base md:text-lg text-white/80 font-light tracking-tight group-hover:text-[#5bffc2] transition-colors">
              lasse.mueller24@outlook.de
            </span>
          </a>

          {/* Telefon */}
          <a
            href="tel:+4915783806888"
            className="group flex items-center justify-center gap-3 transition-all duration-300 hover:gap-4"
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-base md:text-lg text-white/80 font-light tracking-tight group-hover:text-[#5bffc2] transition-colors">
              (+49) (0) 157 83806888
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 transition-all duration-300 hover:gap-4"
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-base md:text-lg text-white/80 font-light tracking-tight group-hover:text-[#5bffc2] transition-colors">
              LinkedIn
            </span>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 pt-4 border-t border-white/10"
        >
          <div className="flex justify-center">
            <span className="text-white/30 text-sm">
              © {new Date().getFullYear()} Lasse Müller. {t('Alle Rechte vorbehalten.', 'All rights reserved.')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}