'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrambleText from './ScrambleText'
import { useEffect, useCallback } from 'react'

export default function AISection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden min-h-screen">
      {/* Matrix-like background */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <MatrixRain />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="text-sm tracking-widest uppercase text-white/40 mb-4 block">
            {t('Künstliche Intelligenz', 'Artificial Intelligence')}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
            {isInView ? (
              <ScrambleText
                text={t('KI & Design', 'AI & Design')}
                trigger={true}
              />
            ) : (
              t('KI & Design', 'AI & Design')
            )}
          </h2>
        </motion.div>

        {/* Desktop simulation */}
        <div className="relative w-full h-[60vh] md:h-[70vh] bg-[#111] rounded-lg border border-white/10 overflow-hidden">
          {/* Desktop wallpaper */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a2e] via-[#1a0a2e] to-[#0a1a2e]" />

          {/* Menu bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm flex items-center px-4 z-30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="ml-4 text-white/50 text-xs font-mono">ai-desktop</span>
          </div>

          {/* Draggable windows */}
          <DraggableWindow
            title="terminal"
            icon="⌨"
            initialPos={{ x: '5%', y: '15%' }}
            size={{ w: '45%', h: '55%' }}
          >
            <TerminalWindow />
          </DraggableWindow>

          <DraggableWindow
            title="neural-net"
            icon="🧠"
            initialPos={{ x: '52%', y: '12%' }}
            size={{ w: '40%', h: '40%' }}
          >
            <NeuralNetWindow />
          </DraggableWindow>

          <DraggableWindow
            title="output"
            icon="📊"
            initialPos={{ x: '30%', y: '55%' }}
            size={{ w: '45%', h: '30%' }}
          >
            <OutputWindow />
          </DraggableWindow>

          {/* Cable connections */}
          <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            <path
              d="M 25% 45% C 35% 35%, 45% 40%, 52% 30%"
              fill="none"
              stroke="#E31E24"
              strokeWidth="2"
              opacity="0.4"
              strokeDasharray="5,5"
            />
            <path
              d="M 72% 52% C 65% 60%, 60% 65%, 52% 70%"
              fill="none"
              stroke="#E31E24"
              strokeWidth="2"
              opacity="0.4"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

function DraggableWindow({
  children,
  title,
  icon,
  initialPos,
  size,
}: {
  children: React.ReactNode
  title: string
  icon: string
  initialPos: { x: string; y: string }
  size: { w: string; h: string }
}) {
  const [pos, setPos] = useState(initialPos)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const startPos = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    startPos.current = { ...pos }
  }, [pos])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      const xPx = parseFloat(startPos.current.x) / 100 * window.innerWidth + dx
      const yPx = parseFloat(startPos.current.y) / 100 * window.innerHeight + dy
      setPos({
        x: `${(xPx / window.innerWidth) * 100}%`,
        y: `${(yPx / window.innerHeight) * 100}%`,
      })
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="absolute bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/10 rounded-md overflow-hidden"
      style={{
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex: isDragging ? 25 : 10,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window title bar */}
      <div className="h-7 bg-black/40 flex items-center px-3 gap-2">
        <span className="text-xs">{icon}</span>
        <span className="text-white/50 text-[10px] font-mono">{title}</span>
      </div>
      <div className="p-3 h-[calc(100%-28px)] overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}

function TerminalWindow() {
  const [lines, setLines] = useState<string[]>([])
  const terminalLines = [
    '$ ai-generate --style minimal --theme portfolio',
    '> Initializing neural network...',
    '> Loading design patterns...',
    '> Generating layouts...',
    '> Applying typography rules...',
    '> Rendering output...',
    '> ✓ Design generation complete',
    '> Output saved to ./portfolio',
    '$ _',
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let i = 0
    const addLine = () => {
      if (i < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[i]])
        i++
        timeout = setTimeout(addLine, 800 + Math.random() * 600)
      }
    }
    const startTimeout = setTimeout(addLine, 1000)
    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="font-mono text-[10px] md:text-xs text-green-400/80 space-y-1 overflow-y-auto h-full">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {line}
        </motion.div>
      ))}
      <span className="inline-block w-2 h-3 bg-green-400/80 animate-pulse" />
    </div>
  )
}

function NeuralNetWindow() {
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
  }))

  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((other, j) => {
            const dist = Math.sqrt(
              Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
            )
            if (dist < 40) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${other.x}%`}
                  y2={`${other.y}%`}
                  stroke="#E31E24"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              )
            }
            return null
          })
        )}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="#E31E24"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={`${2 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

function OutputWindow() {
  const { t } = useLanguage()
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          98.7%
        </motion.div>
        <p className="text-white/40 text-xs mt-1">{t('Design-Güte', 'Design Quality')}</p>
      </div>
    </div>
  )
}

function MatrixRain() {
  const columns = 30
  const chars = 'アイウエオカキクケコ01010101'

  return (
    <div className="absolute inset-0 flex gap-1 justify-center overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
          className="text-green-400/30 font-mono text-[10px] whitespace-nowrap"
          style={{ opacity: 0.2 + Math.random() * 0.3 }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j}>{chars[Math.floor(Math.random() * chars.length)]}</div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
