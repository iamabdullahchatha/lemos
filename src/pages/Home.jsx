import Hero from '@/components/home/Hero'
import Statement from '@/components/home/Statement'
import ServicesCards from '@/components/home/ServicesCards'
import AboutIntro from '@/components/home/AboutIntro'
import ProcessJourney from '@/components/home/ProcessJourney'
import IndustriesBento from '@/components/home/IndustriesBento'
import PillarsFlip from '@/components/home/PillarsFlip'
import TechnicalCapabilities from '@/components/home/TechnicalCapabilities'
import GalleryRing from '@/components/home/GalleryRing'
import FinalCta from '@/components/home/FinalCta'

export default function Home() {
  return (
    <>
      {/* 1 — Cinematic hero + floating stat cards */}
      <Hero />
      {/* 2 — Engineering / Fabrication / Execution */}
      <Statement />
      {/* 3 — Services as 3D cards */}
      <ServicesCards />
      {/* 4 — About, editorial */}
      <AboutIntro />
      {/* 5 — Process horizontal journey */}
      <ProcessJourney />
      {/* 6 — Industries bento */}
      <IndustriesBento />
      {/* 7 — Quality pillars, 3D flip cards */}
      <PillarsFlip />
      {/* 8 — Equipment & systems */}
      <TechnicalCapabilities />
      {/* 9 — 3D field gallery ring */}
      <GalleryRing />
      {/* 10 — Final CTA */}
      <FinalCta />
    </>
  )
}
