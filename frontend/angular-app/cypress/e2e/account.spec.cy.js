// cypress/integration/user-account.spec.js

describe('User Account Feature', () => {

  it('should display user information when the user is logged in', () => {
    cy.directVisit('account');
    cy.get('.user-info-container').should('be.visible');

    cy.contains('.user-info-container', 'Marta').should('be.visible');
    cy.contains('.user-info-container', 'Campos').should('be.visible');
    cy.contains('.user-info-container', 'mc@gmail.com').should('be.visible');
    cy.contains('.user-info-container', 'Admin').should('be.visible');
  });

  it('should display edit account form and update user information', () => {
    cy.intercept('PUT', 'http://localhost:4000/api/auth/updateAccount', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Account updated successfully',
      },
    }).as('updateAccount');

    cy.directVisit('account');
    cy.get('#firstName').clear().type('UpdatedFirstName');
    cy.get('#lastName').clear().type('UpdatedLastName');
    cy.get('#selectedRole').should('be.visible').select('Admin');
    cy.get('#currentPassword').type('CurrentPassword');
    cy.get('#newPassword').type('NewPassword');
    cy.get('#confirmPassword').type('NewPassword');

    cy.get('.edit-account-btn').click();

    cy.wait('@updateAccount');
  });

  it('should display delete account confirmation and delete user account', () => {
    // Stub the API call for deleting the user account
    cy.intercept('POST', 'http://localhost:4000/api/auth/delete', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Account deleted successfully',
      },
    }).as('deleteAccount');

    cy.directVisit('account');

    cy.get('.delete-account-btn').click();

    cy.wait('@deleteAccount');
  });
});
