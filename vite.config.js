import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Absolute site origin for social-share meta tags (WhatsApp ignores relative og:image URLs).
// Set SITE_URL (e.g. https://lemosinternational.com) to override; otherwise the public
// production domain is used. Per-deploy Vercel URLs are avoided: they can sit behind
// Vercel auth, which blocks link-preview crawlers.
const DEFAULT_SITE_URL = 'https://lemos-theta.vercel.app'

function resolveSiteUrl() {
  const raw = process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_SITE_URL
  return (/^https?:\/\//.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, '')
}

function siteUrl() {
  const url = resolveSiteUrl()
  return {
    name: 'lemos-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', url)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
