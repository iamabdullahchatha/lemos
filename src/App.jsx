import { lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Noise from '@/components/ui/Noise'

// Home ships in the main bundle (most visits land there); every other page is
// its own chunk, fetched on demand.
import Home from '@/pages/Home'

const pages = {
  about: () => import('@/pages/About'),
  services: () => import('@/pages/Services'),
  serviceDetail: () => import('@/pages/ServiceDetail'),
  industries: () => import('@/pages/Industries'),
  industryDetail: () => import('@/pages/IndustryDetail'),
  contact: () => import('@/pages/Contact'),
}
const About = lazy(pages.about)
const Services = lazy(pages.services)
const ServiceDetail = lazy(pages.serviceDetail)
const Industries = lazy(pages.industries)
const IndustryDetail = lazy(pages.industryDetail)
const Contact = lazy(pages.contact)
const Styleguide = lazy(() => import('@/pages/Styleguide'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Once the landing page has finished loading and the browser is idle, warm the
// other page chunks so navigating between pages is instant.
function usePrefetchPages() {
  useEffect(() => {
    let idleId
    const warm = () => Object.values(pages).forEach((load) => load().catch(() => {}))
    const schedule = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(warm, { timeout: 4000 })
        : window.setTimeout(warm, 2000)
    }
    const start = () => window.setTimeout(schedule, 1500)
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId)
    }
  }, [])
}

export default function App() {
  usePrefetchPages()
  return (
    <>
      <Noise />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
