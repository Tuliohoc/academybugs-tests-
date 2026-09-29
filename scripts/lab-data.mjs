#!/usr/bin/env node
/* Turns an Allure results folder into the payload the portfolio Test Lab draws.

   node scripts/lab-data.mjs allure-results playwright
   node scripts/lab-data.mjs allure-results-cypress cypress

   Everything it prints comes from the run: names, statuses, durations, steps,
   assertions, the failing message and the attachments. Nothing is invented —
   where a framework does not record something (Cypress has no assertion
   steps), the field stays empty instead of being filled in. */
import fs from 'node:fs';
import path from 'node:path';

const [dir, framework] = process.argv.slice(2);
if (!dir || !framework) {
  console.error('usage: node scripts/lab-data.mjs <results-dir> <playwright|cypress>');
  process.exit(1);
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith('-result.json'));

/* retries leave several results behind: the last one is the verdict */
const byId = new Map();
for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const key = raw.historyId || raw.uuid;
  const previous = byId.get(key);
  if (!previous || (raw.stop || 0) >= (previous.stop || 0)) byId.set(key, raw);
}
const results = [...byId.values()].sort((a, b) => (a.start || 0) - (b.start || 0));

const HOOKS = /^(Before Hooks|After Hooks)$/;
const COMMAND =
  /^(Expect\b|Navigate\b|Goto\b|Click\b|Double click\b|Evaluate\b|Query count\b|Query text\b|Wait for\b|Fill\b|Select\b|Check\b|Uncheck\b|Press\b|Hover\b|Scroll\b|Poll\b|Focus\b|Tap\b|Run\b|Set\b|Visit\b|visit\b|get\b|find\b|type\b|should\b|invoke\b|then\b|document\b|its\b|children\b|first\b|last\b|eq\b|contains\b|trigger\b|intercept\b|wait\b|go\b|reload\b|title\b|url\b|log\b|attach\b|screenshot\b|trace\b|error-context\b|video\b)/;

const label = (result, name) => (result.labels || []).find((l) => l.name === name)?.value;

const fileOf = (result) => {
  /* Cypress spells the file out in fullName, Playwright only in the package label */
  const full = (result.fullName || '').split('#')[0];
  if (full.includes(':') && full.includes('/')) return full.split(':').pop();
  const pkg = (label(result, 'package') || '').replace(/^academybugs-tests[.:]/, '');
  return pkg.includes('cypress') ? `cypress/${pkg.replace(/^cypress\./, '').replace(/\.cy\.js$/, '')}.cy.js` : `tests/${pkg}`;
};

/* a step that echoes a whole page must not take the report with it */
const clip = (text) => (text.length > 240 ? `${text.slice(0, 240)}…` : text);

const statusOf = (result) => (result.status === 'passed' ? 'passed' : 'failed');

const seconds = (result) => `${(((result.stop || 0) - (result.start || 0)) / 1000).toFixed(2)}s`;

const stepNames = (steps) => {
  const names = (steps || [])
    .filter((s) => !HOOKS.test(s.name) && !/^(screenshot|trace|error-context|video|attachments)$/i.test(s.name))
    .map((s) => s.name)
    .filter(Boolean);

  /* a loop that queries 18 cards reads better collapsed than repeated */
  const collapsed = [];
  for (const name of names) {
    const last = collapsed[collapsed.length - 1];
    if (last && last.name === name) last.times += 1;
    else collapsed.push({ name, times: 1 });
  }
  return collapsed.map(({ name, times }) => clip(times > 1 ? `${name} ×${times}` : name));
};

const assertionOf = (step, result) => {
  const mark = step.status === 'failed' || (result.status !== 'passed' && !step.status) ? '✕' : '✓';
  const text = step.name.replace(/^Expect\s+/, '').replace(/^"(.*)"$/, '$1');
  return clip(`${mark} ${text}`);
};

const collectEvidence = (result) => {
  const found = {};
  const keyFor = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('screenshot')) return 'Screenshot';
    if (n.includes('trace')) return 'Trace';
    if (n.includes('video')) return 'Video';
    if (n.includes('error')) return 'Error';
    return name;
  };
  const walk = (steps) => {
    for (const step of steps || []) {
      for (const attachment of step.attachments || []) {
        const key = keyFor(attachment.name);
        if (key && !found[key]) found[key] = attachment.source || attachment.name;
      }
      walk(step.steps);
    }
  };
  walk(result.steps);
  for (const attachment of result.attachments || []) {
    const key = keyFor(attachment.name);
    if (key && !found[key]) found[key] = attachment.source || attachment.name;
  }
  return Object.keys(found).length ? found : undefined;
};

const tests = results.map((result) => {
  const steps = stepNames(result.steps);
  const assertions = [
    ...new Set(
      (result.steps || [])
        .filter((s) => !HOOKS.test(s.name) && (/^Expect\s/.test(s.name) || !COMMAND.test(s.name)))
        .map((s) => assertionOf(s, result)),
    ),
  ];

  const test = {
    name: result.name,
    status: statusOf(result),
    duration: seconds(result),
    file: fileOf(result),
    steps,
    assertions,
  };

  if (test.status === 'failed') {
    const details = result.statusDetails || {};
    const message = (details.message || '').trim();
    const trace = (details.trace || '').trim();
    /* the trace usually opens with the message again: keep it only once */
    const tail = trace.startsWith(message) ? trace.slice(message.length).trim() : trace;
    test.error = [message, tail.split('\n').slice(0, 10).join('\n')].filter(Boolean).join('\n\n');
    const evidence = collectEvidence(result);
    if (evidence) test.evi = { ...evidence, Error: test.error };
  } else {
    const evidence = collectEvidence(result);
    if (evidence) test.evi = evidence;
  }

  return test;
});

const total = tests.length;
const passed = tests.filter((t) => t.status === 'passed').length;
const failed = total - passed;
/* wall clock of the run, not the sum of tests that ran in parallel */
const start = Math.min(...results.map((r) => r.start || 0));
const stop = Math.max(...results.map((r) => r.stop || 0));
const durationMs = Math.max(stop - start, 0);
const mm = String(Math.floor(durationMs / 60000)).padStart(2, '0');
const ss = String(Math.floor((durationMs % 60000) / 1000)).padStart(2, '0');

const payload = {
  framework,
  total,
  passed,
  failed,
  rate: total === 0 ? 'n/a' : passed === total ? '100%' : `${((passed / total) * 100).toFixed(1)}%`,
  duration: `${mm}:${ss}`,
  feed: tests.slice(0, 5).map((t) => t.name),
  tests,
};

process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
