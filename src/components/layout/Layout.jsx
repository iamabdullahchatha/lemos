import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import PageTransition from '@/components/ui/PageTransition'
import { useSmoothScroll } from '@/lib/useSmoothScroll'

function ScrollToTop({ pathname }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  useSmoothScroll()
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop pathname={pathname} />
      <Navbar />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
