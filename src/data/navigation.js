// Primary navigation. `panel` marks items that open a mega menu / dropdown.
export const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services', panel: 'services' },
  { label: 'Industries', to: '/industries', panel: 'industries' },
  { label: 'Contact', to: '/contact' },
]

export const quoteCta = { label: 'Request a Quote', to: '/contact' }

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Industries', to: '/industries' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]
