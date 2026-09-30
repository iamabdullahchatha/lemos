import Reveal from './Reveal'
import Eyebrow from './Eyebrow'

export default function SectionHeading({ eyebrow, title, intro, align = 'left' }) {
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'
  return (
    <div className={`flex max-w-3xl flex-col gap-6 ${alignCls}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal>
        <h2 className="text-display-md font-extrabold text-ink">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.08}>
          <p className="max-w-xl text-lg leading-relaxed text-ink-mute">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
