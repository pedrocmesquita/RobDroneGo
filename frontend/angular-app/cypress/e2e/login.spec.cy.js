// cypress/integration/login.spec.js

describe('Login', () => {
  it('should successfully log in', () => {
    // Use the custom login command
    cy.customLogin('mc@gmail.com', 'mc123');
    // Add assertions for a successful login
    cy.url().should('include', '/home');
    cy.get('h1').should('contain', 'Welcome to RobDroneGo');
  });
});
