using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SurveillanceTasks;
using Xunit;

namespace DDDSample1.unitTests.Domain
{
    public class SurveillanceTest
    {
        [Fact]
        public void CreateSurveillanceTask_AllParameters_ShouldPass()
        {
            // Arrange
            var clientEmail = "test@test.com";
            var surveillanceTaskId = new SurveillanceTaskId("sas");
            var contactNumber = "1234567890";
            var building = "Building 1";
            var floors = "Floor 1";

            // Act
            var surveillanceTask =
                new SurveillanceTask(clientEmail, surveillanceTaskId, contactNumber, building, floors);

            // Assert
            Assert.Equal(clientEmail, surveillanceTask.ClientEmail);
            Assert.Equal(surveillanceTaskId, surveillanceTask.SurveillanceTaskId);
            Assert.Equal(contactNumber, surveillanceTask.ContactNumber);
            Assert.Equal(building, surveillanceTask.Building);
            Assert.Equal(floors, surveillanceTask.Floors);
            Assert.False(surveillanceTask.Active);
            Assert.True(surveillanceTask.CreatedAt <= DateTime.UtcNow);
            Assert.True(surveillanceTask.UpdatedAt <= DateTime.UtcNow);
        }

        [Fact]
        public void CreateSurveillanceTask_DefaultConstructor_ShouldPass()
        {
            // Act
            var surveillanceTask = new SurveillanceTask();

            // Assert
            Assert.False(surveillanceTask.Active);
        }

        [Fact]
        public void CreateSurveillanceTask_InvalidParameters_ShouldThrowException()
        {
            // Arrange
            var clientEmail = string.Empty; // Invalid email
            //var surveillanceTaskId = new SurveillanceTaskId("sas");
            var contactNumber = "1234567890";
            var building = "Building 1";
            var floors = "Floor 1";

            var exception =
                Assert.Throws<BusinessRuleValidationException>(() =>
                    new SurveillanceTaskId("sasdsd")); // Invalid id with more than 5 characters }

            Assert.Equal("The surveillanceTaskId can't have more than 5 characters.", exception.Message);

        }
    }
}