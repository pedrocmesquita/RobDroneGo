using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace DDDSample1.unitTests.Controller;

public class PickupControllerTest
{

   [Test]
        public async Task GetAll_ReturnsOkResult_WithPickupAndDeliveryTasks()
        {
            // Arrange
            var serviceMock = new Mock<PickupAndDeliveryTaskService>();
            var pickupAndDeliveryTaskId = "123";
            var clientEmail = "test@test.com";
            var contactNumber = "1234567890";
            var pickupRoom = "Room 1";
            var deliveryRoom = "Room 2";
            var pickupContact = "Contact 1";
            var deliveryContact = "Contact 2";
            var confirmationCode = "Code";
            var description = "Description";

            var task = new PickupAndDeliveryTask(clientEmail, new PickupAndDeliveryTaskId(pickupAndDeliveryTaskId),
                contactNumber, pickupRoom, deliveryRoom, pickupContact, deliveryContact, confirmationCode, description);

            var pickupAndDeliveryTaskDto = new PickupAndDeliveryTaskDto { Id = task.Id.AsGuid(), PickupAndDeliveryTaskId = task.PickupAndDeliveryTaskId.PickupAndDeliveryTaskIdentifier, ClientEmail = task.ClientEmail,
                ContactNumber = task.ContactNumber, PickupRoom = task.PickupRoom, DeliveryRoom = task.DeliveryRoom, PickupContact = task.PickupContact, DeliveryContact = task.DeliveryContact, 
                ConfirmationCode = task.ConfirmationCode, Description = task.Description };

            var pickupAndDeliveryTaskDtoList = new List<PickupAndDeliveryTaskDto> { pickupAndDeliveryTaskDto };

            serviceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(pickupAndDeliveryTaskDtoList);

            var controller = new PickupAndDeliveryTaskController(serviceMock.Object);

            // Act
            var actual = await controller.GetAll();

            // Assert
            Assert.AreEqual(pickupAndDeliveryTaskDtoList, actual.Value);
        }

        [Test]
        public async Task GetByPickupAndDeliveryTaskId_ReturnsOkResult_WithPickupAndDeliveryTask()
        {
            // Arrange
            var serviceMock = new Mock<PickupAndDeliveryTaskService>();
            var pickupAndDeliveryTaskId = "123";
            var clientEmail = "test@test.com";
            var contactNumber = "1234567890";
            var pickupRoom = "Room 1";
            var deliveryRoom = "Room 2";
            var pickupContact = "Contact 1";
            var deliveryContact = "Contact 2";
            var confirmationCode = "Code";
            var description = "Description";
            

            var task = new PickupAndDeliveryTask(clientEmail, new PickupAndDeliveryTaskId(pickupAndDeliveryTaskId), 
                contactNumber, pickupRoom, deliveryRoom, pickupContact, deliveryContact, confirmationCode, description);

            var pickupAndDeliveryTaskDto = new PickupAndDeliveryTaskDto { Id = task.Id.AsGuid(), PickupAndDeliveryTaskId = task.PickupAndDeliveryTaskId.PickupAndDeliveryTaskIdentifier, ClientEmail = task.ClientEmail,
                ContactNumber = task.ContactNumber, PickupRoom = task.PickupRoom, DeliveryRoom = task.DeliveryRoom, PickupContact = task.PickupContact, DeliveryContact = task.DeliveryContact, 
                ConfirmationCode = task.ConfirmationCode, Description = task.Description };

            serviceMock.Setup(_ => _.GetByPickupAndDeliveryTaskIdAsync(pickupAndDeliveryTaskDto.PickupAndDeliveryTaskId)).ReturnsAsync(pickupAndDeliveryTaskDto);

            var controller = new PickupAndDeliveryTaskController(serviceMock.Object);

            // Act
            var actual = await controller.GetByPickupAndDeliveryTaskId(pickupAndDeliveryTaskId);

            // Assert
            Assert.AreEqual(pickupAndDeliveryTaskDto, actual.Value);
        }
}

