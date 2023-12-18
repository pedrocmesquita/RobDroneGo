using System.Threading.Tasks;

namespace DDDSample1.Domain.PickupAndDeliveryTasks
{
    public interface IPickUpAndDeliveryTaskMongoRepository
    {
        Task AddAsync(PickupAndDeliveryTask pickUpAndDeliveryTask);
    }
}