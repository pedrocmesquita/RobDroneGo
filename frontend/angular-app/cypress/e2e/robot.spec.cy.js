describe('Robot Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is hosted on localhost:4200
    cy.directVisit('robot')
  });

  it('should display', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('#robotTable tbody tr').should('have.length', 7);

  });

  it('should filter', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterInput]').type('Rob2');
    cy.get('[data-cy=filterButton]').click();
    cy.get('#robotTable tbody tr').should('have.length', 1);

  });

  it('should patch', () => {
    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=patchButton]:first').click();
    cy.get('#robotTable tbody tr:first-child td:nth-child(6)').should('contain', 'false');
  });

  it('should create', () => {

    cy.get('[data-cy=createButton]').click();
    cy.get('[data-cy=idInput]').type('test');
    cy.get('[data-cy=nameInput]').type('test');
    cy.get('[data-cy=typeButton]').select('adad2')
    cy.get('[data-cy=snInput]').type('test');
    cy.get('[data-cy=descInput]').type('test');
    cy.get('[data-cy=stateButton]').type('true');
    cy.get('[data-cy=createsButton]').click();

  });
});
