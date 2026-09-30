// ============================================================
// Image library — Lemos International
// ------------------------------------------------------------
// PROVISIONAL STOCK: these are real, license-free industrial
// photographs (Unsplash) used as placeholders. They are NOT
// Lemos project photography. Replace the IDs below with the
// company's own verified project imagery before launch.
// Every image component degrades to a branded placeholder if a
// URL fails to load, so nothing ever appears "broken".
// ============================================================

const BASE = 'https://images.unsplash.com'

// Build a sized Unsplash URL.
export const img = (id, w = 1600, q = 80) =>
  `${BASE}/${id}?w=${w}&q=${q}&auto=format&fit=crop`

// Verified, relevant photo IDs (industrial / oil & gas / energy).
const IDS = {
  welder: 'photo-1504328345606-18bbc8c9d7d1', // welder + sparks (cinematic)
  grinding: 'photo-1504917595217-d4dc5ebe6122', // grinding sparks on steel beam
  refinery: 'photo-1516937941344-00b4e0337589', // refinery / process facility
  piping: 'photo-1513828583688-c52646db42da', // stainless piping + pumps
  engineer: 'photo-1581091226825-a6a2a5aee158', // engineer in plant
  drawing: 'photo-1581092160562-40aa08e78837', // engineering drawing by hand
  siteWork: 'photo-1516357231954-91487b459602', // orange-PPE worker on rebar
  solar: 'photo-1497435334941-8c899ee9e8e9', // solar farm (aerial)
  wind: 'photo-1454779132693-e5cd0a216ed3', // wind turbines at sunset
  powerlines: 'photo-1466611653911-95081537e5b7', // transmission lines
  pylons: 'photo-1473341304170-971dccb5ac1e', // power pylons at sunset
  siteConstruction: 'photo-1504307651254-35680f356dfd', // site crew, PPE, rebar (install)
  robotAssembly: 'photo-1567789884554-0b844b597180', // robotic machine assembly line
}

// Unique cinematic hero per service page (8 distinct images, no repeats).
// tanks/skid use the closest verified industrial photo as a provisional
// placeholder — swap for Lemos project photography before launch.
export const serviceHeroes = {
  'mechanical-contracting': IDS.siteConstruction,
  'pipe-fabrication-installation': IDS.welder,
  'shutdowns-turnarounds': IDS.refinery,
  'structural-fabrication': IDS.grinding,
  'tanks-vessel-fabrication': IDS.piping,
  'equipment-installation': IDS.robotAssembly,
  'maintenance-services': IDS.engineer,
  'skid-fabrication': IDS.siteWork,
}

// A secondary image per service for inner editorial sections (distinct from hero).
export const serviceSecondary = {
  'mechanical-contracting': IDS.piping,
  'pipe-fabrication-installation': IDS.grinding,
  'shutdowns-turnarounds': IDS.siteConstruction,
  'structural-fabrication': IDS.siteWork,
  'tanks-vessel-fabrication': IDS.refinery,
  'equipment-installation': IDS.engineer,
  'maintenance-services': IDS.piping,
  'skid-fabrication': IDS.welder,
}

// Purpose-named exports (each a photo ID; size applied via img()).
export const media = {
  hero: IDS.welder,
  statement: IDS.refinery,
  about: IDS.engineer,
  finalCta: IDS.grinding,
  servicesHero: IDS.piping,
}

// One image per service (reused where appropriate).
export const serviceImages = {
  'mechanical-contracting': IDS.piping,
  'pipe-fabrication-installation': IDS.piping,
  'shutdowns-turnarounds': IDS.refinery,
  'structural-fabrication': IDS.grinding,
  'tanks-vessel-fabrication': IDS.refinery,
  'equipment-installation': IDS.piping,
  'maintenance-services': IDS.engineer,
  'skid-fabrication': IDS.welder,
}

// One image per industry.
export const industryImages = {
  'oil-gas': IDS.refinery,
  petrochemical: IDS.piping,
  refineries: IDS.refinery,
  'energy-power': IDS.powerlines,
  industrial: IDS.siteWork,
}

// Process-step imagery.
export const processImages = {
  planning: IDS.drawing,
  engineering: IDS.engineer,
  fabrication: IDS.welder,
  installation: IDS.siteWork,
  testing: IDS.piping,
  maintenance: IDS.refinery,
}
