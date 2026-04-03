'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

export default function Header() {
  const { lang, toggleLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <button
        onClick={toggleLanguage}
        className="relative w-16 h-8 rounded-full bg-[#0a0a0a] flex items-center cursor-pointer group overflow-hidden"
      >
        <motion.div
          animate={{ x: lang === 'en' ? 32 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-7 h-7 rounded-full bg-[#E31E24] flex items-center justify-center text-white text-[10px] font-bold"
        >
          {lang === 'en' ? 'EN' : 'DE'}
        </motion.div>
        <span className={`absolute text-[10px] font-bold text-white ${lang === 'en' ? 'left-1' : 'right-1'}`}>
          {lang === 'en' ? 'DE' : 'EN'}
        </span>
      </button>

      <div className="flex items-center gap-6">
        <a
          href="#projects"
          className={`text-sm font-medium transition-colors hover:text-[#E31E24] hidden md:block ${
            scrolled ? 'text-[#0a0a0a]' : 'text-white'
          }`}
        >
          {t('Projekte', 'Projects')}
        </a>
        <a
          href="#resume"
          className={`text-sm font-medium transition-colors hover:text-[#E31E24] hidden md:block ${
            scrolled ? 'text-[#0a0a0a]' : 'text-white'
          }`}
        >
          {t('Lebenslauf', 'Resume')}
        </a>
        <a
          href="#contact"
          className={`text-sm font-medium transition-colors hover:text-[#E31E24] ${
            scrolled ? 'text-[#0a0a0a]' : 'text-white'
          }`}
        >
          {t('Kontakt', 'Contact')}
        </a>
      </div>
    </motion.header>
  )
}
