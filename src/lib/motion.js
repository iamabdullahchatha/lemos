// ============================================================
// Motion language — Lemos International
// One set of primitives reused across every page.
// ============================================================
export const EASE = [0.22, 1, 0.36, 1] // editorial ease-out
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]

// --- Reveal / fade-up --------------------------------------
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
}

// --- Horizontal movement -----------------------------------
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
}
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
}

// --- Stagger orchestration ---------------------------------
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// --- Line-by-line clip reveal (headlines) ------------------
export const lineParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
export const lineChild = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
}

// --- Clip reveal (image / block wipe) ----------------------
export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, ease: EASE },
  },
}

// Paired inner zoom for image reveals
export const imageZoom = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.2, ease: EASE } },
}

// --- Line drawing (SVG / scaleX rules) ---------------------
export const drawLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: EASE } },
}

export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' }
