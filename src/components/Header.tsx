'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

export default function Header() {
  const { lang, toggleLanguage, t } = useLanguage()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
    >
      <button
        onClick={toggleLanguage}
        className="text-sm font-medium transition-colors hover:text-[#E31E24] uppercase tracking-widest"
        style={{ mixBlendMode: 'difference', color: 'white' }}
      >
        {lang === 'de' ? 'DE' : 'EN'}
      </button>

      <div className="flex items-center gap-6">
        <a
          href="#projects"
          className="text-sm font-medium transition-colors hover:text-[#E31E24] hidden md:block"
          style={{ mixBlendMode: 'difference', color: 'white' }}
        >
          {t('Projekte', 'Projects')}
        </a>
        <a
          href="#resume"
          className="text-sm font-medium transition-colors hover:text-[#E31E24] hidden md:block"
          style={{ mixBlendMode: 'difference', color: 'white' }}
        >
          {t('Lebenslauf', 'Resume')}
        </a>
        <a
          href="#contact"
          className="text-sm font-medium transition-colors hover:text-[#E31E24]"
          style={{ mixBlendMode: 'difference', color: 'white' }}
        >
          {t('Kontakt', 'Contact')}
        </a>
      </div>
    </motion.header>
  )
}
