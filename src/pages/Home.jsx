import Hero from '@/components/home/Hero'
import Statement from '@/components/home/Statement'
import CapabilitiesShowcase from '@/components/home/CapabilitiesShowcase'
import IndustrialExperience from '@/components/home/IndustrialExperience'
import AboutIntro from '@/components/home/AboutIntro'
import ProcessJourney from '@/components/home/ProcessJourney'
import IndustriesShowcase from '@/components/home/IndustriesShowcase'
import TechnicalCapabilities from '@/components/home/TechnicalCapabilities'
import FinalCta from '@/components/home/FinalCta'

export default function Home() {
  return (
    <>
      {/* 1 — Cinematic hero */}
      <Hero />
      {/* 2 — Engineering / Fabrication / Execution */}
      <Statement />
      {/* 3 — Interactive capabilities (8 services) */}
      <CapabilitiesShowcase />
      {/* 4 — 3D industrial experience (WebGL + fallback) */}
      <IndustrialExperience />
      {/* 5 — About, editorial */}
      <AboutIntro />
      {/* 6 — Process horizontal journey */}
      <ProcessJourney />
      {/* 7 — Industries, immersive */}
      <IndustriesShowcase />
      {/* 8 + 9 — Technical capabilities & quality pillars */}
      <TechnicalCapabilities />
      {/* 10 — Final CTA */}
      <FinalCta />
    </>
  )
}
