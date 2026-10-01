// Sectors served — derived from the company's stated domain (Oil & Gas
// mechanical contracting). PROVISIONAL: confirm against verified Lemos
// International content before launch; adjust or remove as needed.
export const industries = [
  {
    slug: 'oil-gas',
    index: '01',
    title: 'Oil & Gas',
    description: 'Upstream, midstream, and downstream facility engineering.',
    icon: 'oilgas',
  },
  {
    slug: 'petrochemical',
    index: '02',
    title: 'Petrochemical',
    description: 'Process plant fabrication and mechanical works.',
    icon: 'petrochemical',
  },
  {
    slug: 'refineries',
    index: '03',
    title: 'Refineries',
    description: 'Turnarounds, maintenance, and unit fabrication.',
    icon: 'refinery',
  },
  {
    slug: 'energy-power',
    index: '04',
    title: 'Energy & Power',
    description: 'Mechanical packages for energy generation assets.',
    icon: 'energy',
  },
  {
    slug: 'industrial',
    index: '05',
    title: 'Industrial Facilities',
    description: 'Structural and equipment installation at scale.',
    icon: 'industrial',
  },
]

// Per-industry detail — generic to the sector and Lemos's stated domain.
export const industryDetail = {
  'oil-gas': {
    applications: ['Upstream facilities', 'Midstream & pipelines', 'Downstream processing'],
    services: ['mechanical-contracting', 'pipe-fabrication-installation', 'shutdowns-turnarounds'],
  },
  petrochemical: {
    applications: ['Process plant fabrication', 'Mechanical works', 'Piping systems'],
    services: ['pipe-fabrication-installation', 'structural-fabrication', 'equipment-installation'],
  },
  refineries: {
    applications: ['Turnarounds & shutdowns', 'Unit fabrication', 'Maintenance'],
    services: ['shutdowns-turnarounds', 'maintenance-services', 'tanks-vessel-fabrication'],
  },
  'energy-power': {
    applications: ['Mechanical packages', 'Skid systems', 'Equipment installation'],
    services: ['skid-fabrication', 'equipment-installation', 'structural-fabrication'],
  },
  industrial: {
    applications: ['Structural installation', 'Equipment setting', 'Plant maintenance'],
    services: ['structural-fabrication', 'equipment-installation', 'maintenance-services'],
  },
}

// Industry detail pages — editorial copy generic to each sector and to
// mechanical contracting. NO fabricated projects, clients, figures or
// certifications.
export const industryPageContent = {
  'oil-gas': {
    heroLines: ['Mechanical works', 'for oil & gas', 'facilities.'],
    tagline: 'Fabrication, installation and turnaround support across upstream, midstream and downstream assets.',
    intro: {
      lead: 'Oil and gas facilities depend on mechanical systems that perform under pressure, in remote locations and around live hydrocarbons.',
      body: [
        'Lemos International supports these assets with mechanical contracting, process piping and turnaround execution — planned around production and delivered under one accountable team.',
        'From wellsite equipment to processing units, the work is fabricated under shop quality control and installed with strict permit-to-work discipline on site.',
      ],
    },
    appDetails: [
      'Mechanical installation and piping for production and wellsite facilities.',
      'Piping, tie-ins and station mechanical works along transport routes.',
      'Unit fabrication, maintenance and shutdown support for processing assets.',
    ],
    demands: [
      { title: 'Live hydrocarbon environments', description: 'Work planned around operating plant, with isolation and permit-to-work discipline.' },
      { title: 'Pressure-rated systems', description: 'Piping and equipment welded and tested to recognized codes before start-up.' },
      { title: 'Remote logistics', description: 'Shop-built spools and assemblies that reduce field hours and site congestion.' },
      { title: 'Downtime sensitivity', description: 'Shutdown scopes sequenced to return the facility to production safely.' },
    ],
  },
  petrochemical: {
    heroLines: ['Process plant', 'mechanical works,', 'built to spec.'],
    tagline: 'Fabrication, piping and equipment installation for petrochemical process units.',
    intro: {
      lead: 'Petrochemical plants combine dense process piping, rotating equipment and structures that must fit together precisely.',
      body: [
        'Lemos International fabricates and installs the mechanical systems behind process units — spools, supports, structures and equipment — with dimensional control from shop to field.',
        'Interfaces between disciplines are coordinated by one team, so tie-ins, alignment and testing stay on schedule.',
      ],
    },
    appDetails: [
      'Shop fabrication of spools, structures and assemblies for process units.',
      'Mechanical installation and modification works across operating plant.',
      'Process and utility piping fabricated, installed and tested for service.',
    ],
    demands: [
      { title: 'Material variety', description: 'Carbon steel, alloy and stainless handled to qualified welding procedures.' },
      { title: 'Congested layouts', description: 'Dimensional control so spools and supports fit first time in tight plot space.' },
      { title: 'Process continuity', description: 'Modifications and tie-ins planned around operating units.' },
      { title: 'Documentation', description: 'Inspection and test records prepared alongside the physical work.' },
    ],
  },
  refineries: {
    heroLines: ['Refinery', 'turnarounds &', 'maintenance.'],
    tagline: 'Turnaround execution, unit fabrication and mechanical maintenance for refining assets.',
    intro: {
      lead: 'Refineries run on tight turnaround windows, where every day offline matters and every scope must be ready before the unit comes down.',
      body: [
        'Lemos International plans and executes mechanical turnaround scopes, fabricates replacement components in advance and supports maintenance between outages.',
        'Peak workforces are mobilized against a coordinated plan so repairs, replacements and modifications close out safely and on time.',
      ],
    },
    appDetails: [
      'Planned shutdown scopes sequenced to compress downtime safely.',
      'Pre-fabricated piping, structures and vessels ready before the outage.',
      'Preventive and corrective mechanical maintenance between turnarounds.',
    ],
    demands: [
      { title: 'Fixed outage windows', description: 'Scopes planned and pre-fabricated so the critical path stays on schedule.' },
      { title: 'Peak mobilization', description: 'Workforce and equipment ramped up against a coordinated execution plan.' },
      { title: 'Ageing assets', description: 'Repair, replacement and modification of in-service mechanical systems.' },
      { title: 'Safe return to service', description: 'Inspection, testing and handover support before start-up.' },
    ],
  },
  'energy-power': {
    heroLines: ['Mechanical', 'packages for', 'energy assets.'],
    tagline: 'Skid packages, structures and equipment installation for power generation facilities.',
    intro: {
      lead: 'Power generation assets rely on mechanical packages that are installed precisely and maintained for long, reliable service.',
      body: [
        'Lemos International fabricates modular skids and supporting structures off-site, then sets, aligns and installs equipment in the field.',
        'Building more of the scope in the shop shortens site schedules and keeps installation predictable.',
      ],
    },
    appDetails: [
      'Mechanical packages fabricated and installed for generation facilities.',
      'Modular skids with integrated piping and equipment, tested before shipping.',
      'Setting and alignment of rotating and static equipment on site.',
    ],
    demands: [
      { title: 'Availability', description: 'Installation and maintenance planned to keep generation assets online.' },
      { title: 'Precision alignment', description: 'Rotating equipment set and aligned for reliable long-term operation.' },
      { title: 'Modular delivery', description: 'Skid packages built and tested off-site for faster field installation.' },
      { title: 'Structural support', description: 'Platforms, frames and supports fabricated for load and environment.' },
    ],
  },
  industrial: {
    heroLines: ['Structural &', 'equipment works', 'at scale.'],
    tagline: 'Structural steel, equipment setting and plant maintenance for industrial facilities.',
    intro: {
      lead: 'Industrial facilities need structures, equipment and maintenance support that keep production lines running.',
      body: [
        'Lemos International fabricates structural steel, installs equipment and provides planned and responsive maintenance across industrial plants.',
        'One accountable team coordinates fabrication, rigging and installation so new equipment is brought into service with minimal disruption.',
      ],
    },
    appDetails: [
      'Structural steel frames, platforms and supports fabricated and erected.',
      'Rigging, setting and alignment of production equipment.',
      'Preventive and breakdown maintenance to keep plant available.',
    ],
    demands: [
      { title: 'Production uptime', description: 'Installation and maintenance planned around operating schedules.' },
      { title: 'Heavy lifts', description: 'Rigging and lifting coordinated for safe equipment setting.' },
      { title: 'Structural integrity', description: 'Steelwork fabricated with dimensional control and surface protection.' },
      { title: 'Lifecycle support', description: 'Maintenance teams that stay with the asset after handover.' },
    ],
  },
}

export const getIndustry = (slug) => industries.find((i) => i.slug === slug)
