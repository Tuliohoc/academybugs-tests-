import 'allure-cypress';

/* The site paints a Complianz cookie banner and a guided tour canvas on top of
   the page. Every visit dismisses both before the test touches anything. */
Cypress.Commands.add('openApp', (path) => {
  cy.visit(path, { failOnStatusCode: false });

  cy.get('body').then(($body) => {
    const accept = $body.find('button').filter((_, el) => /accept cookies/i.test(el.textContent || ''));
    if (accept.length) cy.wrap(accept.first()).click({ force: true });
  });

  cy.document().then((doc) => {
    doc.getElementById('TourTipDisabledArea')?.remove();
    doc.querySelectorAll('.tour-question-mark').forEach((el) => el.remove());
  });
});
