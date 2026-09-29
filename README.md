# academybugs-tests

E2E suite for **[AcademyBugs.com](https://academybugs.com)** — the practice site
with 25 planted bugs — written twice on purpose:

| tool | where | what it covers |
| --- | --- | --- |
| **Playwright** | `tests/*.spec.ts` | home, catalog, sorting, product page, cart, content pages |
| **Cypress** | `cypress/e2e/*.cy.js` | the same flows from a second runner |

Both runs report into **Allure Report 3**, so one command produces the report a
QA engineer would actually hand over.

The repository also publishes the **Test Lab** itself — the page that runs the
suites, draws the results and embeds the published report — at
<https://tuliohoc.github.io/academybugs-tests-/>. The portfolio links there; it
does not keep a copy of the screen.

## Run it

```bash
npm ci
npx playwright install --with-deps chromium   # first time only

npm run test:playwright   # Playwright + allure-results/
npm run test:cypress      # Cypress + allure-results-cypress/

npm run report            # both reports into reports/playwright and reports/cypress
npx allure open reports/playwright            # or open reports/cypress

npm run lab               # serve site/ on http://127.0.0.1:4173
```

## The Test Lab page

`site/` is the folder GitHub Pages publishes: the lab page, its stylesheet,
scripts and images. The reports are dropped beside it by the pipeline, in
`site/playwright` and `site/cypress`, which is why the report address inside
the page is the relative `./playwright/`.

The numbers on the page come out of the results of the run, never out of
somebody's head:

```bash
node scripts/lab-data.mjs allure-results playwright pw.json
node scripts/lab-data.mjs allure-results-cypress cypress cy.json
node scripts/sync-lab.mjs pw.json cy.json     # rewrites site/assets/js/lab.js
```

`sync-lab.mjs` leaves the API suite alone — there is no published report for
it — and the pipeline runs the same three commands before uploading the site,
so the page and the report it embeds can never disagree.

`tests/lab.spec.ts` opens the page through `scripts/serve.mjs site` (started by
the `webServer` entry in `playwright.config.ts`) and checks the shape of what
it shows: counts are numbers, rates end in %, the planted bug opens into steps,
error and evidence, and the interface speaks PT/EN without moving the artifacts.

## Reports

`npm run report` renders the results with the Allure 3 CLI (`allure` package),
which is pure TypeScript — **no Java required**:

- `allure.pw.yml` points the CLI at `./allure-results`
- `allure.cy.yml` points it at `./allure-results-cypress`

## What the suite is honest about

AcademyBugs ships real defects. The suite asserts the behaviour a user expects,
so a planted bug shows up as a red test instead of being papered over:

- **"Dark Blue Denim Jeans" has no visible price** — 18 products in the grid,
  17 price tags. `catalog › every product in the catalog shows a title, a price
  and a way to buy` fails on purpose until the site is fixed.

## Layout

```
.
|-- tests/                      # Playwright specs + shared helpers (support.ts)
|-- cypress/
|   |-- e2e/                    # Cypress specs
|   \-- support/e2e.js          # plugin import + overlay dismissal
|-- site/                       # the published Test Lab page and its assets
|   |-- index.html
|   \-- assets/                 # css, js (lab.js + i18n + theme), img
|-- scripts/
|   |-- lab-data.mjs            # Allure results -> the payload the lab draws
|   |-- sync-lab.mjs            # payload -> site/assets/js/lab.js
|   \-- serve.mjs               # static server for the page and its tests
|-- playwright.config.ts
|-- cypress.config.js
|-- allure.pw.yml, allure.cy.yml
|-- reports/                    # generated HTML, gitignored
\-- .github/workflows/ci.yml    # both runners, both reports, publish to Pages
```

## Notes for whoever runs it next

- The site paints a **cookie banner** and a **guided-tour canvas** over the
  page. Both are dismissed by `open()` (Playwright) / `cy.openApp()` (Cypress)
  before any assertion — without it, every click is swallowed.
- Every product card exists **twice** in the DOM: a `type6` copy with
  `display: none` and the `type1` copy visitors see. Selectors address only
  what is visible (`.ec_product_title_type1:visible`), otherwise assertions
  land on the hidden duplicate.
- The site is external and live: a red run can also mean the target is down.
  Check the target before blaming the suite.
