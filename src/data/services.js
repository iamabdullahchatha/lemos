// Data-driven service catalogue. /services/:slug renders from this file,
// so all eight service pages share one template and content lives here.
export const services = [
  {
    slug: 'mechanical-contracting',
    index: '01',
    title: 'Mechanical Contracting',
    summary:
      'Full-scope mechanical contracting for oil, gas, and heavy industrial facilities — planned, fabricated, and installed under one accountable team.',
    scope: [
      'Mechanical package delivery',
      'On-site installation & commissioning support',
      'Multidisciplinary site coordination',
      'Quality and safety management',
    ],
  },
  {
    slug: 'pipe-fabrication-installation',
    index: '02',
    title: 'Pipe Fabrication & Installation',
    summary:
      'Precision spool fabrication and field installation of process piping systems, welded and tested to international codes.',
    scope: [
      'Shop spool fabrication',
      'Field piping installation',
      'Welding to qualified procedures',
      'Hydrotesting & inspection support',
    ],
  },
  {
    slug: 'shutdowns-turnarounds',
    index: '03',
    title: 'Shutdowns & Turnarounds',
    summary:
      'Planned shutdown and turnaround execution engineered to compress downtime and return facilities to production safely.',
    scope: [
      'Turnaround planning & scheduling',
      'Peak-workforce mobilization',
      'Repair, replacement & modification',
      'Return-to-service support',
    ],
  },
  {
    slug: 'structural-fabrication',
    index: '04',
    title: 'Structural Fabrication',
    summary:
      'Structural steel fabrication for platforms, supports, and industrial structures — built for load, environment, and longevity.',
    scope: [
      'Structural steel fabrication',
      'Platforms, access & supports',
      'Surface treatment & coating',
      'Dimensional control',
    ],
  },
  {
    slug: 'tanks-vessel-fabrication',
    index: '05',
    title: 'Tanks & Vessel Fabrication',
    summary:
      'Fabrication of storage tanks and pressure vessels to recognized design and quality standards for demanding service.',
    scope: [
      'Storage tank fabrication',
      'Pressure vessel fabrication',
      'Code-oriented quality control',
      'Testing & documentation',
    ],
  },
  {
    slug: 'equipment-installation',
    index: '06',
    title: 'Equipment Installation',
    summary:
      'Rigging, setting, and mechanical installation of rotating and static equipment with precision alignment.',
    scope: [
      'Static & rotating equipment setting',
      'Precision alignment',
      'Rigging & lifting coordination',
      'Pre-commissioning support',
    ],
  },
  {
    slug: 'maintenance-services',
    index: '07',
    title: 'Maintenance Services',
    summary:
      'Planned and responsive mechanical maintenance that keeps assets reliable, compliant, and available.',
    scope: [
      'Preventive maintenance',
      'Corrective & breakdown response',
      'Asset reliability support',
      'On-call site teams',
    ],
  },
  {
    slug: 'skid-fabrication',
    index: '08',
    title: 'Skid Fabrication',
    summary:
      'Modular skid packages fabricated and tested off-site for fast, predictable installation in the field.',
    scope: [
      'Modular skid fabrication',
      'Integrated piping & equipment',
      'Factory acceptance testing',
      'Transport & install readiness',
    ],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
