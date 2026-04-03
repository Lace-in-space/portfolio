'use client'

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
      style={{ mixBlendMode: 'difference' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => { if (lang !== 'de') toggleLanguage() }}
          className="text-sm font-medium uppercase tracking-widest transition-opacity"
          style={{
            color: 'white',
            opacity: lang === 'de' ? 1 : 0.7,
          }}
        >
          DE
        </button>
        <button
          onClick={() => { if (lang !== 'en') toggleLanguage() }}
          className="text-sm font-medium uppercase tracking-widest transition-opacity"
          style={{
            color: 'white',
            opacity: lang === 'en' ? 1 : 0.7,
          }}
        >
          EN
        </button>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="#projects"
          className="text-sm font-medium hidden md:block transition-opacity hover:opacity-70"
          style={{ color: 'white' }}
        >
          {t('Projekte', 'Projects')}
        </a>
        <a
          href="#resume"
          className="text-sm font-medium hidden md:block transition-opacity hover:opacity-70"
          style={{ color: 'white' }}
        >
          {t('Lebenslauf', 'Resume')}
        </a>
        <a
          href="#contact"
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: 'white' }}
        >
          {t('Kontakt', 'Contact')}
        </a>
      </div>
    </motion.header>
  )
}
