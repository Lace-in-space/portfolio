'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrambleText from './ScrambleText'

interface Tool {
  name: string
  abbr: string
  color: string
}

const tools: Tool[] = [
  { name: 'Premiere Pro', abbr: 'Pr', color: '#9999FF' },
  { name: 'After Effects', abbr: 'Ae', color: '#9999FF' },
  { name: 'Photoshop', abbr: 'Ps', color: '#31A8FF' },
  { name: 'Illustrator', abbr: 'Ai', color: '#FF9A00' },
  { name: 'InDesign', abbr: 'Id', color: '#FF3366' },
  { name: 'Lightroom', abbr: 'Lr', color: '#31A8FF' },
  { name: 'Figma', abbr: 'Fi', color: '#A259FF' },
  { name: 'Blender', abbr: 'Bl', color: '#EA7600' },
  { name: 'Cinema 4D', abbr: 'C4', color: '#011A6A' },
  { name: 'DaVinci Resolve', abbr: 'DR', color: '#E31E24' },
  { name: 'Audition', abbr: 'Au', color: '#9999FF' },
  { name: 'Sketch', abbr: 'Sk', color: '#F7B500' },
  { name: 'After Effects', abbr: 'Ae', color: '#9999FF' },
  { name: 'XD', abbr: 'Xd', color: '#FF61F6' },
  { name: 'React', abbr: 'Re', color: '#61DAFB' },
  { name: 'HTML/CSS', abbr: 'HT', color: '#E34F26' },
  { name: 'JavaScript', abbr: 'JS', color: '#F7DF1E' },
]

export default function InteractiveDots() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: -1000, y: -1000 })
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm tracking-widest uppercase text-[#0a0a0a]/40 mb-4 block">
            {t('Werkzeuge', 'Tools')}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tighter">
            {isInView ? (
              <ScrambleText
                text={t('Software & Tools', 'Software & Tools')}
                trigger={true}
              />
            ) : (
              t('Software & Tools', 'Software & Tools')
            )}
          </h2>
        </motion.div>

        <div
          ref={containerRef}
          className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {tools.map((tool, index) => (
            <ToolDot key={`${tool.name}-${index}`} tool={tool} mousePos={mousePos} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ToolDot({ tool, mousePos, index, isInView }: { tool: Tool; mousePos: { x: number; y: number }; index: number; isInView: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null)
  const [dotCenter, setDotCenter] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updatePosition = () => {
      if (dotRef.current) {
        const rect = dotRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  useEffect(() => {
    if (dotRef.current) {
      const rect = dotRef.current.getBoundingClientRect()
      const parent = dotRef.current.parentElement
      if (parent) {
        const parentRect = parent.getBoundingClientRect()
        setDotCenter({
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top + rect.height / 2,
        })
      }
    }
  }, [dimensions])

  const distance = Math.sqrt(
    Math.pow(mousePos.x - dotCenter.x, 2) + Math.pow(mousePos.y - dotCenter.y, 2)
  )
  const maxDist = 150
  const proximity = Math.max(0, 1 - distance / maxDist)
  const scale = 1 + proximity * 0.4
  const showTooltip = proximity > 0.3

  return (
    <motion.div
      ref={dotRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
    >
      <div
        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base cursor-default transition-transform duration-200"
        style={{
          backgroundColor: tool.color,
          transform: `scale(${scale})`,
          boxShadow: proximity > 0 ? `0 0 ${proximity * 20}px ${tool.color}40` : 'none',
        }}
      >
        {tool.abbr}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
          {tool.name}
        </div>
      )}
    </motion.div>
  )
}
