'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrambleText from './ScrambleText'

export default function ContactSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="text-sm tracking-widest uppercase text-white/40 mb-4 block">
            {t('Kontaktieren Sie mich', 'Get in Touch')}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
            {isInView ? (
              <ScrambleText
                text={t('Kontakt', 'Contact')}
                trigger={true}
              />
            ) : (
              t('Kontakt', 'Contact')
            )}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Eyes and info */}
          <div className="flex flex-col items-center lg:items-start gap-8" onMouseMove={handleMouseMove}>
            {/* Animated eyes */}
            <div className="flex gap-8 md:gap-12 mt-8">
              <Eye mouseX={mousePos.x} mouseY={mousePos.y} />
              <Eye mouseX={mousePos.x} mouseY={mousePos.y} />
            </div>

            <p className="text-white/50 text-lg text-center lg:text-left max-w-md">
              {t(
                'Lassen Sie uns zusammenarbeiten. Ich bin immer offen für neue Projekte und Ideen.',
                "Let's work together. I'm always open to new projects and ideas."
              )}
            </p>

            {/* Contact info */}
            <div className="space-y-4 text-white/40">
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-sm">ivan@kolesnikov.design</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm">Berlin, Deutschland</span>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-white/30 text-xs tracking-widest uppercase mb-2 block">
                  {t('Name', 'Name')}
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 text-white py-3 text-lg focus:border-[#E31E24] focus:outline-none transition-colors"
                  placeholder={t('Ihr Name', 'Your Name')}
                />
              </div>
              <div>
                <label className="text-white/30 text-xs tracking-widest uppercase mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 text-white py-3 text-lg focus:border-[#E31E24] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-white/30 text-xs tracking-widest uppercase mb-2 block">
                  {t('Nachricht', 'Message')}
                </label>
                <textarea
                  value={formState.message}
                  onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 text-white py-3 text-lg focus:border-[#E31E24] focus:outline-none transition-colors resize-none"
                  placeholder={t('Ihre Nachricht...', 'Your message...')}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#E31E24] text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#c4191f] transition-colors"
              >
                {submitted
                  ? t('Gesendet! ✓', 'Sent! ✓')
                  : t('Absenden', 'Submit')
                }
              </motion.button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white/30 text-sm">
              © 2024 Ivan Kolesnikov. {t('Alle Rechte vorbehalten.', 'All rights reserved.')}
            </span>
            <div className="flex items-center gap-6">
              {['Behance', 'Dribbble', 'LinkedIn', 'Instagram'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="text-white/30 hover:text-[#E31E24] text-sm transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Eye({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const maxOffset = 12
  const pupilPos = {
    x: (mouseX - 0.5) * maxOffset * 2,
    y: (mouseY - 0.5) * maxOffset * 2,
  }

  return (
    <div ref={eyeRef} className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-4 border-white/20 flex items-center justify-center relative shadow-lg shadow-white/5">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          animate={{ x: pupilPos.x, y: pupilPos.y }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E31E24] relative"
        >
          <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-white/30" />
        </motion.div>
      </div>
    </div>
  )
}
