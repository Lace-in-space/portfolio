'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type Language = 'de' | 'en'

interface LanguageContextType {
  lang: Language
  toggleLanguage: () => void
  t: (de: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('de')

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'de' ? 'en' : 'de')
  }, [])

  const t = useCallback((de: string, en: string) => {
    return lang === 'de' ? de : en
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
