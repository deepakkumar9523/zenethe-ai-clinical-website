import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero"
import { DoctorCarousel } from "@/components/PhotoCarousel"
import Challenge from "@/components/Challenge"
import GuidedSimulation from "@/components/GuidedSimulation"
import TrustedSources from "@/components/TrustedSources"
import Features from "@/components/Features"
import Pricing from "@/components/Pricing"
import FinalCtaFooter from "@/components/FinalCtaFooter"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Global Navigation */}
      <NavBar />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <main id="main-content" role="main">
        {/* Hero Section - Full viewport */}
        <Hero className="pt-16" />

        {/* Doctor Photo Carousel - Stylish showcase */}
        <DoctorCarousel />

        {/* Challenge Section - Spaced container */}
        <section className="py-20 bg-card">
          <div className="container max-w-6xl mx-auto px-6">
            <Challenge />
          </div>
        </section>

        {/* Guided Clinical Simulation - Centerpiece with full container */}
        <section id="guided-clinical-simulation" className="py-24 bg-background">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Experience Zenethe in Action
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Navigate a real clinical case with AI-powered insights, safety checks, 
                and evidence-based recommendations in under 60 seconds.
              </p>
            </div>
            <GuidedSimulation />
          </div>
        </section>

        {/* Trusted Sources - Clean spacing */}
        <section id="trusted-sources" className="py-20 bg-card">
          <div className="container max-w-6xl mx-auto px-6">
            <TrustedSources />
          </div>
        </section>

        {/* Core Features - Concise band */}
        <section className="py-20 bg-background">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Built for Modern Clinical Practice
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Three core capabilities that transform how clinicians access, 
                analyze, and apply medical knowledge.
              </p>
            </div>
            <Features />
          </div>
        </section>

        {/* Pricing Section - Toggle and plans */}
        <section id="pricing" className="py-24 bg-card">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Choose Your Plan
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Start with a 14-day free trial. No credit card required. 
                Cancel anytime during trial period.
              </p>
            </div>
            <Pricing />
          </div>
        </section>

        {/* Final CTA and Footer */}
        <FinalCtaFooter />
      </main>
    </div>
  )
}