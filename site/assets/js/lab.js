/* The Test Lab: pick a suite, watch it run, open the results.
   The numbers are the recorded run of the AcademyBugs environment — the shape
   a real Playwright or Cypress report leaves behind, kept in one place so the
   interface around it can change language without touching the artifacts.
   Test names, files, assertions and errors stay in English in every language. */
(function () {
"use strict";

const SUITES = {
  playwright: {
    suite: "Playwright Test Suite",
    browser: "Chromium",
    env: "Production · academybugs.com",
    allure: "./playwright/",
    total: 15,
    passed: 14,
    failed: 1,
    skipped: 0,
    rate: "93.3%",
    duration: "00:35",
    feed: [
      "every product in the catalog shows a title, a price and a way to buy",
      "the cart page opens and says it is empty before anything is added",
      "the cart shows a total with a real amount once it holds a product",
      "adding a product puts it on the cart line",
      "every product card links to its own detail page"
    ],
    tests: [
      {
        name: "every product in the catalog shows a title, a price and a way to buy",
        status: "failed",
        duration: "13.28s",
        file: "tests/catalog.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\"",
          "Query count",
          "the practice catalog should not be empty",
          "Query count",
          "Expect \"toBeGreaterThan\"",
          "Query count ×18",
          "products without a visible price: DARK BLUE DENIM JEANS"
        ],
        assertions: [
          "✓ toBeVisible",
          "✓ the practice catalog should not be empty",
          "✓ toBeGreaterThan",
          "✕ products without a visible price: DARK BLUE DENIM JEANS"
        ],
        error: "Error: products without a visible price: DARK BLUE DENIM JEANS\n\nexpect(received).toEqual(expected) // deep equality\n\n- Expected  - 1\n+ Received  + 3\n\n- Array []\n+ Array [\n+   \"DARK BLUE DENIM JEANS\",\n+ ]\n\nat C:\\Users\\PC2025\\Downloads\\QAPORTIFÓLIO\\academybugs-tests-\\tests\\catalog.spec.ts:22:90",
        evi: {
          Screenshot: "999a80a3-23e3-47ff-82ba-5accda9a139d-attachment.png",
          Error: "Error: products without a visible price: DARK BLUE DENIM JEANS\n\nexpect(received).toEqual(expected) // deep equality\n\n- Expected  - 1\n+ Received  + 3\n\n- Array []\n+ Array [\n+   \"DARK BLUE DENIM JEANS\",\n+ ]\n\nat C:\\Users\\PC2025\\Downloads\\QAPORTIFÓLIO\\academybugs-tests-\\tests\\catalog.spec.ts:22:90",
          Trace: "89b4d071-afcf-4601-86b3-63d746ee0638-attachment.zip"
        }
      },
      {
        name: "the cart page opens and says it is empty before anything is added",
        status: "passed",
        duration: "9.31s",
        file: "tests/cart.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\" ×2"
        ],
        assertions: [
          "✓ toBeVisible"
        ]
      },
      {
        name: "the cart shows a total with a real amount once it holds a product",
        status: "passed",
        duration: "13.51s",
        file: "tests/cart.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Click",
          "Expect \"toBeVisible\"",
          "Click",
          "Expect \"toHaveURL\"",
          "the added product must appear on a cart line",
          "Expect \"toHaveText\"",
          "a cart holding a product must not total zero"
        ],
        assertions: [
          "✓ toBeVisible",
          "✓ toHaveURL",
          "✓ the added product must appear on a cart line",
          "✓ toHaveText",
          "✓ a cart holding a product must not total zero"
        ]
      },
      {
        name: "adding a product puts it on the cart line",
        status: "passed",
        duration: "12.70s",
        file: "tests/cart.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Click",
          "the site should confirm the item was added",
          "Click",
          "Expect \"toHaveURL\"",
          "Expect \"toBeVisible\"",
          "Expect \"toHaveCount\""
        ],
        assertions: [
          "✓ the site should confirm the item was added",
          "✓ toHaveURL",
          "✓ toBeVisible",
          "✓ toHaveCount"
        ]
      },
      {
        name: "every product card links to its own detail page",
        status: "passed",
        duration: "7.96s",
        file: "tests/catalog.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toHaveAttribute\"",
          "Click",
          "Expect \"toBeVisible\" ×2"
        ],
        assertions: [
          "✓ toHaveAttribute",
          "✓ toBeVisible"
        ]
      },
      {
        name: "the sort menu offers every ordering the page promises",
        status: "passed",
        duration: "4.55s",
        file: "tests/catalog.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\"",
          "Expect \"toHaveCount\" ×3"
        ],
        assertions: [
          "✓ toBeVisible",
          "✓ toHaveCount"
        ]
      },
      {
        name: "choosing Title A-Z reorders the catalog",
        status: "passed",
        duration: "5.23s",
        file: "tests/catalog.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\"",
          "Evaluate",
          "Select option",
          "Expect \"toBeVisible\"",
          "Evaluate",
          "sorting should change the visible order",
          "expected \"BLACK OVER-THE-SHOULDER HANDBAG\" to sort before or equal \"BLUE HOODIE\""
        ],
        assertions: [
          "✓ toBeVisible",
          "✓ sorting should change the visible order",
          "✓ expected \"BLACK OVER-THE-SHOULDER HANDBAG\" to sort before or equal \"BLUE HOODIE\""
        ]
      },
      {
        name: "a product can be added to the cart from the catalog",
        status: "passed",
        duration: "5.94s",
        file: "tests/catalog.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Click",
          "the site should confirm the item was added"
        ],
        assertions: [
          "✓ the site should confirm the item was added"
        ]
      },
      {
        name: "the practice site loads with its own identity",
        status: "passed",
        duration: "7.73s",
        file: "tests/home.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toHaveTitle\"",
          "Expect \"toContainText\""
        ],
        assertions: [
          "✓ toHaveTitle",
          "✓ toContainText"
        ]
      },
      {
        name: "the examples grid shows the planted bug gallery",
        status: "passed",
        duration: "8.84s",
        file: "tests/home.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\"",
          "Query count",
          "Expect \"toBeGreaterThan\""
        ],
        assertions: [
          "✓ toBeVisible",
          "✓ toBeGreaterThan"
        ]
      },
      {
        name: "the main navigation points at the practice areas",
        status: "passed",
        duration: "8.90s",
        file: "tests/home.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\" ×3"
        ],
        assertions: [
          "✓ toBeVisible"
        ]
      },
      {
        name: "the catalog entry point leads to the product list",
        status: "passed",
        duration: "11.52s",
        file: "tests/home.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Click",
          "Expect \"toHaveURL\"",
          "Expect \"toBeVisible\""
        ],
        assertions: [
          "✓ toHaveURL",
          "✓ toBeVisible"
        ]
      },
      {
        name: "the types of bugs page explains the categories",
        status: "passed",
        duration: "4.17s",
        file: "tests/pages.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\" ×3"
        ],
        assertions: [
          "✓ toBeVisible"
        ]
      },
      {
        name: "the report bugs page offers the practice scenarios",
        status: "passed",
        duration: "6.81s",
        file: "tests/pages.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\" ×3"
        ],
        assertions: [
          "✓ toBeVisible"
        ]
      },
      {
        name: "the find bugs page states how many planted bugs it holds",
        status: "passed",
        duration: "5.03s",
        file: "tests/pages.spec.ts",
        steps: [
          "Navigate",
          "Click",
          "Evaluate",
          "Expect \"toBeVisible\""
        ],
        assertions: [
          "✓ toBeVisible"
        ]
      }
    ]
  },
  cypress: {
    suite: "Cypress UI Suite",
    browser: "Electron",
    env: "Production · academybugs.com",
    allure: "./cypress/",
    total: 9,
    passed: 9,
    failed: 0,
    skipped: 0,
    rate: "100%",
    duration: "01:33",
    feed: [
      "opens empty and says so",
      "lists the product that was just added, with a real price",
      "shows the product grid with titles, prices and buy buttons",
      "links every visible product to its detail page",
      "offers the nine sort orders on the sort menu"
    ],
    tests: [
      {
        name: "opens empty and says so",
        status: "passed",
        duration: "14.30s",
        file: "cypress/e2e/cart.cy.js",
        steps: [
          "visit /my-cart/",
          "get body",
          "document",
          "contains /there are no items in your cart/i",
          "assert expected <div.ec_cart_empty> to be visible",
          "contains /return to stor/i",
          "assert expected <a.ec_cart_empty_button.academy-bug> to be visible"
        ],
        assertions: [
          "✓ assert expected <div.ec_cart_empty> to be visible",
          "✓ assert expected <a.ec_cart_empty_button.academy-bug> to be visible"
        ]
      },
      {
        name: "lists the product that was just added, with a real price",
        status: "passed",
        duration: "14.11s",
        file: "cypress/e2e/cart.cy.js",
        steps: [
          "visit /find-bugs/",
          "get body",
          "document",
          "get .ec_product_title_type1:visible",
          "first",
          "invoke .text()",
          "get .ec_product_title_type1:visible",
          "first",
          "wrap <li#ec_product_li_4481370.ec_product_li>",
          "find a[id^=\"ec_add_to_cart_\"]:visible",
          "first",
          "click",
          "contains Product successfully added to your cart",
          "assert expected <div.ec_product_added_to_cart> to be visible",
          "get .ec_product_added_to_cart:visible",
          "contains /view cart/i",
          "click",
          "url",
          "get .ec_cartitem_row:visible",
          "first",
          "get .ec_cartitem_title:visible",
          "first",
          "get .ec_cartitem_row:visible",
          "first"
        ],
        assertions: [
          "✓ wrap <li#ec_product_li_4481370.ec_product_li>",
          "✓ click",
          "✓ assert expected <div.ec_product_added_to_cart> to be visible"
        ]
      },
      {
        name: "shows the product grid with titles, prices and buy buttons",
        status: "passed",
        duration: "7.34s",
        file: "cypress/e2e/catalog.cy.js",
        steps: [
          "visit /find-bugs/",
          "get body",
          "document",
          "get .ec_product_title_type1:visible",
          "get a[id^=\"ec_add_to_cart_\"]:visible"
        ],
        assertions: []
      },
      {
        name: "links every visible product to its detail page",
        status: "passed",
        duration: "4.51s",
        file: "cypress/e2e/catalog.cy.js",
        steps: [
          "visit /find-bugs/",
          "get body",
          "document",
          "get .ec_product_title_type1 a",
          "first",
          "get .ec_product_title_type1 a",
          "first",
          "click",
          "get h1.ec_details_title:visible",
          "get .ec_product_price:visible"
        ],
        assertions: [
          "✓ click"
        ]
      },
      {
        name: "offers the nine sort orders on the sort menu",
        status: "passed",
        duration: "3.72s",
        file: "cypress/e2e/catalog.cy.js",
        steps: [
          "visit /find-bugs/",
          "get body",
          "document",
          "get #sortfield",
          "get #sortfield option ×2",
          "contains Title A-Z",
          "assert expected <option> to exist in the DOM"
        ],
        assertions: [
          "✓ assert expected <option> to exist in the DOM"
        ]
      },
      {
        name: "adds a product to the cart and confirms it",
        status: "passed",
        duration: "9.20s",
        file: "cypress/e2e/catalog.cy.js",
        steps: [
          "visit /find-bugs/",
          "get body",
          "document",
          "get a[id^=\"ec_add_to_cart_\"]:visible",
          "first",
          "click",
          "contains Product successfully added to your cart",
          "assert expected <div.ec_product_added_to_cart> to be visible",
          "get .ec_product_added_to_cart:visible",
          "contains /view cart/i",
          "click",
          "url"
        ],
        assertions: [
          "✓ click",
          "✓ assert expected <div.ec_product_added_to_cart> to be visible"
        ]
      },
      {
        name: "keeps the practice navigation on every page",
        status: "passed",
        duration: "7.87s",
        file: "cypress/e2e/pages.cy.js",
        steps: [
          "visit /",
          "get body",
          "document",
          "get nav",
          "first",
          "within"
        ],
        assertions: [
          "✓ within"
        ]
      },
      {
        name: "explains the bug categories on the types page",
        status: "passed",
        duration: "2.94s",
        file: "cypress/e2e/pages.cy.js",
        steps: [
          "visit /types/",
          "get body",
          "document",
          "contains Functional",
          "first",
          "contains Visual",
          "first"
        ],
        assertions: []
      },
      {
        name: "offers the practice scenarios on the report bugs page",
        status: "passed",
        duration: "5.43s",
        file: "cypress/e2e/pages.cy.js",
        steps: [
          "visit /report-bugs/",
          "get body",
          "document",
          "contains /practice scenarios/i",
          "first",
          "contains /instructions/i",
          "first"
        ],
        assertions: []
      }
    ]
  },
  api: {
    suite: "REST API Suite",
    browser: "Node 20",
    env: "Production/Test",
    allure: null,
    total: 12, passed: 12, failed: 0, skipped: 0,
    rate: "100%", duration: "00:21",
    feed: ["GET /users", "POST /login", "POST /login-invalid", "GET /products", "GET /health"],
    tests: [
      { name: "GET /users", status: "passed", duration: "0.31s",
        file: "tests/api/users.spec.ts",
        steps: ["Send GET /users", "Read the response body"],
        assertions: ["✓ status is 200", "✓ body is an array", "✓ every user carries id, name and role"] },
      { name: "POST /login", status: "passed", duration: "0.42s",
        file: "tests/api/auth.spec.ts",
        steps: ["Send POST /login with valid credentials", "Read the token"],
        assertions: ["✓ status is 200", "✓ token is present and not empty", "✓ expiresIn is 3600"] },
      { name: "POST /login-invalid", status: "passed", duration: "0.36s",
        file: "tests/api/auth.spec.ts",
        steps: ["Send POST /login with a wrong password", "Read the error body"],
        assertions: ["✓ status is 401", "✓ error is invalid_credentials", "✓ no token is issued"] },
      { name: "GET /products", status: "passed", duration: "0.29s",
        file: "tests/api/catalog.spec.ts",
        steps: ["Send GET /products", "Read the response body"],
        assertions: ["✓ status is 200", "✓ every product has id, name and price", "✓ prices are greater than 0"] },
      { name: "GET /health", status: "passed", duration: "0.11s",
        file: "tests/api/health.spec.ts",
        steps: ["Send GET /health"],
        assertions: ["✓ status is 200", "✓ status field is ok"] }
    ]
  }
};

const RUN_MS = 4200;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = id => document.getElementById(id);
const pick = $("suitePick");
if (!pick) return;

const runner = $("runner"), runDone = $("runDone"), runSuite = $("runSuite"), runBadge = $("runBadge");
const progFill = $("progFill"), progPct = $("progPct"), curTest = $("curTest");
const repList = $("repList"), repNote = $("repNote"), repHint = $("repHint"), repBody = $("repBody");
const runAgain = $("runAgain"), openFull = $("openFull"), fullNote = $("fullNote");
const allure = $("allure"), allureFrame = $("allureFrame"), allureMeta = $("allureMeta"), allureClose = $("allureClose");

let current = null;
let running = false;
let timer = null;
let selected = -1;
let eviKey = null;

const text = (key, vars) => {
  if (window.I18n) return window.I18n.text(key, vars);
  const dict = window.I18N_EN || {};
  let value = dict[key] != null ? dict[key] : key;
  if (vars) Object.keys(vars).forEach(k => { value = String(value).split("{" + k + "}").join(vars[k]); });
  return value;
};

function esc(s){
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setBusy(busy){
  pick.querySelectorAll("button[data-suite]").forEach(b => { b.disabled = busy; });
}

function bring(el){
  if (!el) return;
  const bar = document.getElementById("bar");
  const foot = document.querySelector(".foot");
  const top = (bar ? bar.offsetHeight : 64) + 16;
  const bottom = window.innerHeight - (foot && getComputedStyle(foot).position === "fixed" ? foot.offsetHeight : 0) - 12;
  const rect = el.getBoundingClientRect();
  if (rect.top >= top && rect.bottom <= bottom) return;
  const y = Math.max(0, Math.min(rect.top + window.scrollY - top, document.documentElement.scrollHeight - window.innerHeight));
  window.scrollTo({ top: y, behavior: reduce ? "instant" : "smooth" });
}

function drawRunner(){
  if (!current) return;
  const s = SUITES[current];
  runSuite.textContent = text("ab.prefix.running") + " " + s.suite;
  $("fBrowser").textContent = s.browser;
  $("fEnv").textContent = s.env;
  $("fTests").textContent = String(s.total);
}

function drawReportNote(){
  if (!current){ repNote.textContent = text("ab.report.empty"); return; }
  const s = SUITES[current];
  repNote.textContent = text("ab.report.note", { shown: String(shownTests(s).length), total: String(s.total) });
}

/* the lab lists the run feed, the full report holds every test */
function shownTests(s){ return s.tests.slice(0, s.feed.length); }

function drawReport(){
  if (!current){ repList.innerHTML = ""; return; }
  const s = SUITES[current];
  repList.innerHTML = shownTests(s).map((test, i) => `
    <button class="rep-row" type="button" data-i="${i}" aria-pressed="${i === selected}">
      <span class="rep-mark ${test.status}" aria-hidden="true">${test.status === "passed" ? "✓" : "✕"}</span>
      <span class="rep-name">${esc(test.name)}</span>
      <span class="st-label ${test.status}">${text("st." + test.status)}</span>
      <span class="rep-dur">${esc(test.duration)}</span>
    </button>`).join("");
  drawReportNote();
}

function drawDetail(){
  if (!current || selected < 0){ repHint.hidden = false; repBody.hidden = true; repBody.innerHTML = ""; return; }
  const test = SUITES[current].tests[selected];
  const failed = test.status === "failed";
  const eviKeys = test.evi ? Object.keys(test.evi) : [];
  if (!eviKeys.includes(eviKey)) eviKey = failed && eviKeys.length ? eviKeys[0] : null;

  repHint.hidden = true;
  repBody.hidden = false;
  repBody.innerHTML = `
    <div class="rep-head">
      <h3>${esc(test.name)}</h3>
      <span class="st-label big ${test.status}">${text("st." + test.status)}</span>
    </div>
    <dl class="rep-facts">
      <div><dt>${text("ab.d.duration")}</dt><dd>${esc(test.duration)}</dd></div>
      <div><dt>${text("ab.d.browser")}</dt><dd>${esc(SUITES[current].browser)}</dd></div>
      <div><dt>${text("ab.d.file")}</dt><dd class="mono">${esc(test.file)}</dd></div>
    </dl>
    <h4>${text("ab.d.steps")}</h4>
    <ol class="rep-steps">${test.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    <h4>${text("ab.d.assertions")}</h4>
    <pre class="rep-pre">${esc(test.assertions.join("\n"))}</pre>
    ${failed ? `<h4>${text("ab.d.error")}</h4><pre class="rep-pre err">${esc(test.error)}</pre>` : ""}
    ${eviKeys.length ? `<h4>${text("ab.d.evidence")}</h4>
      <div class="evi-row btns">${eviKeys.map(k => `<button type="button" class="evi" data-evi="${esc(k)}" aria-pressed="${k === eviKey}">${text(eviKeyLabel(k))}</button>`).join("")}</div>
      <pre class="rep-pre">${esc(test.evi[eviKey])}</pre>` : ""}
    <div class="rep-close"><button class="btn btn-s" type="button" id="repClose">${text("ab.d.close")}</button></div>`;
}

/* the chip labels translate, the content behind them does not */
function eviKeyLabel(key){
  return ({ "Screenshot": "ab.ev.screenshot", "Trace": "ab.ev.trace", "Video": "ab.ev.video", "Error": "ab.ev.error" })[key] || key;
}

function finish(){
  const s = SUITES[current];
  clearInterval(timer); timer = null; running = false;
  progFill.style.width = "100%";
  progPct.textContent = "100%";
  curTest.textContent = s.feed[s.feed.length - 1];
  runner.hidden = true;
  runDone.hidden = false;
  $("stTotal").textContent = String(s.total);
  $("stPassed").textContent = String(s.passed);
  $("stFailed").textContent = String(s.failed);
  $("stSkipped").textContent = String(s.skipped);
  $("stRate").textContent = s.rate;
  $("stDur").textContent = s.duration;
  selected = -1; eviKey = null;
  drawReport();
  drawDetail();
  setBusy(false);
  bring(runDone);
}

function run(key){
  if (timer) clearInterval(timer);
  current = key; running = true; selected = -1; eviKey = null;
  const s = SUITES[current];
  setBusy(true);
  fullNote.hidden = true;
  closeAllure();
  if (allureFrame) allureFrame.removeAttribute("src");
  runDone.hidden = true;
  runner.hidden = false;
  runBadge.hidden = false;
  drawRunner();
  repList.innerHTML = "";
  repNote.textContent = text("ab.report.empty");
  drawDetail();
  bring(runner);

  const started = Date.now();
  timer = setInterval(() => {
    const pct = Math.min(100, ((Date.now() - started) / RUN_MS) * 100);
    progFill.style.width = pct.toFixed(1) + "%";
    progPct.textContent = Math.round(pct) + "%";
    const i = Math.min(s.feed.length - 1, Math.floor((pct / 100) * s.feed.length));
    curTest.textContent = s.feed[i];
    if (pct >= 100) finish();
  }, 60);
}

pick.addEventListener("click", e => {
  const button = e.target.closest("button[data-suite]");
  if (button && !button.disabled) run(button.dataset.suite);
});

/* ---------- the full Allure report, opened below the run ----------
   The report is a static folder this site serves itself: one constant per
   suite decides where it comes from, and null keeps the text fallback for a
   suite that has not published one. The iframe only gets its src the first
   time the visitor asks for it, so nobody downloads Allure before clicking. */
function drawAllureMeta(){
  if (!current || !allureMeta) return;
  const s = SUITES[current];
  allureMeta.textContent = text("ab.allure.meta", { suite: s.suite, env: s.env, total: String(s.total) });
}
function closeAllure(){
  if (!allure) return;
  allure.hidden = true;
  openFull.setAttribute("aria-expanded", "false");
}

runAgain.addEventListener("click", () => { if (current) run(current); });

openFull.addEventListener("click", () => {
  const s = SUITES[current];
  if (!s || !s.allure){ fullNote.hidden = !fullNote.hidden; return; }
  if (allure && !allure.hidden){ closeAllure(); return; }
  if (!allureFrame.getAttribute("src")) allureFrame.src = s.allure;
  drawAllureMeta();
  allure.hidden = false;
  openFull.setAttribute("aria-expanded", "true");
  allure.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
});

if (allureClose) allureClose.addEventListener("click", () => { closeAllure(); openFull.focus(); });

repList.addEventListener("click", e => {
  const row = e.target.closest(".rep-row"); if (!row) return;
  selected = +row.dataset.i; eviKey = null;
  repList.querySelectorAll(".rep-row").forEach(r => r.setAttribute("aria-pressed", r === row ? "true" : "false"));
  drawDetail();
});

repBody.addEventListener("click", e => {
  const evi = e.target.closest(".evi");
  if (evi){
    eviKey = evi.dataset.evi;
    drawDetail();
    return;
  }
  if (e.target.closest("#repClose")){
    selected = -1;
    repList.querySelectorAll(".rep-row").forEach(r => r.setAttribute("aria-pressed", "false"));
    drawDetail();
  }
});

repNote.textContent = text("ab.report.empty");

if (window.I18n){
  window.I18n.onChange(() => {
    if (running) drawRunner();
    drawReport();
    drawDetail();
    drawAllureMeta();
  });
}
})();
