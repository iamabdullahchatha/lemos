import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { motion } from 'framer-motion'
import { lineParent, lineChild, fadeUp, EASE } from '@/lib/motion'

// Editorial header used on every inner route.
export default function PageHeader({ eyebrow, title, intro, meta }) {
  return (
    <section className="relative overflow-hidden bg-paper pt-[calc(var(--nav-h)+3.5rem)] pb-16 lg:pb-24">
      <Container>
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
        )}

        <motion.h1
          variants={lineParent}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-5xl text-display-lg font-extrabold text-ink"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={lineChild} className="block">
              {title}
            </motion.span>
          </span>
        </motion.h1>

        {intro && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
            className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-mute"
          >
            {intro}
          </motion.p>
        )}

        {meta && (
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
