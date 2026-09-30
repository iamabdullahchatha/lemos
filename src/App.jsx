import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Noise from '@/components/ui/Noise'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import ServiceDetail from '@/pages/ServiceDetail'
import Industries from '@/pages/Industries'
import Contact from '@/pages/Contact'
import Styleguide from '@/pages/Styleguide'
import NotFound from '@/pages/NotFound'

export default function App() {
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
