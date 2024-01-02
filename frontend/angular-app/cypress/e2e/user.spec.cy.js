// cypress/integration/create-account.spec.js

describe('Create Account Feature', () => {
  it('should create a new user account', () => {
    cy.intercept('POST', 'http://localhost:4000/api/auth/signup', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Account created successfully',
      },
    }).as('createAccount');

    cy.directVisit('user');

    cy.get('.create-account-btn').click();

    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#password').type('P@ssw0rd');
    cy.get('#role').should('be.visible').select('Admin');

    cy.get('.signup-form').submit();
  });
});

describe('Approve/Reject User Registrations Feature', () => {
  it('should toggle the approval/rejection of user registrations', () => {
    // Visit your application
    cy.directVisit('user');

    // Click on the "Approve/Reject User Registrations" button
    cy.get('.ar-account-btn').click();

    // Optionally, you can add assertions to check if the UI changes accordingly
    // For example, you might check if the title of the form is displayed as "Approve/Reject User Registrations".
    // Adjust these assertions based on your application's behavior.
    cy.get('.create-account-form h2').should('contain', 'Approve/Reject User Registrations');
    cy.get('.create-account-form h1').should('contain', 'TBD');
  });
});
