#!/usr/bin/env node
/**
 * Does this README still describe the server that is actually running?
 *
 * This repository has no code — it is a description of a hosted remote MCP
 * server. That makes it the kind of surface that rots silently: the catalogue
 * ships from another repository, nothing here changes, and the README goes on
 * promising a number that stopped being true weeks ago. It has happened: in
 * August 2026 this file advertised 24 tools, and the sibling Gemini extension
 * 18, while the live server had 32. Nobody noticed from the outside, because
 * outside there was no check.
 *
 * So the check reads the live server rather than any local copy of the truth:
 * `/.well-known/mcp.json` is public, needs no token, and is generated from the
 * same catalogue the server registers its tools from. If the README and the
 * manifest disagree about which tools exist, or how many, this fails.
 *
 * It runs on a schedule as well as on push, because the thing that changes is
 * the server, not this file — drift arrives on a day when nobody touched the
 * repository.
 *
 *   node scripts/check-readme.mjs
 */
import { readFileSync } from 'node:fs';

const MANIFEST = 'https://letsweft.com/.well-known/mcp.json';

const res = await fetch(MANIFEST, { headers: { accept: 'application/json' } });
if (!res.ok) {
  console.error(`Could not read ${MANIFEST}: HTTP ${res.status}`);
  process.exit(2); // Not a drift failure — the check itself could not run.
}
const manifest = await res.json();
const live = new Set((manifest.tools ?? []).map((t) => t.name).filter(Boolean));
if (live.size === 0) {
  console.error(`${MANIFEST} listed no tools — refusing to compare against nothing.`);
  process.exit(2);
}

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

const heading = /^##\s+Tools\s+\((\d+)\)\s*$/m.exec(readme);
if (!heading) {
  console.error('Could not find a "## Tools (N)" heading in README.md.');
  process.exit(1);
}
const claimed = Number(heading[1]);

// Only the table rows count, not the prose underneath it. An earlier version
// of this check scanned the whole section and quietly passed when a tool was
// deleted from the table but still named in the paragraphs below — the exact
// failure it exists to catch. Table rows are the lines starting with a pipe.
const after = readme.slice(heading.index + heading[0].length);
const nextHeading = after.search(/^##\s/m);
const section = nextHeading === -1 ? after : after.slice(0, nextHeading);
const rows = section.split('\n').filter((line) => line.trimStart().startsWith('|'));
const documented = new Set([...rows.join('\n').matchAll(/`([a-z_]+)`/g)].map((m) => m[1]));

const problems = [];
if (claimed !== live.size) {
  problems.push(`the heading says ${claimed} tools, the server serves ${live.size}`);
}
const missing = [...live].filter((name) => !documented.has(name)).sort();
const extra = [...documented].filter((name) => !live.has(name)).sort();
if (missing.length) problems.push(`not documented here: ${missing.join(', ')}`);
if (extra.length) problems.push(`documented but gone from the server: ${extra.join(', ')}`);

if (problems.length) {
  console.error('README.md no longer matches the live server:\n');
  for (const p of problems) console.error(`  - ${p}`);
  console.error(`\nSource of truth: ${MANIFEST}`);
  process.exit(1);
}

console.log(`README matches the live server: ${live.size} tools, all named.`);
