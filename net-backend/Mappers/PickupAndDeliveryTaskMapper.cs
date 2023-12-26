using DDDSample1.Domain.PickupAndDeliveryTasks;

namespace DDDSample1.Mappers
{
    public class PickupAndDeliveryTaskMapper
    {
        public static PickupAndDeliveryTaskDto domainToDTO(PickupAndDeliveryTask pdt)
        {
            return new PickupAndDeliveryTaskDto
            {   
                ClientEmail = pdt.ClientEmail,
                Id = pdt.Id.AsGuid(),
                PickupAndDeliveryTaskId = pdt.PickupAndDeliveryTaskId.PickupAndDeliveryTaskIdentifier,
                ContactNumber = pdt.ContactNumber, PickupRoom = pdt.PickupRoom, DeliveryRoom = pdt.DeliveryRoom,
                PickupContact = pdt.PickupContact, DeliveryContact = pdt.DeliveryContact,
                ConfirmationCode = pdt.ConfirmationCode, Description = pdt.Description,
                Active = pdt.Active, CreatedAt = pdt.CreatedAt, UpdatedAt = pdt.UpdatedAt
            };
        }
        

    }
}