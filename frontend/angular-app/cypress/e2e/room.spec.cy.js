describe('Room Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is hosted on localhost:4200
    cy.directVisit('room')
  });

  it('should display', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('#roomTable tbody tr').should('have.length', 2);

  });

  it('should filter', () => {

    cy.get('[data-cy=listButton]').click();
    cy.get('[data-cy=filterInput]').type('103');
    cy.get('[data-cy=filterButton]').click();
    cy.get('#roomTable tbody tr').should('have.length', 1);

  });

  it('should create', () => {

    cy.get('[data-cy=createButton]').click();
    cy.get('[data-cy=floorInput]').select('B-1')
    cy.get('[data-cy=idInput]').type('test');
    cy.get('[data-cy=descInput]').type('test');
    cy.get('[data-cy=categoryInput]').select('Gabinete');
    cy.get('[data-cy=doorXInput]').select('1');
    cy.get('[data-cy=doorYInput]').select('1');
    cy.get('[data-cy=originXInput]').select('1');
    cy.get('[data-cy=originYInput]').select('1');
    cy.get('[data-cy=destXInput]').select('1');
    cy.get('[data-cy=destYInput]').select('1');


    cy.get('[data-cy=createsButton]').click();

  });
});
