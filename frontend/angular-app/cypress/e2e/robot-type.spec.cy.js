describe('Robot Type Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is hosted on localhost:4200
    cy.directVisit('robot-type')
  });

  it('should display', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('#robotTypeTable tbody tr').should('have.length', 3);

  });

  it('should filter', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterInput]').type('adad2');
    cy.get('[data-cy=filterButton]').click();
    cy.get('#robotTypeTable tbody tr').should('have.length', 1);

  });

  it('should create', () => {

    cy.get('[data-cy=createButton]').click();
    cy.get('[data-cy=nameInput]').type('test');
    cy.get('[data-cy=brandInput]').type('test');
    cy.get('[data-cy=modelInput]').type('test');
    cy.get('[data-cy=categoryButton]').select('Vigilance');
    cy.get('[data-cy=createsButton]').click();

  });
});
