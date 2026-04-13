'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* Scroll phases (0 → 1 across 300vh):
     0.00–0.25  text fades in, video at 60%
     0.25–0.50  text fully visible, viewport "pauses" on section, video at 60%
     0.50–0.75  text fades out, video 60% → 100%
     0.75–1.00  video at 100%, scroll continues to next section
  */

  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [0.6, 0.6, 1])
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.5, 0.7], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.05, 0.25, 0.7], [60, 0, -80])
  const textScale = useTransform(scrollYProgress, [0.05, 0.25, 0.7], [0.85, 1, 1.05])

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">

        {/* ── Video layer (loop, muted, fullscreen) ── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: videoOpacity }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/storytelling-video.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* ── Text overlay ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="relative z-10 text-center px-8"
        >
          <h2 className="text-[8vw] font-bold text-white tracking-tighter select-none px-4">
            Storytelling
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
