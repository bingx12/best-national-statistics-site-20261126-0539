// INDOSTAT data — figures for Indonesia, each with its year and publisher.
// Sources: Statistics Indonesia (BPS) — Statistik Indonesia 2025, Berita Resmi
// Statistik, Population Census 2020, population projections; Ministry of Health
// (SSGI / SKI); APJII; Ministry of Energy and Mineral Resources (ESDM).
// Every number below is a published figure; nothing here is invented. Where a
// series mixes methods, the note on the page says so.

export const META = {
  country: 'Indonesia',
  updated: 'Figures as published for 2024 (latest full year available at build time)',
  currency: 'IDR',
};

export const YEARS = [2020, 2021, 2022, 2023, 2024];

// Mid-year population estimates, millions (BPS; 2020 is the census count).
export const POPULATION = [
  { year: 2010, value: 237.64, note: 'Census 2010' },
  { year: 2015, value: 255.18, note: 'Intercensal survey 2015' },
  { year: 2020, value: 270.20, note: 'Census 2020' },
  { year: 2021, value: 272.25, note: 'Mid-year estimate' },
  { year: 2022, value: 275.77, note: 'Mid-year estimate' },
  { year: 2023, value: 278.69, note: 'Mid-year estimate' },
  { year: 2024, value: 281.60, note: 'Mid-year estimate' },
];

// Population by broad age group, 2024 estimate, percent of total (BPS projection).
export const AGE_GROUPS_2024 = [
  { group: '0–14 years', share: 24.4 },
  { group: '15–24 years', share: 16.6 },
  { group: '25–54 years', share: 43.0 },
  { group: '55–64 years', share: 9.0 },
  { group: '65+ years', share: 7.0 },
];

// Real GDP growth, % per year (BPS, constant 2010 prices).
export const GDP_GROWTH = [
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// GDP at current prices, Rp trillion (BPS).
export const GDP_NOMINAL = [
  { year: 2020, value: 15443.4 },
  { year: 2021, value: 16976.7 },
  { year: 2022, value: 19588.4 },
  { year: 2023, value: 20892.4 },
  { year: 2024, value: 22138.9 },
];

// GDP per capita, Rp million (BPS).
export const GDP_PER_CAPITA = [
  { year: 2020, value: 57.2 },
  { year: 2021, value: 62.4 },
  { year: 2022, value: 71.0 },
  { year: 2023, value: 75.0 },
  { year: 2024, value: 78.6 },
];

// Share of GDP by industry, 2024, % (BPS).
export const SECTORS_2024 = [
  { sector: 'Manufacturing', share: 18.67 },
  { sector: 'Wholesale & retail trade', share: 12.83 },
  { sector: 'Agriculture, forestry & fishing', share: 12.48 },
  { sector: 'Construction', share: 9.57 },
  { sector: 'Mining & quarrying', share: 8.36 },
  { sector: 'Transport & storage', share: 5.72 },
  { sector: 'Information & communication', share: 5.53 },
  { sector: 'Other services', share: 26.84 },
];

// Consumer price inflation, % year on year, December (BPS).
export const INFLATION = [
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Exports and imports of goods, US$ billion (BPS).
export const TRADE = [
  { year: 2020, exports: 163.19, imports: 141.57 },
  { year: 2021, exports: 231.61, imports: 196.2 },
  { year: 2022, exports: 291.98, imports: 237.45 },
  { year: 2023, exports: 258.82, imports: 221.89 },
  { year: 2024, exports: 264.7, imports: 233.66 },
];

// Poverty rate, % of population, September (BPS).
export const POVERTY = [
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// Open unemployment rate, % of labour force, August (BPS).
export const UNEMPLOYMENT = [
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Labour, August 2024 (BPS).
export const LABOUR_2024 = {
  labourForceMillions: 152.11,
  employedMillions: 144.64,
  unemployedMillions: 7.47,
  participationRate: 70.63,
  informalShare: 59.17,
  formalShare: 40.83,
};

// Life expectancy at birth, years (BPS). The 2023 figure uses updated life
// tables, so the 2022→2023 step is partly a method change, not only a gain.
export const LIFE_EXPECTANCY = [
  { year: 2020, value: 71.47 },
  { year: 2021, value: 71.57 },
  { year: 2022, value: 71.85 },
  { year: 2023, value: 73.55 },
  { year: 2024, value: 73.83 },
];

// Stunting prevalence among children under five, % (SSGI 2021–2022, SKI 2023, SSGI 2024).
export const STUNTING = [
  { year: 2021, value: 24.4 },
  { year: 2022, value: 21.6 },
  { year: 2023, value: 21.5 },
  { year: 2024, value: 19.8 },
];

// Human Development Index (BPS).
export const HDI = [
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 73.37 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Education, 2024 (BPS).
export const EDUCATION_2024 = {
  literacy15plus: 96.36,
  meanYearsSchooling: 9.04,
  expectedYearsSchooling: 13.37,
  primaryNetEnrolment: 99.09,
  juniorSecondaryNetEnrolment: 97.36,
  seniorSecondaryNetEnrolment: 70.85,
};

// Literacy rate, age 15+, % (BPS).
export const LITERACY = [
  { year: 2020, value: 95.9 },
  { year: 2021, value: 96.0 },
  { year: 2022, value: 96.08 },
  { year: 2023, value: 96.18 },
  { year: 2024, value: 96.36 },
];

// Provinces: population from Census 2020 (millions), land area (km², BPS),
// share of national population. 38 provinces since 2022 (four new ones in Papua).
export const PROVINCES = [
  { name: 'West Java', pop: 48.27, area: 35378, capital: 'Bandung' },
  { name: 'East Java', pop: 40.67, area: 47803, capital: 'Surabaya' },
  { name: 'Central Java', pop: 36.52, area: 32801, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 14.8, area: 72981, capital: 'Medan' },
  { name: 'Banten', pop: 11.91, area: 9663, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.56, area: 664, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.07, area: 46717, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.01, area: 34624, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 8.47, area: 91592, capital: 'Palembang' },
  { name: 'Riau', pop: 6.39, area: 87024, capital: 'Pekanbaru' },
  { name: 'West Sumatra', pop: 5.53, area: 42013, capital: 'Padang' },
  { name: 'West Kalimantan', pop: 5.41, area: 147307, capital: 'Pontianak' },
  { name: 'Aceh', pop: 5.27, area: 57957, capital: 'Banda Aceh' },
  { name: 'Bali', pop: 4.32, area: 5780, capital: 'Denpasar' },
  { name: 'South Kalimantan', pop: 4.07, area: 38744, capital: 'Banjarmasin' },
  { name: 'East Kalimantan', pop: 3.77, area: 129067, capital: 'Samarinda' },
  { name: 'Jambi', pop: 3.55, area: 50058, capital: 'Jambi' },
  { name: 'Papua', pop: 4.3, area: 319036, capital: 'Jayapura' },
  { name: 'Yogyakarta', pop: 3.67, area: 3133, capital: 'Yogyakarta' },
  { name: 'North Sulawesi', pop: 2.62, area: 13892, capital: 'Manado' },
];

// Key facts for the overview strip (all BPS unless noted).
export const KEY_FACTS = [
  { label: 'Population (2024)', value: '281.6m', sub: 'Mid-year estimate, BPS', route: '#/population' },
  { label: 'GDP (2024)', value: 'Rp 22,139tn', sub: 'Current prices, BPS', route: '#/economy' },
  { label: 'Real GDP growth (2024)', value: '5.03%', sub: 'Year on year, BPS', route: '#/economy' },
  { label: 'Poverty rate (Sep 2024)', value: '8.57%', sub: '25.22 million people, BPS', route: '#/labour' },
  { label: 'Unemployment (Aug 2024)', value: '4.91%', sub: 'Open unemployment rate, BPS', route: '#/labour' },
  { label: 'Life expectancy (2024)', value: '73.8 years', sub: 'At birth, BPS', route: '#/health' },
  { label: 'Human Development Index (2024)', value: '75.02', sub: 'High category, BPS', route: '#/education' },
  { label: 'Gini ratio (Sep 2024)', value: '0.379', sub: 'Income inequality, BPS', route: '#/labour' },
];

// Country profile facts (BPS / official sources).
export const PROFILE = {
  landAreaKm2: 1916907,
  islands: 17508,
  provinces: 38,
  regenciesCities: 514,
  density2024: 147,
  urbanShare2024: 58.6,
  medianAge2024: 30.4,
  foreignTourists2024: 13.9,
  internetUsers2024: 221.6,
  internetPenetration2024: 79.5,
  riceProduction2024: 30.34,
  coalProduction2024: 836,
};

export const SOURCES = [
  { name: 'Statistics Indonesia (BPS)', detail: 'Statistik Indonesia 2025; Berita Resmi Statistik 2024–2025; Population Census 2020; population projections 2020–2050. Population, GDP, inflation, trade, poverty, unemployment, labour, HDI, education and provincial figures.' },
  { name: 'Ministry of Health (Kemenkes)', detail: 'Indonesian Nutrition Status Survey (SSGI) 2021, 2022, 2024 and Indonesian Health Survey (SKI) 2023. Stunting prevalence among children under five.' },
  { name: 'APJII (Indonesian Internet Service Providers Association)', detail: 'Indonesia Internet Penetration Survey 2024 — 221.6 million users, 79.5% penetration.' },
  { name: 'Ministry of Energy and Mineral Resources (ESDM)', detail: 'Coal production 2024, about 836 million tonnes.' },
  { name: 'Bank Indonesia', detail: 'Exchange-rate and external-sector context for the trade figures.' },
];
