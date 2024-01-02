describe('Path Component', () => {
  it('should submit the form and display the path result', () => {
    // Visit the path component page
    cy.customLogin('mc@gmail.com', 'mc123');
    cy.directVisit('path');

    // Type values into form fields

    cy.get('[data-cy=originBInput]').type('c')
    cy.get('[data-cy=destBInput]').type('c');
    cy.get('[data-cy=originFInput]').type('2');
    cy.get('[data-cy=destFInput]').type('2');
    cy.get('[data-cy=originXInput]').type('5');
    cy.get('[data-cy=originYInput]').type('2');
    cy.get('[data-cy=destXInput]').type('5');
    cy.get('[data-cy=destYInput]').type('9');

    // Submit the form
    cy.get('[data-cy=pathForm]').click();

    // Wait for the path result to be displayed
    cy.wait(5000);
    cy.get('#pathResult').should('not.be.empty'), { timeout: 30000 };
  });

  // Add more tests if needed, for example, testing error cases
});
