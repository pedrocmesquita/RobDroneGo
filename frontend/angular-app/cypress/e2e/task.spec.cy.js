describe('Task Component', () => {
  beforeEach(() => {
    // Assuming your Angular app is running on http://localhost:4200
    cy.directVisit('task');
  });

  it('should create a surveillance task', () => {
    cy.intercept('POST', 'hhttps://localhost:5001/api/SurveillanceTask', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Task created successfully',
      },
    }).as('createSurveillanceTask');

    cy.get('[data-cy=createSurveillanceButton]').click();

    cy.get('[data-cy=surveillanceTaskIdInput]').type('123');
    cy.get('[data-cy=contactNumberInput]').type('555-1234');
    cy.get('[data-cy=buildingInput]').select('A');
    cy.get('[data-cy=floorInput]').select('A-1');
    cy.get('[data-cy=createsButton]').click();

  });

  it('should create a pick up and delivery task', () => {
    cy.intercept('POST', 'hhttps://localhost:5001/api/PickUpAndDeliveryTask', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Task created successfully',
      },
    }).as('createPickUpTask');
    cy.get('[data-cy=createPickUpAndDeliveryButton]').click();

    cy.get('[data-cy=pickUpAndDeliveryTaskIdInput]').type('456');
    cy.get('[data-cy=contactNumberInput]').type('555-5678');
    cy.get('[data-cy=pickupRoomInput]').should('be.visible').select('FlA1'); // Replace 'RoomA' with the actual room value for pickup
    cy.get('[data-cy=deliveryRoomInput]').should('be.visible').select('A22'); // Replace 'RoomB' with the actual room value for delivery
    cy.get('[data-cy=pickUpContactInput]').type('PickupContact');
    cy.get('[data-cy=deliveryContactInput]').type('DeliveryContact');
    cy.get('[data-cy=confirmationCodeInput]').type('ABC123');
    cy.get('[data-cy=descriptionInput]').type('This is a sample description');
    cy.get('[data-cy=createsButton]').click();

  });

  it('should list tasks', () => {
    // Assuming a user with the required role is logged in
    // Replace 'GestorDeTarefas' with the actual role value
    cy.get('[data-cy=listButton]').click();

    // Assert that the list of tasks is displayed
    cy.get('.list-container').should('be.visible');
  });
});

