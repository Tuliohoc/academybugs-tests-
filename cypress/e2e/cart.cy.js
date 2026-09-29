describe('cart', () => {
  it('opens empty and says so', () => {
    cy.openApp('/my-cart/');

    cy.contains(/there are no items in your cart/i, { timeout: 15000 }).should('be.visible');
    cy.contains(/return to stor/i).should('be.visible');
  });

  it('lists the product that was just added, with a real price', () => {
    cy.openApp('/find-bugs/');

    cy.get('.ec_product_title_type1:visible').first().invoke('text').then((name) => {
      const title = name.trim();

      cy.get('.ec_product_title_type1:visible').first().then(($title) => {
        const card = $title.closest('.ec_product_li');
        cy.wrap(card).find('a[id^="ec_add_to_cart_"]:visible').first().click();
      });

      cy.contains('Product successfully added to your cart', { timeout: 15000 }).should('be.visible');
      cy.get('.ec_product_added_to_cart:visible').contains(/view cart/i).click();
      cy.url().should('include', '/my-cart/');

      cy.get('.ec_cartitem_row:visible', { timeout: 15000 }).first().should('exist');
      cy.get('.ec_cartitem_title:visible', { timeout: 15000 }).first().should('contain.text', title);
      cy.get('.ec_cartitem_row:visible').first().should('not.contain', '0.00');
    });
  });
});
