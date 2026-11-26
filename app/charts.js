// Hand-rolled SVG charts. No libraries, no network: every chart is built from
// the data in data.js and drawn as inline SVG.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function axes(w, h, pad) {
  return { x0: pad.l, x1: w - pad.r, y0: pad.t, y1: h - pad.b };
}

// Vertical bar chart. points: [{label, value}], valueLabel formats the value.
export function barChart(points, { width = 640, height = 300, unit = '', decimals = 1, color = '#0e7c6b', highlightLast = false } = {}) {
  const pad = { l: 56, r: 12, t: 16, b: 34 };
  const { x0, x1, y0, y1 } = axes(width, height, pad);
  const max = Math.max(...points.map((p) => p.value)) * 1.08;
  const min = Math.min(0, ...points.map((p) => p.value));
  const y = (v) => y1 - ((v - min) / (max - min)) * (y1 - y0);
  const slot = (x1 - x0) / points.length;
  const bw = Math.min(46, slot * 0.62);
  const ticks = 4;
  let grid = '';
  for (let i = 0; i <= ticks; i++) {
    const v = min + ((max - min) * i) / ticks;
    const yy = y(v);
    grid += `<line x1="${x0}" y1="${yy}" x2="${x1}" y2="${yy}" class="grid"/><text x="${x0 - 8}" y="${yy + 4}" class="tick" text-anchor="end">${fmt(v, decimals)}${unit}</text>`;
  }
  const bars = points
    .map((p, i) => {
      const cx = x0 + slot * (i + 0.5);
      const fill = highlightLast && i === points.length - 1 ? '#e8a33d' : color;
      const neg = p.value < 0;
      const top = neg ? y(0) : y(p.value);
      const hgt = Math.abs(y(p.value) - y(0));
      return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(hgt, 1.5).toFixed(1)}" fill="${fill}" rx="3"><title>${esc(p.label)}: ${fmt(p.value, decimals)}${unit}</title></rect><text x="${cx}" y="${(top - 6).toFixed(1)}" class="vlabel" text-anchor="middle">${fmt(p.value, decimals)}${unit}</text><text x="${cx}" y="${y1 + 20}" class="tick" text-anchor="middle">${esc(p.label)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" class="chart">${grid}${bars}<line x1="${x0}" y1="${y(0)}" x2="${x1}" y2="${y(0)}" class="axis"/></svg>`;
}

// Line chart with dots. points: [{label, value}]
export function lineChart(points, { width = 640, height = 300, unit = '', decimals = 2, color = '#0e7c6b' } = {}) {
  const pad = { l: 56, r: 16, t: 20, b: 34 };
  const { x0, x1, y0, y1 } = axes(width, height, pad);
  const vals = points.map((p) => p.value);
  let max = Math.max(...vals);
  let min = Math.min(...vals);
  const span = max - min || 1;
  max += span * 0.15;
  min -= span * 0.15;
  const x = (i) => x0 + ((x1 - x0) * i) / (points.length - 1);
  const y = (v) => y1 - ((v - min) / (max - min)) * (y1 - y0);
  const ticks = 4;
  let grid = '';
  for (let i = 0; i <= ticks; i++) {
    const v = min + ((max - min) * i) / ticks;
    const yy = y(v);
    grid += `<line x1="${x0}" y1="${yy}" x2="${x1}" y2="${yy}" class="grid"/><text x="${x0 - 8}" y="${yy + 4}" class="tick" text-anchor="end">${fmt(v, decimals)}${unit}</text>`;
  }
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = points
    .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="1.5"><title>${esc(p.label)}: ${fmt(p.value, decimals)}${unit}</title></circle><text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" class="vlabel" text-anchor="middle">${fmt(p.value, decimals)}${unit}</text><text x="${x(i).toFixed(1)}" y="${y1 + 20}" class="tick" text-anchor="middle">${esc(p.label)}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart" class="chart">${grid}<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}</svg>`;
}

// Horizontal bars. rows: [{label, value, suffix}]
export function hbarChart(rows, { width = 640, unit = '%', decimals = 1, color = '#0e7c6b', maxValue = null } = {}) {
  const rowH = 34;
  const height = rows.length * rowH + 14;
  const pad = { l: 210, r: 64, t: 8, b: 6 };
  const max = maxValue ?? Math.max(...rows.map((r) => r.value)) * 1.05;
  const barW = width - pad.l - pad.r;
  const bars = rows
    .map((r, i) => {
      const y = pad.t + i * rowH;
      const w = Math.max(2, (r.value / max) * barW);
      return `<text x="${pad.l - 10}" y="${y + 16}" class="tick" text-anchor="end">${esc(r.label)}</text><rect x="${pad.l}" y="${y}" width="${w.toFixed(1)}" height="20" fill="${color}" rx="3"><title>${esc(r.label)}: ${fmt(r.value, decimals)}${unit}</title></rect><text x="${pad.l + w + 8}" y="${y + 16}" class="vlabel">${fmt(r.value, decimals)}${unit}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Horizontal bar chart" class="chart">${bars}</svg>`;
}

// Simple donut for a single share (e.g. urban share of population).
export function donut(percent, label, { size = 150, color = '#0e7c6b' } = {}) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const filled = (percent / 100) * c;
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(label)}: ${percent} percent" class="donut"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#e6e2d8" stroke-width="18"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="18" stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}" stroke-dashoffset="${(c * 0.25).toFixed(1)}" stroke-linecap="round" transform="rotate(-90 ${size / 2} ${size / 2})"/><text x="50%" y="47%" class="donut-num" text-anchor="middle">${percent}%</text><text x="50%" y="62%" class="donut-lab" text-anchor="middle">${esc(label)}</text></svg>`;
}
