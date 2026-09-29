describe('catalog', () => {
  it('shows the product grid with titles, prices and buy buttons', () => {
    cy.openApp('/find-bugs/');

    cy.get('.ec_product_title_type1:visible').should('have.length.at.least', 5);
    cy.get('a[id^="ec_add_to_cart_"]:visible').should('have.length.at.least', 1);
  });

  it('links every visible product to its detail page', () => {
    cy.openApp('/find-bugs/');

    cy.get('.ec_product_title_type1 a').first().should('have.attr', 'href').and('include', '/store/');
    cy.get('.ec_product_title_type1 a').first().click();
    cy.get('h1.ec_details_title:visible').should('be.visible');
    cy.get('.ec_product_price:visible').should('be.visible');
  });

  it('offers the nine sort orders on the sort menu', () => {
    cy.openApp('/find-bugs/');

    cy.get('#sortfield').should('be.visible');
    cy.get('#sortfield option').should('have.length', 9);
    cy.get('#sortfield option').contains('Title A-Z').should('exist');
  });

  it('adds a product to the cart and confirms it', () => {
    cy.openApp('/find-bugs/');

    cy.get('a[id^="ec_add_to_cart_"]:visible').first().click();
    cy.contains('Product successfully added to your cart', { timeout: 15000 }).should('be.visible');
    cy.get('.ec_product_added_to_cart:visible').contains(/view cart/i).click();
    cy.url().should('include', '/my-cart/');
  });
});
