// cypress/integration/menu.spec.js

describe('Home Menu', () => {
  beforeEach(() => {
    // Assuming you have a login command to log in before each test
    cy.customLogin('mc@gmail.com', 'mc123');
  });

  it('should open the 3D Module in a new tab', () => {
    cy.visit('localhost:4200/home');

    // Click on the 3D Module button (which opens in a new tab)
    cy.get('[data-cy=3DModuleButton]').click();

  });

});
