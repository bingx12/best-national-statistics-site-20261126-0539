// Page renderers for INDOSTAT. Each view returns HTML for #app; main.js binds
// the controls. All figures come from data.js and carry their year and source.

import {
  POPULATION, AGE_GROUPS_2024, GDP_GROWTH, GDP_NOMINAL, GDP_PER_CAPITA,
  SECTORS_2024, INFLATION, TRADE, POVERTY, UNEMPLOYMENT, LABOUR_2024,
  LIFE_EXPECTANCY, STUNTING, HDI, EDUCATION_2024, LITERACY, PROVINCES,
  KEY_FACTS, PROFILE, SOURCES, YEARS,
} from './data.js';
import { barChart, lineChart, hbarChart, donut } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt1 = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmt2 = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function kpiCard(f) {
  return `<a class="kpi" href="${f.route}"><span class="kpi-label">${esc(f.label)}</span><span class="kpi-value">${esc(f.value)}</span><span class="kpi-sub">${esc(f.sub)}</span></a>`;
}

function yearOptions(selected) {
  return YEARS.map((y) => `<option value="${y}"${y === selected ? ' selected' : ''}>${y}</option>`).join('');
}

function sourceLine(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

export function overview(state) {
  const y = state.year;
  const pop = POPULATION.find((p) => p.year === y);
  const growth = GDP_GROWTH.find((p) => p.year === y);
  const gdp = GDP_NOMINAL.find((p) => p.year === y);
  const pc = GDP_PER_CAPITA.find((p) => p.year === y);
  const pov = POVERTY.find((p) => p.year === y);
  const un = UNEMPLOYMENT.find((p) => p.year === y);
  return `
  <section class="hero">
    <p class="eyebrow">National statistics of Indonesia &middot; 2024 edition</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">One country, 281.6 million people, 38 provinces and 17,508 islands —
    explored through the figures Statistics Indonesia (BPS) publishes. Pick a year,
    open a section, and every number shows its source.</p>
    <label class="year-pick">Year
      <select id="year-select" data-action="year">${yearOptions(y)}</select>
    </label>
  </section>
  <section class="kpi-grid">${KEY_FACTS.map(kpiCard).join('')}</section>
  <section class="panel-grid">
    <article class="panel">
      <h2>Population, ${y}</h2>
      <p class="big-number">${pop.value.toFixed(2)} <span>million</span></p>
      <p>Indonesia is the world's fourth most populous country. The 2020 census counted
      270.20 million people; the mid-year estimate for ${y} is ${pop.value.toFixed(2)} million
      (${esc(pop.note.toLowerCase())}).</p>
      <p><a class="btn" href="#/population">Explore population &rarr;</a></p>
    </article>
    <article class="panel">
      <h2>Economy, ${y}</h2>
      <p class="big-number">${growth.value > 0 ? '+' : ''}${fmt2(growth.value)}% <span>real GDP growth</span></p>
      <p>GDP at current prices: Rp ${fmt1(gdp.value)} trillion &mdash; Rp ${fmt1(pc.value)} million
      per person. Growth has held at about 5% a year since the 2021 recovery.</p>
      <p><a class="btn" href="#/economy">Explore the economy &rarr;</a></p>
    </article>
    <article class="panel">
      <h2>People, ${y}</h2>
      <p class="big-number">${fmt2(pov.value)}% <span>in poverty</span> &middot; ${fmt2(un.value)}% <span>unemployed</span></p>
      <p>Poverty fell to 8.57% in September ${y} — its lowest in the series — while open
      unemployment eased to ${fmt2(un.value)}% in August ${y}.</p>
      <p><a class="btn" href="#/labour">Explore labour &amp; poverty &rarr;</a></p>
    </article>
  </section>
  <section class="panel">
    <h2>Population growth, 2010–2024</h2>
    ${barChart(POPULATION.map((p) => ({ label: String(p.year), value: p.value })), { unit: 'm', decimals: 1, highlightLast: true })}
    ${sourceLine('BPS: Census 2010, Census 2020, intercensal survey 2015, mid-year estimates 2021–2024.')}
  </section>
  <section class="panel">
    <h2>Real GDP growth, 2020–2024</h2>
    ${lineChart(GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2 })}
    ${sourceLine('BPS, constant 2010 prices. 2020 is the pandemic contraction; growth returned to about 5% from 2022.')}
  </section>
  <section class="panel">
    <h2>Country profile</h2>
    <dl class="facts">
      <div><dt>Land area</dt><dd>${PROFILE.landAreaKm2.toLocaleString('en-US')} km&sup2;</dd></div>
      <div><dt>Islands</dt><dd>${PROFILE.islands.toLocaleString('en-US')}</dd></div>
      <div><dt>Provinces</dt><dd>${PROFILE.provinces} (since 2022)</dd></div>
      <div><dt>Regencies &amp; cities</dt><dd>${PROFILE.regenciesCities}</dd></div>
      <div><dt>Population density (2024)</dt><dd>${PROFILE.density2024} people / km&sup2;</dd></div>
      <div><dt>Urban population (2024)</dt><dd>${PROFILE.urbanShare2024}%</dd></div>
      <div><dt>Median age (2024)</dt><dd>${PROFILE.medianAge2024} years</dd></div>
      <div><dt>Foreign visitors (2024)</dt><dd>${PROFILE.foreignTourists2024} million</dd></div>
      <div><dt>Internet users (2024)</dt><dd>${PROFILE.internetUsers2024} million (${PROFILE.internetPenetration2024}%)</dd></div>
    </dl>
    ${sourceLine('BPS, Statistik Indonesia 2025; APJII 2024 for internet users.')}
    <p><a class="btn" href="#/regions">See the provinces &rarr;</a> <a class="btn ghost" href="#/sources">All sources</a></p>
  </section>`;
}

export function populationView() {
  return `
  <section class="hero slim"><p class="eyebrow">People</p><h1>Population &amp; demographics</h1>
  <p class="lede">281.6 million people in 2024, spread over 17,508 islands — and more than half of them on Java.</p></section>
  <section class="panel-grid">
    <article class="panel">
      <h2>How the population grew</h2>
      ${barChart(POPULATION.map((p) => ({ label: String(p.year), value: p.value })), { unit: 'm', decimals: 1, highlightLast: true })}
      ${sourceLine('BPS: censuses 2010 and 2020, intercensal survey 2015, mid-year estimates 2021–2024.')}
    </article>
    <article class="panel">
      <h2>Age structure, 2024</h2>
      ${hbarChart(AGE_GROUPS_2024.map((g) => ({ label: g.group, value: g.share })), { unit: '%', decimals: 1 })}
      <p>Indonesia is still young: about a quarter of the population is under 15, and the
      median age is 30.4 years. The working-age share (15–64) is about 69%.</p>
      ${sourceLine('BPS population projection 2020–2050.')}
    </article>
  </section>
  <section class="panel">
    <h2>Where people live</h2>
    <p>Java holds about 56% of the population on about 7% of the land. The five largest
    provinces alone hold more than half the country.</p>
    ${hbarChart(PROVINCES.slice(0, 8).map((p) => ({ label: p.name, value: p.pop })), { unit: 'm', decimals: 2, color: '#0f2a43' })}
    ${sourceLine('BPS, Population Census 2020.')}
    <p><a class="btn" href="#/regions">Full province table &rarr;</a></p>
  </section>
  <section class="panel">
    <h2>Density</h2>
    <p>National density is 147 people per km&sup2;, but it ranges from about 16,000 per km&sup2;
    in Jakarta to under 15 per km&sup2; in Papua. The contrast is the story of Indonesian
    geography: crowded Java, empty eastern islands.</p>
    ${donut(PROFILE.urbanShare2024, 'urban')}
    <p class="donut-cap">58.6% of Indonesians lived in urban areas in 2024 (BPS).</p>
  </section>`;
}

export function economyView(state) {
  const chart = state.econChart === 'line'
    ? lineChart(GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2 })
    : barChart(GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2 });
  const tradeRows = TRADE.map((t) => `<tr><td>${t.year}</td><td>${fmt2(t.exports)}</td><td>${fmt2(t.imports)}</td><td class="${t.exports - t.imports >= 0 ? 'pos' : 'neg'}">${t.exports - t.imports >= 0 ? '+' : ''}${fmt2(t.exports - t.imports)}</td></tr>`).join('');
  return `
  <section class="hero slim"><p class="eyebrow">Economy</p><h1>The economy</h1>
  <p class="lede">Rp 22,139 trillion of GDP in 2024 — Southeast Asia's largest economy — growing about 5% a year.</p></section>
  <section class="panel-grid">
    <article class="panel">
      <h2>Real GDP growth, 2020–2024</h2>
      <div class="toggle" role="group" aria-label="Chart type">
        <button data-action="econ-chart" data-value="bar" class="${state.econChart === 'bar' ? 'on' : ''}">Bars</button>
        <button data-action="econ-chart" data-value="line" class="${state.econChart === 'line' ? 'on' : ''}">Line</button>
      </div>
      ${chart}
      ${sourceLine('BPS, constant 2010 prices.')}
    </article>
    <article class="panel">
      <h2>GDP per person, Rp million</h2>
      ${lineChart(GDP_PER_CAPITA.map((p) => ({ label: String(p.year), value: p.value })), { unit: '', decimals: 1, color: '#e8a33d' })}
      <p>GDP per capita rose from Rp 57.2 million in 2020 to Rp 78.6 million in 2024 —
      about US$4,960 at the year's average exchange rate.</p>
      ${sourceLine('BPS, current prices.')}
    </article>
  </section>
  <section class="panel">
    <h2>What the economy is made of, 2024</h2>
    ${hbarChart(SECTORS_2024.map((s) => ({ label: s.sector, value: s.share })), { unit: '%', decimals: 2 })}
    <p>Manufacturing is the largest single industry at 18.67% of GDP, ahead of trade (12.83%)
    and agriculture (12.48%). "Other services" groups finance, government, health, education
    and the rest.</p>
    ${sourceLine('BPS, GDP by industry at current prices, 2024.')}
  </section>
  <section class="panel-grid">
    <article class="panel">
      <h2>Trade in goods, US$ billion</h2>
      <table class="data"><thead><tr><th>Year</th><th>Exports</th><th>Imports</th><th>Balance</th></tr></thead><tbody>${tradeRows}</tbody></table>
      <p>Indonesia has run a goods surplus every year since 2020 — US$31.0 billion in 2024.</p>
      ${sourceLine('BPS.')}
    </article>
    <article class="panel">
      <h2>Inflation, % year on year</h2>
      ${barChart(INFLATION.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2, color: '#0f2a43' })}
      <p>Inflation spiked to 5.51% in 2022 on fuel-price and food pressures, then fell back to
      1.57% in 2024 — inside Bank Indonesia's 1.5–3.5% target range.</p>
      ${sourceLine('BPS, December year-on-year CPI.')}
    </article>
  </section>
  <section class="panel">
    <h2>Also in 2024</h2>
    <dl class="facts">
      <div><dt>Rice production</dt><dd>30.34 million tonnes (BPS)</dd></div>
      <div><dt>Coal production</dt><dd>836 million tonnes (ESDM) — a record year</dd></div>
      <div><dt>Foreign visitors</dt><dd>13.90 million (BPS)</dd></div>
      <div><dt>Trade surplus</dt><dd>US$31.04 billion (BPS)</dd></div>
    </dl>
  </section>`;
}

export function regionsView(state) {
  const q = state.regionQuery.trim().toLowerCase();
  let rows = PROVINCES.map((p) => ({
    ...p,
    density: p.pop * 1000000 / p.area,
    share: (p.pop / 270.2) * 100,
  }));
  if (q) rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  const sortKey = state.regionSort;
  rows.sort((a, b) => (sortKey === 'name' ? a.name.localeCompare(b.name) : b[sortKey] - a[sortKey]));
  const sel = state.selectedProvince ? rows.find((p) => p.name === state.selectedProvince) || PROVINCES.find((p) => p.name === state.selectedProvince) : null;
  const tableRows = rows
    .map((p) => `<tr data-action="select-province" data-value="${esc(p.name)}" class="${sel && sel.name === p.name ? 'selected' : ''}" tabindex="0"><td>${esc(p.name)}</td><td>${esc(p.capital)}</td><td>${fmt2(p.pop)}</td><td>${fmt1(p.share)}%</td><td>${Math.round(p.density).toLocaleString('en-US')}</td></tr>`)
    .join('');
  const detail = sel
    ? `<article class="panel detail"><h2>${esc(sel.name)}</h2>
      <p class="big-number">${fmt2(sel.pop)} <span>million people (Census 2020)</span></p>
      <dl class="facts">
        <div><dt>Capital</dt><dd>${esc(sel.capital)}</dd></div>
        <div><dt>Share of Indonesia</dt><dd>${fmt1((sel.pop / 270.2) * 100)}%</dd></div>
        <div><dt>Land area</dt><dd>${sel.area.toLocaleString('en-US')} km&sup2;</dd></div>
        <div><dt>Density</dt><dd>${Math.round((sel.pop * 1000000) / sel.area).toLocaleString('en-US')} people / km&sup2;</dd></div>
      </dl>
      <p>${sel.name === 'Jakarta' ? 'The capital region: 10.56 million people on 664 km², the densest province in the country.' : sel.name === 'West Java' ? 'The most populous province — 48.27 million people, 17.9% of Indonesia — and home to the Bandung metropolitan area.' : sel.name === 'Papua' ? 'The largest province by land (319,036 km²) and one of the least dense, at about 13 people per km².' : 'Click another row to compare provinces.'}</p>
      <button class="btn ghost" data-action="clear-province">Clear selection</button>
    </article>`
    : `<article class="panel detail"><h2>Pick a province</h2><p>Select any row in the table to see that province's figures here — population, share of the country, land area and density.</p></article>`;
  return `
  <section class="hero slim"><p class="eyebrow">Regions</p><h1>Provinces</h1>
  <p class="lede">38 provinces since 2022. Search, sort and select — every figure is from Census 2020 (BPS).</p></section>
  <section class="panel">
    <h2>Largest provinces by population</h2>
    ${hbarChart(PROVINCES.slice(0, 10).map((p) => ({ label: p.name, value: p.pop })), { unit: 'm', decimals: 2, color: '#0f2a43' })}
    ${sourceLine('BPS, Population Census 2020.')}
  </section>
  <section class="panel-grid">
    <div class="panel">
      <h2>All provinces in the table</h2>
      <div class="controls">
        <label>Search <input type="search" id="region-search" data-action="region-search" placeholder="Province or capital…" value="${esc(state.regionQuery)}"></label>
        <label>Sort by
          <select id="region-sort" data-action="region-sort">
            <option value="pop"${sortKey === 'pop' ? ' selected' : ''}>Population (largest first)</option>
            <option value="density"${sortKey === 'density' ? ' selected' : ''}>Density (highest first)</option>
            <option value="name"${sortKey === 'name' ? ' selected' : ''}>Name (A–Z)</option>
          </select>
        </label>
      </div>
      ${rows.length ? `<table class="data clickable"><thead><tr><th>Province</th><th>Capital</th><th>Population (m)</th><th>Share</th><th>Density /km&sup2;</th></tr></thead><tbody>${tableRows}</tbody></table>` : `<p class="empty">No province matches “${esc(state.regionQuery)}”. <button class="linklike" data-action="clear-search">Clear the search</button></p>`}
      ${sourceLine('BPS, Population Census 2020. Density = census population ÷ land area.')}
    </div>
    ${detail}
  </section>`;
}

export function labourView() {
  const povRows = POVERTY.map((p) => `<tr><td>${p.year}</td><td>${fmt2(p.value)}%</td></tr>`).join('');
  return `
  <section class="hero slim"><p class="eyebrow">Labour</p><h1>Work &amp; poverty</h1>
  <p class="lede">152.11 million people in the labour force in August 2024; 4.91% of them unemployed, and 8.57% of the country in poverty.</p></section>
  <section class="panel-grid">
    <article class="panel">
      <h2>Open unemployment rate, %</h2>
      ${lineChart(UNEMPLOYMENT.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2 })}
      <p>Unemployment peaked at 7.07% in August 2020 and has fallen every year since, to 4.91% in August 2024.</p>
      ${sourceLine('BPS, August Sakernas (labour force survey).')}
    </article>
    <article class="panel">
      <h2>Poverty rate, % of population</h2>
      ${barChart(POVERTY.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2, color: '#e8a33d' })}
      <p>8.57% in September 2024 — 25.22 million people — the lowest poverty rate in the series.</p>
      ${sourceLine('BPS, September Susenas.')}
    </article>
  </section>
  <section class="panel">
    <h2>The labour market, August 2024</h2>
    <dl class="facts">
      <div><dt>Labour force</dt><dd>${LABOUR_2024.labourForceMillions} million</dd></div>
      <div><dt>Employed</dt><dd>${LABOUR_2024.employedMillions} million</dd></div>
      <div><dt>Unemployed</dt><dd>${LABOUR_2024.unemployedMillions} million</dd></div>
      <div><dt>Labour-force participation</dt><dd>${LABOUR_2024.participationRate}%</dd></div>
      <div><dt>Informal employment</dt><dd>${LABOUR_2024.informalShare}% of workers</dd></div>
      <div><dt>Formal employment</dt><dd>${LABOUR_2024.formalShare}% of workers</dd></div>
      <div><dt>Gini ratio (Sep 2024)</dt><dd>0.379</dd></div>
    </dl>
    <p>Nearly six in ten workers are informal — self-employed, casual or family workers without
    formal contracts. That informality is the central fact of Indonesia's labour market, and the
    reason headline unemployment stays low even when job quality is thin.</p>
    ${sourceLine('BPS, Sakernas August 2024 and Susenas September 2024.')}
    <table class="data narrow"><thead><tr><th>Year</th><th>Poverty rate</th></tr></thead><tbody>${povRows}</tbody></table>
  </section>`;
}

export function healthView() {
  return `
  <section class="hero slim"><p class="eyebrow">Health</p><h1>Health</h1>
  <p class="lede">Life expectancy reached 73.8 years in 2024, and stunting fell below 20% for the first time.</p></section>
  <section class="panel-grid">
    <article class="panel">
      <h2>Life expectancy at birth, years</h2>
      ${lineChart(LIFE_EXPECTANCY.map((p) => ({ label: String(p.year), value: p.value })), { unit: '', decimals: 2 })}
      <p>The step between 2022 and 2023 partly reflects updated life tables from BPS, not only
      a one-year gain — the note matters, so the chart keeps it.</p>
      ${sourceLine('BPS. 2023 uses updated life tables.')}
    </article>
    <article class="panel">
      <h2>Stunting in children under five, %</h2>
      ${barChart(STUNTING.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 1, color: '#0e7c6b' })}
      <p>Stunting fell from 24.4% in 2021 to 19.8% in 2024 — below the government's 20% target
      line for the first time, though one child in five is still affected.</p>
      ${sourceLine('Ministry of Health: SSGI 2021, 2022, 2024; SKI 2023.')}
    </article>
  </section>
  <section class="panel">
    <h2>What the numbers mean</h2>
    <p>Health has been Indonesia's quiet success story of the last decade: universal health
    coverage (JKN) now reaches the large majority of the population, and child nutrition —
    tracked by the stunting surveys above — is the indicator the government watches most
    closely. The remaining gap is regional: eastern provinces record higher stunting and
    lower life expectancy than Java and Bali, a pattern the province table in
    <a href="#/regions">Regions</a> helps explain.</p>
    <dl class="facts">
      <div><dt>Life expectancy (2024)</dt><dd>73.83 years</dd></div>
      <div><dt>Stunting (2024)</dt><dd>19.8% of children under five</dd></div>
      <div><dt>Health in the HDI (2024)</dt><dd>Part of HDI 75.02 — see <a href="#/education">Education</a></dd></div>
    </dl>
  </section>`;
}

export function educationView() {
  return `
  <section class="hero slim"><p class="eyebrow">Education</p><h1>Education &amp; development</h1>
  <p class="lede">96.4% of adults can read and write, children average 9.0 years of schooling, and the Human Development Index reached 75.02 in 2024.</p></section>
  <section class="panel-grid">
    <article class="panel">
      <h2>Human Development Index</h2>
      ${lineChart(HDI.map((p) => ({ label: String(p.year), value: p.value })), { unit: '', decimals: 2 })}
      <p>HDI passed 75 in 2024, putting Indonesia in the UN's "high human development" band.
      The index combines health, education and income.</p>
      ${sourceLine('BPS.')}
    </article>
    <article class="panel">
      <h2>Adult literacy, % age 15+</h2>
      ${lineChart(LITERACY.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', decimals: 2, color: '#e8a33d' })}
      <p>Literacy has crept up about a tenth of a point a year, from 95.90% in 2020 to 96.36%
      in 2024. The remaining gap is concentrated among older Indonesians.</p>
      ${sourceLine('BPS.')}
    </article>
  </section>
  <section class="panel">
    <h2>Schooling, 2024</h2>
    <dl class="facts">
      <div><dt>Mean years of schooling</dt><dd>${EDUCATION_2024.meanYearsSchooling} years (age 25+)</dd></div>
      <div><dt>Expected years of schooling</dt><dd>${EDUCATION_2024.expectedYearsSchooling} years</dd></div>
      <div><dt>Net enrolment, primary</dt><dd>${EDUCATION_2024.primaryNetEnrolment}%</dd></div>
      <div><dt>Net enrolment, junior secondary</dt><dd>${EDUCATION_2024.juniorSecondaryNetEnrolment}%</dd></div>
      <div><dt>Net enrolment, senior secondary</dt><dd>${EDUCATION_2024.seniorSecondaryNetEnrolment}%</dd></div>
    </dl>
    <p>Nearly every child is in primary school; the drop comes at senior secondary level,
    where three in ten young people are not enrolled — the next frontier for the system.</p>
    ${sourceLine('BPS, Statistik Indonesia 2025.')}
  </section>`;
}

export function sourcesView() {
  return `
  <section class="hero slim"><p class="eyebrow">Sources &amp; method</p><h1>Where every number comes from</h1>
  <p class="lede">INDOSTAT republishes figures from official Indonesian sources. Nothing on this
  site is estimated by us, and nothing is scraped live: the site works fully offline.</p></section>
  <section class="panel">
    <h2>Sources</h2>
    <ul class="source-list">
      ${SOURCES.map((s) => `<li><strong>${esc(s.name)}</strong><span>${esc(s.detail)}</span></li>`).join('')}
    </ul>
  </section>
  <section class="panel">
    <h2>Method &amp; honesty notes</h2>
    <ul class="notes">
      <li>Every chart and table shows its year and its publisher next to the figure.</li>
      <li>Population 2021–2024 are mid-year estimates; 2010 and 2020 are census counts.</li>
      <li>The 2022→2023 step in life expectancy partly reflects BPS's updated life tables.</li>
      <li>Stunting 2023 comes from the Indonesian Health Survey (SKI); other years from the Nutrition Status Survey (SSGI).</li>
      <li>Provincial populations are Census 2020; the four new Papuan provinces created in 2022 are folded into the Papua figures shown here.</li>
      <li>Figures are rounded as published; shares may not sum to exactly 100%.</li>
      <li>This is an independent statistics explorer, not an official BPS publication.</li>
    </ul>
    <p><a class="btn" href="#/">Back to the overview &rarr;</a></p>
  </section>`;
}

export function missingView() {
  return `<section class="hero slim"><h1>Page not found</h1>
  <p class="lede">There is no statistics page at this address.</p>
  <p><a class="btn" href="#/">Back to the overview &rarr;</a></p></section>`;
}
