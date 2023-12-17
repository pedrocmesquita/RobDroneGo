using DDDSample1.Domain.PickupAndDeliveryTasks;

namespace DDDSample1.Mappers
{
    public class PickupAndDeliveryTaskMapper
    {
        public static PickupAndDeliveryTaskDto domainToDTO(PickupAndDeliveryTask pdt)
        {
            return new PickupAndDeliveryTaskDto
            {
                Id = pdt.Id.AsGuid(),
                PickupAndDeliveryTaskId = pdt.PickupAndDeliveryTaskId.PickupAndDeliveryTaskIdentifier,
                ContactNumber = pdt.ContactNumber, PickupRoom = pdt.PickupRoom, DeliveryRoom = pdt.DeliveryRoom,
                PickupContact = pdt.PickupContact
            };
        }
        

    }
}