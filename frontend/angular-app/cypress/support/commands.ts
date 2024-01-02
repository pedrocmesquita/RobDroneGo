/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.js

// cypress/support/commands.js

Cypress.Commands.add('customLogin', (email, password) => {
  // Assuming you have a login form with data-cy attributes
  cy.visit('localhost:4200'); // Adjust the URL as per your application
  cy.get('[data-cy=emailInput]').type(email);
  cy.get('[data-cy=passwordInput]').type(password);
  cy.get('[data-cy=loginButton]').click();

  // Add any additional logic if needed, e.g., wait for a login confirmation
  // For example, waiting for a successful login redirect
  cy.url().should('include', '/home'); // Adjust the URL as per your application
});

Cypress.Commands.add('directVisit', (name) => {
  cy.visit('localhost:4200'); // Adjust the URL as per your application
  cy.get('[data-cy=emailInput]').type('mc@gmail.com');
  cy.get('[data-cy=passwordInput]').type('mc123');
  cy.get('[data-cy=loginButton]').click();
  cy.wait(2500);
  cy.visit('localhost:4200/' + name);
});


