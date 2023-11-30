describe('Logs Component', () => {
  it('should display the correct number of logs', () => {

    cy.directVisit('logs');

    cy.get('[data-cy=logsCount]').then(($h2) => {
      const logsCount = Number($h2.text().match(/\d+/)[0]); // Extract the number from the text
      cy.get('[data-cy=logsTableBody] [data-cy=logRow]').should('have.length', logsCount);
    });

  });

});
