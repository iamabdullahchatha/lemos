import Container from '@/components/ui/Container'
import PremiumButton from '@/components/ui/PremiumButton'
import Eyebrow from '@/components/ui/Eyebrow'

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-paper pt-[var(--nav-h)]">
      <Container>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-8 text-display-lg font-extrabold uppercase text-ink">
          Page not found
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-mute">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-10">
          <PremiumButton to="/" variant="ember">
            Back to home
          </PremiumButton>
        </div>
      </Container>
    </section>
  )
}
