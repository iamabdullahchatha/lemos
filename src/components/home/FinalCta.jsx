import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import { lineParent, lineChild, viewportOnce, EASE } from '@/lib/motion'
import { img, media } from '@/data/media'

const LINES = ['Ready to build', "what's next?"]

export default function FinalCta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy-950 text-paper"
    >
      {/* Parallax image layer */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[8%] h-[116%]">
        <img
          src={img(media.finalCta, 2200)}
          alt=""
          aria-hidden="true"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-navy-950/80" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/70" />

      {/* Corner ticks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-6 hidden md:block">
        <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-white/25" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-white/25" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-white/25" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-white/25" />
      </div>

      <Container className="relative z-10 py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow !text-amber justify-center"
        >
          <span className="h-px w-8 bg-amber/70" /> Let&apos;s talk scope
        </motion.p>

        <motion.h2
          variants={lineParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-7 max-w-4xl text-display-lg font-bold uppercase leading-[0.95] text-white"
        >
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={lineChild}
                className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mt-11 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-ember px-9 py-4 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-white transition-colors duration-400 hover:bg-ember-600"
          >
            Request a Quote
            <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 border border-white/30 px-9 py-4 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-white transition-colors duration-400 hover:border-white hover:bg-white/5"
          >
            Explore Our Services
            <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
