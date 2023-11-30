describe('Building Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is hosted on localhost:4200
    cy.directVisit('building')
  });

  it('should display', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('#buildingTable tbody tr').should('have.length', 4);

  });

  it('should filter', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterInput]').type('B');
    cy.get('[data-cy=filterButton]').click();
    cy.get('#buildingTable tbody tr').should('have.length', 1);

  });

  it('should filter by number of floors', () => {
    cy.get('[data-cy=listButton]').click();
    cy.wait(250);
    cy.get('[data-cy=minInput]').select('6');
    cy.get('[data-cy=maxInput]').select('10');
    cy.get('[data-cy=filter2Button]').click();
    cy.get('#buildingTable tbody tr').should('have.length', 2);

  });

  it('should create', () => {
    cy.get('[data-cy=createButton]').click();
    cy.get('[data-cy=idInput]').type('teste');
    cy.get('[data-cy=nameInput]').type('3');
    cy.get('[data-cy=descInput]').type('teste');
    cy.get('[data-cy=numInput]').select('7');
    cy.get('[data-cy=x]').select('1');
    cy.get('[data-cy=y]').select('1');
    cy.get('[data-cy=wh]').select('1');
    cy.get('[data-cy=ww]').select('1');
    cy.get('[data-cy=createsButton]').click();
  });

  it("should edit", () => {
    cy.get('[data-cy=listButton]').click();
    cy.get('#buildingTable tbody tr:first-child [data-cy=edit]').type('9');
    cy.get('[data-cy=updateButton]:first').click();
  });
});
