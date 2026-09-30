/* The planted bug is supposed to fail, and a finding is not a broken pipeline.
   This gate reads the JSON report Playwright writes in CI and answers one
   question: did anything *other* than the planted bug fail?

   Everything about the failure itself stays as red as it should be — the test
   in the results, its evidence in the Allure report, the numbers the Test Lab
   draws from them. Only the job's verdict changes, and only when the run came
   back red for the reason the suite was written to be red. */

import fs from 'node:fs';

/* The title of the spec, as Playwright writes it into the report. One line per
   failure the pipeline is allowed to call green — see tests/catalog.spec.ts. */
const PLANTED = new Set([
  'every product in the catalog shows a title, a price and a way to buy',
]);

const report = process.argv[2] ?? 'reports/results.json';

if (!fs.existsSync(report)) {
  console.error(`::error::no results at ${report} — the suite did not run to completion`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(report, 'utf8'));

const failed = new Set();
const walk = (suite) => {
  for (const spec of suite.specs ?? []) {
    if ((spec.tests ?? []).some((test) => test.status === 'unexpected')) {
      failed.add(spec.title);
    }
  }
  for (const child of suite.suites ?? []) walk(child);
};
for (const suite of data.suites ?? []) walk(suite);

const strangers = [...failed].filter((title) => !PLANTED.has(title));

if (strangers.length > 0) {
  console.error(`::error::${strangers.length} failure(s) beyond the planted bug`);
  for (const title of strangers) console.error(`  - ${title}`);
  process.exit(1);
}

if (failed.size === 0) {
  console.log('every test passed');
} else {
  const line = `red on purpose: ${[...failed].join('; ')}`;
  console.log(line);
  const summary = process.env.GITHUB_STEP_SUMMARY;
  if (summary) {
    fs.appendFileSync(
      summary,
      `\n**Red on purpose**\n\n${line}\n\nThe pipeline stays green — the failure, its evidence and the Test Lab numbers are untouched.\n`,
    );
  }
}
