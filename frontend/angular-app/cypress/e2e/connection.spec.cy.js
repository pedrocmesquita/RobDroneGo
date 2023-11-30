describe('Connection Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is hosted on localhost:4200
    cy.directVisit('connection')
  });

  it('should display', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('#connectionTable tbody tr').should('have.length', 2);

  });

  it('should filter', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterInput]').type('B-1 TO M-1');
    cy.get('[data-cy=filterButton]').click();
    cy.get('#connectionTable tbody tr').should('have.length', 1);

  });

  it('should create', () => {

    cy.get('[data-cy=createButton]').click();
    cy.get('[data-cy=fromInput]').select('B')
    cy.get('[data-cy=toInput]').select('M')
    cy.get('[data-cy=ffInput]').select('B-1')
    cy.get('[data-cy=ftInput]').select('M-1')
    cy.get('[data-cy=x1]').select('1');
    cy.get('[data-cy=y1]').select('1');
    cy.get('[data-cy=x2]').select('1');
    cy.get('[data-cy=y2]').select('1');
    cy.get('[data-cy=createsButton]').click();

  });

  it('should filter between buildings', () => {
    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterA]').select('B')
    cy.get('[data-cy=filterB]').select('M')
    cy.get('[data-cy=filterBButton]').click();
    cy.get('#connectionTable tbody tr').should('have.length', 1);
  });

  /*
  it('should edit', () => {
    cy.get('[data-cy=listButton]').click();
    cy.get('#connectionTable tbody tr:first-child [data-cy=updateTeste]').type('1');
    cy.get('[data-cy=updateButton]:first').click();
  });
  */

});
