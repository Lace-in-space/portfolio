'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [shake, setShake] = useState(false)
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (sessionStorage.getItem('portfolio-auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue === 'space-studio') {
      sessionStorage.setItem('portfolio-auth', 'true')
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  if (!mounted) {
    return null
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center px-6"
      >
        <motion.div
          animate={shake ? { x: [0, -15, 15, -10, 10, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-3"
          >
            LASSE MÜLLER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/40 text-sm tracking-widest uppercase mb-12"
          >
            Portfolio
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="password"
                value={inputValue}
                onChange={e => { setInputValue(e.target.value); setError(false) }}
                placeholder="Passwort eingeben"
                autoFocus
                className="w-full bg-transparent border-b-2 text-white py-3 text-lg text-center tracking-widest focus:border-[#5bffc2] focus:outline-none transition-colors placeholder:text-white/20"
                style={{
                  borderColor: error ? '#ff3b40' : 'rgba(255,255,255,0.15)',
                }}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#ff3b40] text-xs tracking-widest uppercase"
              >
                Falsches Passwort
              </motion.p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/10 text-white py-3 text-sm tracking-widest uppercase font-medium hover:bg-[#5bffc2] hover:text-white transition-colors duration-300 mt-4"
            >
              Betreten
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-white/15 text-xs mt-12 tracking-wide"
          >
            Nur für autorisierte Personen
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}