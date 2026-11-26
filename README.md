# INDOSTAT — National Statistics of Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/bingx12/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/bingx12/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Indonesia in numbers: population, economy, provinces, labour, health and education — real figures from Statistics Indonesia (BPS), the Ministry of Health, APJII and ESDM, explored in one site that runs from static files with no network request, on desktop and on phone.

## What it is

Eight linked sections, each reached from the top navigation:

- **Overview** — KPI cards (population, GDP, growth, poverty, unemployment, life expectancy, HDI, Gini) with a working year selector (2020–2024) that updates the figures, plus population and GDP-growth charts and a country profile.
- **Population** — growth 2010–2024, age structure 2024, where people live, urban share.
- **Economy** — GDP growth with a bar/line chart toggle, GDP per person, industry shares, trade in goods, inflation.
- **Regions** — the 38 provinces: a searchable, sortable table (population, capital, share, density) and a detail panel when you select a province, plus a top-10 chart.
- **Labour** — unemployment and poverty series 2020–2024, labour-force facts for August 2024.
- **Health** — life expectancy and stunting series, with the method note on the 2023 life-table update.
- **Education** — HDI and literacy series, schooling and enrolment figures for 2024.
- **Sources** — every figure's publisher and the method notes.

All charts are hand-drawn SVG (no libraries, no network). Every figure carries its year and source; nothing is invented. See `app/data.js` for the dataset and `app/views.js` for the pages.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Or open `app/index.html` directly in a browser. No build step, no dependencies.

The entrypoint `main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Screenshots

Under `screenshots/` — the overview, the economy page, the provinces page (desktop, 1280×800) and the population page on a phone (390×844), all real renders of the site's own code. `shots.json` records the route and viewport of each.

---

<sub>Entered on [make.fun](https://make.fun/?ref=k6eq9xtw&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
