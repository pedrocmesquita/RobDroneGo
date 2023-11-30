describe('Floor Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is hosted on localhost:4200
    cy.directVisit('floor')
  });

  it('should display', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('#floorTable tbody tr').should('have.length', 4);

  });

  it('should filter', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterInput]').type('B-1');
    cy.get('[data-cy=filterButton]').click();
    cy.get('#floorTable tbody tr').should('have.length', 1);

  });

  it('should filter with connections', () => {
    cy.get('[data-cy=listButton]').click();
    cy.wait(500);
    cy.get('[data-cy=filterConnectionsButton]').click();
    cy.get('#floorTable tbody tr').should('have.length', 3);

  });

  it('should create', () => {

    cy.get('[data-cy=createButton]').click();
    cy.get('[data-cy=buildingInput]').select('B');
    cy.get('[data-cy=numberInput]').select('3');
    cy.get('[data-cy=descInput]').type('teste')
    cy.get('[data-cy=createsButton]').click();

  });
});
