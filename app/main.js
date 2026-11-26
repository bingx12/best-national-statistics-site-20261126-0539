// INDOSTAT router and controls. Hash routes: #/ overview, #/population,
// #/economy, #/regions, #/labour, #/health, #/education, #/sources.
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { overview, populationView, economyView, regionsView, labourView, healthView, educationView, sourcesView, missingView } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('main-nav');

const state = {
  year: 2024,
  econChart: 'bar',
  regionQuery: '',
  regionSort: 'pop',
  selectedProvince: null,
};

const ROUTES = {
  '/': { view: overview, title: 'Indonesia in numbers' },
  '/population': { view: populationView, title: 'Population & demographics' },
  '/economy': { view: economyView, title: 'The economy' },
  '/regions': { view: regionsView, title: 'Provinces' },
  '/labour': { view: labourView, title: 'Work & poverty' },
  '/health': { view: healthView, title: 'Health' },
  '/education': { view: educationView, title: 'Education & development' },
  '/sources': { view: sourcesView, title: 'Sources & method' },
};

function render() {
  window.__shotReady = false;
  const path = location.hash.replace(/^#/, '') || '/';
  const route = ROUTES[path] || null;
  document.title = route ? `${route.title} | INDOSTAT — Statistik Indonesia` : 'Page not found | INDOSTAT';
  app.innerHTML = route ? route.view(state) : missingView();
  for (const link of nav.querySelectorAll('a')) {
    link.classList.toggle('active', link.getAttribute('href') === `#${path}`);
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function rerenderKeepFocus() {
  const active = document.activeElement;
  const id = active && active.id;
  const selStart = active && typeof active.selectionStart === 'number' ? active.selectionStart : null;
  render();
  if (id) {
    const el = document.getElementById(id);
    if (el) {
      el.focus();
      if (selStart !== null && el.setSelectionRange) {
        try { el.setSelectionRange(selStart, selStart); } catch { /* input type may not support it */ }
      }
    }
  }
}

app.addEventListener('click', (event) => {
  const row = event.target.closest('[data-action="select-province"]');
  if (row) {
    state.selectedProvince = row.getAttribute('data-value');
    render();
    return;
  }
  const btn = event.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  if (action === 'econ-chart') {
    state.econChart = btn.getAttribute('data-value');
    render();
  } else if (action === 'clear-province') {
    state.selectedProvince = null;
    render();
  } else if (action === 'clear-search') {
    state.regionQuery = '';
    render();
  }
});

app.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-action="select-province"]')) {
    event.preventDefault();
    state.selectedProvince = event.target.getAttribute('data-value');
    render();
  }
});

app.addEventListener('change', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.getAttribute('data-action');
  if (action === 'year') {
    state.year = Number(el.value);
    render();
  } else if (action === 'region-sort') {
    state.regionSort = el.value;
    render();
  }
});

app.addEventListener('input', (event) => {
  const el = event.target.closest('[data-action="region-search"]');
  if (!el) return;
  state.regionQuery = el.value;
  rerenderKeepFocus();
});

window.addEventListener('hashchange', render);
render();
