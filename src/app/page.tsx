'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import CustomCursor from '@/components/CustomCursor'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StorytellingSection from '@/components/StorytellingSection'
import ProjectsSection from '@/components/ProjectsSection'
import StatsSection from '@/components/StatsSection'
import InteractiveDots from '@/components/InteractiveDots'
import ResumeTimeline from '@/components/ResumeTimeline'
import QuoteSection from '@/components/QuoteSection'
import AISection from '@/components/AISection'
import GWASection from '@/components/GWASection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <LanguageProvider>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <StorytellingSection />
        <ProjectsSection />
        <StatsSection />
        <InteractiveDots />
        <ResumeTimeline />
        <QuoteSection />
        <AISection />
        <GWASection />
        <ContactSection />
      </main>
    </LanguageProvider>
  )
}
