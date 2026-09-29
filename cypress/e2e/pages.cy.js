describe('content pages', () => {
  it('keeps the practice navigation on every page', () => {
    cy.openApp('/');

    cy.get('nav').first().within(() => {
      cy.contains('Find Bugs').should('be.visible');
      cy.contains('Types of Bugs').should('be.visible');
      cy.contains('Report Bugs').should('be.visible');
    });
  });

  it('explains the bug categories on the types page', () => {
    cy.openApp('/types/');

    cy.contains('Functional').first().should('be.visible');
    cy.contains('Visual').first().should('be.visible');
  });

  it('offers the practice scenarios on the report bugs page', () => {
    cy.openApp('/report-bugs/');

    cy.contains(/practice scenarios/i).first().should('be.visible');
    cy.contains(/instructions/i).first().should('be.visible');
  });
});
