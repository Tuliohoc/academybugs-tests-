# academybugs-tests

E2E suite for **[AcademyBugs.com](https://academybugs.com)** — the practice site
with 25 planted bugs — written twice on purpose:

| tool | where | what it covers |
| --- | --- | --- |
| **Playwright** | `tests/*.spec.ts` | home, catalog, sorting, product page, cart, content pages |
| **Cypress** | `cypress/e2e/*.cy.js` | the same flows from a second runner |

Both runs report into **Allure Report 3**, so one command produces the report a
QA engineer would actually hand over.

## Run it

```bash
npm ci
npx playwright install --with-deps chromium   # first time only

npm run test:playwright   # Playwright + allure-results/
npm run test:cypress      # Cypress + allure-results-cypress/

npm run report            # both reports into reports/playwright and reports/cypress
npx allure open reports/playwright            # or open reports/cypress
```

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
|-- playwright.config.ts
|-- cypress.config.js
|-- allure.pw.yml, allure.cy.yml
|-- reports/                    # generated HTML, gitignored
\-- .github/workflows/ci.yml    # both runners, both reports, both as artifacts
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
