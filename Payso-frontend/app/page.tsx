import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { StatsSection } from '@/components/stats-section'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { TotalVolumeSection } from '@/components/total-volume-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A3D] via-[#162447] to-[#0B1A3D]">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <WhyChooseUsSection />
        <TotalVolumeSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
