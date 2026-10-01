// Single source of truth for brand-level facts.
// Contact details below are client-verified (Dubai office).
// `email` is intentionally empty until a verified company address is provided
// — no fabricated business info.
export const site = {
  name: 'Lemos International',
  tagline: 'Oil & Gas Engineering & Contracting',
  descriptor:
    'International mechanical contracting and fabrication delivered to the highest industrial standards.',
  logo: '/brand/lemos-international-logo.webp',
  ogImage: '/brand/lemos-og-image.jpg',
  contact: {
    email: '', // TODO: verified company email (leave empty until confirmed)
    phone: '+971 4 288 3589',
    phoneHref: '+97142883589',
    addressLines: ['Office 1103, Park Avenue Building', 'Dubai Silicon Oasis', 'Dubai, United Arab Emirates'],
    address: 'Office 1103, Park Avenue Building, Dubai Silicon Oasis, Dubai, United Arab Emirates',
  },
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 5:00 PM' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  social: {
    linkedin: '', // TODO
  },
}
