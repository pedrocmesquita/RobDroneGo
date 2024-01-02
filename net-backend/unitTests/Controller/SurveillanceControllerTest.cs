using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.SurveillanceTasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace DDDSample1.unitTests.Controller;

public class SurveillanceControllerTest
{

    [Test]
        public async Task GetAll_ReturnsOkResult_WithSurveillanceTasks()
        {
            // Arrange
            var serviceMock = new Mock<SurveillanceTaskService>();
            var surveillanceTaskId = "123";
            var clientEmail = "test@test.com";

            var task = new SurveillanceTask(clientEmail, new SurveillanceTaskId(surveillanceTaskId), "1234567890", "Building 1", "Floor 1");

            var surveillanceTaskDto = new SurveillanceTaskDto { Id = task.Id.AsGuid(), SurveillanceTaskId = task.SurveillanceTaskId.SurveillanceTaskIdentifier, ClientEmail = task.ClientEmail };

            var surveillanceTaskDtoList = new List<SurveillanceTaskDto> { surveillanceTaskDto };

            serviceMock.Setup(_ => _.GetAllAsync()).ReturnsAsync(surveillanceTaskDtoList);

            var controller = new SurveillanceTaskController(serviceMock.Object);

            // Act
            var actual = await controller.GetAll();

            // Assert
            Assert.AreEqual(surveillanceTaskDtoList, actual.Value);
        }

        [Test]
        public async Task GetBySurveillanceTaskId_ReturnsOkResult_WithSurveillanceTask()
        {
            // Arrange
            var serviceMock = new Mock<SurveillanceTaskService>();
            var surveillanceTaskId = "123";
            var clientEmail = "test@test.com";

            var task = new SurveillanceTask(clientEmail, new SurveillanceTaskId(surveillanceTaskId), "1234567890", "Building 1", "Floor 1");

            var surveillanceTaskDto = new SurveillanceTaskDto { Id = task.Id.AsGuid(), SurveillanceTaskId = task.SurveillanceTaskId.SurveillanceTaskIdentifier, ClientEmail = task.ClientEmail };

            serviceMock.Setup(_ => _.GetBySurveillanceTaskIdAsync(surveillanceTaskDto.SurveillanceTaskId)).ReturnsAsync(surveillanceTaskDto);

            var controller = new SurveillanceTaskController(serviceMock.Object);

            // Act
            var actual = await controller.GetBySurveillanceTaskId(surveillanceTaskId);

            // Assert
            Assert.AreEqual(surveillanceTaskDto, actual.Value);
        }
}