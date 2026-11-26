// INDOSTAT entrypoint (Node 22, standard library only).
//
// The site lives in app/ next to this file: plain static files — an index.html,
// ES-module scripts, one stylesheet and a data file — that a browser opens with
// no build step and no network request. This program is the handoff to the
// grader: it stages app/ and screenshots/ into the output directory and writes
// dossier.json there, the summary the judge reads (screenshots, first-load
// files and bytes, and the source outline).
//
// The dossier is produced by the vendored make.fun library and must stay byte
// for byte what that library writes, so this file only drives it: it never
// edits the dossier text itself. vendor/makefun-frontend.ts is untouched.
//
// Run locally the same way the grader does, with the output directory swapped
// in through the environment:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// To look at the site while building it instead, run `node serve.ts` and open
// http://localhost:8080.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The grader hands the program /output; anywhere else, MAKEFUN_OUTPUT_DIR
// stands in for it. Everything below is resolved against this file's folder.
const root = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Caps from the competition's own gate (reference/gate.json): text_max_bytes
// shapes the dossier's bytes; the rest refuse an entry the scorer would
// refuse — more than 4 screenshots, or one over 256 KiB; more than 993 files
// and directories in app/, or more than 16 MiB of app files.
const DOSSIER_LIMITS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function stageDirectory(name) {
  const source = join(root, name);
  if (!existsSync(source)) return false;
  cpSync(source, join(outputDir, name), { recursive: true });
  return true;
}

mkdirSync(outputDir, { recursive: true });
stageDirectory('app');
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
stageDirectory('screenshots');

writeFileSync(join(outputDir, 'dossier.json'), buildDossier(outputDir, DOSSIER_LIMITS));
console.log(`INDOSTAT staged into ${outputDir}`);
