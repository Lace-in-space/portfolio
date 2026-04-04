'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

const CHARS = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=<>'

interface ScrambleTextProps {
  text: string
  className?: string
  speed?: number
  revealDelay?: number
  trigger?: boolean
}

export default function ScrambleText({ text, className = '', speed = 30, revealDelay = 40, trigger = true }: ScrambleTextProps) {
  const displayRef = useRef(text)
  const iterationRef = useRef(text.length)
  const listenersRef = useRef<Set<() => void>>(new Set())

  const getSnapshot = () => displayRef.current
  const getServerSnapshot = () => text
  const subscribe = (listener: () => void) => {
    listenersRef.current.add(listener)
    return () => listenersRef.current.delete(listener)
  }

  const displayText = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    if (!trigger) {
      displayRef.current = text
      iterationRef.current = text.length
      listenersRef.current.forEach(l => l())
      return
    }

    iterationRef.current = 0
    displayRef.current = text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    listenersRef.current.forEach(l => l())

    const interval = setInterval(() => {
      displayRef.current = text.split('').map((char, index) => {
        if (index < iterationRef.current) {
          return char
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')

      iterationRef.current += 1 / revealDelay

      if (iterationRef.current >= text.length) {
        clearInterval(interval)
        displayRef.current = text
      }

      listenersRef.current.forEach(l => l())
    }, speed)

    return () => clearInterval(interval)
  }, [text, trigger, speed, revealDelay])

  return <span className={className}>{displayText}</span>
}
