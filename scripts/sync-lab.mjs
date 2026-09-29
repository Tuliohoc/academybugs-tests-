#!/usr/bin/env node
/* Rewrites the two recorded suites of the Test Lab page (site/assets/js/lab.js)
   from real Allure results, keeping the API suite (there is no published report
   for it) and the surrounding lab code untouched. The report address stays
   relative: the lab page and the reports are published from the same site.

   node scripts/sync-lab.mjs <playwright.json> <cypress.json> [lab.js] */
import fs from 'node:fs';

const [pwPath, cyPath, labPath = 'site/assets/js/lab.js'] = process.argv.slice(2);
if (!pwPath || !cyPath) {
  console.error('usage: node scripts/sync-lab.mjs <playwright.json> <cypress.json> [lab.js]');
  process.exit(1);
}

const source = fs.readFileSync(labPath, 'utf8');
const pw = JSON.parse(fs.readFileSync(pwPath, 'utf8'));
const cy = JSON.parse(fs.readFileSync(cyPath, 'utf8'));

const block = (key, payload, meta) => {
  const suite = {
    suite: meta.suite,
    browser: meta.browser,
    env: meta.env,
    allure: `./${key}/`,
    total: payload.total,
    passed: payload.passed,
    failed: payload.failed,
    skipped: 0,
    rate: payload.rate,
    duration: payload.duration,
    feed: payload.feed,
    tests: payload.tests,
  };

  const printed = JSON.stringify({ [key]: suite }, null, 2)
    .split('\n')
    .slice(1, -1) // drop the outer braces
    .map((line) => line.replace(/^ {2}"(\w+)": /, '  $1: ').replace(/^ {4}"(\w+)": /, '    $1: ').replace(/^ {6}"(\w+)": /, '      $1: '))
    .map((line) => line.replace(/"(\w+)": /g, '$1: ')) // plain keys stay unquoted
    .join('\n');

  return `${printed.replace(/\n$/, '')},\n`;
};

const start = source.indexOf('  playwright: {');
const middle = source.indexOf('  cypress: {');
const api = source.indexOf('  api: {');
if (start < 0 || middle < 0 || api < 0 || !(start < middle && middle < api)) {
  console.error('could not find the playwright / cypress / api blocks in lab.js');
  process.exit(1);
}

const rebuilt =
  source.slice(0, start) +
  block('playwright', pw, {
    suite: 'Playwright Test Suite',
    browser: 'Chromium',
    env: 'Production · academybugs.com',
  }) +
  block('cypress', cy, {
    suite: 'Cypress UI Suite',
    browser: 'Electron',
    env: 'Production · academybugs.com',
  }) +
  source.slice(api);

fs.writeFileSync(labPath, rebuilt);
console.log(
  `playwright ${pw.total}/${pw.passed}/${pw.failed} ${pw.rate} and cypress ${cy.total}/${cy.passed}/${cy.failed} ${cy.rate} written to ${labPath}`,
);
