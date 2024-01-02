using System;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.unitTests.Domain;

public class PickupTest
{
    [Fact]
        public void CreatePickupAndDeliveryTask_AllParameters_ShouldPass()
        {
            // Arrange
            var clientEmail = "test@test.com";
            var pickupAndDeliveryTaskId = new PickupAndDeliveryTaskId("pit");
            var contactNumber = "1234567890";
            var pickupRoom = "Room 1";
            var deliveryRoom = "Room 2";
            var pickupContact = "Contact 1";
            var deliveryContact = "Contact 2";
            var confirmationCode = "Code";
            var description = "Description";

            // Act
            var pickupAndDeliveryTask = new PickupAndDeliveryTask(clientEmail, pickupAndDeliveryTaskId, contactNumber, pickupRoom, deliveryRoom, pickupContact, deliveryContact, confirmationCode, description);

            // Assert
            Assert.Equal(clientEmail, pickupAndDeliveryTask.ClientEmail);
            Assert.Equal(pickupAndDeliveryTaskId, pickupAndDeliveryTask.PickupAndDeliveryTaskId);
            Assert.Equal(contactNumber, pickupAndDeliveryTask.ContactNumber);
            Assert.Equal(pickupRoom, pickupAndDeliveryTask.PickupRoom);
            Assert.Equal(deliveryRoom, pickupAndDeliveryTask.DeliveryRoom);
            Assert.Equal(pickupContact, pickupAndDeliveryTask.PickupContact);
            Assert.Equal(deliveryContact, pickupAndDeliveryTask.DeliveryContact);
            Assert.Equal(confirmationCode, pickupAndDeliveryTask.ConfirmationCode);
            Assert.Equal(description, pickupAndDeliveryTask.Description);
            Assert.False(pickupAndDeliveryTask.Active);
            Assert.True(pickupAndDeliveryTask.CreatedAt <= DateTime.UtcNow);
            Assert.True(pickupAndDeliveryTask.UpdatedAt <= DateTime.UtcNow);
        }

        [Fact]
        public void CreatePickupAndDeliveryTask_DefaultConstructor_ShouldPass()
        {
            // Act
            var pickupAndDeliveryTask = new PickupAndDeliveryTask();

            // Assert
            Assert.False(pickupAndDeliveryTask.Active);
        }
        
        [Fact]
        public void CreatePickupAndDeliveryTask_InvalidParameters_ShouldThrowException()
        {
            // Arrange
            var clientEmail = "test@test.com";
            //var pickupAndDeliveryTaskId = new PickupAndDeliveryTaskId("pitsdsd"); // Invalid id with more than 5 characters
            var contactNumber = "1234567890";
            var pickupRoom = "Room 1";
            var deliveryRoom = "Room 2";
            var pickupContact = "Contact 1";
            var deliveryContact = "Contact 2";
            var confirmationCode = "Code";
            var description = "Description";
                    
            // Act
            var exceptionId =
                Assert.Throws<BusinessRuleValidationException>(() => new PickupAndDeliveryTaskId("pitsdsd"));
            
           // var exception = Assert.Throws<BusinessRuleValidationException>(() => new PickupAndDeliveryTask(clientEmail, pickupAndDeliveryTaskId, contactNumber, pickupRoom, deliveryRoom, pickupContact, deliveryContact, confirmationCode, description));

            // Assert
            Assert.Equal("The pickupAndDeliveryTaskId can't have more than 5 characters.", exceptionId.Message);
        }
        
        [Fact]
        public void UpdatePickupAndDeliveryTask_Properties_ShouldPass()
        {
            // Arrange
            var clientEmail = "test@test.com";
            var pickupAndDeliveryTaskId = new PickupAndDeliveryTaskId("pit");
            var contactNumber = "1234567890";
            var pickupRoom = "Room 1";
            var deliveryRoom = "Room 2";
            var pickupContact = "Contact 1";
            var deliveryContact = "Contact 2";
            var confirmationCode = "Code";
            var description = "Description";

            var pickupAndDeliveryTask = new PickupAndDeliveryTask(clientEmail, pickupAndDeliveryTaskId, contactNumber, pickupRoom, deliveryRoom, pickupContact, deliveryContact, confirmationCode, description);

            // Act
            pickupAndDeliveryTask.ClientEmail = "newemail@test.com";
            pickupAndDeliveryTask.ContactNumber = "0987654321";

            // Assert
            Assert.Equal("newemail@test.com", pickupAndDeliveryTask.ClientEmail);
            Assert.Equal("0987654321", pickupAndDeliveryTask.ContactNumber);
        }
}