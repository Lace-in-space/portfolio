'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
            {t('Kontakt', 'Contact')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Contact info */}
          <div className="flex flex-col gap-8 mt-4">
            {/* Email */}
            <a
              href="mailto:lasse.mueller24@outlook.de"
              className="flex items-center gap-4 group"
            >
              <svg
                className="w-6 h-6 text-white/70 group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-white/60 text-lg group-hover:text-white transition-colors">
                lasse.mueller24@outlook.de
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+4915783806888"
              className="flex items-center gap-4 group"
            >
              <svg
                className="w-6 h-6 text-white/70 group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span className="text-white/60 text-lg group-hover:text-white transition-colors">
                (+49) (0) 157 83806888
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/lasse-mueller-111093252/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <svg
                className="w-6 h-6 text-white/70 group-hover:text-[#0a66c2] transition-all duration-300 origin-center group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-white/60 text-lg group-hover:text-white transition-all duration-300 origin-left group-hover:scale-105">
                LinkedIn
              </span>
            </a>
          </div>

          {/* Right: Empty for now */}
          <div className="hidden lg:block" />
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white/30 text-sm">
              © 2026 Lasse Müller. {t('Alle Rechte vorbehalten.', 'All rights reserved.')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}