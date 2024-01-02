// cypress/integration/menu.spec.js

describe('Home Menu', () => {
  beforeEach(() => {
    // Assuming you have a login command to log in before each test
    cy.customLogin('mc@gmail.com', 'mc123');
  });

  it('should navigate to the Buildings page', () => {
    cy.visit('localhost:4200/home');

    // Click on the Buildings button
    cy.get('[data-cy=buildingButton]').click();

    // Assert that the URL matches the expected path
    cy.url().should('include', '/building');
  });

  it('should navigate to the Floors page', () => {
    cy.visit('localhost:4200/home');

    // Click on the Floors button
    cy.get('[data-cy=floorButton]').click();

    // Assert that the URL matches the expected path
    cy.url().should('include', '/floor');
  });

  it('should open the Rooms page', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=roomButton]').click();

    // Assert that the new tab is opened
    cy.url().should('include', '/room');
  });

  it('should open the Connections page', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=connectionButton]').click();

    // Assert that the new tab is opened
    cy.url().should('include', '/connection');
  });

  it('should open the Elevator page', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=elevatorButton]').click();

    // Assert that the new tab is opened
    cy.url().should('include', '/elevator');
  });

  it('should open the Robots page', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=robotButton]').click();

    // Assert that the new tab is opened
    cy.url().should('include', '/robot');
  });

  it('should open the Robot Type page', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=robot-typeButton]').click();

    // Assert that the new tab is opened
    cy.url().should('include', '/robot-type');
  });

  it('should open the Logs page', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=logsButton]').click();

    // Assert that the new tab is opened
    cy.url().should('include', '/logs');
  });

  /*
  it('should open the 3D Module in a new tab', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=3DModuleButton]').click();

  });
*/

  it('should open the Paths page', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=pathButton]').click();

    // Assert that the new tab is opened
    cy.url().should('include', '/path');
  });

});
