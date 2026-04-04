'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

const CHARS = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=<>'

interface ScrambleOnChangeProps {
  text: string
  className?: string
  speed?: number
}

export default function ScrambleOnChange({ text, className = '', speed = 25 }: ScrambleOnChangeProps) {
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
    iterationRef.current = 0
    displayRef.current = text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    listenersRef.current.forEach(l => l())

    const interval = setInterval(() => {
      iterationRef.current += 0.5
      displayRef.current = text.split('').map((char, index) => {
        if (index < iterationRef.current) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')

      if (iterationRef.current >= text.length) {
        clearInterval(interval)
        displayRef.current = text
      }

      listenersRef.current.forEach(l => l())
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span className={className}>{displayText}</span>
}
