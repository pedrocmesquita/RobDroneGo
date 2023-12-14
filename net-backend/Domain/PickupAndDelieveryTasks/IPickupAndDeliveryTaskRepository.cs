using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.PickupAndDeliveryTasks
{
    public interface IPickupAndDeliveryTaskRepository : IRepository<PickupAndDeliveryTask, Identifier>
    {
        Task<PickupAndDeliveryTask> GetByPickupAndDeliveryTaskIdAsync(string pickupAndDeliveryTaskIdentifier);
    }
}