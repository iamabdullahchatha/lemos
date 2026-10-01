// ============================================================
// Image library — Lemos International
// ------------------------------------------------------------
// PROVISIONAL STOCK: license-free industrial photographs from
// Unsplash used as placeholders. They are NOT Lemos project
// photography — replace with the company's own imagery before
// launch. Every image component degrades to a branded
// placeholder if a URL fails to load.
//
// RULE: every photo ID appears in exactly one slot across the
// whole site. Never reuse an ID; add a new one instead.
// ============================================================

const BASE = 'https://images.unsplash.com'

// Build a sized Unsplash URL.
export const img = (id, w = 1600, q = 80) =>
  `${BASE}/${id}?w=${w}&q=${q}&auto=format&fit=crop`

// Single-use page imagery.
export const media = {
  hero: 'photo-1504328345606-18bbc8c9d7d1', // welder, blue sparks
  statement: 'photo-1569950044190-6d22b2693955', // steel cutting, bright sparks — warm & crisp
  homeAbout: 'photo-1742112125567-3e8967bad60f', // engineers reviewing plans on site
  pillars: 'photo-1509390288171-ce2088f7d08e', // power plant at night, full moon
  finalCta: 'photo-1768128834456-0bb2432f727a', // facility lit at night, reflection
  aboutHero: 'photo-1589939705384-5185137a7f0f', // worker cutting steel in workshop
  industriesHero: 'photo-1786532852011-443cba5dc9fe', // refinery tanks, golden light
  contactHero: 'photo-1647699352421-fb973ac01750', // industrial plant lit at night
  serviceCta: 'photo-1573153178631-49e3aa9e018b', // factory silhouette at night
}

// Home hero slideshow — media.hero leads, followed by four further scenes.
export const homeHeroSlides = [
  { id: media.hero, label: 'Fabrication', alt: 'Industrial fabrication — welding on a steel structure' },
  { id: 'photo-1633829131104-e2134f75c6e5', label: 'Offshore', alt: 'Offshore oil platform at sunset' },
  { id: 'photo-1745748420819-dd57cb012cf9', label: 'Refining', alt: 'Refinery storage tanks lit up at night' },
  { id: 'photo-1777915627530-fc3decb749cf', label: 'Processing', alt: 'Refinery complex at dusk with barges' },
  { id: 'photo-1648555394313-494797ad48fc', label: 'Upstream', alt: 'Jack-up drilling rigs at dusk' },
]

// Home page service cards.
export const serviceCardImages = {
  'mechanical-contracting': 'photo-1630683924997-fe27050a0416',
  'pipe-fabrication-installation': 'photo-1612438137269-70c848e102e1',
  'shutdowns-turnarounds': 'photo-1660446695706-ba4478934091',
  'structural-fabrication': 'photo-1609627016501-b862497c7294',
  'tanks-vessel-fabrication': 'photo-1602860109338-fbb8ed9b8068',
  'equipment-installation': 'photo-1707498633827-936bb448b513',
  'maintenance-services': 'photo-1595856898575-9d187bd32fd6',
  'skid-fabrication': 'photo-1513828742140-ccaa28f3eda0',
}

// Service detail page heroes.
export const serviceHeroes = {
  'mechanical-contracting': 'photo-1647735282077-c12699af40be',
  'pipe-fabrication-installation': 'photo-1593583810872-ddee4d6bd55a',
  'shutdowns-turnarounds': 'photo-1588011930968-eadac80e6a5a',
  'structural-fabrication': 'photo-1664789125256-41c58fe15b35',
  'tanks-vessel-fabrication': 'photo-1772376920846-8925e03c3fcf',
  'equipment-installation': 'photo-1516548850013-cc2901525f8c',
  'maintenance-services': 'photo-1765218933298-dc55fdfb517a',
  'skid-fabrication': 'photo-1513828646384-e4d8ec30d2bb',
}

// Service detail page inner editorial image.
export const serviceSecondary = {
  'mechanical-contracting': 'photo-1626885930974-4b69aa21bbf9',
  'pipe-fabrication-installation': 'photo-1639600993675-2281b2c939f0',
  'shutdowns-turnarounds': 'photo-1516937941344-00b4e0337589',
  'structural-fabrication': 'photo-1627922529156-41f27fb6f7ac',
  'tanks-vessel-fabrication': 'photo-1780783330922-4793269c13f7',
  'equipment-installation': 'photo-1524514587686-e2909d726e9b',
  'maintenance-services': 'photo-1786294112341-b86211513b92',
  'skid-fabrication': 'photo-1620203853151-496c7228306c',
}

// Services mega menu previews.
export const serviceMenuImages = {
  'mechanical-contracting': 'photo-1759922378222-47ad736a174d',
  'pipe-fabrication-installation': 'photo-1714901423336-1884cd3fb50f',
  'shutdowns-turnarounds': 'photo-1669484417691-7a04f1239678',
  'structural-fabrication': 'photo-1662120399978-738d233edbec',
  'tanks-vessel-fabrication': 'photo-1785234395765-4a82ba26c769',
  'equipment-installation': 'photo-1544367261-fdb53972abee',
  'maintenance-services': 'photo-1776254485148-879b2e4f4e58',
  'skid-fabrication': 'photo-1660543228680-748e1abd1f9e',
}

// Home page industry cards.
export const industryCardImages = {
  'oil-gas': 'photo-1749073668528-38ab64575f5d',
  petrochemical: 'photo-1768128834332-7d3479c8d634',
  refineries: 'photo-1678984239420-43cdc183bce6',
  'energy-power': 'photo-1659290542203-526261ddd9e9',
  industrial: 'photo-1647427060118-4911c9821b82',
}

// Industries mega menu previews.
export const industryMenuImages = {
  'oil-gas': 'photo-1758129949419-c296cead04c3',
  petrochemical: 'photo-1568066857905-5106db3c6120',
  refineries: 'photo-1781364486016-d83c39eb87f2',
  'energy-power': 'photo-1735571919545-5bbfd52b8f3d',
  industrial: 'photo-1496247749665-49cf5b1022e9',
}

// Industries page: interactive showcase backdrop.
export const industryImages = {
  'oil-gas': 'photo-1563118351-26b2c7381731',
  petrochemical: 'photo-1726111265336-6bf825e549ce',
  refineries: 'photo-1641652334014-85906a0397e4',
  'energy-power': 'photo-1691927458684-8b30380b9412',
  industrial: 'photo-1730584476141-232435a40c32',
}

// Industries page: per-sector detail blocks.
export const industryBlockImages = {
  'oil-gas': 'photo-1624771002998-4aadfd43e7c4',
  petrochemical: 'photo-1784911545613-391bb6853d00',
  refineries: 'photo-1780752849375-fd8df4632dae',
  'energy-power': 'photo-1702446736200-6b9a345dea6f',
  industrial: 'photo-1717386255773-1e3037c81788',
}

// About page capability rows.
export const aboutImages = {
  pipe: 'photo-1499815022134-5a333f5a299c',
  contracting: 'photo-1563166423-482a8c14b2d6',
  turnarounds: 'photo-1781492865227-932a0867a61f',
}

// Home "Equipment & systems" cards, keyed by capability label.
export const equipmentImages = {
  Pumps: 'photo-1693463735697-73df1f35930d',
  Compressors: 'photo-1737874132953-b39a4812875d',
  Generators: 'photo-1734675427617-b09602763c27',
  Boilers: 'photo-1512813759302-a44af29da3c1',
  'Heat Exchangers': 'photo-1678527973176-e53c88287c7e',
  'Pressure Vessels': 'photo-1635553117829-d39816ba6cfa',
  'Piping Systems': 'photo-1538474705339-e87de81450e8',
  'Industrial Machinery': 'photo-1563456021008-5cd6ac7c005d',
}

// About page: collage, safety band, values, sectors and CTA.
export const aboutPage = {
  collageMain: 'photo-1581094488379-6a10d04c0f04', // engineers pointing at drawings
  collageWorker: 'photo-1661545621129-0fc86efa2ea1', // worker in hard hat
  collageDrafting: 'photo-1503387762-592deb58ef4e', // drafting with ruler
  safety: 'photo-1567954970774-58d6aa6c50dc', // red hard hat on the ground
  cta: 'photo-1776937482510-b794a7d0c267', // hard hat at sunset, plant behind
}

export const valueImages = {
  Accountability: 'photo-1672954766589-49f0dd0e106f',
  Precision: 'photo-1581092160562-40aa08e78837',
  Safety: 'photo-1662447176130-60356c625453',
  Partnership: 'photo-1549923746-c502d488b3ea',
}

export const aboutSectorImages = {
  'oil-gas': 'photo-1572970388430-a7fff761e597',
  petrochemical: 'photo-1786532852258-8305f40f9925',
  refineries: 'photo-1678984240126-70bcddd7a228',
  'energy-power': 'photo-1731865747195-ecb66c1ccbda',
  industrial: 'photo-1624027492684-327af1fb7559',
}

// Contact page: form aside, next-steps and CTA.
export const contactPage = {
  form: 'photo-1661263989552-d82526d03b0f',
  stepBrief: 'photo-1503387837-b154d5074bd2',
  stepSite: 'photo-1581094480465-4e6c25fb4a52',
  stepProposal: 'photo-1758518730384-be3d205838e8',
  cta: 'photo-1693907986952-3cd372e4c9d8',
}

// Process-step imagery.
export const processImages = {
  planning: 'photo-1542621334-a254cf47733d',
  engineering: 'photo-1744627049721-73c27008ad28',
  fabrication: 'photo-1598302936625-6075fbd98dd7',
  installation: 'photo-1530639834082-05bafb67fbbe',
  testing: 'photo-1744302570296-d4bcb55b7002',
  maintenance: 'photo-1565954786194-d22abeaac3ae',
}

// Services index: hero and per-service cards.
export const servicesPage = {
  hero: 'photo-1455165814004-1126a7199f9b', // welder, blue arc close-up
  cards: {
    'mechanical-contracting': 'photo-1563456020159-b74d67e78c26',
    'pipe-fabrication-installation': 'photo-1529479627062-5f1f0b88912a',
    'shutdowns-turnarounds': 'photo-1582489851557-810dd5ce437a',
    'structural-fabrication': 'photo-1600965581129-eef8a214ec9d',
    'tanks-vessel-fabrication': 'photo-1790175138991-1898bd553ea4',
    'equipment-installation': 'photo-1521216894446-e6b5a19d17d6',
    'maintenance-services': 'photo-1748027869634-fc2e545cfb0c',
    'skid-fabrication': 'photo-1652785482935-b6450b5b47f9',
  },
  // "Built for demanding industries" sector cards.
  industries: {
    'oil-gas': 'photo-1722183704200-e96339975ba4', // offshore platform, open sea
    petrochemical: 'photo-1770832597530-f2c720e7bd27', // complex with steam stacks
    refineries: 'photo-1743723180480-243b89c5ebaa', // refinery by a river at dusk
    'energy-power': 'photo-1780396140802-52309c205050', // electrical substation
    industrial: 'photo-1671022442106-c787685d9fed', // structural steel stock
  },
}

// Service detail: equipment & systems feature image.
export const serviceEquipmentImages = {
  'mechanical-contracting': 'photo-1653379290878-1e839993509a',
  'pipe-fabrication-installation': 'photo-1631622483070-8ea904171f11',
  'shutdowns-turnarounds': 'photo-1759668987649-a2057d0a9f35',
  'structural-fabrication': 'photo-1493476523860-a6de6ce1b0c3',
  'tanks-vessel-fabrication': 'photo-1765405016584-0ad9f20e2ff9',
  'equipment-installation': 'photo-1730584475369-398711f8276e',
  'maintenance-services': 'photo-1738918927564-5476c98c62a1',
  'skid-fabrication': 'photo-1711571603473-6119c6ede1ee',
}

// Industries index CTA backdrop.
export const industriesCta = 'photo-1784915478051-0ea1342a00bc' // LNG tanks across the water

// Industry detail pages: hero, overview and one photo per application.
export const industryPages = {
  'oil-gas': {
    hero: 'photo-1600221574280-9bcd5d108100',
    overview: 'photo-1765005629275-110a02f16d65',
    apps: ['photo-1648369000096-109763c11e8e', 'photo-1565364507085-325347bae748', 'photo-1775580279270-574c001be3a5'],
  },
  petrochemical: {
    hero: 'photo-1566221857770-508d35ee6220',
    overview: 'photo-1733069348827-bb538b2a6a1f',
    apps: ['photo-1670689334799-cdc6777db8cc', 'photo-1513828583688-c52646db42da', 'photo-1634921490820-4f6df705223c'],
  },
  refineries: {
    hero: 'photo-1571524522669-99d0c9e7264d',
    overview: 'photo-1744301062835-b5b8fd23251b',
    apps: ['photo-1613903580946-6300f1f96b85', 'photo-1714504904786-b6732390b206', 'photo-1613620844865-ffb87d753609'],
  },
  'energy-power': {
    hero: 'photo-1591200834528-4050ce99fe78',
    overview: 'photo-1576053437895-4253b2d33985',
    apps: ['photo-1636867759143-c28c1e909bd3', 'photo-1756888218467-8fff8f3d423b', 'photo-1598621961279-557cec9ba744'],
  },
  industrial: {
    hero: 'photo-1655936073069-07b2c9dc2db6',
    overview: 'photo-1652204775379-2b4ace437a2d',
    apps: ['photo-1509024368907-57294758cfc5', 'photo-1659579740355-9fd915e0a9aa', 'photo-1564183063457-680b3759a5bd'],
  },
}

// Home page 3D field gallery.
export const galleryImages = [
  { id: 'photo-1609348632802-b952f368fc3a', label: 'Shop welding' },
  { id: 'photo-1629540946404-ebe133e99f49', label: 'Drilling rig' },
  { id: 'photo-1508465818649-14a170138405', label: 'Hot work' },
  { id: 'photo-1649587345666-0f4ad68aa723', label: 'Site mobilization' },
  { id: 'photo-1553048686-e3d0396506b9', label: 'Heavy lifting' },
  { id: 'photo-1620053265666-09baf5cf6a04', label: 'Pipeline routes' },
  { id: 'photo-1608126841830-53832c4b326f', label: 'Workshop' },
  { id: 'photo-1580561346873-4a76a13dce92', label: 'Coastal facility' },
]
