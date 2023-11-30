describe('Elevator Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is hosted on localhost:4200
    cy.directVisit('elevator')
  });

  it('should display', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('#elevatorTable tbody tr').should('have.length', 2);

  });

  it('should filter', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterInput]').type('El01');
    cy.get('[data-cy=filterButton]').click();
    cy.get('#elevatorTable tbody tr').should('have.length', 1);

  });

  it('should create', () => {

    cy.get('[data-cy=createButton]').click();
    cy.get('[data-cy=idInput]').type('elevadorTeste');
    cy.get('[data-cy=buildingInput]').select('M');
    cy.get('[data-cy=attendedInput]').select('M-1');
    cy.get('[data-cy=brandInput]').type('teste');
    cy.get('[data-cy=modelInput]').type('teste');
    cy.get('[data-cy=snInput]').type('teste');
    cy.get('[data-cy=descInput]').type('2021');
    cy.get('[data-cy=currentInput]').select('1');
    cy.get('[data-cy=XInput]').select('1');
    cy.get('[data-cy=YInput]').select('1');
    cy.get('[data-cy=createsButton]').click();

  });
});
