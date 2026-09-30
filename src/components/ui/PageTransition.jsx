import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

// Wraps a route's content for enter/exit transitions.
// Paired with AnimatePresence + a location key in App.
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
