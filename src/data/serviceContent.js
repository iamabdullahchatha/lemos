// ============================================================
// Per-service editorial content — Lemos International
// ------------------------------------------------------------
// Each of the eight services has individually authored content so
// every page reads as its own story while sharing one design system.
// Content is generic to mechanical contracting and the scope the
// client supplied — NO fabricated statistics, certifications, awards,
// clients, or named projects. Standards (e.g. ASME) are referenced as
// design frameworks, not as certification claims.
// ============================================================

export const serviceContent = {
  'mechanical-contracting': {
    accent: 'ember',
    visual: 'mechanical',
    heroKicker: 'Discipline 01',
    heroLines: ['Complete mechanical', 'contracting,', 'under one team.'],
    tagline: 'Full-scope mechanical contracting and industrial installation.',
    intro: {
      lead: 'Lemos International delivers complete mechanical contracting and industrial installation — carrying scope from engineering and fabrication through to on-site installation and commissioning support.',
      body: [
        'We act as a single accountable team across the mechanical package: coordinating fabrication, rigging, installation, and testing so responsibility never falls between contractors.',
        'The result is tighter schedules, cleaner interfaces, and mechanical works that are installed right the first time — to the standards demanding oil, gas, and industrial facilities require.',
      ],
    },
    capabilities: [
      { title: 'Mechanical package delivery', description: 'End-to-end delivery of the mechanical scope, from planning through installation and handover.' },
      { title: 'Industrial installation', description: 'Installation of piping, equipment, and structural systems across live and greenfield facilities.' },
      { title: 'Site coordination', description: 'Multidisciplinary coordination that keeps fabrication, rigging, and testing aligned on site.' },
      { title: 'Quality & safety management', description: 'Quality control and a safety-first method embedded through every phase of the work.' },
    ],
    applications: [
      'Process facility mechanical works',
      'Plant expansions and tie-ins',
      'Equipment and piping installation',
      'Structural and support installation',
    ],
    equipment: ['Process Piping', 'Pumps', 'Compressors', 'Heat Exchangers', 'Structural Steel', 'Industrial Machinery'],
    process: [
      { index: '01', title: 'Planning', description: 'Scope definition and mechanical planning aligned to facility requirements.' },
      { index: '02', title: 'Fabrication', description: 'Shop fabrication of spools, structures, and assemblies under quality control.' },
      { index: '03', title: 'Installation', description: 'Field installation, rigging, and mechanical works executed safely on site.' },
      { index: '04', title: 'Commissioning', description: 'Pre-commissioning checks and support ahead of return to service.' },
    ],
    industries: ['oil-gas', 'petrochemical', 'refineries', 'industrial'],
    faq: [
      { q: 'What does mechanical contracting cover?', a: 'The full mechanical scope of a facility — piping, equipment, and structural installation — delivered and coordinated under one accountable team.' },
      { q: 'Do you work on live facilities?', a: 'Yes. Work on operating plants is planned around production and executed under strict safety and permit-to-work discipline.' },
      { q: 'Can you carry a project end to end?', a: 'Yes — from planning and fabrication through installation and pre-commissioning support.' },
    ],
    related: ['pipe-fabrication-installation', 'equipment-installation', 'structural-fabrication'],
  },

  'pipe-fabrication-installation': {
    accent: 'amber',
    visual: 'piping',
    heroKicker: 'Discipline 02',
    heroLines: ['Precision piping,', 'fabricated', 'and installed.'],
    tagline: 'Pipe fabrication, installation, and industrial piping capabilities.',
    intro: {
      lead: 'From the fabrication shop to the field, Lemos International fabricates and installs process piping systems — welded to qualified procedures and tested for integrity.',
      body: [
        'Spools are fabricated under controlled shop conditions, then installed and tied in on site with dimensional accuracy that keeps commissioning on schedule.',
        'Carbon steel, alloy, and stainless piping are handled to recognized codes, with welding and inspection support that stands up to demanding service.',
      ],
    },
    capabilities: [
      { title: 'Shop spool fabrication', description: 'Controlled fabrication of pipe spools for predictable quality and faster field installation.' },
      { title: 'Field installation', description: 'On-site erection, tie-ins, and alignment of process piping systems.' },
      { title: 'Qualified welding', description: 'Welding carried out to qualified procedures across carbon steel, alloy, and stainless.' },
      { title: 'Testing & inspection', description: 'Hydrotesting and inspection support to verify integrity before start-up.' },
    ],
    applications: [
      'Process and utility piping',
      'Carbon steel piping systems',
      'Pipe spool fabrication',
      'Tie-ins and pipeline connections',
    ],
    equipment: ['Carbon Steel Pipe', 'Alloy & Stainless Pipe', 'Valves', 'Flanges & Fittings', 'Pipe Supports', 'Spools'],
    process: [
      { index: '01', title: 'Isometrics', description: 'Review of isometrics and material take-off ahead of fabrication.' },
      { index: '02', title: 'Fabrication', description: 'Shop spool fabrication and welding to qualified procedures.' },
      { index: '03', title: 'Installation', description: 'Field erection, tie-ins, and alignment on site.' },
      { index: '04', title: 'Testing', description: 'Hydrotesting and inspection support prior to commissioning.' },
    ],
    industries: ['oil-gas', 'petrochemical', 'refineries', 'energy-power'],
    faq: [
      { q: 'What piping materials do you handle?', a: 'Carbon steel, alloy, and stainless piping — fabricated and installed to recognized codes.' },
      { q: 'Do you fabricate spools off-site?', a: 'Yes. Shop fabrication under controlled conditions improves quality and shortens field installation time.' },
      { q: 'Is welding done to qualified procedures?', a: 'Yes — welding is carried out to qualified procedures with inspection and testing support.' },
    ],
    related: ['mechanical-contracting', 'skid-fabrication', 'shutdowns-turnarounds'],
  },

  'shutdowns-turnarounds': {
    accent: 'ember',
    visual: 'turnaround',
    heroKicker: 'Discipline 03',
    heroLines: ['Planned downtime,', 'compressed.', 'Back to production.'],
    tagline: 'Shutdown, turnaround, maintenance, and piping execution.',
    intro: {
      lead: 'Lemos International plans and executes shutdowns and turnarounds engineered to compress downtime and return facilities to production safely.',
      body: [
        'Turnarounds live or die on planning. We scope, schedule, and mobilize the workforce so peak-intensity work windows run to plan and interfaces stay under control.',
        'Repair, replacement, modification, and piping work are executed under tight safety and quality discipline — with a clear path back to service.',
      ],
    },
    capabilities: [
      { title: 'Turnaround planning', description: 'Detailed scoping and scheduling to make the most of every hour of downtime.' },
      { title: 'Workforce mobilization', description: 'Peak-workforce mobilization to deliver intensive scopes inside tight windows.' },
      { title: 'Repair & modification', description: 'Repair, replacement, and modification of mechanical and piping systems.' },
      { title: 'Return to service', description: 'Inspection, testing, and support to bring units back online safely.' },
    ],
    applications: [
      'Planned plant shutdowns',
      'Turnaround mechanical scopes',
      'Piping repair and replacement',
      'Unit modification works',
    ],
    equipment: ['Process Piping', 'Pressure Vessels', 'Heat Exchangers', 'Valves', 'Rotating Equipment', 'Structural Supports'],
    process: [
      { index: '01', title: 'Scope & plan', description: 'Turnaround scoping, planning, and detailed scheduling.' },
      { index: '02', title: 'Mobilize', description: 'Peak-workforce mobilization and site readiness.' },
      { index: '03', title: 'Execute', description: 'Repair, replacement, modification, and piping works.' },
      { index: '04', title: 'Return to service', description: 'Testing, inspection, and support back to production.' },
    ],
    industries: ['oil-gas', 'refineries', 'petrochemical', 'industrial'],
    faq: [
      { q: 'How do you reduce downtime?', a: 'Through detailed planning, scheduling, and workforce mobilization that make peak work windows run to plan.' },
      { q: 'What scopes are covered?', a: 'Repair, replacement, modification, and piping work across mechanical systems during the turnaround.' },
      { q: 'Do you support return to service?', a: 'Yes — inspection, testing, and pre-commissioning support to bring units back online safely.' },
    ],
    related: ['maintenance-services', 'pipe-fabrication-installation', 'equipment-installation'],
  },

  'structural-fabrication': {
    accent: 'amber',
    visual: 'structure',
    heroKicker: 'Discipline 04',
    heroLines: ['Structural steel,', 'built for', 'load and life.'],
    tagline: 'Industrial structural steel fabrication for heavy-duty environments.',
    intro: {
      lead: 'Lemos International fabricates industrial structural steel for platforms, supports, and structures built to carry load in demanding environments.',
      body: [
        'Every member is fabricated with dimensional control and finished with surface treatment suited to the service environment.',
        'From access platforms to equipment supports, our structural work is engineered for load, environment, and longevity — not just to fit, but to last.',
      ],
    },
    capabilities: [
      { title: 'Structural steel fabrication', description: 'Fabrication of beams, frames, and structural assemblies for industrial use.' },
      { title: 'Platforms & access', description: 'Platforms, walkways, and access structures built to carry load safely.' },
      { title: 'Surface treatment', description: 'Coating and surface treatment matched to the service environment.' },
      { title: 'Dimensional control', description: 'Dimensional accuracy that keeps site fit-up predictable and fast.' },
    ],
    applications: [
      'Access platforms and walkways',
      'Equipment supports and frames',
      'Pipe racks and structures',
      'Heavy-duty industrial structures',
    ],
    equipment: ['Structural Steel', 'Beams & Columns', 'Platforms', 'Pipe Racks', 'Supports', 'Handrails & Access'],
    process: [
      { index: '01', title: 'Detailing', description: 'Review of structural drawings and material preparation.' },
      { index: '02', title: 'Fabrication', description: 'Cutting, fitting, and welding with dimensional control.' },
      { index: '03', title: 'Finishing', description: 'Surface treatment and coating for the service environment.' },
      { index: '04', title: 'Delivery', description: 'Marking, load-out, and delivery ready for installation.' },
    ],
    industries: ['oil-gas', 'petrochemical', 'industrial', 'energy-power'],
    faq: [
      { q: 'What structures do you fabricate?', a: 'Platforms, supports, pipe racks, and heavy-duty industrial structures built for load and environment.' },
      { q: 'Do you handle coating?', a: 'Yes — surface treatment and coating are matched to the service environment.' },
      { q: 'How is quality controlled?', a: 'Through dimensional control during fabrication so site fit-up stays predictable.' },
    ],
    related: ['mechanical-contracting', 'tanks-vessel-fabrication', 'skid-fabrication'],
  },

  'tanks-vessel-fabrication': {
    accent: 'ember',
    visual: 'vessel',
    heroKicker: 'Discipline 05',
    heroLines: ['Tanks and vessels,', 'built to', 'the code.'],
    tagline: 'Industrial tanks and pressure vessels to recognized standards.',
    intro: {
      lead: 'Lemos International fabricates industrial tanks and pressure vessels — engineered to recognized design and quality standards for demanding service.',
      body: [
        'Our scope spans storage tanks, fuel tanks, water storage tanks, silos, and pressure vessels engineered to recognized codes such as ASME where applicable.',
        'Fabrication is backed by quality control, testing, and documentation so every tank and vessel is ready for the service it was designed for.',
      ],
    },
    capabilities: [
      { title: 'Storage tank fabrication', description: 'Fabrication of industrial storage, fuel, and water tanks, and silos.' },
      { title: 'Pressure vessel fabrication', description: 'Pressure vessels engineered to recognized codes such as ASME where applicable.' },
      { title: 'Quality control', description: 'Code-oriented quality control through fabrication and inspection.' },
      { title: 'Testing & documentation', description: 'Testing and documentation that confirm readiness for service.' },
    ],
    applications: [
      'Industrial and fuel storage tanks',
      'Water storage tanks and silos',
      'Pressure vessels',
      'ASME-oriented vessel fabrication',
    ],
    equipment: ['Storage Tanks', 'Fuel Tanks', 'Water Tanks', 'Silos', 'Pressure Vessels', 'ASME-Code Vessels'],
    process: [
      { index: '01', title: 'Design review', description: 'Review of vessel and tank design against recognized codes.' },
      { index: '02', title: 'Fabrication', description: 'Rolling, fitting, and welding under code-oriented quality control.' },
      { index: '03', title: 'Testing', description: 'Inspection and testing to confirm integrity.' },
      { index: '04', title: 'Documentation', description: 'Documentation package confirming readiness for service.' },
    ],
    industries: ['oil-gas', 'petrochemical', 'refineries', 'industrial'],
    faq: [
      { q: 'What do you fabricate?', a: 'Industrial tanks, fuel and water storage tanks, silos, and pressure vessels — including ASME-oriented vessels where applicable.' },
      { q: 'Are vessels built to code?', a: 'Vessels are engineered to recognized design and quality standards, such as ASME where applicable.' },
      { q: 'Is testing included?', a: 'Yes — inspection, testing, and documentation confirm readiness for service.' },
    ],
    related: ['structural-fabrication', 'equipment-installation', 'mechanical-contracting'],
  },

  'equipment-installation': {
    accent: 'amber',
    visual: 'machine',
    heroKicker: 'Discipline 06',
    heroLines: ['Set, aligned,', 'and', 'commissioned.'],
    tagline: 'Installation, alignment, and commissioning of industrial equipment.',
    intro: {
      lead: 'Lemos International installs, aligns, and commissions rotating and static equipment — set precisely and ready to run.',
      body: [
        'Pumps, compressors, generators, boilers, heat exchangers, and industrial machinery are rigged, set, and aligned with the precision reliable operation depends on.',
        'From foundation to pre-commissioning, we coordinate lifting, setting, and alignment so equipment starts up cleanly and stays running.',
      ],
    },
    capabilities: [
      { title: 'Equipment setting', description: 'Rigging and setting of static and rotating equipment onto foundations.' },
      { title: 'Precision alignment', description: 'Alignment carried out to the tolerances reliable operation requires.' },
      { title: 'Rigging & lifting', description: 'Lifting and rigging coordination for safe, controlled equipment moves.' },
      { title: 'Commissioning support', description: 'Pre-commissioning checks and support ahead of start-up.' },
    ],
    applications: [
      'Pumps and compressors',
      'Generators and boilers',
      'Heat exchangers',
      'Industrial machinery installation',
    ],
    equipment: ['Pumps', 'Compressors', 'Generators', 'Boilers', 'Heat Exchangers', 'Industrial Machinery'],
    process: [
      { index: '01', title: 'Preparation', description: 'Foundation checks and rigging planning.' },
      { index: '02', title: 'Setting', description: 'Rigging and setting of equipment onto foundations.' },
      { index: '03', title: 'Alignment', description: 'Precision alignment to required tolerances.' },
      { index: '04', title: 'Commissioning', description: 'Pre-commissioning checks and start-up support.' },
    ],
    industries: ['oil-gas', 'petrochemical', 'energy-power', 'industrial'],
    faq: [
      { q: 'What equipment do you install?', a: 'Pumps, compressors, generators, boilers, heat exchangers, and other industrial machinery.' },
      { q: 'Do you handle alignment?', a: 'Yes — precision alignment is carried out to the tolerances reliable operation requires.' },
      { q: 'Is commissioning supported?', a: 'Yes — pre-commissioning checks and support ahead of start-up.' },
    ],
    related: ['mechanical-contracting', 'skid-fabrication', 'maintenance-services'],
  },

  'maintenance-services': {
    accent: 'ember',
    visual: 'inspection',
    heroKicker: 'Discipline 07',
    heroLines: ['Kept reliable.', 'Kept', 'available.'],
    tagline: 'Preventive and corrective maintenance for industrial plants.',
    intro: {
      lead: 'Lemos International provides preventive and corrective maintenance that keeps mechanical systems, industrial equipment, and plants reliable and available.',
      body: [
        'Planned preventive maintenance reduces unplanned downtime; responsive corrective maintenance gets assets back online when issues arise.',
        'Our teams support the mechanical systems and equipment that industrial plants depend on — with reliability as the measure that matters.',
      ],
    },
    capabilities: [
      { title: 'Preventive maintenance', description: 'Planned maintenance programs that reduce unplanned downtime.' },
      { title: 'Corrective maintenance', description: 'Responsive corrective and breakdown maintenance to restore service.' },
      { title: 'Mechanical systems', description: 'Maintenance of mechanical systems and industrial equipment.' },
      { title: 'Plant reliability', description: 'Support focused on keeping industrial plants reliable and available.' },
    ],
    applications: [
      'Preventive maintenance programs',
      'Corrective and breakdown response',
      'Mechanical equipment servicing',
      'Industrial plant maintenance',
    ],
    equipment: ['Pumps', 'Compressors', 'Rotating Equipment', 'Process Piping', 'Heat Exchangers', 'Industrial Machinery'],
    process: [
      { index: '01', title: 'Assessment', description: 'Assessment of equipment condition and maintenance needs.' },
      { index: '02', title: 'Planning', description: 'Preventive maintenance planning around operations.' },
      { index: '03', title: 'Execution', description: 'Preventive and corrective maintenance on site.' },
      { index: '04', title: 'Reliability', description: 'Follow-up to keep assets reliable and available.' },
    ],
    industries: ['oil-gas', 'petrochemical', 'refineries', 'industrial'],
    faq: [
      { q: 'What maintenance do you provide?', a: 'Both preventive maintenance programs and responsive corrective maintenance for mechanical systems and equipment.' },
      { q: 'Do you cover whole plants?', a: 'Yes — maintenance of the mechanical systems and equipment industrial plants depend on.' },
      { q: 'How do you reduce downtime?', a: 'Planned preventive maintenance reduces unplanned failures; corrective response restores service quickly when needed.' },
    ],
    related: ['shutdowns-turnarounds', 'equipment-installation', 'mechanical-contracting'],
  },

  'skid-fabrication': {
    accent: 'amber',
    visual: 'skid',
    heroKicker: 'Discipline 08',
    heroLines: ['Modular packages,', 'tested', 'before they ship.'],
    tagline: 'Modular skid systems, fabricated and tested off-site.',
    intro: {
      lead: 'Lemos International fabricates modular skid packages — integrating piping and equipment off-site for fast, predictable installation in the field.',
      body: [
        'Pump skids, filtration skids, chemical injection skids, and other modular systems are built and tested as complete packages before they leave the shop.',
        'Factory acceptance testing means what arrives on site is ready to set and connect — compressing field work and reducing on-site risk.',
      ],
    },
    capabilities: [
      { title: 'Modular skid fabrication', description: 'Fabrication of complete, transportable skid-mounted packages.' },
      { title: 'Integrated piping & equipment', description: 'Piping and equipment integrated onto the skid as one package.' },
      { title: 'Factory acceptance testing', description: 'Testing off-site so packages arrive ready to install.' },
      { title: 'Install readiness', description: 'Transport and installation readiness for fast field set-up.' },
    ],
    applications: [
      'Pump skids',
      'Filtration skids',
      'Chemical injection skids',
      'Modular skid systems',
    ],
    equipment: ['Pump Skids', 'Filtration Skids', 'Chemical Injection Skids', 'Skid Piping', 'Instruments', 'Structural Skid Base'],
    process: [
      { index: '01', title: 'Design', description: 'Skid layout and package design review.' },
      { index: '02', title: 'Fabrication', description: 'Fabrication of the skid base, piping, and equipment integration.' },
      { index: '03', title: 'Testing', description: 'Factory acceptance testing of the complete package.' },
      { index: '04', title: 'Delivery', description: 'Transport and installation readiness for the field.' },
    ],
    industries: ['oil-gas', 'petrochemical', 'energy-power', 'industrial'],
    faq: [
      { q: 'What skids do you fabricate?', a: 'Pump skids, filtration skids, chemical injection skids, and other modular skid systems.' },
      { q: 'Why modular?', a: 'Off-site fabrication and testing compress field work and reduce on-site risk.' },
      { q: 'Are skids tested before delivery?', a: 'Yes — factory acceptance testing confirms packages are ready to set and connect.' },
    ],
    related: ['pipe-fabrication-installation', 'equipment-installation', 'mechanical-contracting'],
  },
}

export const getServiceContent = (slug) => serviceContent[slug]
